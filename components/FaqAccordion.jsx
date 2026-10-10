'use client'; // (1) khulne-band hone wale sawal-jawab

import { useState } from 'react';

// (2) Props: items = [{ q, a }] — pehla sawal khula hoga
export default function FaqAccordion({ items = [] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="faq-list">
      {items.map((it, i) => (
        <div key={i} className={`faq-item reveal ${open === i ? 'open' : ''}`}>
          {/* (3) Click par kholo/band karo */}
          <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
            {it.q}
            <span className="pm">{open === i ? '−' : '+'}</span>
          </button>
          <div className="faq-a"><p>{it.a}</p></div>
        </div>
      ))}
    </div>
  );
}
