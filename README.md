# 66221.com — 66221 Living

Hyper-local home, money and family hub for ZIP 66221 (south Overland Park, Kansas). Static Jekyll site for GitHub Pages (free plan).

**Monetization:** Google AdSense (auto ads, `ca-pub-6620975821265271`), lead generation (quotes, home value, mortgage), sponsorships/featured listings, reader support, contests.

## Structure
- `_layouts/default.html` — shared head (AdSense, SEO, schema), owner strip, nav, footer, disclosures
- `_includes/quote-form.html` — 4-step lead form · `inline-cta.html`
- Pages: home, get-quotes, home-value, tools, zip-66221, schools, storm-ready, videos, community, contests, support, careers, advertise, about, how-we-make-money, contact, privacy, terms, disclaimer, sitemap, thank-you, 404
- `guides/` — long-form articles
- `assets/js/config.js` — payment links + encoded form relay key · `assets/js/main.js` — forms, calculators, video loader

## Setup checklist
1. Settings → Pages → Deploy from branch `main` / root.
2. DNS: A `@` → 185.199.108.153 / .109.153 / .110.153 / .111.153; CNAME `www` → `webworksa1.github.io`. Then enable "Enforce HTTPS".
3. Submit any form once and confirm the FormSubmit activation email.
4. Optional: paste PayPal / Stripe / Buy Me a Coffee links into `config.js`.
5. Add the site in AdSense and Search Console (`/sitemap.xml`).

See `PROMPTS.md` for the phase-wise build prompts.
