import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

const ThemeInitializer = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  useEffect(() => {
    // Apply the theme class on mount and when isDarkMode changes
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return null;
};

export default ThemeInitializer; 