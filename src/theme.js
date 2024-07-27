import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  shadows: [
    "none", // 0 - без тени
    "0px 2px 4px rgba(0, 0, 0, 0.2)", // 1
    "0px 3px 6px rgba(0, 0, 0, 0.16)", // 2
    "0px 4px 8px rgba(0, 0, 0, 0.12)", // 3
    "0px 5px 10px rgba(0, 0, 0, 0.1)",  // 4
    // Добавьте больше значений по необходимости
  ],
  palette: {
    primary: {
      main: "#4361ee",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: 400,
    },
  },
});
