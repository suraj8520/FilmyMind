/** @type {import('tailwindcss').Config} */

//

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: 'var(--color-brand-50)',
          100: 'var(--color-brand-100)',
          200: 'var(--color-brand-200)',
          300: 'var(--color-brand-300)',
          400: 'var(--color-brand-400)',
          500: 'var(--color-brand-500)',
          600: 'var(--color-brand-600)',
          700: 'var(--color-brand-700)',
          800: 'var(--color-brand-800)',
          900: 'var(--color-brand-900)',
          950: 'var(--color-brand-950)',
        },

        neutral: {
          50: 'var(--color-neutral-50)',
          100: 'var(--color-neutral-100)',
          200: 'var(--color-neutral-200)',
          300: 'var(--color-neutral-300)',
          400: 'var(--color-neutral-400)',
          500: 'var(--color-neutral-500)',
          600: 'var(--color-neutral-600)',
          700: 'var(--color-neutral-700)',
          800: 'var(--color-neutral-800)',
          900: 'var(--color-neutral-900)',
          950: 'var(--color-neutral-950)',
        },
      },
      fontFamily: {
        sans: 'Rubik, sans-serif',
      },
      height: {
        screen: '100dvh',
      },
      boxShadow: {
        full: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px',
        // full: 'rgba(100, 100, 111, 0.2) 0px 2px 15px 0px',
      },
    },
  },
  plugins: [],
};
// tried to provide the values using code but couldn't do so.
// const brandColors = new Map();
// const neutralColors = new Map();
// // const brandColors =  {
// //   50: "var(--color-brand-50)",
// //   950: "var(--color-brand-950)",
// // };
// // const neutralColors = {
// //   50: "var(--color-neutral-50)",
// //   950: "var(--color-neutral-950)",
// // };
// for (let i = 100; i <= 950; i += 100) {
//   brandColors.set(i, `var(--color-brand-${i}`);
//   neutralColors.set(i, `var(--color-neutral-${i}`);
// }
// console.log(Object.fromEntries([...brandColors]));
