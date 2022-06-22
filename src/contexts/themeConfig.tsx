import {light, dark, Colors, TooltipTheme, CardTheme, ToggleTheme, ModalTheme, NavTheme} from 'trustfi-uikit'
import { css } from 'styled-components'

const lightColors: Colors = {
  /** base
   * */
  failure: '#ED4B9E',
  primary: '#FEE108',
  primaryBright: '#53DEE9',
  primaryDark: '#0098A1',
  secondary: '#FEE108cc',
  success: '#662dda',
  warning: '#FFB237',

  disabled: "#E9EAEB",
  cardBorder: "#E7E3EB",
  background: '#FAFAFA',
  backgroundDisabled: '#E9EAEB',
  contrast: '#191326',
  dropdown: '#F6F6F6',
  invertedContrast: '#FFFFFF',
  input: '#eeeaf4',
  inputSecondary: '#d7caec',
  tertiary: '#eeeaf4',
  text: '#FEE108',
  textDisabled: '#959494',
  textSubtle: '#FEE108cc',
  textSubtleBg: '#FEE108',
  borderColor: '#E9EAEB',
  card: '#fff',
  navBg: '#27262c',
  navItemBg: '#efefef',
  navText: '#000',
  navHover: 'rgba(74,88,189,0.8)',
  navActivityText: '#FEE108',
  navDropdownBg: '#efefef',
  navDropdownText: '#fff',
  navDropdownBorder: '#fff',

  // Gradients
  gradients: {
    bubblegum: 'linear-gradient(#000 0%, #000 70%)',
    inverseBubblegum: "linear-gradient(139.73deg, #F3EFFF 0%, #E5FDFF 100%)",
    cardHeader: "linear-gradient(111.68deg, #F2ECF2 0%, #E8F2F6 100%)",
    blue: "linear-gradient(180deg, #A7E8F1 0%, #94E1F2 100%)",
    violet: "linear-gradient(180deg, #E2C9FB 0%, #CDB8FA 100%)",
    violetAlt: "linear-gradient(180deg, #CBD7EF 0%, #9A9FD0 100%)",
    gold: "linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)",
  },

  // Brand colors
  binance: '#F0B90B',

  // interface
  white: '#FFFFFF',
  black: '#000000',

  text1: '#000000',
  text2: '#32126f',
  text3: '#888D9B',
  text4: '#C3C5CB',
  text5: '#EDEEF2',

  // backgrounds / greys
  bg1: '#fff',
  bg2: '#fbf6ee',
  bg3: '#EDEEF2',
  bg4: '#CED0D9',
  bg5: '#888D9B',

  // specialty colors
  modalBG: 'rgba(0,0,0,0.3)',
  advancedBG: 'rgba(255,255,255,0.6)',

  // primary colors
  primary1: '#FEE108',
  primary2: '#FEE108cc',
  primary3: '#ea9f1060',
  primary4: '#ea9f1030',
  primary5: '#FCF8F4',

  // color text
  primaryText1: '#ea9f10',

  // secondary colors
  secondary1: '#ff007a',
  secondary2: '#F6DDE8',
  secondary3: '#FDEAF1',

  // other
  red1: '#FF6871',
  red2: '#F82D3A',
  green1: '#27AE60',
  yellow1: '#FFE270',
  yellow2: '#F3841E',
  blue1: '#2172E5'
}
light.colors = lightColors

