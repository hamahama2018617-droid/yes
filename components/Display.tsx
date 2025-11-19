import React, { useEffect, useRef } from 'react';
import { ThemeConfig } from '../types';
import { formatNumber } from '../utils/calculatorLogic';

interface DisplayProps {
  expression: string;
  result: string;
  theme: ThemeConfig;
  historyOpen: boolean;
  toggleHistory: () => void;
}

const Display: React.FC<DisplayProps> = ({ expression, result, theme, historyOpen, toggleHistory }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to end of expression
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [expression]);

  // Format expression for display (add spaces around ops)
  const displayExp = expression
    .replace(/\*/g, '×')
    .replace(/\//g, '÷');

  return (
    <div className={`relative w-full h-32 sm:h-40 shrink-0 flex flex-col justify-between p-4 sm:p-6 rounded-2xl sm:rounded-3xl mb-2 sm:mb-4 transition-colors duration-300 ${theme.glassBg} ${theme.glassBorder} border`}>
      {/* Top Bar: History Toggle */}
      <div className="flex justify-between items-center">
        <button 
          onClick={toggleHistory}
          className={`p-2 rounded-full transition-colors hover:bg-black/5 ${theme.textSecondary} active:scale-95`}
          title="History"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v5h5"/><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"/>
          </svg>
        </button>
        <div className={`text-[10px] sm:text-xs font-medium tracking-wider ${theme.textSecondary} opacity-60`}>
            LUMINA
        </div>
      </div>

      {/* Output Area */}
      <div className="flex flex-col items-end space-y-1 overflow-hidden">
        {/* Previous Expression / Current Input */}
        <div 
          ref={scrollRef}
          className={`w-full overflow-x-auto whitespace-nowrap scrollbar-hide text-right text-lg sm:text-xl ${result ? theme.textSecondary : theme.textPrimary} transition-colors`}
        >
          {displayExp || '0'}
        </div>

        {/* Result (if any) */}
        <div className={`text-3xl sm:text-4xl font-light tracking-tight ${theme.textPrimary} break-all line-clamp-1`}>
           {result ? formatNumber(result) : ''}
           {!result && !expression && <span className="opacity-0">0</span>} 
        </div>
      </div>
    </div>
  );
};

export default Display;