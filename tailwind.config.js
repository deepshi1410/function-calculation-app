/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      boxShadow: {
        custom: "0px 0px 6px 0px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
}

