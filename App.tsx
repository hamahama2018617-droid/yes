import React, { useState } from 'react';
import { ThemeMode } from './types';
import { THEMES } from './constants';
import Calculator from './components/Calculator';
import ThemeSwitcher from './components/ThemeSwitcher';

const App: React.FC = () => {
  const [activeThemeId, setActiveThemeId] = useState<ThemeMode>(ThemeMode.Obsidian);
  const theme = THEMES[activeThemeId];

  return (
    <div className={`h-[100dvh] w-full flex flex-col items-center justify-center sm:p-4 overflow-hidden transition-all duration-700 ease-in-out ${theme.bgGradient}`}>
      {/* Background decorative blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-500/20 blur-[100px] mix-blend-overlay animate-pulse duration-[4s]`} />
        <div className={`absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full ${activeThemeId === ThemeMode.Neon ? 'bg-pink-500/20' : 'bg-purple-500/20'} blur-[100px] mix-blend-overlay animate-pulse duration-[6s]`} />
      </div>

      <div className="z-10 w-full h-full sm:h-auto max-w-md flex flex-col items-center justify-center">
        <div className="mt-4 sm:mt-0 mb-2 sm:mb-4 flex flex-col items-center shrink-0">
             <h1 className={`text-2xl sm:text-3xl font-light tracking-[0.2em] mb-2 ${theme.textPrimary} opacity-80 uppercase`}>Lumina</h1>
             <ThemeSwitcher currentTheme={theme} setTheme={setActiveThemeId} />
        </div>
        
        <Calculator theme={theme} />
        
        <div className={`mt-4 mb-2 text-center text-[10px] sm:text-xs ${theme.textSecondary} opacity-50 shrink-0`}>
            <p>Offline Mode Active • No Data Collected</p>
        </div>
      </div>
    </div>
  );
};

export default App;