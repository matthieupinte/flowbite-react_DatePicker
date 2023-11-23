/* eslint-disable */
// const { buildAliases } = require('./scripts/aliases')

module.exports = {
  eslint: {
    enable: false
  },
  style: {
    postOptions: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
//   webpack: {
//     alias: buildAliases(__dirname),
//   },
//   jest: {
//     configure: {
//       moduleNameMapper: buildAliases('<rootDir>'),
//     },
//   },
}

/* eslint-enable */