const darkColors: Colors = {
  // base
  failure: '#ED4B9E',
  primary: '#ea9f10',
  primaryBright: '#53DEE9',
  primaryDark: '#0098A1',
  success: '#662dda',
  warning: '#FFB237',

  disabled: "#524B63",
  cardBorder: "#383241",
  secondary: '#7645D9',
  background: '#100C18',
  backgroundDisabled: '#3c3742',
  contrast: '#FFFFFF',
  dropdown: '#1E1D20',
  invertedContrast: '#191326',
  input: '#483f5a',
  inputSecondary: '#66578D',
  tertiary: '#353547',
  text: '#EAE2FC',
  textDisabled: '#666171',
  textSubtle: '#ea9f10',
  textSubtleBg: '#662ddacc',
  borderColor: '#524B63',
  card: '#27262c',
  navBg: '#27262c',
  navItemBg: '#413A34',
  navText: '#FFF',
  navActivityText: '#ea9f10',
  navHover: 'rgba(65,58,52,0.8)',
  navDropdownBg: '#efefef',
  navDropdownText: '#fff',
  navDropdownBorder: '#fff',

  // Gradients
  gradients: {
    bubblegum: 'linear-gradient(#ea9f10 0%, #27262c 0%)',
    inverseBubblegum: "linear-gradient(139.73deg, #3D2A54 0%, #313D5C 100%)",
    cardHeader: "linear-gradient(166.77deg, #3B4155 0%, #3A3045 100%)",
    blue: "linear-gradient(180deg, #00707F 0%, #19778C 100%)",
    violet: "linear-gradient(180deg, #6C4999 0%, #6D4DB2 100%)",
    violetAlt: "linear-gradient(180deg, #434575 0%, #66578D 100%)",
    gold: "linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)",
  },

  // Brand colors
  binance: '#F0B90B',

  // interface
  white: '#FFFFFF',
  black: '#000000',
  // text
  text1: '#FFFFFF',
  text2: '#ea9f10',
  text3: '#6C7284',
  text4: '#565A69',
  text5: '#2C2F36',

  // backgrounds / greys
  bg1: '#212429',
  bg2: '#2C2F36',
  bg3: '#40444F',
  bg4: '#565A69',
  bg5: '#6C7284',

  // specialty colors
  modalBG: 'rgba(0,0,0,.425)',
  advancedBG: 'rgba(0,0,0,0.1)',

  // primary colors
  primary1: '#ea9f10',
  primary2: '#ea9f1080',
  primary3: '#ea9f1060',
  primary4: '#ea9f1030',
  primary5: '#FCF8F4',

  // color text
  // primaryText1: darkMode ? '#6da8ff' : '#ff007a',
  primaryText1: '#6da8ff',

  // secondary colors
  secondary1: '#2172E5',
  secondary2: '#17000b26',
  secondary3: '#17000b26',

  // other
  red1: '#FF6871',
  red2: '#F82D3A',
  green1: '#27AE60',
  yellow1: '#FFE270',
  yellow2: '#F3841E',
  blue1: '#2172E5'
}
dark.colors = darkColors

// tooltip 主题修改
const lightTooltipTheme = {
  background: '#27262c',
  text: '#ea9f10',
  boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.2), 0px 4px 12px -8px rgba(14, 14, 44, 0.1)",
}
light.tooltip = lightTooltipTheme
const darkTooltipTheme = {
  background: '#483f5a',
  text: '#ea9f10',
  boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.2), 0px 4px 12px -8px rgba(14, 14, 44, 0.1)",
}
dark.tooltip = darkTooltipTheme

// 阴影修改
const shadows = {
  level1: "0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05)",
  active: "0px 0px 0px 1px #0098A1, 0px 0px 4px 8px rgba(31, 199, 212, 0.4)",
  success: "0px 0px 0px 1px #31D0AA, 0px 0px 0px 4px rgba(49, 208, 170, 0.2)",
  warning: "0px 0px 0px 1px #ED4B9E, 0px 0px 0px 4px rgba(237, 75, 158, 0.2)",
  focus: "0px 0px 0px 1px #7645D9, 0px 0px 0px 4px rgba(118, 69, 217, 0.6)",
  inset: "inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)",
};

