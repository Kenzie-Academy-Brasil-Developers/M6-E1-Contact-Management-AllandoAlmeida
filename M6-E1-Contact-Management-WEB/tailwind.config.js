/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.js",
    "./src/**/*.ts",
    "./src/**/*.jsx",
    "./src/**/*.tsx",
    "./src/**/*.mdx",
  ],
  
  theme: {
    extend: {
      width: {
        '400': '400px',
      },
      height: {
        '450': '450px',
        '20': '20px', // Adicionando a classe 'h-20'
      },
      lineHeight: {
        '20': '20px', // Adicionando a classe 'line-height-20'
      },
      fontFamily: {
        'Rubik-sans-serif': ['Rubik', 'sans-serif'],
      },
      fontSize: {
        xs: ".63rem",
        sm: ".75rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
        "7xl": "5rem",
        "8xl": "6rem",
        "9xl": "7rem",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backdropBlur: {
        '3px': '3px',
      },
      backgroundColor: {
        'custom-gray': 'rgba(255, 255, 255, 0.05)',
      },
      borderColor: {
        'custom-border': 'rgba(255, 255, 255, 0.1)',
      },
      boxShadow: {
        'custom-shadow': 'rgba(0, 0, 0, 0.1) 2px 2px 2px',
      },
      borderRadius: {
        '6px': '6px',
      },
      transitionDuration: {
        '600ms': '600ms',
      },
      colors: {
        'custom-blue': 'rgb(94, 106, 210)',
        'custom-purple': {
          DEFAULT: '#5e6ad2',
          hover: '#ff0000',
        },
        'custom-gray': 'rgba(255, 255, 255, 0.05)',
        'custom-border': 'rgba(255, 255, 255, 0.1)',
        'custom-shadow': 'rgba(0, 0, 0, 0.1)',
        'custom-text': '#ffffff',
      },
      boxShadow: {
        '2px-2px-2px-custom-shadow': '2px 2px 2px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
