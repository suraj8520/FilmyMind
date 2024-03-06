import useThemeContext from '../../contexts/useThemeContext';
import { RiMoonFill, RiSunFill } from 'react-icons/ri';

function ThemeToggle() {
  const { isDarkMode, toggleMode } = useThemeContext();
  return (
    <div
      className="fixed bottom-4 left-4 rounded-lg border border-neutral-100 bg-neutral-50 p-3 shadow-full hover:cursor-pointer "
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
