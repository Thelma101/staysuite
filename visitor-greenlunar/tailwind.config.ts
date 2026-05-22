import type { Config } from "tailwindcss";

/**
 * Tailwind theme is locked to the Figma design tokens of the
 * National Hotel Booking Platform. Color names map directly to
 * Figma layer styles where possible.
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/\\(public\\)/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/\\(auth\\)/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#188b5c",
          "green-dark": "#147a51",
          "green-darker": "#0f6443",
          "green-soft": "#edf6f3",
          "green-softer": "#f4f8f6",
          "green-softest": "#f7faf8",
          blue: "#2b66c4",
          "blue-dark": "#2558ad",
          navy: "#1f3870",
          "navy-dark": "#19305f",
          ink: "#00190f",
          "ink-50": "rgba(0,25,15,0.5)",
        },
        surface: {
          DEFAULT: "#ffffff",
          subtle: "#f9f9fc",
          softer: "#f3f5f8",
          chip: "#f2f2f7",
        },
        border: {
          DEFAULT: "#d9d9d9",
          green: "#c5ded6",
        },
        muted: {
          DEFAULT: "#8e8e93",
        },
      },
      fontFamily: {
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0px 4px 4px 0px rgba(0,25,15,0.25)",
        "card-soft": "0px 9px 2px 3px rgba(0,25,15,0.03)",
      },
      letterSpacing: {
        "brand-sm": "0.21px",
        brand: "0.24px",
        "brand-md": "0.3px",
        "brand-lg": "0.36px",
        "brand-xl": "0.54px",
      },
    },
  },
  plugins: [],
};

export default config;
