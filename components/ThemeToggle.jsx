'use client'; // (1) Theme toggle — dark/light, choice browser me save

import { useState, useEffect } from 'react';

// (2) Sooraj (light par dikhega = dark par jao) aur chaand (dark par = light par jao)
const Sun = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
  </svg>
);
const Moon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z" />
  </svg>
);

export default function ThemeToggle() {
  const [dark, setDark] = useState(false); // (3) false = light theme (default)

  // (4) Page khulne par saved choice lagao
  useEffect(() => {
    try {
      if (localStorage.getItem('ha-aura-theme') === 'dark') {
        document.documentElement.classList.remove('light');
        setDark(true);
      }
    } catch (e) { /* ignore */ }
  }, []);

  // (5) Click par <html> ki 'light' class toggle + choice save
  const toggle = () => {
    const el = document.documentElement;
    const isLight = el.classList.contains('light');
    try { localStorage.setItem('ha-aura-theme', isLight ? 'dark' : 'light'); } catch (e) { /* ignore */ }
    el.classList.toggle('light', !isLight);
    setDark(isLight);
  };

  return (
    <button
      className="icon-btn"
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={dark ? 'Light theme' : 'Dark theme'}
    >
      {dark ? <Sun /> : <Moon />}
    </button>
  );
}
