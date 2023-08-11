/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,mjs}"],
  theme: {
    extend: {
      backgroundImage: {
        'jwt': "url('/public/img/jwt-logo-black-and-white.png')",
      },
    },
  },
  plugins: [],
}

