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
        primary: '#5A67D8', // indigo
        secondary: '#EDF2F7', //  gray
        accent: '#E53E3E', // red accents
      },
      fontSize: {
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        bold: '700',
      },
      lineHeight: {
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
      },

      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },

      backgroundImage: {
        'hero-pattern': "url('/img/hero-pattern.svg')",
        'footer-texture': "url('/img/footer-texture.png')",
      },
    },
  },
  plugins: [
    // Add Tailwind CSS plugins here if I need
  ],
};

export default config;

