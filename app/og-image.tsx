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
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.08,
            backgroundImage:
              "linear-gradient(rgba(10,10,10,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "20px", position: "relative" }}>
          <img
            src="https://kestrellabshq.com/logos/KestrelLabs.svg"
            alt=""
            style={{ width: 124, height: 76, objectFit: "contain" }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ fontSize: 24, letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 600 }}>
              Kestrel Labs LLC
            </div>
            <div style={{ fontSize: 16, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(10,10,10,0.5)" }}>
              Atlanta / Software Systems / Infrastructure
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: 900, position: "relative" }}>
          <div style={{ fontSize: 72, lineHeight: 1.02, fontWeight: 700, letterSpacing: "-0.06em" }}>
            Dependable digital systems for growing businesses.
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.4, color: "rgba(10,10,10,0.72)", maxWidth: 900 }}>
            Websites, internal tools, software engineering, and infrastructure support with serious engineering discipline.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, color: "rgba(10,10,10,0.55)", letterSpacing: "0.16em", textTransform: "uppercase", position: "relative" }}>
          <div>kestrellabshq.com</div>
          <div>Quiet systems. Clear delivery.</div>
        </div>
      </div>
    ),
    size,
  );
}
