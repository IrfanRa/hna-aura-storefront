'use client'; // (1) rasta dikhane wali patti: Home / Shop / ...

import JsonLd from './JsonLd';

// (2) Props: items = [{ label, href? }] — akhri item baghair link ke (current page)
export default function Breadcrumbs({ items = [] }) {
  // (3) Google ke liye BreadcrumbList structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.label,
      ...(it.href ? { item: it.href } : {}),
    })),
  };

  return (
    <>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        {items.map((it, i) => (
          <span key={i}>
            {it.href ? <a href={it.href}>{it.label}</a> : <span>{it.label}</span>}
            {i < items.length - 1 && <span className="sep"> / </span>}
          </span>
        ))}
      </nav>
      <JsonLd data={jsonLd} />
    </>
  );
}
