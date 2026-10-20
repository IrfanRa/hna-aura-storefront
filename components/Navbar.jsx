'use client'; // (1) Menu, search, theme toggle, cart — sab yahan

import { useState, useEffect } from 'react'; // (2) menu/search ki yaad-dasht
import { useRouter } from 'next/navigation'; // (3) search par page badalna
import { useCart } from './cart-context'; // (4) board se ginti + patti
import ThemeToggle from './ThemeToggle'; // (5) dark/light button

// (6) Categories — API se aayengi; na aayen to ye fallback
const FALLBACK_CATS = [
  { name: 'Necklaces/pendants', slug: 'necklaces-pendants' },
  { name: 'Earrings/Jhumkas', slug: 'earrings-jhumkas' },
  { name: 'Bracelets', slug: 'bracelets' },
  { name: 'Rings', slug: 'rings' },
  { name: 'Cachers', slug: 'cachers' },
  { name: 'Baby hair accessories', slug: 'baby-hair-accessories' },
];

// (7) Search ka icon (SVG)
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.8-3.8" />
  </svg>
);

// (8) Upar wali patti — logo, links (Shop dropdown), search, theme, cart
export default function Navbar() {
  const { count, setDrawerOpen } = useCart();
  const [menuOpen, setMenuOpen] = useState(false); // mobile menu
  const [shopOpen, setShopOpen] = useState(false); // mobile par Shop categories khuli?
  const [cats, setCats] = useState(FALLBACK_CATS); // categories
  const [q, setQ] = useState(''); // search text
  const [searchOpen, setSearchOpen] = useState(false); // search input khula?
  const router = useRouter();

  // (9) Categories WooCommerce se lao (public API — login nahi chahiye)
  useEffect(() => {
    const WC = process.env.NEXT_PUBLIC_WC_URL;
    if (!WC) return;
    fetch(`${WC}/wp-json/wc/store/v1/products/categories?per_page=20&hide_empty=false`)
      .then((r) => (r.ok ? r.json() : []))
      .then((list) => {
        if (Array.isArray(list) && list.length) {
          // (9b) "uncategorized" kabhi na dikhe — chahe WP me mojood ho
          setCats(list.filter((c) => c.slug !== 'uncategorized').map((c) => ({ name: c.name, slug: c.slug })));
        }
      })
      .catch(() => { /* fallback hi sahi */ });
  }, []);

  // (10) Search submit -> /search?q=...
  const goSearch = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    setSearchOpen(false);
    setMenuOpen(false);
    router.push('/search?q=' + encodeURIComponent(q.trim()));
  };

  return (
    <nav className="site-nav">
      <div className="wrap nav-in">
        {/* (client 2026-10-10) mobile par burger sab se LEFT */}
        <button className="burger burger-left" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
        <a className="brand" href="/">
          <img src="/logo.webp" alt="H&A Aura logo" />
          <span>
            <span className="brand-name">H&amp;A AURA</span>
            <span className="brand-sub">IMPORTED JEWELLERY</span>
          </span>
        </a>
        {/* (11) mobile par menuOpen se 'open' class */}
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><a href="/">Home</a></li>
          {/* (12) Shop dropdown — desktop par hover, mobile par tap */}
          <li className={`has-drop ${shopOpen ? 'open' : ''}`}>
            <div className="shop-row">
              <a href="/shop">Shop <span className="drop-arrow">▾</span></a>
              <button
                type="button"
                className="drop-toggle"
                onClick={() => setShopOpen((o) => !o)}
                aria-expanded={shopOpen}
                aria-label="Toggle shop categories"
              >▾</button>
            </div>
            <ul className="nav-drop">
              <li><a href="/shop">All Jewellery</a></li>
              {cats.map((c) => (
                <li key={c.slug}><a href={`/shop/${c.slug}`}>{c.name}</a></li>
              ))}
            </ul>
          </li>
          <li><a href="/about">About</a></li>
          <li><a href="/faq">FAQs</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
        <div className="nav-acts">
          {/* (13) Search — icon par click se input khulta hai */}
          {searchOpen ? (
            <form onSubmit={goSearch} className="nav-search">
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search jewellery…"
                aria-label="Search products"
              />
              <button type="submit" aria-label="Search"><SearchIcon /></button>
            </form>
          ) : (
            <button className="icon-btn" onClick={() => setSearchOpen(true)} aria-label="Search products">
              <SearchIcon />
            </button>
          )}
          <ThemeToggle />
          <button className="cart-btn" onClick={() => setDrawerOpen(true)} aria-label="Open cart">
            Cart <span className="cart-count">{count}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
