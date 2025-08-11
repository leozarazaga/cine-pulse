import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

interface ThemeContextProviderProps {
    children: React.ReactNode;
}

const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    useEffect(() => {
        const theme = isDarkMode ? "dark" : "light";
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-theme", theme);
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode((darkMode) => !darkMode);
    };

    return(
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    ) 
};

export default ThemeContextProvider;
