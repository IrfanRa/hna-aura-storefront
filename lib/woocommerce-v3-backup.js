// ===== WooCommerce se data lane wala "courier" =====
// AHEM NOTE: ye file sirf SERVER par chalti hai (build ke waqt).
// Is mein secret keys hain — isay kabhi browser wale component mein import NA karo!

// (1) Site ka address .env.local se
const WC_URL = process.env.WC_URL;
// (2) key:secret ko Basic Auth format mein encode karo
const auth = Buffer.from(`${process.env.WC_KEY}:${process.env.WC_SECRET}`).toString('base64');

// (3) Andaruni madadgaar — API call karo, ghalti par SAAF error do
//     (taake developer ko foran samajh aaye: network masla hai ya keys ka)
//     Flaky network ke liye 3 dafa retry (waqfa barhate hue)
async function wc(path, tries = 3) {
  let lastErr = null;
  for (let i = 0; i < tries; i++) {
    let res;
    try {
      res = await fetch(`${WC_URL}/wp-json/wc/v3${path}`, {
        headers: {
          Authorization: `Basic ${auth}`,
          // (3d) Browser jaisa User-Agent — hosting ki bot-protection
          //      Node ke default UA ko kabhi kabhi 403 de deti hai
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        },
      });
    } catch (e) {
      // (3a) Server tak pahunche hi nahi — network/DNS/URL ka masla
      lastErr = new Error(
        `Could not reach WooCommerce at ${WC_URL} (try ${i + 1}/${tries}). Check your internet connection and WC_URL in .env.local, then restart the dev server.`
      );
    }
    if (res) {
      if (res.status === 401) {
        // (3b) Keys ghalat — retry bekar, foran batao
        throw new Error(
          `WooCommerce rejected the API keys (HTTP 401). Check WC_KEY and WC_SECRET in .env.local — regenerate them at wp-admin → WooCommerce → Settings → Advanced → REST API (Read permission).`
        );
      }
      if (res.status === 403) {
        // (3b2) 403 do wajah se ho sakta hai: keys ya hosting ki bot-protection.
        //       Pehle dobara try karo (WAF kabhi kabhi hota hai), phir haar mano.
        lastErr = new Error(
          `WooCommerce returned HTTP 403 for ${path} (try ${i + 1}/${tries}). If this keeps happening, check WC_KEY / WC_SECRET in .env.local or regenerate them at wp-admin → WooCommerce → Settings → Advanced → REST API (Read permission).`
        );
      } else if (res.ok) {
        return res.json();
      } else {
        lastErr = new Error(`WooCommerce API error (${path}): HTTP ` + res.status);
      }
    }
    // (3c) Agli koshish se pehle thoda waqfa (1.5s, 3s)
    if (i < tries - 1) await new Promise((r) => setTimeout(r, 1500 * (i + 1)));
  }
  throw lastErr;
}

// (4) Sari published products lao (home, shop, sitemap ke liye)
export async function getProducts() {
  return wc('/products?per_page=50&status=publish');
}

// (5) Ek product us ke slug se lao (product detail page ke liye)
export async function getProductBySlug(slug) {
  const list = await wc(`/products?slug=${slug}&status=publish`);
  return list[0] || null;
}

// (6) Sari categories lao (shop filter, category pages, sitemap ke liye)
export async function getCategories() {
  return wc('/products/categories?per_page=50&hide_empty=false&orderby=name&order=asc');
}

// (7) Ek category us ke slug se lao
export async function getCategoryBySlug(slug) {
  const list = await wc(`/products/categories?slug=${slug}`);
  return list[0] || null;
}

// (8) Kisi category ki products lao
export async function getProductsByCategory(catId) {
  return wc(`/products?category=${catId}&per_page=50&status=publish`);
}

// (9) Product ke APPROVED reviews (v3) — sirf build/server par chalta hai.
// Average/count hum khud nikalte hain; list product page par dikhti hai.
export async function getProductReviews(productId) {
  try {
    const res = await fetch(
      `${WC_URL}/wp-json/wc/v3/products/reviews?product=${productId}&status=approved&per_page=20`,
      { headers: { Authorization: `Basic ${auth}` } }
    );
    if (!res.ok) return [];
    const list = await res.json();
    return (Array.isArray(list) ? list : []).map((r) => ({
      id: r.id,
      reviewer: r.reviewer || 'Verified buyer',
      rating: Number(r.rating) || 5,
      review: r.review || '',
      date: (r.date_created || '').slice(0, 10),
    }));
  } catch (e) {
    return []; // review na milen to page phir bhi chale
  }
}

// (10) Variable product ki variations (v3) — sirf build/server par.
// Har variation: { id, price, regular, sale, onSale, attrs: { Size:'2.6', Colour:'Golden' } }
export async function getProductVariations(productId) {
  try {
    const res = await fetch(
      `${WC_URL}/wp-json/wc/v3/products/${productId}/variations?per_page=50&status=publish`,
      { headers: { Authorization: `Basic ${auth}` } }
    );
    if (!res.ok) return [];
    const list = await res.json();
    return (Array.isArray(list) ? list : []).map((v) => ({
      id: v.id,
      price: v.sale_price || v.price || v.regular_price,
      regular: v.regular_price,
      sale: v.sale_price,
      onSale: !!(v.sale_price && v.sale_price !== v.regular_price),
      attrs: Object.fromEntries((v.attributes || []).map((a) => [a.name, a.option])),
    }));
  } catch (e) {
    return [];
  }
}
