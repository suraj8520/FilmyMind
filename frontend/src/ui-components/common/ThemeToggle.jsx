import useThemeContext from '../../contexts/useThemeContext';
import { RiMoonFill, RiSunFill } from 'react-icons/ri';

function ThemeToggle() {
  const { isDarkMode, toggleMode } = useThemeContext();
  return (
    <div
      className="fixed bottom-4 left-4 rounded-lg bg-neutral-100 p-3 shadow-md"
      onClick={toggleMode}
    >
      {isDarkMode ? (
        <RiSunFill className="text-neutral-800" size={24} />
      ) : (
        <RiMoonFill className="text-neutral-800" size={24} />
      )}
    </div>
  );
}
export default ThemeToggle;
