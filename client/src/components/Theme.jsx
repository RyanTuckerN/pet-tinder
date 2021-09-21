import { createTheme } from "@material-ui/core";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#251f1f",
    },
    secondary: {
      main: "#fd2974",
      light: "#ff5864",
      dark: "#ff655b",
    },
    background: {
      default: "#f3f0ee",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Montserrat",
    h1: {
      fontSize: "4rem",
      fontWeight: 400,
    },
    h2: {
      fontFamily: "Montserrat",
      fontSize: "3.4rem",
    },
    h5: {
      fontFamily: "Montserrat",
    },
    h4: {
      fontFamily: "Montserrat",
    },
    h6: {
      fontFamily: "Montserrat",
    },
    subtitle1: {
      fontFamily: "Ubuntu",
    },
    subtitle2: {
      fontFamily: "Ubuntu",
    },
    body1: {
      fontFamily: "Ubuntu",
      fontSize: ".75rem",
    },
    body2: {
      fontFamily: "Ubuntu",
    },
    button: {
      fontFamily: "Ubuntu",
    },
    caption: {
      fontFamily: "Ubuntu",
    },
    overline: {
      fontFamily: "Ubuntu",
    },
  },
});

export default theme;
