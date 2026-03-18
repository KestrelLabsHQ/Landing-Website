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
- form behavior via `mailto:` is acceptable for this launch

## Deploy on Vercel

1. Push this repo to GitHub
2. In Vercel, click **Add New Project**
3. Import the repository
4. Framework preset should auto-detect as **Next.js**
5. Leave build settings as default
6. Deploy
7. Add custom domains:
   - `kestrellabshq.com`
   - `www.kestrellabshq.com`
8. In your DNS provider:
   - point apex/root domain as Vercel instructs
   - point `www` CNAME as Vercel instructs
9. Re-deploy if needed after DNS verification

## Notes

- The contact form currently opens a prefilled email via the user’s email client.
- SEO basics are included: metadata, manifest, robots, sitemap, and generated OG image.
