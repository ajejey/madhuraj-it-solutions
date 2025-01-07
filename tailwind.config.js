/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#07195F', // Deep Navy Blue
          hover: '#051347',
          light: '#1E3A8A',
        },
        secondary: {
          DEFAULT: '#00A9FF', // Bright Sky Blue
          hover: '#0096E5',
          light: '#33B9FF',
        },
        accent: {
          DEFAULT: '#FB923C', // Vibrant Orange
          hover: '#F97316',
          light: '#FDBA74',
        },
        slate: {
          DEFAULT: '#334155',
          light: '#64748B',
        },
        cool: {
          DEFAULT: '#F1F5F9',
          dark: '#E2E8F0',
        },
        success: {
          DEFAULT: '#22C55E', // Fresh Green
          hover: '#16A34A',
        },
      },
      gradients: {
        'tech': 'linear-gradient(to right, #07195F, #0369A1)',
        'accent': 'linear-gradient(to right, #FB923C, #07195F)',
        'blue': 'linear-gradient(to bottom, #07195F, #1E3A8A)',
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
    },
  },
  plugins: [],
};
