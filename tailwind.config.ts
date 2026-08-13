import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        retro: {
          bg: "#0c0806",
          woodDark: "#1a0f0a",
          woodMid: "#361d10",
          woodLight: "#5c331c",
          brass: "#d4af37",
          crtGreen: "#33ff33",
          crtAmber: "#ffb000",
          crtCyan: "#00f0ff",
          plasticDark: "#18181b",
          plasticLight: "#27272a",
          buttonRed: "#dc2626",
          buttonBlue: "#2563eb",
          buttonYellow: "#eab308",
        },
      },
      fontFamily: {
        vt323: ["var(--font-vt323)", "monospace"],
        mono: ["var(--font-share-tech-mono)", "monospace"],
        retro: ["var(--font-press-start-2p)", "monospace"],
      },
      boxShadow: {
        crt: "0 0 25px rgba(51, 255, 51, 0.25), inset 0 0 50px rgba(0, 0, 0, 0.8)",
        crtGlow: "0 0 60px 15px rgba(51, 255, 51, 0.15)",
        remote: "0 20px 25px -5px rgba(0, 0, 0, 0.7), 0 8px 10px -6px rgba(0, 0, 0, 0.5)",
      },
      keyframes: {
        flicker: {
          "0%, 100%": { opacity: "0.98" },
          "50%": { opacity: "1" },
          "52%": { opacity: "0.95" },
          "54%": { opacity: "1" },
          "80%": { opacity: "0.97" },
        },
        crtCollapse: {
          "0%": { transform: "scale(1, 1)", opacity: "1" },
          "50%": { transform: "scale(1, 0.005)", opacity: "0.8" },
          "100%": { transform: "scale(0, 0)", opacity: "0" },
        },
        scanline: {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        flicker: "flicker 0.15s infinite",
        crtCollapse: "crtCollapse 0.4s cubic-bezier(0.23, 1, 0.32, 1) forwards",
        scanline: "scanline 8s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
