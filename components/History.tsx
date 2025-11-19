import React, { useState } from 'react';
import { HistoryItem, ThemeConfig } from '../types';

interface HistoryProps {
  isOpen: boolean;
  history: HistoryItem[];
  onClose: () => void;
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
  theme: ThemeConfig;
}

const History: React.FC<HistoryProps> = ({ isOpen, history, onClose, onSelect, onClear, theme }) => {
  return (
    <div 
      className={`
        absolute inset-y-0 left-0 w-3/4 sm:w-64 z-20 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        ${theme.glassBg} backdrop-blur-2xl border-r ${theme.glassBorder} shadow-2xl
        flex flex-col
      `}
    >
      <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 shrink-0">
        <h3 className={`text-lg font-semibold ${theme.textPrimary}`}>History</h3>
        <button onClick={onClose} className={`p-2 rounded-full hover:bg-black/10 ${theme.textPrimary}`}>
           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {history.length === 0 ? (
          <div className={`text-center mt-10 ${theme.textSecondary}`}>No history yet</div>
        ) : (
          history.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item)}
              className={`w-full text-right p-3 rounded-xl transition-colors hover:bg-white/5 border border-transparent hover:border-white/10 group`}
            >
              <div className={`text-sm mb-1 ${theme.textSecondary} break-all`}>{item.expression} =</div>
              <div className={`text-lg font-medium ${theme.textPrimary} group-hover:scale-105 origin-right transition-transform break-all`}>{item.result}</div>
            </button>
          ))
        )}
      </div>

      {history.length > 0 && (
        <div className="p-4 border-t border-white/10 shrink-0">
          <button
            onClick={onClear}
            className={`w-full py-3 px-4 rounded-xl text-sm font-medium transition-colors ${theme.textSecondary} hover:bg-red-500/10 hover:text-red-500`}
          >
            Clear History
          </button>
        </div>
      )}
    </div>
  );
};

export default History;