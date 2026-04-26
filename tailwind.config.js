/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Don't let Tailwind's base reset override existing vanilla CSS styles
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        'bg-primary': '#060a14',
        'bg-secondary': '#0d1321',
        'surface': '#0d1321',
        'card': 'rgba(13, 19, 33, 0.75)',
        'accent': {
          purple: '#a78bfa',
          teal: '#2dd4bf',
          amber: '#fbbf24',
          green: '#34d399',
          blue: '#60a5fa',
        },
        'text-primary': '#f1f5f9',
        'text-secondary': '#94a3b8',
        'text-muted': '#64748b',
      },
      fontFamily: {
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'card': '14px',
        'card-sm': '10px',
      },
      backdropBlur: {
        'glass': '16px',
      },
    },
  },
  plugins: [],
}
