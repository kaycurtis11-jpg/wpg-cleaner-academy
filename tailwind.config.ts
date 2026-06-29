import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#ececfb',
          100: '#d0d0f5',
          200: '#a2a2eb',
          300: '#7474e0',
          400: '#4d4dc4',
          500: '#3535bc',
          600: '#2121b5',
          700: '#1a1a91',
          800: '#13136d',
          900: '#0c0c4a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
