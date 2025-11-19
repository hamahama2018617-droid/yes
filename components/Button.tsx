import React from 'react';

interface ButtonProps {
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
  variant?: 'base' | 'function' | 'operator' | 'equal';
  colSpan?: number;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className = '', variant = 'base', colSpan = 1 }) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-xl sm:rounded-2xl 
        text-base sm:text-lg font-medium 
        transition-all duration-200 active:scale-90 sm:active:scale-95
        flex items-center justify-center select-none outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-400
        touch-manipulation
        ${colSpan > 1 ? `col-span-${colSpan}` : ''}
        ${className}
        h-full min-h-[3.5rem] sm:min-h-[4rem]
      `}
      style={{ gridColumn: colSpan > 1 ? `span ${colSpan} / span ${colSpan}` : undefined }}
    >
      {label}
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
    </button>
  );
};

export default React.memo(Button);