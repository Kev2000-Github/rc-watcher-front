import { createTheme } from "@mui/material";
declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      danger: string;
      white: string;
      warn: string;
      gray: string;
      primary: string;
      secondary: string;
      background: string;
    },
    menu: {
      background: string;
      pressed: string
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    custom?: {
      danger?: string;
      white?: string;
      warn?: string;
      gray?: string;
      primary?: string;
      secondary?: string;
      background?: string;
    },
    menu: {
      background?: string;
      pressed?: string
    }
  }
}

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) => augmentColor({ color: { main: mainColor } });

export const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif'
    ].join(','),
    fontWeightRegular: "lighter",
  },
  palette: {
    mode: 'dark',
    primary: createColor('#0072BC'),
    secondary: createColor('#1F2631'),
    warning: createColor('#B38D38'),
    error: createColor('#F44336'),
    info: createColor('#B9BDC0'),
  },
  custom: {
    background: '#F7F7F8',
    primary: '#0072BC',
    secondary: '#1F2631',
    white: '#FBFEFF',
    danger: '#F44336',
    warn: '#B38D38',
    gray: '#B9BDC0',
  },
  menu: {
    background: '#1F2631',
    pressed: '#14181F'
  }
});