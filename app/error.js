'use client'; // (1) Error boundary lazmi client component hota hai

// (2) Kisi bhi page par unexpected error aaye to user ko stack trace
//     ki bajaye ye wazeh, tameez wala paigham nazar aayega.
export default function Error({ error, reset }) {
  return (
    <div
      className="wrap"
      style={{ padding: '100px 24px', textAlign: 'center', maxWidth: 620, margin: '0 auto' }}
    >
      <div style={{ fontSize: 56, marginBottom: 14 }}>⚠️</div>
      <h1
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(32px, 5vw, 44px)',
          marginBottom: 12,
        }}
      >
        Something went <span className="gold-text">wrong</span>
      </h1>
      <p style={{ color: 'var(--muted)', marginBottom: 10 }}>
        We couldn't load this page right now. Please check your internet connection and try again.
      </p>
      <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 28 }}>
        You can also reach us directly on{' '}
        <a
          href="https://wa.me/923134494915"
          target="_blank"
          rel="noopener"
          style={{ color: 'var(--gold)' }}
        >
          WhatsApp
        </a>
        .
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button onClick={() => reset()} className="btn btn-gold">
          Try again
        </button>
        <a href="/" className="btn btn-ghost">
          Back to home
        </a>
      </div>
      {/* (3) Developer ke liye asal wajah — user ko nazar nahi aayegi */}
      {process.env.NODE_ENV === 'development' && error?.message && (
        <pre
          style={{
            marginTop: 36,
            textAlign: 'left',
            fontSize: 12,
            color: 'var(--muted)',
            background: 'var(--card)',
            border: '1px solid var(--line)',
            borderRadius: 8,
            padding: 16,
            overflowX: 'auto',
            whiteSpace: 'pre-wrap',
          }}
        >
          {String(error.message).slice(0, 500)}
        </pre>
      )}
    </div>
  );
}
