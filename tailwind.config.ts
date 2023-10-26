import type { Config } from 'tailwindcss'

const config: Config = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      h1: "80px",
      h2: "60px",
      h3: "40px",
      h4: "30px",
      h5: "24px",
      h6: "20px",
      body: "16px",
      caption: "14px",
      small: "12px",
      tiny: "10px",
    },
    colors: {
      "transparent": "transparent",
      "primary": "var(--primary-color)",
      "secondary": "var(--bg-secondary)",
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
    }
  },
  plugins: [],
}
export default config
