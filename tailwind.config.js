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
          DEFAULT: '#4C1D95', // Slightly darker purple
          hover: '#3B1477',
        },
        secondary: {
          DEFAULT: '#0EA5E9', // Modern Cyan/Sky Blue
          hover: '#0284C7',
        },
        accent: {
          DEFAULT: '#06B6D4', // Bright Cyan
          hover: '#0891B2',
        },
        slate: {
          DEFAULT: '#334155',
        },
        cool: {
          DEFAULT: '#F1F5F9',
        },
        success: {
          DEFAULT: '#84CC16', // Sage
        },
      },
      gradients: {
        'tech': 'linear-gradient(to right, #5B21B6, #06B6D4)',
        'accent': 'linear-gradient(to right, #0EA5E9, #5B21B6)',
      },
      fontFamily: {
        sans: ['var(--font-roboto)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-dm-serif)', 'Georgia', 'serif'],
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
