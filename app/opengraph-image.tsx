import { ImageResponse } from "next/og";

export const alt = "Salem Permit List — new Salem remodel permits every Monday";
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
          background: "#1f3d32",
          color: "#f3efe6",
          padding: "72px 80px",
          borderBottom: "16px solid #c97d1a",
        }}
      >
        <div
          style={{
            color: "#e8a532",
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 18,
          }}
        >
          Salem · Keizer · Stayton · Lyons · Albany
        </div>
        <div style={{ fontSize: 72, lineHeight: 1.05, fontWeight: 650, maxWidth: 980 }}>
          New Salem remodel permits, every Monday.
        </div>
        <div style={{ fontSize: 30, marginTop: 24, color: "rgba(243,239,230,0.86)", maxWidth: 860 }}>
          Address, what they pulled, who applied. First week free. $99 a month.
        </div>
      </div>
    ),
    { ...size },
  );
}
