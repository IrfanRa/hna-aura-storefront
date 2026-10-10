'use client'; // (1) Har page ka frame — nav, footer, cart, sab yahan

import { useEffect } from 'react';
import { CartProvider } from './cart-context';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from './CartDrawer';

const WA_NUMBER = '923134494915'; // (2) floating button ke liye
const WA_FLOAT_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hello H&A Aura! I have a question about your jewellery.")}`;

// (3) Props: children = page ka asal content, products = cart drawer ke liye keematein
export default function SiteShell({ children, products = [] }) {

  // (4) Scroll par .reveal wale hisse ahista zahir hon — har page par kaam karega
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
      }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect(); // safai
  }, []);

  return (
    <CartProvider>
      <div className="demo-bar">✦ &nbsp;Cash on Delivery across Pakistan &nbsp; ✦</div>
      <Navbar />
      <main>{children}</main>
      <Footer />
      {/* (5) Floating WhatsApp — har page, neeche left (desktop + mobile) */}
      <a href={WA_FLOAT_LINK} target="_blank" rel="noopener" className="wa-float" aria-label="Contact us on WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.2.2-.3.4-.1.7.2.3.9 1.5 2 2.4 1.4 1.2 2.5 1.6 2.9 1.8.3.2.5.2.7-.1l1-1.2c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.4 0 .1 0 .7-.2 1.1z" /></svg>
        <span>Contact us</span>
      </a>
      <CartDrawer />
    </CartProvider>
  );
}
