import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2D5BFF", // Основной синий
    },
    secondary: {
      main: "#00E0FF", // Неоново-голубой
    },
    background: {
      default: "#0F172A", // Фон страницы
      paper: "#1E293B",   // Фон карточек, панелей
    },
    text: {
      primary: "#F8FAFC",      // Основной текст
      secondary: "#94A3B8",    // Второстепенный текст
    },
    success: {
      main: "#22C55E", // Зеленый для скидок
    },
    error: {
      main: "#F43F5E", // Красно-розовый для ошибок
    },
    warning: {
      main: "#F59E0B", // Доп. вариант для предупреждений
    },
    info: {
      main: "#00E0FF", // Совпадает с secondary
    },
  },
  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
    button: {
      textTransform: "none", // Без CAPS
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12, // Более "премиальный" скруглённый стиль
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "10px 20px",
          ':hover':{
            
          }
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        },
      },
    },
  },
});

export default theme;