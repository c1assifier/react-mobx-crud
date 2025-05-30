import { useTheme } from "@/context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";
import styles from "./ThemeToggle.module.css";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className={styles.iconButton} onClick={toggleTheme}>
      {theme === "dark" ? <FaSun size={18} /> : <FaMoon size={18} />}
    </button>
  );
};
