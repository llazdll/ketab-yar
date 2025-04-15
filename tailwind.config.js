/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          zain: ["Zain", "sans-serif"],
        },
        colors: {
          primary: {
            DEFAULT: '#ff4d30', // Your main color
            light: '#ff7d5c',   // Lighter variant
            dark: '#cc3d26',    // Darker variant
          },
          text: {
            primary: '#ff4d30',  // Primary text color
            secondary: '#6b7280',// Secondary text
            dark: '##6a7282',     // Dark text
          }
        },
        backgroundColor: {
          primary: '#ff4d30',
        },
        borderColor: {
          primary: '#ff4d30',
        },
        ringColor: {
          primary: '#ff4d30',
        },
      },
    },
    plugins: [
      require('tailwindcss-animate'),
    ],
  }