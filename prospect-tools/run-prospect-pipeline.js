const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');
const { promisify } = require('util');
const {
  clamp,
  ensureDir,
  extractEmails,
  normalizeUrl,
  parseArgs,
  readJson,
  slugify,
  uniqBy,
  writeCsv,
  writeJson,
} = require('./common');
const { sourceGoogleMaps } = require('./source-google-maps');
const { syncCandidates } = require('./sync-dolibarr');

const execFileAsync = promisify(execFile);

async function runPipeline(options) {
  const runId = options.runId || new Date().toISOString().replace(/[:.]/g, '-');
  const outDir = path.resolve(process.cwd(), options.outDir || `prospect-runs/${runId}`);
  await ensureDir(outDir);

  const rawCandidates = options.input
    ? await readJson(path.resolve(process.cwd(), options.input))
    : await sourceGoogleMaps({
        queries: options.queries,
        maxPerQuery: options.maxPerQuery,
        headed: options.headed,
      });

  const deduped = uniqBy(
    rawCandidates
      .map((candidate) => ({ ...candidate, website: normalizeUrl(candidate.website) || candidate.website || null }))
      .filter((candidate) => candidate.name || candidate.website),
    (candidate) => candidate.website || candidate.maps_url || candidate.name,
  );

  const analyzed = [];
  for (const candidate of deduped) {
    const websiteInspection = candidate.website ? await inspectWebsite(candidate.website) : defaultInspection();
    const scored = scoreCandidate(candidate, websiteInspection);
    if (candidate.website && options.capture) {
      scored.capture_path = await captureSite(candidate.website, candidate.name);
    }
    analyzed.push(scored);
  }

  const shortlist = analyzed
    .filter((candidate) => candidate.total_score >= options.minScore)
    .sort((a, b) => b.total_score - a.total_score)
    .slice(0, options.shortlistLimit);

  const summary = {
    run_id: runId,
    created_at: new Date().toISOString(),
    total_candidates: analyzed.length,
    shortlisted: shortlist.length,
    out_dir: outDir,
  };

  await writeJson(path.join(outDir, 'candidates.raw.json'), rawCandidates);
  await writeJson(path.join(outDir, 'candidates.scored.json'), analyzed);
  await writeJson(path.join(outDir, 'shortlist.json'), shortlist);
  await writeJson(path.join(outDir, 'summary.json'), summary);
  await writeCsv(
    path.join(outDir, 'shortlist.csv'),
    shortlist.map((candidate) => ({
      name: candidate.name,
      category: candidate.category,
      city: candidate.city || '',
      website: candidate.website || '',
      email: candidate.email || '',
      phone: candidate.phone || '',
      business_quality_score: candidate.business_quality_score,
      website_gap_score: candidate.website_gap_score,
      access_score: candidate.access_score,
      budget_signal_score: candidate.budget_signal_score,
      total_score: candidate.total_score,
      short_summary: candidate.short_summary,
      capture_path: candidate.capture_path || '',
      maps_url: candidate.maps_url || '',
    })),
  );

  let syncReport = null;
  if (options.syncDolibarr) {
    syncReport = await syncCandidates({
      candidates: shortlist,
      dryRun: options.dryRun,
      createGenericContacts: options.createGenericContacts,
    });
    await writeJson(path.join(outDir, 'dolibarr-sync.json'), syncReport);
  }

  return { summary, analyzed, shortlist, syncReport, outDir };
}

function defaultInspection() {
  return {
    ok: false,
    finalUrl: null,
    title: null,
    html: '',
    foundBooking: false,
    foundAbout: false,
    foundNewPatient: false,
    foundContact: false,
    email: null,
  };
}

async function inspectWebsite(url) {
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      signal: AbortSignal.timeout(20000),
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; KestrelLabsProspectBot/0.1; +https://kestrellabshq.com)',
      },
    });
    const html = await response.text();
    const lower = html.toLowerCase();
    const emails = extractEmails(html);
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);

    return {
      ok: response.ok,
      status: response.status,
      finalUrl: response.url,
      title: titleMatch ? titleMatch[1].trim() : null,
      html,
      foundBooking: /(book|schedule|appointment|request an appointment|request appointment)/i.test(lower),
      foundAbout: /(about|our team|meet the team|providers|doctor|therapist|chiropractor|staff)/i.test(lower),
      foundNewPatient: /(new patient|first visit|insurance|forms|what to expect)/i.test(lower),
      foundContact: /(contact|call us|phone|mailto:|reach out)/i.test(lower),
      email: emails[0] || null,
    };
  } catch (error) {
    return {
      ...defaultInspection(),
      error: error.message,
    };
  }
}

