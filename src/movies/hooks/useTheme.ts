import { useContext } from "react";
import { ThemeContext } from "../../contexts/theme/ThemeContext";

const useTheme = () => {
    const themeContext = useContext(ThemeContext);

    if (!themeContext) {
        throw new Error("ThemeContext must be used inside a ThemeContextProvider");
    }

    return themeContext;
};

export default useTheme;
