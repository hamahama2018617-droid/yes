import React from 'react';
import { ThemeConfig, ThemeMode } from '../types';
import { THEMES } from '../constants';

interface ThemeSwitcherProps {
  currentTheme: ThemeConfig;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, setTheme }) => {
  return (
    <div className={`flex p-1 rounded-full ${currentTheme.glassBg} border ${currentTheme.glassBorder} mb-6 mx-auto w-fit`}>
      {Object.values(THEMES).map((theme) => {
        const isActive = currentTheme.id === theme.id;
        return (
          <button
            key={theme.id}
            onClick={() => setTheme(theme.id)}
            className={`
              relative px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300
              ${isActive ? 'text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}
            `}
          >
            {isActive && (
              <div className={`absolute inset-0 rounded-full ${theme.buttonEqual} opacity-90 -z-10`} />
            )}
            {theme.name}
          </button>
        );
      })}
    </div>
  );
};

export default ThemeSwitcher;