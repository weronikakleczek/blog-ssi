import { blue, green, grey, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6D8A96",
    },
    secondary: {
      main: "#F9F9F9",
    },
    info: {
      main: "#FFF",
    },
    success: {
      main: "#F8E9E9",
    },
  },
  typography: {
    fontFamily: "Roboto",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
  spacing: [0, 4, 8, 16, 32, 64],
});

export default theme;
