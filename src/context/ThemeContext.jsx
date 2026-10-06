import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Inicializamos leyendo el localStorage o por defecto en modo claro (false)
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("remindme_theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      localStorage.setItem("remindme_theme", "dark");
      root.classList.add("dark");
    } else {
      localStorage.setItem("remindme_theme", "light");
      root.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};