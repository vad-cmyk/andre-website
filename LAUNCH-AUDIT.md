# Launch audit — Vision Decorators — 2026-10-22

Stack: Plain static HTML/CSS/JS (no framework), Tailwind CSS compiled via CLI (no longer CDN), custom vanilla JS. Hosted on Vercel, deployed via GitHub (`vad-cmyk/andre-website`, `main` branch, auto-deploy).
Production domain: `https://www.vision-decorators.com` (apex `vision-decorators.com` 308-redirects to `www`, confirmed live)
Business: Vision Decorators — sole trader, painting & decorating, Norwich & Norfolk. Contact: email only (`office@vision-decorators.com`), no form, no payments/bookings taken on-site.

## Summary (after fixes, verified live)
✅ 20 pass · 🧑‍💼 2 client actions · N/A 2

**Lighthouse (mobile), live production site — before → after:**

| Metric | Before | After |
|---|---|---|
| Performance | 71 | **94** |
| Accessibility | 96 | **100** |
| Best Practices | 100 | 96* |
| SEO | 100 | **100** |
| LCP | 4.6s | **3.0s** |
| FCP | 4.6s | **1.6s** |
| Speed Index | 4.8s | **2.2s** |
| Time to Interactive | 4.8s | **1.6s** |
| Render-blocking savings available | 2,250ms | 210ms |
| Image-delivery savings available | 1,392 KiB | 152 KiB |

*Best Practices dipped from 100→96 only because of the one remaining client action below (Analytics not yet enabled causes a console 404) — see Client actions.

## Checks

| # | Item | Status | Evidence | Fix applied |
|---|------|--------|----------|-------------|
| 1 | Privacy policy page | ✅ | Accurate re: email-only contact + Vercel Analytics (updated to match) | Updated analytics section |
| 2 | Terms & conditions page | ✅ | `terms.html` live at `/terms.html`, linked from every footer | Created (sole-trader basis; payment/cancellation specifics marked `TODO(client)` for your sign-off) |
| 3 | Secrets off frontend | ✅ | Clean (checked again post-fix) | — |
| 4 | Force HTTPS + security headers | ✅ | Live check: `strict-transport-security`, `content-security-policy`, `x-frame-options: DENY`, `x-content-type-options: nosniff`, `referrer-policy`, `permissions-policy` all present | Added via `vercel.json` |
| 5 | Cookie consent banner | ✅ (N/A) | Vercel Analytics is cookie-free; no consent banner required | — |
| 6 | Meta titles + descriptions | ✅ | Unchanged, already unique and descriptive | — |
| 7 | Social preview image | ✅ | `og:image`/`twitter:image` live at `/assets/img/og-image.jpg` (200, image/jpeg) on all pages | Added OG/Twitter tags + generated branded 1200×630 image |
| 8 | Favicon | ✅ | `apple-touch-icon.png`, `favicon-32.png`, `site.webmanifest` all live (200, correct content-type) | Generated full icon set + manifest |
| 9 | Sitemap + robots.txt | ✅ | Live, now includes `/terms.html`; Search Console validated | Updated |
| 10 | Alt text on images | ✅ | Unchanged, already 100% | — |
| 11 | Compressed images | ✅ | 2.5MB → 1.2MB (52% reduction). Lighthouse image-delivery savings: 1,392 KiB → 152 KiB | Resized to real display size + recompressed |
| 12 | Page load speed | ✅ | Lighthouse mobile: Performance 71→94, LCP 4.6s→3.0s, FCP 4.6s→1.6s | Compiled Tailwind (127KB→12.6KB, no longer render-blocking), non-blocking fonts, lazy-loaded images |
| 13 | Colour contrast | ✅ | Lighthouse axe: 0 contrast failures (was 1, footer text 4.41:1) | `text-white/45` → `/50` (5.13:1) |
| 14 | Mobile friendly | ✅ | CLS 0.03, unchanged and excellent | — |
| 15 | Custom 404 page | ✅ | Live: real 404 status code + on-brand content confirmed via direct test request | Created `404.html`, `noindex` |
| 16 | No broken links | ✅ | Re-crawled all 9 live pages (incl. new terms/404): zero broken resources | — |
| 17 | Form validation | N/A | No form (by design) | — |
| 18 | Spam protection | N/A | No form (by design) | — |
| 19 | Analytics | 🧑‍💼 | Script wired in + custom "email_click" event added in code, but **Web Analytics needs enabling in the Vercel dashboard** (one-click project setting, not an API I can flip) — see Client actions | Code done; dashboard toggle is on you |
| 20 | One clear call to action | ✅ | Unchanged — "Email us" everywhere | — |

## Ranking extras

| Item | Status | Evidence |
|---|--------|----------|
| Structured data (LocalBusiness JSON-LD) | ✅ | `HomeAndConstructionBusiness` schema live on every page, valid JSON confirmed |
| Canonical domain | ✅ | `<link rel="canonical">` to the `www` URL on every page, plus the existing apex→www 308 |
| Search Console | ✅ | Verified, sitemap read successfully |
| Headings / page structure | ✅ | Unchanged, one `<h1>` per page |
| One page per service/area | ⚠️ opportunity | Still a future enhancement, not a launch blocker |
| Redirects from an old site | N/A | No previous site existed |
| Google Business Profile | 🧑‍💼 | Client action, below |

## Client actions (can't be done in code)
- [ ] **Enable Vercel Web Analytics**: Vercel dashboard → `andre-website` project → **Analytics** tab → **Enable**. Until this is clicked, `/_vercel/insights/script.js` 404s (harmless — the rest of the site is unaffected — but it's why Best Practices reads 96 instead of 100, and the "email_click" event won't record until it's on)
- [x] **Google Business Profile** — already exists (`Vision Decorators`, Norwich). Linked into the site's `HomeAndConstructionBusiness` structured data as `sameAs` on every indexable page (`https://www.google.com/maps?cid=710345531436384366`), confirming to Google it's the same business entity as the website
- [ ] Review `terms.html`'s three `TODO(client)`-marked sections (payment terms, cancellation notice period, 12-month workmanship guarantee) and confirm they match what you actually want to commit to
- [ ] Replace the 6 placeholder testimonials (marked in HTML comments on `index.html`, `door-painting.html`, `lime-wash-painting.html`, `general-painting.html`) with real customer reviews when available

---
*Audit and fix pass completed and verified live 2026-10-22. Site is ready to go live pending the client actions above (none of which block launch — they're all "do when convenient," not "do before going live").*
