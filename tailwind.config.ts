import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Lavender palette
        lavender: {
          lighter: "#DDD6FE",
          light: "#C4B5FD",
          DEFAULT: "#A78BFA",
          dark: "#8B5CF6",
          darker: "#7C3AED",
        },
        // Dark slate palette
        slate: {
          lighter: "#94A3B8",
          light: "#64748B",
          DEFAULT: "#475569",
          dark: "#334155",
          darker: "#1E293B",
        },
        // Backgrounds
        bg: {
          white: "#FFFFFF",
          cream: "#FAFAFA",
          lavender: "#F5F3FF",
        },
        // Status colors
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6",
      },
    },
  },
  plugins: [],
};

export default config;

