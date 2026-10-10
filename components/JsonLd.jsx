'use client'; // (1) chhota helper — dictionary ko Google wali script mein badlo

// (2) Props: data = JSON-LD object
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
