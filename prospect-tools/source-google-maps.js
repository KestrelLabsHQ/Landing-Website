const path = require('path');
const { chromium } = require('playwright');
const {
  parseArgs,
  parseNumberish,
  sleep,
  uniqBy,
  writeJson,
} = require('./common');

async function sourceGoogleMaps({ queries, maxPerQuery = 10, headed = false, locale = 'en-US' }) {
  const browser = await chromium.launch({ headless: !headed });
  const context = await browser.newContext({
    locale,
    viewport: { width: 1440, height: 1100 },
    userAgent:
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
  });

  const all = [];

  try {
    for (const query of queries) {
      const page = await context.newPage();
      const results = await runQuery(page, query, maxPerQuery);
      all.push(...results);
      await page.close();
    }
  } finally {
    await context.close();
    await browser.close();
  }

  return uniqBy(all, (item) => item.maps_url || `${item.query}:${item.name}`);
}

async function runQuery(page, query, maxPerQuery) {
  const searchUrl = `https://www.google.com/maps/search/${encodeURIComponent(query)}`;
  await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await sleep(2500);
  await acceptConsentIfNeeded(page);
  await sleep(1500);
  await scrollResults(page);

  const hrefs = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('a[href*="/maps/place/"]'));
    return [...new Set(anchors.map((anchor) => anchor.href).filter(Boolean))];
  });

  const uniqueHrefs = hrefs.slice(0, Math.max(maxPerQuery * 2, maxPerQuery));
  const out = [];

  for (const href of uniqueHrefs) {
    const detailPage = await page.context().newPage();
    try {
      await detailPage.goto(href, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await sleep(1800);
      const record = await extractPlace(detailPage, query, href);
      if (record.name) out.push(record);
    } catch (error) {
      out.push({
        query,
        maps_url: href,
        error: error.message,
      });
    } finally {
      await detailPage.close();
    }

    if (out.filter((item) => item.name).length >= maxPerQuery) break;
  }

  return out;
}

async function acceptConsentIfNeeded(page) {
  const selectors = [
    'button:has-text("Accept all")',
    'button:has-text("I agree")',
    'button[aria-label="Accept all"]',
  ];

  for (const selector of selectors) {
    try {
      const button = await page.$(selector);
      if (button) {
        await button.click({ timeout: 2000 });
        await sleep(1000);
        return;
      }
    } catch {
      // ignore best-effort selectors
    }
  }
}

async function scrollResults(page) {
  try {
    await page.evaluate(async () => {
      const feed = document.querySelector('div[role="feed"]');
      if (!feed) return;
      for (let i = 0; i < 6; i += 1) {
        feed.scrollTop = feed.scrollHeight;
        await new Promise((resolve) => setTimeout(resolve, 900));
      }
    });
  } catch {
    // best effort
  }
}

async function extractPlace(page, query, href) {
  return page.evaluate(({ queryValue, hrefValue }) => {
    const text = (selector) => {
      const element = document.querySelector(selector);
      return element ? element.textContent.trim() : '';
    };

    const firstMatchingText = (selectors) => {
      for (const selector of selectors) {
        const value = text(selector);
        if (value) return value;
      }
      return '';
    };

    const websiteAnchor =
      document.querySelector('a[data-item-id="authority"]') ||
      Array.from(document.querySelectorAll('a[href^="http"]')).find((anchor) => {
        const href = anchor.href || '';
        return !href.includes('google.com') && !href.includes('g.co') && !href.includes('/maps/');
      });

    const phoneAnchor = document.querySelector('a[href^="tel:"]');
    const phoneButton = Array.from(document.querySelectorAll('button')).find((button) => {
      const label = (button.getAttribute('aria-label') || '') + ' ' + (button.textContent || '');
      return /phone|call/i.test(label);
    });

    const addressButton =
      document.querySelector('button[data-item-id="address"]') ||
      Array.from(document.querySelectorAll('button')).find((button) => {
        const label = (button.getAttribute('aria-label') || '') + ' ' + (button.textContent || '');
        return /address/i.test(label);
      });

    const ratingNode = document.querySelector('div[role="img"][aria-label*="star"]');
    const ratingLabel = ratingNode ? ratingNode.getAttribute('aria-label') || '' : '';
    const reviewNode = Array.from(document.querySelectorAll('button,span')).find((node) => /\([\d,]+\)/.test(node.textContent || ''));
    const categoryNode =
      Array.from(document.querySelectorAll('button')).find((button) => {
        const label = button.getAttribute('aria-label') || '';
        return /category/i.test(label);
      }) || document.querySelector('button[jsaction*="pane.rating.category"]');

    const addressValue = addressButton
      ? (addressButton.getAttribute('aria-label') || addressButton.textContent || '').trim()
      : '';
    const phoneHref = phoneAnchor ? (phoneAnchor.getAttribute('href') || '') : '';
    const phoneValue = phoneAnchor
      ? (phoneHref.replace(/^tel:/, '') || phoneAnchor.getAttribute('aria-label') || phoneAnchor.textContent || '').trim()
      : phoneButton
        ? (phoneButton.getAttribute('aria-label') || phoneButton.textContent || '').trim()
        : '';

    return {
      query: queryValue,
      name: firstMatchingText(['h1']) || '',
      maps_url: hrefValue,
      category: categoryNode ? (categoryNode.textContent || categoryNode.getAttribute('aria-label') || '').trim() : '',
      website: websiteAnchor ? websiteAnchor.href : '',
      phone: phoneValue,
      address: addressValue,
      rating_label: ratingLabel,
      review_label: reviewNode ? (reviewNode.textContent || '').trim() : '',
      scraped_at: new Date().toISOString(),
    };
  }, { queryValue: query, hrefValue: href }).then((raw) => {
    const rating = parseNumberish(raw.rating_label);
    const reviewCount = parseNumberish(raw.review_label);
    return {
      ...raw,
      rating,
      review_count: reviewCount,
    };
  });
}

async function cli() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || (!args.query && !args.queries)) {
    console.log([
      'Usage:',
      '  node prospect-tools/source-google-maps.js --query "physical therapy atlanta" --max-per-query 10 --out prospect-runs/maps.json',
      '  node prospect-tools/source-google-maps.js --queries prospect-tools/queries-medical-local.json --out prospect-runs/maps.json',
      '',
      'Options:',
      '  --query <value>           Single search query (repeatable)',
      '  --queries <file>          JSON array or newline-delimited text file of queries',
      '  --max-per-query <n>       Max places to inspect per query (default 10)',
      '  --headed                  Run browser headed instead of headless',
      '  --out <file>              Write results JSON to file',
    ].join('\n'));
    return;
  }

  const queries = [];
  if (args.query) {
    const inputQueries = Array.isArray(args.query) ? args.query : [args.query];
    queries.push(...inputQueries);
  }
  if (args.queries) {
    const filePath = path.resolve(process.cwd(), args.queries);
    const raw = require('fs').readFileSync(filePath, 'utf8');
    if (filePath.endsWith('.json')) {
      queries.push(...JSON.parse(raw));
    } else {
      queries.push(...raw.split(/\r?\n/).map((line) => line.trim()).filter(Boolean));
    }
  }

  const results = await sourceGoogleMaps({
    queries,
    maxPerQuery: Number(args['max-per-query'] || 10),
    headed: Boolean(args.headed),
  });

  if (args.out) {
    await writeJson(path.resolve(process.cwd(), args.out), results);
  }

  console.log(JSON.stringify({ count: results.length, results }, null, 2));
}

module.exports = {
  sourceGoogleMaps,
};

if (require.main === module) {
  cli().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
