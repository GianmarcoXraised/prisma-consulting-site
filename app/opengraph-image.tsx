import { ImageResponse } from "next/og";
import fs from "fs/promises";
import path from "path";

export const alt = "Prisma House — Marketing that refracts into results";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  // Read at build time — this route is statically prerendered.
  const [displayFont, bodyFont] = await Promise.all([
    fs.readFile(
      path.join(process.cwd(), "assets", "BricolageGrotesque-ExtraBold.ttf"),
    ),
    fs.readFile(path.join(process.cwd(), "assets", "Manrope-Medium.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0A0A0C",
          position: "relative",
          fontFamily: "Manrope",
        }}
      >
        {/* Soft refracted-light washes */}
        <div
          style={{
            position: "absolute",
            top: -220,
            left: -160,
            width: 640,
            height: 640,
            borderRadius: 640,
            background:
              "linear-gradient(135deg, rgba(124,92,255,0.32), rgba(225,78,202,0.10), rgba(10,10,12,0))",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -260,
            right: -140,
            width: 680,
            height: 680,
            borderRadius: 680,
            background:
              "linear-gradient(315deg, rgba(78,217,225,0.26), rgba(255,179,71,0.08), rgba(10,10,12,0))",
          }}
        />

        {/* Prism mark */}
        <svg width="110" height="110" viewBox="0 0 28 28" fill="none">
          <defs>
            <linearGradient id="pg" x1="0" y1="28" x2="28" y2="0">
              <stop offset="0%" stopColor="#7C5CFF" />
              <stop offset="40%" stopColor="#E14ECA" />
              <stop offset="75%" stopColor="#FFB347" />
              <stop offset="100%" stopColor="#4ED9E1" />
            </linearGradient>
          </defs>
          <path
            d="M14 2L26 24H2L14 2Z"
            stroke="url(#pg)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M14 9L20.5 21H7.5L14 9Z" fill="url(#pg)" opacity="0.45" />
        </svg>

        <div
          style={{
            marginTop: 36,
            fontSize: 100,
            fontWeight: 800,
            fontFamily: "Bricolage",
            letterSpacing: -3,
            color: "#F4F2EE",
            display: "flex",
          }}
        >
          Prisma House
        </div>

        {/* Prism beam */}
        <div
          style={{
            marginTop: 34,
            width: 420,
            height: 4,
            borderRadius: 4,
            background:
              "linear-gradient(90deg, rgba(10,10,12,0), #7C5CFF 20%, #E14ECA 45%, #FFB347 70%, #4ED9E1 90%, rgba(10,10,12,0))",
          }}
        />

        <div
          style={{
            marginTop: 34,
            fontSize: 30,
            color: "#A7A5A0",
            display: "flex",
          }}
        >
          Marketing that refracts into results
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Bricolage",
          data: displayFont,
          weight: 800,
          style: "normal",
        },
        {
          name: "Manrope",
          data: bodyFont,
          weight: 500,
          style: "normal",
        },
      ],
    },
  );
}
