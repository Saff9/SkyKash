/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        kashmir: {
          blue: '#87CEEB',
          light: '#E0F6FF',
          dark: '#4682B4',
          green: '#2E8B57',
          white: '#F5F5F5'
        }
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
      },
      backgroundImage: {
        'kashmir-gradient': 'linear-gradient(135deg, #87CEEB 0%, #E0F6FF 50%, #2E8B57 100%)',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
