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
          // Better color palette
          blue: {
            light: '#E6F3FF',
            DEFAULT: '#4A90E2', 
            dark: '#357ABD'
          },
          green: {
            light: '#F0FFF4',
            DEFAULT: '#38A169',
            dark: '#2F855A'
          },
          snow: {
            light: '#F8FAFC',
            DEFAULT: '#E2E8F0',
            dark: '#CBD5E0'
          },
          mountain: {
            light: '#EDF2F7',
            DEFAULT: '#718096',
            dark: '#4A5568'
          }
        }
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
      },
      backgroundImage: {
        'kashmir-gradient': 'linear-gradient(135deg, #E6F3FF 0%, #F0FFF4 50%, #F8FAFC 100%)',
        'kashmir-sunset': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'kashmir-mountain': 'linear-gradient(135deg, #4A90E2 0%, #38A169 50%, #718096 100%)'
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