// 修改cardtheme
const lightCardTheme: CardTheme = {
  background: '#000',
  boxShadow: "0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05)",
  boxShadowActive: shadows.active,
  boxShadowSuccess: shadows.success,
  boxShadowWarning: shadows.warning,
  cardHeaderBackground: {
    default: "linear-gradient(111.68deg, #F2ECF2 0%, #E8F2F6 100%)",
    blue: "linear-gradient(180deg, #A7E8F1 0%, #94E1F2 100%)",
    violet: "linear-gradient(180deg, #E2C9FB 0%, #CDB8FA 100%)",
  },
  dropShadow: "drop-shadow(0px 1px 4px rgba(25, 19, 38, 0.15))",
};
light.card = lightCardTheme

const darkCardTheme: CardTheme = {
  background: darkColors.card,
  boxShadow: "0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05)",
  boxShadowActive: shadows.active,
  boxShadowSuccess: shadows.success,
  boxShadowWarning: shadows.warning,
  cardHeaderBackground: {
    default: "linear-gradient(166.77deg, #3B4155 0%, #3A3045 100%)",
    blue: "linear-gradient(180deg, #00707F 0%, #19778C 100%)",
    violet: "linear-gradient(180deg, #6C4999 0%, #6D4DB2 100%)",
  },
  dropShadow: "drop-shadow(0px 1px 4px rgba(25, 19, 38, 0.15))",
};
dark.card = darkCardTheme

const lightToggleTheme: ToggleTheme = {
  handleBackground: lightColors.card,
};
light.toggle = lightToggleTheme

const darkToggleTheme: ToggleTheme = {
  handleBackground: darkColors.card,
};
dark.toggle = darkToggleTheme
const lightModalTheme: ModalTheme = {
  background: "#000",
};
light.modal = lightModalTheme

const darkModalTheme: ModalTheme = {
  background: darkColors.card,
};
dark.modal = darkModalTheme

const lightNavTheme: NavTheme = {
  background: '#000',
  hover: '#FEE108',
}
light.nav = lightNavTheme

// 本地扩展主题
light.expandColor = {
  radius: {
    radius1: '10px',
    radius2: '40px',
    radius3: '6px',
    radius4: '20px',
    radius5: '16px',
  },
  color: {
    white: '#fff',
    black: "#000",
    pageBg: '#020202',
    transparent: 'transparent',
    active: '#FEE108',
    disable: '#ccc',
    color1: '#37362D',
    color2: '#262626',
    color3: '#6D6D6D',
    color4: '#3D3D3D',
    color5: 'rgba(0,0,0,0.4)',

    color6: '#203043bb',
    color7: '#FEE108',
    color8: '#FEE108',
    color9: '#ecf4fe',
    color10:'#8f9094'
  },
  border: {
    radius1: '6px',
    shadow1: '0px 0px 10px 4px rgba(254, 225, 8, 0.5)',
    shadow2: '0px 3px 6px rgba(130, 130, 130, 0.5)',
    shadow3: '0px 3px 6px rgba(130, 130, 130, 0.3)',
    color1: '#ccc',
    color2: '#00d4e2',
  },
}
dark.expandColor = {
  radius: {
    radius1: '10px',
    radius2: '40px',
  },
  color: {
    white: '#fff',
    black: "#000",
    pageBg: '#020202',
    transparent: 'transparent',
    active: '#FEE108',
    color1: '#3e9bbd',
    color2: '#006BD1',
    color3: '#0A0D10',
    color4: '#cccccc33',
    color5: '#006BD1bb',
    color6: '#203043bb',
    color7: '#FEE108',
    color8: '#FEE108',
    color9: '#ecf4fe',
    color10:'#8f9094'
  },
}
light.css = {
  flexColumnNoWrap: css`
    display: flex;
    flex-flow: column nowrap;
  `,
  flexRowNoWrap: css`
    display: flex;
    flex-flow: row nowrap;
  `
}
dark.css = {
  flexColumnNoWrap: css`
    display: flex;
    flex-flow: column nowrap;
  `,
  flexRowNoWrap: css`
    display: flex;
    flex-flow: row nowrap;
  `
}
export const lightConfig = light
export const darkConfig = dark
