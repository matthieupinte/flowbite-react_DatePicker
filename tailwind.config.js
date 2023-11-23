/** @type {import('tailwindcss').Config} */

// const theme = process.env.THEME_PRESET || 'default'

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  // presets: [require('./old.preset'), require(`./${theme}.preset`)],
  plugins: [require('flowbite/plugin')], //, require('@tailwindcss/forms')],
  presets: [{
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#1980f4', // primary blue
            dark: '#002776', // hover blue
            light: '#afdaff', // primary blue light
            extraLight: '#e8f4ff', // primary blue extra light
            contrast: '#FFFFFF', // white
            line: '#E5E8FA', // hover blue light
            soft: '#D5DAFF', // primary blue soft
          }
        }
      }
    }
  }]
}
