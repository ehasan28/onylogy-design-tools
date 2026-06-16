import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Onylogy Design Tools — Color & Typography";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0a0b0d 0%, #16181d 100%)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "#6366f1",
              color: "white",
              fontSize: "36px",
              fontWeight: 700,
            }}
          >
            O
          </div>
          <div style={{ color: "#e5e7eb", fontSize: "32px", fontWeight: 600 }}>
            Onylogy Design Tools
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              color: "white",
              fontSize: "76px",
              fontWeight: 800,
              lineHeight: 1.05,
              maxWidth: "900px",
            }}
          >
            Design systems, built visually,{" "}
            <span style={{ color: "#818cf8" }}>exported instantly.</span>
          </div>
          <div style={{ color: "#9ca3af", fontSize: "30px", maxWidth: "820px" }}>
            Palettes, semantic colors, font pairings & typography scales — for
            WordPress, Kadence, and Tailwind.
          </div>
        </div>

        <div style={{ display: "flex", gap: "16px" }}>
          {["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4"].map((c) => (
            <div
              key={c}
              style={{
                width: "120px",
                height: "18px",
                borderRadius: "9px",
                background: c,
              }}
            />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
