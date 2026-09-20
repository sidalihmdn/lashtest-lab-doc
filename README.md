# Lashtest Lab documentation

The user-facing documentation site for Lashtest Lab, built with
[Docusaurus](https://docusaurus.io/). Deployed independently of `frontend/` and
`marketing/`, on its own subdomain.

## Local development

```bash
npm install
npm run start          # http://localhost:3000
```

## Build

```bash
npm run build          # emits static files into build/
npm run serve          # serve the build/ output locally
```

The build fails on a broken internal link (`onBrokenLinks: 'throw'`), so a link
to a renamed or deleted page is caught at build time rather than shipped. Adding
a page means adding it to `sidebars.ts` too — an unlisted page still builds and
is reachable by URL, but is invisible in the navigation.

## Deployment

The site is static, so any static host works. For container hosts:

```bash
docker build --target prod -t lashtest-lab-doc .
docker run -p 8080:80 lashtest-lab-doc
```

`nginx.conf` serves the files and falls back to the branded `404.html`.

### The canonical URL

`docusaurus.config.ts` defaults `url` to `https://docs.lashtest.com`, which
sets the canonical link, the sitemap, and the absolute Open Graph URLs. Override
it when building for another host, or those tags will point at the wrong domain:

```bash
DOCS_URL=https://docs.example.com npm run build
docker build --target prod --build-arg DOCS_URL=https://docs.example.com .
```

`baseUrl` is `/`, so the site must be served from a domain or subdomain root —
not from a subpath like `example.com/docs`.

## Layout

```
docs/             the pages, grouped to mirror sidebars.ts
src/pages/        the landing page
static/img/       logo, favicon, social card
docusaurus.config.ts   site URL, navbar, footer, syntax highlighting
src/css/custom.css     brand colours, mapped onto Infima variables
```

Content is MDX. In prose, wrap any `{...}` in backticks — MDX reads bare braces
in prose as a JavaScript expression and fails the build. Code fences and inline
code are safe.
