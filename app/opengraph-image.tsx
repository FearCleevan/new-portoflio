import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Peter Paul Lazan — Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const tags = ["React", "Next.js", "TypeScript", "React Native", "Supabase", "Node.js"];

export default async function Image() {
  const profileRes = await fetch(new URL("/profile.png", "https://lazandev.vercel.app"));
  const profileBuffer = await profileRes.arrayBuffer();
  const profileBase64 = `data:image/png;base64,${Buffer.from(profileBuffer).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          backgroundColor: "#121212",
          display: "flex",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ── Shader simulation — layered radial gradient blobs ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 700px 500px at 10% 20%, rgba(255,255,255,0.028) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 500px 400px at 80% 80%, rgba(255,255,255,0.018) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 400px 300px at 50% 10%, rgba(255,255,255,0.022) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 600px 500px at 30% 90%, rgba(255,255,255,0.015) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 300px 250px at 65% 40%, rgba(255,255,255,0.012) 0%, transparent 70%)",
          }}
        />

        {/* ── Grid lines — horizontal ── */}
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
        {/* ── Grid lines — vertical ── */}
        {[200, 400, 600, 800, 860, 1000].map((x) => (
          <div
            key={x}
            style={{
              position: "absolute",
              left: `${x}px`,
              top: 0,
              width: "1px",
              height: "630px",
              backgroundColor: "rgba(255,255,255,0.04)",
            }}
          />
        ))}

        {/* ── CircleDecor — top-left, partially off-screen ── */}
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
        {/* inner ring */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "-100px",
            width: "260px",
            height: "260px",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.04)",
          }}
        />
        {/* ── CircleDecor — bottom-right ghost ── */}
        <div
          style={{
            position: "absolute",
            bottom: "-180px",
            right: "280px",
            width: "380px",
            height: "380px",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.04)",
          }}
        />

        {/* ── Content area ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 60px 56px 68px",
            flex: 1,
            position: "relative",
          }}
        >
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
              lazandev.vercel.app
            </span>
          </div>

          {/* Middle — name block */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: "10px",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#666",
                marginBottom: "14px",
              }}
            >
              — Portfolio
            </div>

            {/* PETER PAUL */}
            <div
              style={{
                fontSize: "82px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "-0.03em",
                lineHeight: 0.95,
                color: "#e8e8e8",
              }}
            >
              PETER PAUL
            </div>

            {/* LAZAN */}
            <div
              style={{
                fontSize: "82px",
                fontWeight: 300,
                textTransform: "uppercase",
                letterSpacing: "-0.03em",
                lineHeight: 0.95,
                color: "#4a4a4a",
              }}
            >
              LAZAN
            </div>

            {/* Role + location */}
            <div
              style={{
                marginTop: "22px",
                fontFamily: "monospace",
                fontSize: "12px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#777",
              }}
            >
              Full-Stack Developer · Davao City, PH
            </div>
          </div>

          {/* Bottom — tech tags */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  border: "1px solid #2e2e2e",
                  color: "#666",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  padding: "5px 12px",
                  fontFamily: "monospace",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* ── Right — grayscale photo ── */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: "340px",
            height: "630px",
            display: "flex",
          }}
        >
          {/* Fade gradient left edge */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "130px",
              height: "630px",
              background: "linear-gradient(to right, #121212, transparent)",
              zIndex: 2,
            }}
          />
          {/* Fade gradient bottom edge */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "340px",
              height: "100px",
              background: "linear-gradient(to top, #121212, transparent)",
              zIndex: 2,
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profileBase64}
            alt=""
            style={{
              width: "340px",
              height: "630px",
              objectFit: "cover",
              objectPosition: "center top",
              filter: "grayscale(100%) contrast(1.1) brightness(0.72)",
            }}
          />
        </div>

        {/* ── Bottom hairline ── */}
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
