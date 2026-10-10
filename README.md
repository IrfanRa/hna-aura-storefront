# H&A Aura — Setup Guide (Roman Urdu)

Ye **H&A Aura** online store ka mukammal code hai — Next.js (static export) + WooCommerce backend.

## 1) Pehli dafa setup

```powershell
# ZIP extract karo, phir us folder mein:
npm install
```

## 2) `.env.local` banao

`.env.example` ko copy karke `.env.local` naam do, aur apni asal values dalo:

```powershell
copy .env.example .env.local
```

- `WC_KEY` / `WC_SECRET` — tumhari WooCommerce REST API keys (kisi ko mat dena, git mein nahi jayengi)
- Baqi values pehle se theek hain (temp domain)

## 3) Chalao (test)

```powershell
npm run dev
```

Browser mein kholo: **http://localhost:3000**

## 4) Production build + deploy

```powershell
npm run build
```

`out/` folder banega — is ke **andar wali sari files** Hostinger ke `public_html` mein upload karo (File Manager ya FTP se).

> **Note:** Naya product/category wp-admin mein add ho to site par tabhi dikhega jab dobara `npm run build` + upload ho. (Webhook automation baad mein lagayenge.)

## Project ka khaaka

- `app/page.js` — Home (server: build par products aate hain)
- `app/shop/` — Shop + category pages (`/shop/[slug]`)
- `app/product/[slug]/` — har product ka apna SEO page
- `app/about|contact|faq|shipping|returns|privacy|terms|checkout/` — baqi pages
- `components/` — chhote components (har file mein Roman Urdu comments)
- `components/cart-context.jsx` — cart ka "notice board"
- `lib/woocommerce.js` — API courier (sirf server par!)
- `public/` — logo.webp, favicon

## Pages ki list (sitemap mein bhi)

`/`, `/shop`, `/shop/[category]`, `/product/[slug]`, `/about`, `/contact`, `/faq`,
`/shipping`, `/returns`, `/privacy`, `/terms`, `/checkout`
