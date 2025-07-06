import { HiSun, HiMoon } from "react-icons/hi";
import { useTheme } from "../../hooks/useTheme";
import "./ThemeToggle.styles.scss";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      {theme === "light" ? <HiMoon size={24} /> : <HiSun size={24} />}
    </button>
  );
};

export default ThemeToggle;