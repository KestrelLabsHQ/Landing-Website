# Kestrel Labs v1

Production-ready Next.js marketing site for Kestrel Labs LLC.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4

## Routes

- /
- /services
- /advanced-systems
- /about
- /contact

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Environment variables

Create `.env.local` from `.env.example` when configuring the live contact form:

```bash
NEXT_PUBLIC_CONTACT_ENDPOINT=https://contact.kestrellabshq.com
```

## Production build

```bash
npm run build
npm start
```

## Publish checklist

Before publishing, confirm:

- DNS points `kestrellabshq.com` and `www.kestrellabshq.com` to your host
- `contact@kestrellabshq.com` is live and monitored
- social preview image and metadata look correct in deployment
- contact form endpoint is configured in Vercel

## Deploy on Vercel

1. Push this repo to GitHub
2. In Vercel, click **Add New Project**
3. Import the repository
4. Framework preset should auto-detect as **Next.js**
5. Leave build settings as default
6. Add environment variable before or after deploy:
   - `NEXT_PUBLIC_CONTACT_ENDPOINT=https://contact.kestrellabshq.com`
7. Deploy
8. Add custom domains:
   - `kestrellabshq.com`
   - `www.kestrellabshq.com`
9. In your DNS provider:
   - point apex/root domain as Vercel instructs
   - point `www` CNAME as Vercel instructs
10. Re-deploy if needed after DNS verification

## Contact form delivery

The frontend is now prepared to submit to a live JSON endpoint.

Recommended setup:

- Cloudflare Worker + Resend

See:

- `docs/contact-form-cloudflare-resend.md`
- `cloudflare/contact-worker/worker.js`
- `cloudflare/contact-worker/wrangler.toml.example`

## Notes

- SEO basics are included: metadata, manifest, robots, sitemap, and generated OG image.
- The contact form will stay disabled until `NEXT_PUBLIC_CONTACT_ENDPOINT` is configured.
