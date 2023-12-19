/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
      },
      fontSize: {
        h1: "80px",
        h2: "60px",
        h3: "40px",
        h4: "32px",
        h5: "24px",
        h6: "20px",
        body: "16px",
        caption: "14px",
        small: "12px",
        tiny: "10px",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
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
        // old
        "bg1": "#E2E2CA",
        "transparent": "transparent",
        "primary": "var(--primary-color)",
        "hilight": "var(--hilight-color)",
        "yellow": "#F0C149",
        // "secondary": "var(--bg-secondary)",
        "bg1": "#EEEED1",
        "bg2": "#F8F7F1",
        "light": "var(--text-light)",
        "third": "var(--bg-third)",
        "light-gray": "var(--light-gray)",
        "lighter-gray": "var(--lighter-gray)",
        "text-color": "var(--text-color)",
        "text-secondary": "var(--text-secondary)",
        "text-third": "var(--text-third)",
        "text-hover": "var(--text-hover)",
        "white": "#ffffff",
        "border": "var(--slim-border)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "marquee": {
          '0%': { transform: 'translateX(-50%)' },
          '50%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        "marquee2": {
          '0%': { transform: 'translateX(-50%)' },
          '50%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "marquee": 'marquee 25s linear infinite',
        "marquee2": 'marquee2 25s linear infinite',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}