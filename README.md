# Tooldeck

A fast, static, SEO-first collection of free browser tools, set up to take payments through Stripe Payment Links. There's no backend, no build dependencies and no server costs.

## Commands
```bash
npm run build   # generate dist/
npm run check   # build + SEO/link/JSON-LD/JS-syntax checks (fails on errors)
```

## Connect Stripe
1. In Stripe, create a **Payment Link** (for example "Support Tooldeck", customer chooses the price).
2. Put it in `site.config.json` → `stripe.supportLink`, or set `STRIPE_SUPPORT_LINK` at build time.
3. Every page then shows a support box. Each link carries `client_reference_id=<tool-slug>`, so the Stripe dashboard shows which tool led to each payment.

## Deploy (GitHub Pages)
1. Set `siteUrl` in `site.config.json` to the final URL. Canonicals, the sitemap and the robots file all depend on it.
2. Run `npm run check`, then publish `dist/` (for example with a GitHub Actions Pages workflow, or by pushing `dist/` to a `gh-pages` branch).
3. Submit `<siteUrl>/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

## Add a new tool
1. Add an entry to `tools.mjs` with slug, title (≤60 chars), description (120–160 chars), body HTML, how-to steps and FAQ.
2. Add `assets/tools/<slug>.js`.
3. Run `npm run check`. The new page is added automatically to the home page, related-tool links, sitemap and structured data.

## Tool ideas backlog (ranked by search demand × usefulness)
QR code generator · Color palette generator · Markdown to HTML · Image resizer for social media · Favicon generator · Pomodoro timer
