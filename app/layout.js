// ===== Poori site ka khaaka — har page isi mein lapeta jata hai =====
import './globals.css';
import Script from 'next/script'; // (0) theme script ke liye — raw <script> par warning aata hai

// (1) Live site ka URL — sitemap/canonical/OG ke liye (env se, warna temp domain)
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://palegoldenrod-fish-444596.hostingersite.com';

// (2) SEO: default title/meta — har page apna `metadata` export karke override kar sakta hai
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'H&A Aura — Imported Jewellery in Pakistan',
    template: '%s — H&A Aura', // (3) har page ka title is khaake mein aayega
  },
  description:
    'Shop premium imported jewellery in Pakistan — necklaces, jhumkas, bracelets, rings & more. Cash on Delivery nationwide.',
  keywords: [
    'imported jewellery Pakistan',
    'artificial jewellery online Pakistan',
    'gold pendant set',
    'jhumka earrings',
    'bracelets for women',
    'H&A Aura',
  ],
  authors: [{ name: 'H&A Aura' }],
  openGraph: {
    // (4) Facebook/WhatsApp par link share ho to khubsurat preview
    type: 'website',
    siteName: 'H&A Aura',
    title: 'H&A Aura — Imported Jewellery in Pakistan',
    description: 'Premium imported jewellery with Cash on Delivery across Pakistan.',
    images: ['/logo.webp'],
  },
  twitter: {
    // (5) Twitter/X card
    card: 'summary_large_image',
    title: 'H&A Aura — Imported Jewellery in Pakistan',
    description: 'Premium imported jewellery with Cash on Delivery across Pakistan.',
    images: ['/logo.webp'],
  },
  icons: {
    // (6) Favicon — logo se bana hai
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

// (7) JSON-LD: Google ko brand samjhane wala structured data (technical SEO)
function orgJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'H&A Aura',
        url: SITE_URL,
        logo: `${SITE_URL}/logo.webp`,
        email: 'hauraofficial01@gmail.com',
        sameAs: ['https://www.instagram.com/hauraofficial01'],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+92-313-4494915',
          contactType: 'sales',
        },
      },
      { '@type': 'WebSite', name: 'H&A Aura', url: SITE_URL },
    ],
  };
}

// (8) Root layout — light theme default (readable), fonts, structured data
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* (9) Saved theme foran lagao — dark flash na ho */}
        <Script
          id="ha-aura-theme"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('ha-aura-theme')==='dark'){document.documentElement.classList.remove('light')}}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd()) }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
