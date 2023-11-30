import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'color-primary': '#ff577f',
        'color-primary-50': '#ff427f',
        'color-primary-disable': '#59323f',
        'grey-4': '#121214',
        'grey-3': '#212529',
        'grey-2': '#343b41',
        'grey-1': '#868e96',
        'grey-0': '#f8f9fa',
        'sucess': '#3fe864',
        'negative': '#e83f5b',
        'padrao': '#ffffff',
        'bg-color': '#000000',
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
      
      backgroundColor: {
        'custom-gray': 'rgba(255, 255, 255, 0.05)',
      },
      borderColor: {
        'custom-border': 'rgba(255, 255, 255, 0.1)',
      },
      boxShadow: {
        '2px-2px-2px-custom-shadow': '2px 2px 2px rgba(0, 0, 0, 0.1)',
      },
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
      backdropBlur: {
        '3px': '3px',
      },
      borderRadius: {
        '6px': '6px',
      },
      transitionDuration: {
        '600ms': '600ms',
      },
    },
  },
  plugins: [],
}
export default config
