import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        honey: {
          50: "#fff9e6",
          100: "#ffefb8",
          300: "#ffd45f",
          500: "#f0a91c",
          700: "#a96511",
          900: "#54320a",
        },
        leaf: "#2f6b4f",
        ink: "#1e201c",
        // Semantic colors for UI states
        success: "#10b981",
        error: "#ef4444",
        warning: "#f59e0b",
        info: "#3b82f6",
      },
      boxShadow: {
        soft: "0 18px 55px rgba(55, 42, 19, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
