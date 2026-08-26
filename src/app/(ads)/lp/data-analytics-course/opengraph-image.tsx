import { ImageResponse } from "next/og";

// Page-specific OG image. Without it this landing page inherited the root
// card ("Coding Institute in Gurugram"), so a link to a Data Analytics offer
// previewed as generic institute branding — and most of this page's sharing
// happens on WhatsApp, where the card is most of what people see before they
// decide to tap.
//
// Same next/og (Satori) approach as the root image: no external asset, no
// sharp dependency, generated at build time.
export const alt = "Data Analytics Course in Gurgaon — WebiGeeks";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          // Matches the page's own hero gradient so the card and the page it
          // opens read as the same thing.
          background: "linear-gradient(135deg, #0B2545 0%, #123A63 45%, #1D5C93 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "rgba(255,255,255,0.16)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 800,
              color: "#ffffff",
            }}
          >
            W
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: "#ffffff", letterSpacing: -0.5 }}>
            WebiGeeks
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.06,
              maxWidth: 950,
              letterSpacing: -1.5,
            }}
          >
            Become an AI-Powered Data Analyst.
          </div>
          <div style={{ fontSize: 30, color: "#F97316", fontWeight: 600 }}>
            Trained by a mentor, not a video.
          </div>
          <div style={{ fontSize: 26, color: "rgba(255,255,255,0.78)", maxWidth: 880 }}>
            6-7 months · Excel, SQL, Python, Power BI, Tableau &amp; MongoDB · Gurgaon campus or live online
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {["Free demo class", "Sector-14, Gurugram", "Personal mentorship"].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                padding: "10px 20px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.14)",
                color: "#ffffff",
                fontSize: 20,
                fontWeight: 500,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
