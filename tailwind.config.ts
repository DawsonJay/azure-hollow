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
        // Lavender Family
        lavender: {
          main: "#A78BFA",
          light: "#DDD6FE",
          medium: "#C4B5FD",
          dark: "#8B5CF6",
          darker: "#7C3AED",
        },
        // Dark Slate Family
        slate: {
          darker: "#1E293B",
          dark: "#334155",
          main: "#475569",
          light: "#64748B",
          lighter: "#94A3B8",
        },
        // Backgrounds
        bg: {
          white: "#FFFFFF",
          cream: "#FAFAFA",
          "lavender-tint": "#F5F3FF",
        },
        // Neutrals
        gray: {
          "warm-light": "#E5E7EB",
          medium: "#D1D5DB",
          cool: "#9CA3AF",
        },
        // Status Colors
        status: {
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
          info: "#3B82F6",
        },
      },
    },
  },
  plugins: [],
};

export default config;

