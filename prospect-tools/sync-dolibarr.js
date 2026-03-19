const path = require('path');
const {
  normalizeUrl,
  parseArgs,
  readJson,
  writeJson,
} = require('./common');

function normalizeDolibarrBase(rawBase) {
  if (!rawBase) throw new Error('Missing DOLIBARR_URL');
  let base = String(rawBase).trim().replace(/\/+$/, '');
  base = base.replace(/\/index\.php$/, '');
  if (!base.endsWith('/api/index.php')) {
    base = `${base}/api/index.php`;
  }
  return base;
}

async function dolibarrRequest(baseUrl, apiKey, method, endpoint, body) {
  const response = await fetch(`${baseUrl}/${endpoint.replace(/^\/+/, '')}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      DOLAPIKEY: apiKey,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();
  let data = text;
  try {
    data = JSON.parse(text);
  } catch {
    // keep raw text
  }

  if (!response.ok) {
    const error = new Error(`Dolibarr ${method} ${endpoint} failed (${response.status})`);
    error.status = response.status;
    error.response = data;
    throw error;
  }

  return data;
}

async function findThirdpartyByEmail(baseUrl, apiKey, email) {
  if (!email) return null;
  try {
    return await dolibarrRequest(baseUrl, apiKey, 'GET', `thirdparties/email/${encodeURIComponent(email)}`);
  } catch (error) {
    if (error.status === 404) return null;
    throw error;
  }
}

async function findContactByEmail(baseUrl, apiKey, email) {
  if (!email) return null;
  try {
    return await dolibarrRequest(baseUrl, apiKey, 'GET', `contacts/email/${encodeURIComponent(email)}`);
  } catch (error) {
    if (error.status === 404) return null;
    throw error;
  }
}

function buildThirdpartyPayload(candidate) {
  const city = candidate.city || candidate.town || extractCity(candidate.address);
  return {
    name: candidate.name,
    client: 2,
    prospectlevel: 1,
    url: normalizeUrl(candidate.website) || undefined,
    email: candidate.email || undefined,
    phone: candidate.phone || undefined,
    address: candidate.address || undefined,
    town: city || undefined,
    country_code: 'US',
    note_private: [
      'Auto-created by Kestrel prospect pipeline.',
      candidate.short_summary || '',
      candidate.capture_path ? `Capture: ${candidate.capture_path}` : '',
      candidate.analysis_path ? `Analysis: ${candidate.analysis_path}` : '',
    ].filter(Boolean).join('\n'),
    caller: 'kestrel_prospect_pipeline',
  };
}

function buildContactPayload(candidate, thirdpartyId) {
  const email = candidate.email || null;
  const phone = candidate.phone || null;
  const lastname = candidate.contact_lastname || candidate.name || 'Intake';
  const firstname = candidate.contact_firstname || '';

  return {
    socid: thirdpartyId,
    lastname,
    firstname,
    email: email || undefined,
    phone_pro: phone || undefined,
    note_private: 'Auto-created by Kestrel prospect pipeline from public website data.',
    caller: 'kestrel_prospect_pipeline',
  };
}

function extractCity(address) {
  if (!address) return null;
  const parts = String(address).split(',').map((part) => part.trim()).filter(Boolean);
  if (parts.length >= 2) return parts[parts.length - 2];
  return parts[0] || null;
}

async function syncCandidates({ candidates, dryRun = false, createGenericContacts = false }) {
  const baseUrl = normalizeDolibarrBase(process.env.DOLIBARR_URL);
  const apiKey = process.env.DOLIBARR_API_KEY || process.env.DOLAPIKEY;
  if (!apiKey) throw new Error('Missing DOLIBARR_API_KEY / DOLAPIKEY');

  const results = [];

  for (const candidate of candidates) {
    const entry = {
      candidate: candidate.name,
      website: candidate.website || null,
      dryRun,
    };

    try {
      const existingThirdparty = await findThirdpartyByEmail(baseUrl, apiKey, candidate.email);
      let thirdpartyId = existingThirdparty && existingThirdparty.id ? existingThirdparty.id : null;

      if (!thirdpartyId) {
        const payload = buildThirdpartyPayload(candidate);
        entry.thirdpartyPayload = payload;
        if (!dryRun) {
          thirdpartyId = await dolibarrRequest(baseUrl, apiKey, 'POST', 'thirdparties', payload);
        }
      }

      entry.thirdpartyId = thirdpartyId || 'DRY_RUN';

      const shouldCreateContact = Boolean(candidate.email || createGenericContacts);
      if (shouldCreateContact) {
        const existingContact = candidate.email ? await findContactByEmail(baseUrl, apiKey, candidate.email) : null;
        let contactId = existingContact && existingContact.id ? existingContact.id : null;
        if (!contactId) {
          const payload = buildContactPayload(candidate, thirdpartyId || 0);
          entry.contactPayload = payload;
          if (!dryRun) {
            contactId = await dolibarrRequest(baseUrl, apiKey, 'POST', 'contacts', payload);
          }
        }
        entry.contactId = contactId || (dryRun ? 'DRY_RUN' : null);
      }

      entry.ok = true;
    } catch (error) {
      entry.ok = false;
      entry.error = error.message;
      entry.errorResponse = error.response || null;
    }

    results.push(entry);
  }

  return results;
}

async function cli() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || !args.input) {
    console.log([
      'Usage:',
      '  DOLIBARR_URL=https://crm.example.com/dolibarr DOLIBARR_API_KEY=... \\',
      '  node prospect-tools/sync-dolibarr.js --input prospect-runs/<run>/shortlist.json --dry-run',
      '',
      'Options:',
      '  --input <file>               JSON candidate file',
      '  --out <file>                 Write sync report JSON',
      '  --dry-run                    Do not write to Dolibarr',
      '  --create-generic-contacts    Create generic contacts when only org-level data exists',
    ].join('\n'));
    return;
  }

  const input = path.resolve(process.cwd(), args.input);
  const candidates = await readJson(input);
  const results = await syncCandidates({
    candidates,
    dryRun: Boolean(args['dry-run']),
    createGenericContacts: Boolean(args['create-generic-contacts']),
  });

  if (args.out) {
    await writeJson(path.resolve(process.cwd(), args.out), results);
  }

  console.log(JSON.stringify({ count: results.length, results }, null, 2));
}

module.exports = {
  normalizeDolibarrBase,
  syncCandidates,
};

if (require.main === module) {
  cli().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
