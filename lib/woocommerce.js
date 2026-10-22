// ===== WooCommerce Store API wali build — lib/woocommerce.js ki jagah =====
// VERSION 2 (throttled): Har API call ke darmiyan waqfa + 403 par lamba wait.
// WAJAH: Hostinger ka WAF rapid requests par rate-limit lagata hai.
// Ye version ahista ahista requests bhejta hai taake block na ho.
// Build slow hogi (5-10 min) lekin kamyab hogi.
// HIFAZAT: Pehle apni asal lib/woocommerce.js ka backup le lo!

const WC = process.env.NEXT_PUBLIC_WC_URL;

// (1) Har request se pehle kam az kam 2 second ka waqfa — WAF ko khush rakhne ke liye
let lastRequest = 0;
async function throttle() {
  const now = Date.now();
  const wait = Math.max(0, 2000 - (now - lastRequest));
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  lastRequest = Date.now();
}

async function store(path, tries = 5) {
  let lastErr = null;
  for (let i = 0; i < tries; i++) {
    await throttle(); // (2) Waqfa lazmi
    let res;
    try {
      res = await fetch(`${WC}/wp-json/wc/store/v1${path}`, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        },
      });
    } catch (e) {
      lastErr = new Error(`Store API ${path}: network fail (try ${i + 1}/${tries})`);
    }
    if (res) {
      if (res.ok) return res.json();
      // (3) 403 = WAF ne pakra — lamba wait karke dobara (15s, 30s, 60s, 120s)
      if (res.status === 403 && i < tries - 1) {
        const waitSec = 15 * Math.pow(2, i);
        console.log(`[throttle] 403 par ${waitSec}s wait... (${path})`);
        await new Promise((r) => setTimeout(r, waitSec * 1000));
        continue;
      }
      lastErr = new Error(`Store API ${path}: ${res.status} (try ${i + 1}/${tries})`);
    }
    if (i < tries - 1) await new Promise((r) => setTimeout(r, 5000));
  }
  throw lastErr;
}

function minor(prices, key) {
  const u = Math.pow(10, prices?.currency_minor_unit ?? 2);
  return String(Number(prices?.[key] || 0) / u);
}

function mapProduct(p) {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    type: p.type,
    price: minor(p.prices, 'price'),
    regular_price: minor(p.prices, 'regular_price'),
    sale_price: p.prices?.sale_price ? minor(p.prices, 'sale_price') : '',
    images: (p.images || []).map((i) => ({ src: i.src, alt: i.alt || '' })),
    categories: p.categories || [],
    short_description: p.short_description || '',
    description: p.description || '',
    stock_status: p.is_in_stock ? 'instock' : 'outofstock',
    attributes: (p.attributes || []).map((a) => ({
      id: a.id,
      name: a.name,
      options: (a.terms || []).map((t) => t.name),
      variation: !!a.has_variations,
    })),
  };
}

// (5) Pagination: API ek dafa mein max 100 deta hai — pages loop karke SAARE lao,
// warna limit se aage wale products site se ghayab ho jate hain (pehle per_page=50 tha).
async function storeAll(path) {
  const all = [];
  let page = 1;
  for (;;) {
    const sep = path.includes('?') ? '&' : '?';
    const items = await store(`${path}${sep}per_page=100&page=${page}`);
    all.push(...items);
    if (items.length < 100) break;
    page++;
  }
  return all;
}

export async function getProducts() {
  return (await storeAll('/products')).map(mapProduct);
}

export async function getProductBySlug(slug) {
  const list = await store(`/products?slug=${slug}`);
  return list[0] ? mapProduct(list[0]) : null;
}

export async function getCategories() {
  return storeAll('/products/categories?hide_empty=false');
}

export async function getCategoryBySlug(slug) {
  // FIX (2026-10-22): Store API categories par `?slug=` filter kaam NAHI karta —
  // wo hamesha poori list deta hai aur list[0] hamesha Bracelets hota tha,
  // is liye har category page Bracelets ban jata tha. Ab poori list la kar
  // slug se khud match karte hain.
  const cats = await getCategories();
  return cats.find((c) => c.slug === slug) || null;
}

export async function getProductsByCategory(catId) {
  return (await storeAll(`/products?category=${catId}`)).map(mapProduct);
}

export async function getProductReviews() {
  return [];
}

// Asli variations — Store API ke product detail se IDs + attributes.
export async function getProductVariations(productId) {
  try {
    const p = await store(`/products/${productId}`);
    const slugToName = {};
    for (const a of p.attributes || []) {
      for (const t of a.terms || []) slugToName[t.slug] = t.name;
    }
    const price = minor(p.prices, 'price');
    const regular = minor(p.prices, 'regular_price');
    const sale = p.prices?.sale_price ? minor(p.prices, 'sale_price') : '';
    return (p.variations || []).map((v) => {
      const attrs = {};
      for (const a of v.attributes || []) {
        if (a.value) attrs[a.name] = slugToName[a.value] || a.value;
      }
      return {
        id: v.id,
        price: sale || price,
        regular,
        sale,
        onSale: !!(sale && sale !== regular),
        attrs,
      };
    });
  } catch (e) {
    return [];
  }
}
