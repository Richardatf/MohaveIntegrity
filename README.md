# Mohave Integrity

Full-service property management website for Mohave Integrity in Kingman, Arizona.

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

The default build targets Sites/Cloudflare. Netlify uses the native Next.js
build configured in `netlify.toml`:

```bash
npm run build:netlify
```

Do not override Netlify's publish directory in the dashboard. The Next.js
adapter deploys the application from `.next` and provides the server routes.
