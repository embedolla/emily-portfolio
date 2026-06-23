import { ImageResponse } from "next/og";

export const alt = "Emily Bedolla — Software / AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#faf6ee",
          color: "#1e2a24",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 30,
            color: "#2e5e4e",
            fontWeight: 600,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 999,
              background: "#2e5e4e",
              color: "#faf6ee",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            EB
          </div>
          Emily Bedolla
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 68,
            fontWeight: 700,
            marginTop: 40,
            lineHeight: 1.15,
          }}
        >
          <span>Building technology</span>
          <span>that helps people</span>
          <span>and the planet.</span>
        </div>
        <div style={{ fontSize: 30, color: "#5c6b62", marginTop: 36 }}>
          Software / AI Engineer · Incoming CS @ Stanford 🌱
        </div>
      </div>
    ),
    { ...size },
  );
}
