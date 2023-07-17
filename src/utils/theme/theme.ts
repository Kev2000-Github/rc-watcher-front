import { createTheme } from "@mui/material";

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) => augmentColor({ color: { main: mainColor } });

export const theme = createTheme({
  palette: {
    primary: createColor('#0072BC'),
    secondary: createColor('#1F2631'),
    warning: createColor('#B38D38'),
    error: createColor('#F44336'),
    info: createColor('#B9BDC0'),
  },
});