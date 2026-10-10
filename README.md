# H&A Aura — Online Store (Storefront)

Premium imported jewellery online store for Pakistan. A headless storefront built with **Next.js (static export)**, powered by a **WordPress + WooCommerce** backend.

**Live preview:** `https://palegoldenrod-fish-444596.hostingersite.com`

## Features

- Luxury black / gold / cream design with serif typography
- Product catalog with categories, search, and filters
- Variable products (size / colour selectors)
- Slide-in cart drawer with persistent cart
- Guest checkout with **Cash on Delivery (COD)**
- WhatsApp ordering integration (floating button + per-product)
- Customer reviews (shown after admin moderation)
- SEO-ready: JSON-LD structured data, sitemap.xml, robots.txt, Open Graph tags, canonical URLs
- Fully responsive, including a mobile sticky buy bar

## Tech Stack

| Layer    | Technology                                      |
| -------- | ----------------------------------------------- |
| Frontend | Next.js 16 (App Router), React, plain CSS       |
| Backend  | WordPress + WooCommerce (REST API + Store API)  |
| Hosting  | Hostinger shared hosting (static files only)    |
| Deploy   | Manual build → upload `out/` via File Manager   |

> Node.js is only needed at **build time**. The hosting serves plain HTML/CSS/JS — no server runtime.

## Prerequisites

- Node.js 18+
- A WooCommerce store with REST API keys (`Read` permission is enough)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a file named `.env.local` in the project root:

```bash
NEXT_PUBLIC_WC_URL=https://your-backend-domain.com
WC_URL=https://your-backend-domain.com
WC_KEY=ck_xxxxxxxxxxxxxxxx
WC_SECRET=cs_xxxxxxxxxxxxxxxx
NEXT_PUBLIC_SITE_URL=https://your-store-domain.com
```

| Variable              | Used for                                              |
| --------------------- | ----------------------------------------------------- |
| `NEXT_PUBLIC_WC_URL`  | Store API base URL (browser + build)                  |
| `WC_URL`              | WooCommerce REST API base URL (build time only)       |
| `WC_KEY` / `WC_SECRET`| REST API keys (build time only, **never commit**)     |
| `NEXT_PUBLIC_SITE_URL`| Canonical URLs, sitemap, structured data             |

> `.env.local` is git-ignored. Never commit API keys.

### 3. Run locally

```bash
npm run dev
```

Open **http://localhost:3000**.

## Deployment

### Build

```bash
npm run build
```

This generates a static `out/` folder with the complete website.

### Upload

Upload **the contents of `out/`** (not the folder itself) to the store domain's document root on Hostinger (File Manager or FTP), overwriting existing files.

## Updating the Site After Code Changes

Every code change follows the same cycle:

```
1. Edit code locally
2. npm run dev        → test at http://localhost:3000
3. git add . && git commit -m "..." && git push
4. npm run build      → fresh out/ folder
5. Upload out/ contents to hosting (overwrite)
```

> **Content changes in wp-admin** (new product, price change, new category) also require
> steps 4–5 — product data is baked into the HTML at build time.
> Orders do **not** need a rebuild; checkout runs live against the WooCommerce Store API.

## Project Structure

```
app/
  page.js                 → Home (products fetched at build time)
  shop/                   → Shop + category pages (/shop/[slug])
  product/[slug]/         → Product detail pages (SEO-optimized)
  checkout/               → Guest COD checkout
  about|contact|faq|shipping|returns|privacy|terms/ → Info pages
  sitemap.js / robots.txt → SEO
components/
  Storefront.jsx          → Home page sections
  ProductDetail.jsx       → Gallery, variations, reviews, tabs
  CheckoutForm.jsx        → COD checkout form + order submission
  SiteShell.jsx           → Navbar, footer, cart drawer, WhatsApp button
  cart-context.jsx        → Cart state
lib/
  woocommerce.js          → WooCommerce API client (server/build only — never import in browser components)
public/                   → logo.webp, favicon, static assets
```

## Notes

- Checkout is **guest-only COD** — no customer login (by client decision).
- Reviews appear only after approval in wp-admin → Comments.
- Code comments are in Roman Urdu (team convention); all user-facing text is in English.
