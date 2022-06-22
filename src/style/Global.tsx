import { createGlobalStyle } from 'styled-components'
import { PancakeTheme } from 'trustfi-uikit/dist/theme'

declare module 'styled-components' {
  export interface DefaultTheme extends PancakeTheme {
    expandColor: any
    css: any
  }
}

const GlobalStyle = createGlobalStyle`
  div,a {
    box-sizing: border-box;
  }
  body {
    zoom: 0.9;
    font-family :  Roboto;
  }
`

export default GlobalStyle
