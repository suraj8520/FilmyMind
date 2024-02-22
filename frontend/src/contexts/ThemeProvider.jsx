import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia('(prefers-color-scheme:dark)').matches,
  );

  const toggleMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    document.documentElement.classList.add(
      isDarkMode ? 'dark-mode' : 'light-mode',
    );
    document.documentElement.classList.remove(
      !isDarkMode ? 'dark-mode' : 'light-mode',
    );
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
export default ThemeProvider;
