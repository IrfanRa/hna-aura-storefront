// ===== WooCommerce Store API helper (BROWSER ONLY — is me koi secret nahi) =====
// Ye file cart/checkout ke liye hai. Har response se naya Nonce + Cart-Token
// pakar kar agle request me bhejta hai — is ke baghair guest checkout
// "cart is empty" error deta hai (har request naye session me khulti hai).

let _nonce = null; // (1) Woo ka request token — har response me refresh hota hai
let _cartToken = null; // (2) guest cart ki pehchan — isi se session jurta hai

// (3) Browser ki diary se purana token uthao (page reload par session na toote)
function _loadToken() {
  if (typeof window !== 'undefined' && !_cartToken) {
    try { _cartToken = localStorage.getItem('haAuraCartToken'); } catch (e) { /* ignore */ }
  }
}

// (4) Naya token diary me likho
function _saveToken(t) {
  _cartToken = t;
  if (typeof window !== 'undefined') {
    try { localStorage.setItem('haAuraCartToken', t); } catch (e) { /* ignore */ }
  }
}

/**
 * storeApi('/cart', { method:'POST', body:{...} })
 * - Pehli call GET /cart se session bootstrap karti hai (nonce + token milta hai)
 * - Har response ke refreshed headers agle request me lagte hain
 */
export async function storeApi(path, opts = {}) {
  const WC = process.env.NEXT_PUBLIC_WC_URL; // (5) public URL — secret nahi
  if (!WC) {
    throw new Error('Store URL is not configured. Add NEXT_PUBLIC_WC_URL to .env.local and restart the dev server.');
  }
  _loadToken();
  const headers = { 'Content-Type': 'application/json' };
  if (_nonce) headers['Nonce'] = _nonce; // (6) pichla nonce bhejo
  if (_cartToken) headers['Cart-Token'] = _cartToken; // (7) cart session ki pehchan
  let res;
  try {
    res = await fetch(`${WC}/wp-json/wc/store/v1${path}`, {
      method: opts.method || 'GET',
      headers,
      body: opts.body ? JSON.stringify(opts.body) : undefined,
    });
  } catch (e) {
    // (8) Network fail = URL ghalat ya .env.local missing (user ka 2-min fix)
    throw new Error('Could not reach the store. Check your connection and NEXT_PUBLIC_WC_URL in .env.local (restart the dev server after changes).');
  }
  // (9) Refreshed headers pakro — CORS me expose hain (Nonce, Cart-Token)
  const nn = res.headers.get('nonce');
  const ct = res.headers.get('cart-token');
  if (nn) _nonce = nn;
  if (ct) _saveToken(ct);
  return res;
}
