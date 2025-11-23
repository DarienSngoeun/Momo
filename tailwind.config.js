/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          warm: '#F4A261',
          soft: '#E9C46A',
          cozy: '#8D5B4C',
        },
        priority: {
          low: '#A8DADC',
          medium: '#F4A261',
          high: '#E76F51',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.15s ease-in',
        'slide-up': 'slideUp 0.2s ease-out',
        'bounce-in': 'bounceIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

