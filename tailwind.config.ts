import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // Add other directories with classes here
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5A67D8', // Example indigo
        secondary: '#EDF2F7', // Example light gray
        accent: '#E53E3E', // Example red for accents
        // Add other color tokens
      },
      fontSize: {
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        // Add other font size tokens
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        bold: 700,
        // Add other font weight tokens
      },
      lineHeight: {
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
        // Add other line height tokens
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        // Add other font family tokens
      },
      backgroundImage: {
        'hero-pattern': "url('/img/hero-pattern.svg')",
        'footer-texture': "url('/img/footer-texture.png')",
        // Add other background image tokens
      },
    },
  },
  plugins: [
    // Add Tailwind CSS plugins here if needed
  ],
};

export default config;

