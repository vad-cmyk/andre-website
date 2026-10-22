# Launch audit — Vision Decorators — 2026-10-22

Stack: Plain static HTML/CSS/JS (no framework), Tailwind CSS via CDN, custom vanilla JS. Hosted on Vercel, deployed via GitHub (`vad-cmyk/andre-website`, `main` branch, auto-deploy).
Production domain: `https://www.vision-decorators.com` (apex `vision-decorators.com` 308-redirects to `www`, confirmed live)
Business: Vision Decorators — sole trader, painting & decorating, Norwich & Norfolk. Contact: email only (`office@vision-decorators.com`), no form, no payments/bookings taken on-site.

## Summary
✅ 11 pass · ⚠️ 5 needs work · ❌ 7 fail · 🧑‍💼 1 client action · N/A 3

## Checks

| # | Item | Status | Evidence | Fix |
|---|------|--------|----------|-----|
| 1 | Privacy policy page | ✅ | `privacy-policy.html` exists, describes actual data practices (email only, no analytics yet, no third-party processor) | — |
| 2 | Terms & conditions page | ❌ | No `terms.html` anywhere in repo | Create, sole-trader basis, link from footer |
| 3 | Secrets off frontend | ✅ | `grep -rniE "api[_-]?key\|secret\|token\|AIza\|sk_live\|sk_test"` across all HTML/CSS/JS — only false-positive hit was the word "tokens" in a CSS comment | — |
| 4 | Force HTTPS + security headers | ⚠️ | Live header check: `strict-transport-security: max-age=63072000` present (HTTPS forced, HSTS good — Vercel default). Missing: `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` | Add via `vercel.json` headers |
| 5 | Cookie consent banner | ✅ (N/A) | Live puppeteer check: `document.cookie` → 0 cookies set on page load. No analytics yet; Vercel Analytics (chosen) is cookie-free, so no banner becomes legally required after adding it | — |
| 6 | Meta titles + descriptions | ✅ | All 7 pages have unique, descriptive `<title>` and `<meta name="description">` (verified via grep) | — |
| 7 | Social preview image | ❌ | `grep -c "og:title\|og:image\|twitter:card"` → 0 on every page | Add OG/Twitter tags + generate a branded 1200×630 image |
| 8 | Favicon | ⚠️ | `favicon.svg` present and linked (modern browsers covered); no `apple-touch-icon`, no PNG fallback, no web manifest | Add apple-touch-icon + manifest |
| 9 | Sitemap + robots.txt | ✅ | `sitemap.xml` + `robots.txt` live at correct `www` host, validated in Search Console this session | — |
| 10 | Alt text on images | ✅ | Scripted scan of every `<img>` across all 7 pages: 0 missing `alt` attributes; alt text is specific (e.g. "Navy gloss front door repaint, Norwich"), not generic | — |
| 11 | Compressed images | ❌ | 19 JPGs, 2.4 MB total, up to 2048×1431px, served at that size regardless of display size. Lighthouse: "Improve image delivery — Est savings of 1,392 KiB" | Resize to real display dimensions + recompress |
| 12 | Page load speed | ⚠️ | Lighthouse mobile (live site): **Performance 71/100**, LCP 4.6s, FCP 4.6s, Speed Index 4.8s, TBT 0ms, CLS 0.024. Top culprits: render-blocking Tailwind CDN script (126.9KB, ~1549ms) + Google Fonts CSS (~1390ms), per Lighthouse's render-blocking-insight audit | Compile Tailwind to static CSS (remove CDN script); make font CSS non-blocking |
| 13 | Colour contrast | ❌ | Lighthouse axe: footer text using `text-white/45` on `#0E1D30` = **4.41:1**, needs 4.5:1. Hits: footer column labels, copyright line, Privacy Policy link, location line (all 7 pages) | Bump to `white/55` (≈5.4:1) |
| 14 | Mobile friendly | ✅ | Lighthouse mobile run: CLS 0.024 (excellent), viewport meta present, responsive breakpoints confirmed in earlier session | — |
| 15 | Custom 404 page | ❌ | No `404.html` in repo | Create on-brand 404 |
| 16 | No broken links | ✅ | Puppeteer crawl of all 7 live pages: zero 4xx/5xx on any loaded resource. Static scan of every internal `href`: all resolve to real files. All external links (Google Fonts, ICO) reachable | — |
| 17 | Form validation | N/A | No form exists — contact is `mailto:` only, by explicit client decision (phone and form both removed earlier) | — |
| 18 | Spam protection | N/A | Same reason as #17 | — |
| 19 | Analytics | ❌ | No analytics script anywhere in the codebase | Add Vercel Analytics (client's choice) + track "Email us" clicks |
| 20 | One clear call to action | ✅ | "Email us" (`mailto:office@vision-decorators.com`) is the only CTA anywhere on the site — nav, every hero, every CTA band, footer, contact page. Verified via sitewide grep | — |

## Ranking extras (local-seo-ranking)

| Item | Status | Evidence | Fix |
|---|--------|----------|-----|
| Structured data (LocalBusiness JSON-LD) | ❌ | `grep -c "application/ld+json"` → 0 on every page | Add `LocalBusiness` schema with NAP, service area, sole-trader name |
| Canonical domain | ⚠️ | Apex→www redirect works at hosting level (308, confirmed) ✅, but no `<link rel="canonical">` in any page's `<head>` ❌ | Add canonical tags pointing to `www` URLs |
| Search Console | ✅ | Property verified, sitemap submitted and read successfully this session | — |
| Headings / page structure | ✅ | Exactly one `<h1>` per real page (verified via grep), logical `h2`/`h3` nesting from original build | — |
| One page per service/area | ⚠️ opportunity | 3 service pages exist (Door/Lime Wash/General), but not split further by town (e.g. a dedicated "Door Painting in Costessey" page). Reasonable for current size; worth revisiting once there's enough real project volume per town to justify it | Not doing now — flagged as future opportunity, not a launch blocker |
| Redirects from an old site | N/A | No previous site existed for this business | — |
| Google Business Profile | 🧑‍💼 | Can't verify or configure from code | Client action — see below |

## Client actions (can't be done in code)
- [ ] Set up / claim a **Google Business Profile** for Vision Decorators at 123 Mile Cross Lane, Norwich, NR6 6RQ, category "Painter" / "House painter", service area Norfolk, and start collecting real reviews
- [ ] Review the Terms & Conditions draft (once written) before relying on it
- [ ] Review the privacy policy's "who sees it" wording once Vercel Analytics is live (will need a one-line addition)

---
*Fix pass follows below, in priority order: security → legal → SEO → performance → accessibility → analytics.*
