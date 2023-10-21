import type { Config } from 'tailwindcss'

const config: Config = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
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
    },
  },
  plugins: [],
}
export default config
