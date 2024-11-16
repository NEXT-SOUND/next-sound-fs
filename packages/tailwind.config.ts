import tailwindAnimation from "tailwindcss-animate";

export default {
  corePlugin: {
    backgroundOpacity: true,
  },
  content: ["./web/**/*.{js,jsx,ts,tsx}", "./native/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontSize: {
        "3xs": ["8px", "12px"],
        "2xs": ["10px", "14px"],
      },
      boxShadow: {
        xs: "0px 3px 8px rgba(0, 0, 0, 0.045)",
      },
      colors: {
        test: "var(--red)",
        border: {
          DEFAULT: "var(--border)",
          primary: "var(--border-primary)",
        },
        input: "var(--input)",
        ring: "var(--ring)",
        wrapper: {
          DEFAULT: "var(--wrapper)",
          primary: "var(--wrapper-primary)",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
        translucent: "var(--translucent)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
          backfill: "var(--primary-backfill)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        banner: {
          purple: "var(--banner-purple)",
        },
        positive: {
          DEFAULT: "var(--positive-background)",
          foreground: "var(--positive-foreground)",
        },
        negative: {
          DEFAULT: "var(--negative-background)",
          foreground: "var(--negative-foreground)",
        },
        neutral: {
          DEFAULT: "var(--neutral-background)",
          foreground: "var(--neutral-foreground)",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindAnimation],
} satisfies import("tailwindcss").Config;
