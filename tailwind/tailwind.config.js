/** @type {import('tailwindcss').Config} */
// Static Tailwind build config. Replaces the render-blocking Play CDN
// (cdn.tailwindcss.com) with a prebuilt css/tailwind.css.
//
// Regenerate after changing HTML/JS classes:
//   ./tailwind/build.sh
module.exports = {
  content: [
    './*.html',
    './blog/**/*.html',
    './easter-egg/**/*.html',
    './js/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
