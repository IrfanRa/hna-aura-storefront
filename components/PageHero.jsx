'use client'; // (1) andar wale pages ka khubsurat unwan hissa

import Breadcrumbs from './Breadcrumbs';

// (2) Props: title (JSX bhi ho sakta hai), subtitle, crumbs (Breadcrumbs ke liye)
export default function PageHero({ title, subtitle, crumbs }) {
  return (
    <div className="page-hero">
      {crumbs && <Breadcrumbs items={crumbs} />}
      {title && <h1>{title}</h1>}
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
