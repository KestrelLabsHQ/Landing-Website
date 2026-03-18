import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          color: "#0a0a0a",
          padding: "56px",
          border: "1px solid rgba(10,10,10,0.12)",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              width: 56,
              height: 56,
              border: "2px solid #0a0a0a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            K
          </div>
          <div style={{ fontSize: 24, letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 600 }}>
            Kestrel Labs LLC
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: 900 }}>
          <div style={{ fontSize: 20, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(10,10,10,0.55)" }}>
            Atlanta / Software Systems / Infrastructure
          </div>
          <div style={{ fontSize: 72, lineHeight: 1.02, fontWeight: 700, letterSpacing: "-0.06em" }}>
            Dependable digital systems for growing businesses.
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.4, color: "rgba(10,10,10,0.72)", maxWidth: 900 }}>
            Websites, internal tools, software engineering, and infrastructure support with serious engineering discipline.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, color: "rgba(10,10,10,0.55)", letterSpacing: "0.16em", textTransform: "uppercase" }}>
          <div>kestrellabshq.com</div>
          <div>Advanced Systems Available</div>
        </div>
      </div>
    ),
    size,
  );
}
