import { ImageResponse } from "next/og";

// Root-level OG image, inherited by every public route that doesn't define
// its own more specific opengraph-image.tsx. Generated at build time via
// next/og (Satori + resvg, bundled with Next.js) — no external image asset
// or sharp dependency needed, which fixes the previously-broken reference to
// a /images/og-image.jpg file that never existed in the repo.
export const alt = "WebiGeeks — Coding Institute in Gurugram";
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
          background: "linear-gradient(135deg, #0D4A7A 0%, #1672B8 55%, #2E9BE0 100%)",
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
          <div style={{ fontSize: 34, fontWeight: 700, color: "#ffffff", letterSpacing: -0.5 }}>
            WebiGeeks
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 66,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.08,
              maxWidth: 900,
            }}
          >
            Coding Institute in Gurugram
          </div>
          <div style={{ fontSize: 28, color: "rgba(255,255,255,0.82)", maxWidth: 820 }}>
            MERN Stack · Python · Data Analytics · Power BI — offline &amp; online, 100% placement assistance
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {["Sector-14, Gurugram", "100% Practical Training", "Placement Assistance"].map((label) => (
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
