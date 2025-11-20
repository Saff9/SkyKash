// tailwind.config.js
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
        'snow-pattern': "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"><circle cx=\"20\" cy=\"20\" r=\"2\" fill=\"white\" opacity=\"0.6\"/><circle cx=\"50\" cy=\"30\" r=\"1.5\" fill=\"white\" opacity=\"0.4\"/><circle cx=\"80\" cy=\"20\" r=\"1\" fill=\"white\" opacity=\"0.5\"/><circle cx=\"30\" cy=\"60\" r=\"1.5\" fill=\"white\" opacity=\"0.3\"/><circle cx=\"70\" cy=\"70\" r=\"2\" fill=\"white\" opacity=\"0.4\"/></svg>')"
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
