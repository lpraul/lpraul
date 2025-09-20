'use client';

import { useEffect, useState } from 'react';
import ToggleSwitch from './ToggleSwitch';
import { useTheme } from './theme-context';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ToggleSwitch
      label="Modo"
      description={theme === 'dark' ? 'Noche neón' : 'Luz ambiente'}
      checked={theme === 'dark'}
      onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
    />
  );
}

export default ThemeToggle;
