import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./content/**/*.mdx",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0A0C",
          soft: "#101014",
          card: "#141419",
          line: "#232329",
        },
        bone: {
          DEFAULT: "#F4F2EE",
          dim: "#A7A5A0",
          faint: "#6E6C68",
        },
        prism: {
          violet: "#7C5CFF",
          magenta: "#E14ECA",
          amber: "#FFB347",
          cyan: "#4ED9E1",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      maxWidth: {
        shell: "80rem",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "prism-drift": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(4%, -6%) scale(1.08)" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "prism-drift": "prism-drift 14s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
