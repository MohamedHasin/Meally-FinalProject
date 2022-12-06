module.exports = {
    content: [
      "./components/**/*.{js,vue,ts}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./nuxt.config.{js,ts}"
    ],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          primary: '#24B578'
        }
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
      require('@tailwindcss/forms'),
      require('tailwind-scrollbar-hide')
    ],
  }
  