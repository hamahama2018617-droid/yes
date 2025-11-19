export enum ThemeMode {
  Obsidian = 'OBSIDIAN',
  Polar = 'POLAR',
  Neon = 'NEON'
}

export interface ThemeConfig {
  id: ThemeMode;
  name: string;
  bgGradient: string;
  glassBg: string;
  glassBorder: string;
  textPrimary: string;
  textSecondary: string;
  buttonBase: string;
  buttonFunction: string;
  buttonOperator: string;
  buttonEqual: string;
  accentGlow: string;
}

export interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

export type CalculatorMode = 'STANDARD' | 'SCIENTIFIC';

export interface CalculatorState {
  expression: string; // The current math string being built
  result: string; // The calculated preview or final result
  history: HistoryItem[];
  isScientific: boolean;
  justCalculated: boolean; // To know if we should clear on next number input
}