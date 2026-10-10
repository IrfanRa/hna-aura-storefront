'use client'; // (1) contact form — submit par WhatsApp khulta hai

import { useState } from 'react';

// (2) Dukaan ka WhatsApp number (Pakistan code ke sath)
const WA_NUMBER = '923134494915';

export default function ContactWhatsApp() {
  const [name, setName] = useState(''); // (3) naam ka khaana
  const [msg, setMsg] = useState(''); // (4) paigham ka khaana

  // (5) Form bhare to WhatsApp chat kholo — paigham pehle se likha hua
  const send = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hello H&A Aura! This is ${name || 'a visitor from your website'}.\n\n${msg}`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <form onSubmit={send}>
      <div className="co-field">
        <label>YOUR NAME</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
      </div>
      <div className="co-field">
        <label>MESSAGE *</label>
        <input value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Type your question…" required />
      </div>
      <button type="submit" className="btn btn-gold" style={{ width: '100%' }}>
        Send via WhatsApp
      </button>
      <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 12, textAlign: 'center' }}>
        Hit send and WhatsApp will open — your message will be ready to go.
      </p>
    </form>
  );
}
