// Renders one or more schema.org objects as an `application/ld+json` script tag.
// Per Next.js's own JSON-LD guide: a native <script> tag is correct here (not
// next/script, which is for executable JS) — but JSON.stringify alone doesn't
// escape "</script>" sequences that could appear inside string values, so `<`
// is escaped to its unicode form to prevent breaking out of the script tag.
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
