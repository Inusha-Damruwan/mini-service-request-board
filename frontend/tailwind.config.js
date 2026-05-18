/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './services/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#e2e8f0',
        mist: '#0f172a',
        accent: '#60a5fa',
        accentSoft: '#1d4ed8',
        danger: '#f87171',
        success: '#34d399',
        warning: '#fbbf24'
      },
      boxShadow: {
        glow: '0 30px 90px rgba(2, 6, 23, 0.45)',
        lift: '0 20px 50px rgba(14, 165, 233, 0.18)'
      },
      backgroundImage: {
        board: 'radial-gradient(circle at top, rgba(59, 130, 246, 0.26), transparent 32%), radial-gradient(circle at 18% 12%, rgba(14, 165, 233, 0.18), transparent 26%), linear-gradient(180deg, #020617 0%, #07111f 48%, #0f172a 100%)'
      }
    }
  },
  plugins: []
};