'use client'; // (1) Cart ka board — browser mein lagta hai

// (2) React tools: board banana (createContext), parhna (useContext),
//     yaad-dasht (useState), side-kaam (useEffect), timer (useRef)
import { createContext, useContext, useState, useEffect, useRef } from 'react';

// (3) Khaali board — Provider is par cheezein lagayega
const CartContext = createContext(null);

// (4) Cart ki diary ka naya naam (V2) — purana {id:qty} format ab nahi parha jayega
const KEY = 'haAuraCartV2';

// (5) Har line: { id, qty, name, price, image, variationLabel, variation }
//     key = 'p'+id (simple) ya 'v'+id (variation) — taake size wali line alag rahe
const lineKey = (item) => (item.variationLabel ? 'v' : 'p') + String(item.id);

// (6) Provider poori site ko lapet-ta hai — andar har file board parh sakti hai
export function CartProvider({ children }) {
  const [cart, setCart] = useState({}); // (7) { key: line }
  const [drawerOpen, setDrawerOpen] = useState(false); // (8) side-patti khuli/band
  const [toast, setToast] = useState(''); // (9) neeche pop hone wala message
  const toastTimer = useRef(null);

  // (10) Page khulne par purana cart diary se wapas lao
  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || '{}');
      // Sirf nayi shape (object lines) qabool — purani number-shape ignore
      const clean = {};
      for (const [k, v] of Object.entries(raw)) {
        if (v && typeof v === 'object' && v.id) clean[k] = v;
      }
      setCart(clean);
    } catch { /* diary kharab ho to khaali cart */ }
  }, []);

  // (11) Cart badlo + diary mein likho
  const save = (updater) => {
    setCart((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  };

  // (12) Chhota message dikhao
  const notify = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2400);
  };

  // (13) Cart mein line dalo (ya ginti barhao) + patti khol kar dikhao
  // item = { id, name, price, image, variationLabel?, variation? }, qty = ginti
  const add = (item, qty = 1) => {
    const key = lineKey(item);
    save((prev) => ({
      ...prev,
      [key]: {
        id: item.id,
        qty: (prev[key]?.qty || 0) + qty,
        name: item.name,
        price: Number(item.price) || 0,
        image: item.image || '/logo.webp',
        variationLabel: item.variationLabel || '',
        variation: item.variation || null, // Store API ke liye [{attribute, value}]
      },
    }));
    notify(item.name + (item.variationLabel ? ` (${item.variationLabel})` : '') + ' added to cart');
    setDrawerOpen(true);
  };

  // (14) Ginti +1 (key se — 'p18' ya 'v45')
  const inc = (key) =>
    save((prev) => (prev[key] ? { ...prev, [key]: { ...prev[key], qty: prev[key].qty + 1 } } : prev));

  // (15) Ginti -1; zero ho to line nikaal do
  const dec = (key) =>
    save((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      const q = next[key].qty - 1;
      if (q <= 0) delete next[key];
      else next[key] = { ...next[key], qty: q };
      return next;
    });

  // (16) Line poori hatao
  const remove = (key) =>
    save((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });

  // (17) Sara cart saaf (order banne ke baad)
  const clear = () => save({});

  // (18) Kul ginti
  const count = Object.values(cart).reduce((a, l) => a + (l.qty || 0), 0);

  // (19) Board par sab lagao
  const value = { cart, add, inc, dec, remove, clear, count, drawerOpen, setDrawerOpen, notify };

  return (
    <CartContext.Provider value={value}>
      {children}
      {toast && <div className="toast show">{toast}</div>}
    </CartContext.Provider>
  );
}

// (20) Board parhne ka asaan tareeqa: const { add } = useCart();
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
