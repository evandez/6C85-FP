import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: "#ff1744",
    },
    background: {
      default: "#fff",
    },
  },
  typography: {
    fontFamily: ['"Open Sans"', '"Helvetica Neue"', "Arial", "sans-serif"].join(
      ","
    ),
  },
  // You can add more customizations here
});

export default theme;
