import { Moon, SunMedium } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="btn-secondary gap-2" onClick={toggleTheme} type="button">
      {theme === "dark" ? <SunMedium size={18} /> : <Moon size={18} />}
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
};

export default ThemeToggle;
