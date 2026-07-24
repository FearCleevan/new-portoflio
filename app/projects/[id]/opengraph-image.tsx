import { ImageResponse } from "next/og";
import { getProject } from "@/data/projects";

export const runtime = "edge";
export const alt = "Project case study — Peter Paul Lazan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProject(id);

  const title = project?.title ?? "Project Case Study";
  const tagline = project?.tagline ?? "";
  const stack = project?.stack.slice(0, 6) ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          backgroundColor: "#121212",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 68px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid lines — matches the root OG card's visual language */}
        {[126, 252, 378, 504].map((y) => (
          <div
            key={y}
            style={{
              position: "absolute",
              top: `${y}px`,
              left: 0,
              width: "1200px",
              height: "1px",
              backgroundColor: "rgba(255,255,255,0.04)",
            }}
          />
        ))}

        {/* Circle decor — top-left, off-screen */}
        <div
          style={{
            position: "absolute",
            top: "-220px",
            left: "-220px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-180px",
            right: "-140px",
            width: "380px",
            height: "380px",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.04)",
          }}
        />

        {/* Top — domain label */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "28px", height: "1px", backgroundColor: "#555" }} />
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "11px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#555",
            }}
          >
            peterpaullazan.com — case study
          </span>
        </div>

        {/* Middle — project title + tagline */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "1000px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              lineHeight: 1.02,
              color: "#e8e8e8",
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: "22px",
              fontSize: "20px",
              lineHeight: 1.5,
              color: "#999",
            }}
          >
            {tagline}
          </div>
        </div>

        {/* Bottom — tech tags */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {stack.map((tag) => (
            <div
              key={tag}
              style={{
                border: "1px solid #2e2e2e",
                color: "#666",
                fontSize: "12px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: "6px 14px",
                fontFamily: "monospace",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Bottom hairline */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "1200px",
            height: "1px",
            backgroundColor: "#222",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
