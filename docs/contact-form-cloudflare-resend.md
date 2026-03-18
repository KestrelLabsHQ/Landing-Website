# Contact Form Setup: Cloudflare Worker + Resend

This project is wired to submit the contact form to a JSON endpoint defined by:

- `NEXT_PUBLIC_CONTACT_ENDPOINT`

Recommended production value:

- `https://contact.kestrellabshq.com`

## 1. Resend setup

1. Create or sign in to Resend
2. Add and verify your sending domain
   - recommended: `kestrellabshq.com`
3. Create an API key
4. Decide on sender identity
   - recommended: `Kestrel Labs <contact@kestrellabshq.com>`

You will need:

- `RESEND_API_KEY`
- verified sender address/domain

## 2. Cloudflare Worker setup

Worker files are in:

- `cloudflare/contact-worker/worker.js`
- `cloudflare/contact-worker/wrangler.toml.example`

### Create the worker

If using Wrangler:

```bash
cd cloudflare/contact-worker
cp wrangler.toml.example wrangler.toml
npm install -g wrangler
wrangler login
```

### Set Worker secrets

```bash
wrangler secret put RESEND_API_KEY
```

### Configure vars in `wrangler.toml`

```toml
name = "kestrel-contact-worker"
main = "worker.js"
compatibility_date = "2026-03-17"

[vars]
ALLOWED_ORIGINS = "https://kestrellabshq.com,https://www.kestrellabshq.com"
MAIL_TO = "contact@kestrellabshq.com"
MAIL_FROM = "Kestrel Labs <contact@kestrellabshq.com>"
```

### Deploy

```bash
wrangler deploy
```

## 3. Cloudflare routing / DNS

Create a DNS record for a contact endpoint:

- Type: `CNAME`
- Name: `contact`
- Target: the workers.dev hostname or route target you choose

Better option: attach the Worker directly to:

- `contact.kestrellabshq.com/*`

In Cloudflare:

- Workers & Pages → your worker → Settings / Triggers
- Add custom domain or route:
  - `contact.kestrellabshq.com`

Once active, your live endpoint should be:

- `https://contact.kestrellabshq.com`

## 4. Frontend environment variable

Add this in Vercel project environment variables:

- `NEXT_PUBLIC_CONTACT_ENDPOINT=https://contact.kestrellabshq.com`

For local development, create `.env.local`:

```bash
NEXT_PUBLIC_CONTACT_ENDPOINT=https://contact.kestrellabshq.com
```

Then redeploy Vercel.

## 5. How the site works now

The contact form sends JSON like:

```json
{
  "name": "...",
  "email": "...",
  "projectType": "...",
  "context": "..."
}
```

The Worker:

- validates required fields
- checks that the request origin is allowed
- supports both `https://kestrellabshq.com` and `https://www.kestrellabshq.com`
- sets `reply_to` to the submitter's email
- sends the email through Resend to `contact@kestrellabshq.com`
- returns JSON success/error

## 6. Recommended next hardening steps

For v1.1 / v2:

- add Cloudflare Turnstile
- restrict allowed origins to production and preview origins you trust
- log failed sends
- add lightweight rate limiting in the Worker
