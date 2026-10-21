# 66221.com — Phase-wise build prompts

Concept: **66221 Living** — a hyper-local home, money and family hub for ZIP 66221 (south Overland Park, Johnson County, Kansas).
Why: 66221 has almost no meaning in commerce, AI or numerology; its dominant real-world meaning is the ZIP code — and it's one of the most affluent ZIPs in the Kansas City metro (median household income ≈ $198K, median home value ≈ $670K, ~85% owner-occupied, Blue Valley schools, heavy hail exposure). That combination supports three revenue engines at once: high-CPC AdSense (home, insurance, mortgage, real estate), high-value lead generation (roofing/hail, HVAC, remodels, sellers, mortgage), and local sponsorships.

Global rules for every phase:
- Static site, GitHub Pages free plan, Jekyll layouts only (no build step beyond Pages' built-in Jekyll). Repo: WEBWORKSA1/66221-com, branch `main`, root folder.
- AdSense code in `<head>` of every page: `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6620975821265271" crossorigin="anonymous"></script>`; `ads.txt` = `google.com, pub-6620975821265271, DIRECT, f08c47fec0942fa0`.
- Top of every page: "Contact, if you are interested in this website / domain name / Sponsorship / Advertisement / Partnership" → https://web.works/contact.
- All forms relay to the owner inbox via FormSubmit AJAX; the address is stored only as reversed base64 fragments in `assets/js/config.js` and assembled at submit time. The address must never appear in HTML, text or link targets.
- No trademark use of "66221" beyond its geographic meaning; full disclaimer + trademark/copyright notice in footer and `/disclaimer.html`.

---

## Phase 1 — Research & positioning
> Research the number 66221 across commerce, business, AI, the economy and people. Identify its dominant meaning (ZIP code, Overland Park KS), pull demographic, housing, school, tax and weather facts from public sources (Census ACS, Johnson County, City of Overland Park, Blue Valley USD 229, Redfin, SchoolDigger). Review 25+ leading sites (Niche, GreatSchools, Zillow, Redfin, Realtor, Homes.com, Trulia, NeighborhoodScout, AreaVibes, BestPlaces, Livability, Angi, HomeAdvisor, Thumbtack, Houzz, Porch, Opendoor, Bankrate, NerdWallet, Apartments.com, Johnson County Post, KC Parent, Visit Overland Park, Blue Valley USD, opkansas.gov, GoFundMe). Output: the concept, revenue model, must-have features, lead-form patterns, design conventions and AdSense content plan.

## Phase 2 — Design system & layout
> Build `_layouts/default.html` and `assets/css/style.css`: warm paper background, deep ink navy, wheat-gold accent, prairie green; Fraunces display + Manrope body. Include: owner contact strip, sticky header with mobile menu, footer with newsletter, link columns, independence/trademark/advertising disclosures; cookie banner (Accept all / Essential only → non-personalised ads); sticky mobile CTA bar; JSON-LD WebSite + Organization (+ Article on guides); OG/Twitter tags; canonical URLs; favicon SVG; web manifest. Must be responsive to 360px with no horizontal scroll.

## Phase 3 — Lead-generation engine
> Create `_includes/quote-form.html`: a 4-step form (service tiles → timeline/ownership/budget/details → address with ZIP prefilled 66221 → contact + unchecked TCPA-style consent), honest "Step X of 4" label and progress bar, benefit-led button "Get my free quotes", trust microcopy, honeypot. Build `get-quotes.html` (pitch, how-it-works, cost ranges table, FAQ) and `home-value.html` (3-step seller CMA form). Pre-select service from `?service=`. On success redirect to `thank-you.html?f=<form>` with a form-specific message.

## Phase 4 — Interactive tools
> Build `tools.html` with live calculators using Kansas rules: mortgage with 11.5% assessment × mill levy, PMI, insurance, HOA and a DTI affordability meter; property tax estimator; hail roof replacement estimator with percentage deductibles; seller net-proceeds; rent vs buy. Each tool gets an explainer and a CTA into the lead forms.

## Phase 5 — AdSense-grade content
> Write original, sourced, dated long-form guides in `/guides/`: moving to 66221, property tax & appeals, hail roof claim playbook, roof replacement cost in Overland Park, selling a home in 66221, Blue Valley enrollment, Kansas home maintenance calendar. Add `zip-66221.html` (stats table + OpenStreetMap embed), `schools.html`, `storm-ready.html`. Every guide: TOC, FAQ/checklists, internal links, inline quote CTA, no copied text.

## Phase 6 — Video & community
> `videos.html`: curated YouTube embeds loaded click-to-play via youtube-nocookie (thumbnail first), grouped by moving / property tax / hail & storms, with creator-ownership note. `community.html`: business directory categories + listing form (free, featured $49, category sponsor $199, lead partner), event submission form, neighbour poll.

## Phase 7 — Monetization & growth pages
> `support.html` (tiers $5/$15/$50/$500, allocation bars for operations, reporting, promotion, hiring, prizes; pledge form; payment links switch on from `config.js`), `contests.html` (photo of the season, yard of the month, local hero; prize pool; official rules, no purchase necessary, 18+), `careers.html` (writers, creators, photographers, ambassadors, ad sales, web/data + application form), `advertise.html` (audience stats, packages, inquiry form incl. website/domain acquisition).

## Phase 8 — Trust, compliance & AdSense approval
> `about.html` (editorial policy), `how-we-make-money.html`, `privacy.html` (Google cookie/ads disclosure, opt-out links, CMP note, data rights), `terms.html`, `disclaimer.html` (use of 66221 as a descriptive postal code, no affiliation with USPS/city/county/district, ZIP Code™ notice, copyright), `contact.html`, `404.html`, `sitemap.html`, `robots.txt` (allow Mediapartners-Google, sitemap), `jekyll-sitemap` for `sitemap.xml`, `ads.txt`. Verify: every page has the AdSense script and owner strip, no broken internal links, no exposed email, no console errors, mobile layout clean.

## Phase 9 — Deploy
> Push all files to WEBWORKSA1/66221-com on `main`. In repo Settings → Pages, set Source: Deploy from a branch → `main` / `(root)`. Keep `CNAME` = `66221.com`. At the registrar: A records for `@` → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153; CNAME `www` → `webworksa1.github.io`. Once DNS resolves, tick "Enforce HTTPS". Send one test form submission and click FormSubmit's activation email.

## Phase 10 — Scale (post-launch)
> Add monthly 66221 market reports, neighbourhood/subdivision pages, "66221 vs 66213/66223/66085" comparisons, seasonal event roundups, cost guides for HVAC, basements, fences and windows; sign up lead buyers; launch the 66221 YouTube channel; submit sitemap to Google Search Console; apply to AdSense once 20–30 indexed pages and 2–4 weeks of traffic exist; enable Google's certified CMP for EEA/UK visitors.
