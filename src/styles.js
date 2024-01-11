import React from 'react'
import { createGlobalStyle } from 'styled-components'
import tw, { theme, globalStyles } from 'twin.macro'

// FIX: https://github.com/ben-rogerson/twin.macro/issues/773
const filteredGlobalStyles = Object.fromEntries(
  Object.entries(globalStyles).filter(
    k => k[0] !== "button, [type='button'], [type='reset'], [type='submit']",
  ),
);

const BaseStyles = createGlobalStyle(filteredGlobalStyles);

const CustomStyles = createGlobalStyle`
  body {
    -webkit-tap-highlight-color: ${theme`colors.purple.500`};
    ${tw`text-sm antialiased`}
  }

  table {
    ${tw`border-collapse`}
  }

  th, td {
    ${tw`border border-gray-400 px-4 py-2`}
  }

  button {
    ${tw`bg-transparent border border-gray-400 px-4 py-2 hover:bg-gray-100`}
  }

  input[type="text"], input[type="search"], input[type="number"], input[type="date"], select, textarea {
    ${tw`border border-gray-400 px-4 py-2`}
  }
`

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
)

export default GlobalStyles
