import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#121212",
        "mid-gray": "#a6a6a6",
        "off-white": "#f5f5f5",
        "card-bg": "#1a1a1a",
        "card-border": "#2a2a2a",
        "card-border-light": "#3a3a3a",
        subtle: "#222222",
        muted: "#555555",
      },
      fontFamily: {
        display: ["var(--font-oswald)", "sans-serif"],
        body: ["var(--font-nunito)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        "cursor-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "cursor-blink": "cursor-blink 1.1s step-end infinite",
      },
    },
  },
  plugins: [],
};

export default config;
