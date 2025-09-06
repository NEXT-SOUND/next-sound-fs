// @ts-expect-error - no types
import nativewind from "nativewind/preset";
import { hairlineWidth } from "nativewind/theme";

export default {
  darkMode: "class",
  corePlugin: {
    backgroundOpacity: true,
  },
  content: ["./web/**/*.{js,jsx,ts,tsx}", "./native/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      screens: {
        "2xl": "1560px",
      },
    },
    extend: {
      fontWeight: {
        readexExtraLight: "200",
        readexLight: "300",
        readex: "400",
        readexMedium: "500",
        readexSemiBold: "600",
        readexBold: "700",
      },
      fontFamily: {
        readexExtraLight: ["ReadexPro_200ExtraLight", "var(--font-readex-pro)"],
        readexLight: ["ReadexPro_300Light", "var(--font-readex-pro)"],
        readex: ["ReadexPro_400Regular", "var(--font-readex-pro)"],
        readexMedium: ["ReadexPro_500Medium", "var(--font-readex-pro)"],
        readexSemiBold: ["ReadexPro_600SemiBold", "var(--font-readex-pro)"],
        readexBold: ["ReadexPro_700Bold", "var(--font-readex-pro)"],
      },
      fontSize: {
        "3xs": ["8px", "12px"],
        "2xs": ["10px", "16px"],
      },
      boxShadow: {
        xs: "0px 3px 8px rgba(0, 0, 0, 0.045)",
      },
      colors: {
        border: {
          DEFAULT: "hsl(var(--border))",
          primary: "hsl(var(--border-primary))",
        },
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        label: "hsl(var(--label))",
        wrapper: {
          DEFAULT: "hsl(var(--wrapper))",
          primary: "hsl(var(--wrapper-primary))",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        white: {
          DEFAULT: "#fff",
          15: "hsl(var(--white-15))",
          20: "hsl(var(--white-20))",
          30: "hsl(var(--white-30))",
          50: "hsl(var(--white-50))",
          60: "hsl(var(--white-60))",
          80: "hsl(var(--white-80))",
        },
        black: {
          DEFAULT: "#000",
          15: "hsl(var(--black-15))",
          20: "hsl(var(--black-20))",
          30: "hsl(var(--black-30))",
          50: "hsl(var(--black-50))",
          60: "hsl(var(--black-60))",
          80: "hsl(var(--black-80))",
        },
        translucent: {
          DEFAULT: "hsl(var(--white-20))",
          foreground: "hsl(var(--white-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          backfill: "hsl(var(--primary-backfill))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        banner: {
          purple: "hsl(var(--banner-purple))",
        },
        positive: {
          DEFAULT: "hsl(var(--positive-background))",
          foreground: "hsl(var(--positive-foreground))",
        },
        negative: {
          DEFAULT: "hsl(var(--negative-background))",
          foreground: "hsl(var(--negative-foreground))",
        },
        neutral: {
          DEFAULT: "hsl(var(--neutral-background))",
          foreground: "hsl(var(--neutral-foreground))",
        },
        modal: {
          DEFAULT: "hsl(var(--modal-background))",
        },
        spotify: {
          green: "hsl(var(--spotify-green))",
          "green-hover": "hsl(var(--spotify-green-hover))",
          black: "hsl(var(--spotify-black))",
          "dark-gray": "hsl(var(--spotify-dark-gray))",
          gray: "hsl(var(--spotify-gray))",
          "light-gray": "hsl(var(--spotify-light-gray))",
          white: "hsl(var(--spotify-white))",
        },
      },
      borderWidth: {
        hairline: hairlineWidth(),
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
  plugins: [require("tailwindcss-animate")],
} satisfies import("tailwindcss").Config;
