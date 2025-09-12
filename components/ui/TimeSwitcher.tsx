// components/ThemeSwitcher.jsx (atau file serupa)
'use client'; // Penting untuk App Router di Next.js

import { useState, useEffect } from 'react';

export default function ThemeSwitcher() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Periksa preferensi sistem saat komponen dimuat
  useEffect(() => {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (systemPrefersDark) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  };

  return (
    <button onClick={toggleDarkMode}>
      {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}