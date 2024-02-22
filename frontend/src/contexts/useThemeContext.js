import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';

export default function useThemeContext() {
  const values = useContext(ThemeContext);
  if (!values)
    throw new Error('Context is being accessed outside the context tree');
  return values;
}