function scoreCandidate(candidate, inspection) {
  const combinedText = [candidate.name, candidate.category, inspection.title].filter(Boolean).join(' ');
  const premiumKeywords = /(sports|performance|manual|pelvic|concierge|cash pay|recovery)/i.test(combinedText);

  let businessQuality = 1;
  if (candidate.website) businessQuality += 1;
  if (candidate.phone) businessQuality += 1;
  if (candidate.rating && candidate.rating >= 4.5) businessQuality += 1;
  if (candidate.review_count && candidate.review_count >= 20) businessQuality += 1;
  businessQuality = clamp(businessQuality, 1, 5);

  let access = 1;
  if (candidate.website) access += 1;
  if (candidate.phone) access += 1;
  if (inspection.email) access += 1;
  if (inspection.foundContact) access += 1;
  access = clamp(access, 1, 5);

  let budgetSignal = 1;
  if (candidate.review_count && candidate.review_count >= 30) budgetSignal += 1;
  if (candidate.review_count && candidate.review_count >= 100) budgetSignal += 1;
  if (premiumKeywords) budgetSignal += 1;
  if (candidate.rating && candidate.rating >= 4.7) budgetSignal += 1;
  budgetSignal = clamp(budgetSignal, 1, 5);

  let websiteGap = 1;
  if (!inspection.ok) websiteGap += 2;
  if (!inspection.foundBooking) websiteGap += 1;
  if (!inspection.foundAbout) websiteGap += 1;
  if (!inspection.foundNewPatient) websiteGap += 1;
  if (!inspection.foundContact) websiteGap += 1;
  websiteGap = clamp(websiteGap, 1, 5);

  const totalScore = businessQuality + access + budgetSignal + websiteGap;
  const shortSummary = buildSummary(candidate, inspection, { businessQuality, access, budgetSignal, websiteGap, totalScore });

  return {
    ...candidate,
    email: candidate.email || inspection.email || null,
    city: candidate.city || extractCity(candidate.address),
    business_quality_score: businessQuality,
    access_score: access,
    budget_signal_score: budgetSignal,
    website_gap_score: websiteGap,
    total_score: totalScore,
    short_summary: shortSummary,
    website_inspection: {
      ok: inspection.ok,
      status: inspection.status || null,
      finalUrl: inspection.finalUrl || null,
      title: inspection.title || null,
      foundBooking: inspection.foundBooking,
      foundAbout: inspection.foundAbout,
      foundNewPatient: inspection.foundNewPatient,
      foundContact: inspection.foundContact,
      error: inspection.error || null,
    },
  };
}

function buildSummary(candidate, inspection, scores) {
  const parts = [];
  if (candidate.category) parts.push(candidate.category);
  if (candidate.review_count) parts.push(`${candidate.review_count} reviews visible`);
  if (!inspection.ok) {
    parts.push('website preflight needs attention');
  } else {
    if (!inspection.foundBooking) parts.push('booking language not obvious on homepage');
    if (!inspection.foundNewPatient) parts.push('new-patient reassurance not obvious');
    if (!inspection.foundAbout) parts.push('team / provider trust content not obvious');
  }
  parts.push(`score ${scores.totalScore}/20`);
  return parts.join('; ');
}

function extractCity(address) {
  if (!address) return null;
  const parts = String(address).split(',').map((part) => part.trim()).filter(Boolean);
  if (parts.length >= 2) return parts[parts.length - 2];
  return parts[0] || null;
}

async function captureSite(website, name) {
  const slug = slugify(name || website || 'prospect');
  try {
    await execFileAsync('node', ['prospect-tools/capture-site.js', website, slug], {
      cwd: process.cwd(),
      timeout: 120000,
    });
    return path.join('prospect-captures', slug);
  } catch {
    return null;
  }
}

async function cli() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || (!args.query && !args.queries && !args.input)) {
    console.log([
      'Usage:',
      '  node prospect-tools/run-prospect-pipeline.js --query "physical therapy atlanta" --capture --out-dir prospect-runs/pt-atlanta',
      '  node prospect-tools/run-prospect-pipeline.js --queries prospect-tools/queries-medical-local.json --capture --sync-dolibarr --dry-run',
      '  node prospect-tools/run-prospect-pipeline.js --input prospect-runs/sourced.json --capture',
      '',
      'Options:',
      '  --query <value>                Single query (repeatable)',
      '  --queries <file>               JSON array or newline text file of queries',
      '  --input <file>                 Existing source JSON file',
      '  --max-per-query <n>            Max places per query (default 8)',
      '  --min-score <n>                Shortlist threshold (default 15)',
      '  --shortlist-limit <n>          Max shortlisted records (default 25)',
      '  --out-dir <dir>                Output directory',
      '  --capture                      Run site capture for candidates with websites',
      '  --headed                       Run Maps browser headed',
      '  --sync-dolibarr                Push shortlist to Dolibarr',
      '  --dry-run                      Dry-run Dolibarr sync',
      '  --create-generic-contacts      Create org-level contacts when only generic data exists',
    ].join('\n'));
    return;
  }

  const queries = [];
  if (args.query) {
    queries.push(...(Array.isArray(args.query) ? args.query : [args.query]));
  }
  if (args.queries) {
    const filePath = path.resolve(process.cwd(), args.queries);
    const raw = fs.readFileSync(filePath, 'utf8');
    if (filePath.endsWith('.json')) {
      queries.push(...JSON.parse(raw));
    } else {
      queries.push(...raw.split(/\r?\n/).map((line) => line.trim()).filter(Boolean));
    }
  }

  const result = await runPipeline({
    queries,
    input: args.input,
    maxPerQuery: Number(args['max-per-query'] || 8),
    minScore: Number(args['min-score'] || 15),
    shortlistLimit: Number(args['shortlist-limit'] || 25),
    outDir: args['out-dir'],
    capture: Boolean(args.capture),
    headed: Boolean(args.headed),
    syncDolibarr: Boolean(args['sync-dolibarr']),
    dryRun: Boolean(args['dry-run']),
    createGenericContacts: Boolean(args['create-generic-contacts']),
  });

  console.log(JSON.stringify(result.summary, null, 2));
}

module.exports = {
  runPipeline,
};

if (require.main === module) {
  cli().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
