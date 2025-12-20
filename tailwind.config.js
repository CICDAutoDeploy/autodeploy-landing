/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Base surfaces */
        bg: {
          DEFAULT: "rgb(var(--color-bg) / <alpha-value>)",
          light: "rgb(var(--color-bg-light) / <alpha-value>)",
          dark: "rgb(var(--color-bg-dark) / <alpha-value>)",
        },
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        "surface-muted": "rgb(var(--color-surface-muted) / <alpha-value>)",

        /* Cards */
        card: {
          light: "rgb(var(--color-card-light) / <alpha-value>)",
          dark: "rgb(var(--color-card-dark) / <alpha-value>)",
        },

        /* Borders */
        border: {
          DEFAULT: "rgb(var(--color-border) / <alpha-value>)",
          light: "rgb(var(--color-border-light) / <alpha-value>)",
          dark: "rgb(var(--color-border-dark) / <alpha-value>)",
        },

        /* Text */
        text: {
          primary: "rgb(var(--color-text-primary) / <alpha-value>)",
          secondary: "rgb(var(--color-text-secondary) / <alpha-value>)",
          muted: "rgb(var(--color-text-muted) / <alpha-value>)",
          light: "rgb(var(--color-text-light) / <alpha-value>)",
          dark: "rgb(var(--color-text-dark) / <alpha-value>)",
        },

        /* Brand */
        brand: {
          DEFAULT: "rgb(var(--color-brand) / <alpha-value>)",
          strong: "rgb(var(--color-brand-strong) / <alpha-value>)",
          hover: "rgb(var(--color-brand-hover) / <alpha-value>)",
          accent: "rgb(var(--color-accent) / <alpha-value>)",
        },

        /* Primary (matches bg-primary, text-primary, focus:ring-primary) */
        primary: "rgb(var(--color-primary) / <alpha-value>)",

        /* Status */
        danger: "rgb(var(--color-danger) / <alpha-value>)",
      },

      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
    },
  },
  plugins: [],
};
