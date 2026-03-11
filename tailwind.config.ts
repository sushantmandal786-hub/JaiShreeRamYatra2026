import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["var(--font-inter)", "var(--font-hind)", "system-ui", "sans-serif"],
        marquee: ["var(--font-caveat)", "cursive"]
      },
      colors: {
        saffron: "#f07a26",
        "deep-saffron": "#c45113",
        gold: "#f4c35a",
        maroon: "#6f1c14",
        ink: "#0f0a08",
        cream: "#fffdf7"
      },
      boxShadow: {
        glow: "0 0 45px rgba(240, 122, 38, 0.4)",
        glass: "0 20px 40px rgba(0, 0, 0, 0.35)"
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { transform: "scale(1)", filter: "drop-shadow(0 0 8px rgba(240, 122, 38, 0.55))" },
          "50%": { transform: "scale(1.02)", filter: "drop-shadow(0 0 16px rgba(240, 122, 38, 0.85))" }
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        tickerMove: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      },
      animation: {
        "pulse-glow": "pulseGlow 4.5s ease-in-out infinite",
        "float-slow": "floatSlow 6s ease-in-out infinite",
        ticker: "tickerMove 20s linear infinite"
      },
      backgroundImage: {
        "hero-noise": "radial-gradient(circle at 30% 20%, rgba(244, 195, 90, 0.2), transparent 55%), radial-gradient(circle at 80% 20%, rgba(111, 28, 20, 0.35), transparent 45%), linear-gradient(160deg, #0f0a08 0%, #1a0f0b 45%, #0f0a08 100%)"
      }
    }
  },
  plugins: []
};

export default config;
