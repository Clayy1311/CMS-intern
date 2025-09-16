// components/ThemeSwitcher.jsx
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect ini penting untuk menghindari error saat render di server (hydration mismatch)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Jika belum di-mount (masih di server), jangan render apa-apa
  if (!mounted) {
    return null;
  }

  // Fungsi untuk mengganti tema
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button onClick={toggleTheme} className="p-2">
      {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}