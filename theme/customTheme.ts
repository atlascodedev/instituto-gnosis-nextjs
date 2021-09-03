import { createTheme } from "@material-ui/core";

const theme = createTheme({
  palette: {
    primary: {
      main: "#002946",
    },
    secondary: {
      main: "#FF9700",
    },
  },
  typography: {
    h1: {
      fontSize: "34px",

      "@media (min-width: 1024px)": {
        fontSize: "48px",
      },
    },

    h4: {
      fontSize: "14px",

      "@media (min-width: 1024px)": {
        fontSize: "20px",
      },
    },
  },
});

export default theme;
