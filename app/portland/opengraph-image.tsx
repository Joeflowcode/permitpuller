import { ImageResponse } from "next/og";

export const alt = "Portland Permit List — new Portland remodel permits every Monday";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#10241e",
          color: "#f4efe3",
          padding: "72px 80px",
          borderBottom: "14px solid #c97d1a",
        }}
      >
        <div
          style={{
            color: "#e8a532",
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: 6,
            textTransform: "uppercase",
            marginBottom: 22,
          }}
        >
          Portland
        </div>
        <div style={{ fontSize: 76, lineHeight: 0.98, fontWeight: 650, maxWidth: 980 }}>
          New Portland remodel permits, every Monday.
        </div>
        <div style={{ fontSize: 28, marginTop: 28, color: "rgba(244,239,227,0.78)", maxWidth: 820 }}>
          Address, what they pulled, who applied. First week free. $149 a month.
        </div>
      </div>
    ),
    { ...size },
  );
}
