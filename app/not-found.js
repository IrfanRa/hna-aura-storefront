// ===== 404 page — ghalat link par khubsurat paigham =====
export default function NotFound() {
  return (
    <div className="wrap" style={{ textAlign: 'center', padding: '90px 24px' }}>
      <div style={{ fontSize: 60, color: 'var(--gold)' }}>✦</div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 46, margin: '16px 0' }}>
        Page <span className="gold-text">Not Found</span>
      </h1>
      <p style={{ color: 'var(--muted)', marginBottom: 30 }}>
        Lagta hai ye zevar kahin aur chamak raha hai.
      </p>
      <a href="/" className="btn btn-gold">Back to Home</a>
    </div>
  );
}
