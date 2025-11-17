import type { Config } from "tailwindcss";
import tokens from "./styles/tokens";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: tokens.paper,
        ink: tokens.ink,
        heading: tokens.heading,
        primary: tokens.primaryBg,
        primaryfg: tokens.primaryFg,
        secondary: tokens.secondaryBg,
        secondaryfg: tokens.secondaryFg,
        outline: tokens.outline,
        panel: tokens.panel,
        accent: tokens.accent,
        gold: tokens.gold,
        burgundy: tokens.burgundy,
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
        serif: [
          "var(--font-playfair)",
          '"Playfair Display"',
          '"Times New Roman"',
          "Times",
          "serif",
        ],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          md: "1.5rem",
          lg: "2rem",
          xl: "2.5rem",
        },
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1400px",
        },
      },
      boxShadow: {
        glow: "0 18px 48px rgba(21, 34, 59, 0.15)",
        luxury: "0 24px 60px rgba(21, 34, 59, 0.14), 0 0 0 1px rgba(21, 34, 59, 0.08)",
        gold: "0 12px 28px rgba(183, 147, 73, 0.3)",
        "inner-soft": "inset 0 1px 3px rgba(21, 34, 59, 0.1)",
      },
      backdropBlur: {
        xs: "2px",
      },
      letterSpacing: {
        tighter: "-0.03em",
        tight: "-0.02em",
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },
    },
  },
  plugins: [],
};

export default config;

