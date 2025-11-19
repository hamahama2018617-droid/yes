import { ThemeConfig, ThemeMode } from './types';

export const THEMES: Record<ThemeMode, ThemeConfig> = {
  [ThemeMode.Obsidian]: {
    id: ThemeMode.Obsidian,
    name: 'Obsidian',
    bgGradient: 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900',
    glassBg: 'bg-black/40 backdrop-blur-xl',
    glassBorder: 'border-white/10',
    textPrimary: 'text-blue-50',
    textSecondary: 'text-blue-200/60',
    buttonBase: 'bg-gray-800/50 hover:bg-gray-700/50 text-white',
    buttonFunction: 'bg-blue-900/30 hover:bg-blue-800/40 text-blue-200',
    buttonOperator: 'bg-blue-600/20 hover:bg-blue-500/30 text-blue-300',
    buttonEqual: 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/40',
    accentGlow: 'shadow-blue-500/20',
  },
  [ThemeMode.Polar]: {
    id: ThemeMode.Polar,
    name: 'Polar',
    bgGradient: 'bg-gradient-to-br from-gray-100 via-blue-50 to-white',
    glassBg: 'bg-white/60 backdrop-blur-xl',
    glassBorder: 'border-white/40',
    textPrimary: 'text-gray-800',
    textSecondary: 'text-gray-500',
    buttonBase: 'bg-white/70 hover:bg-white/90 text-gray-700 border border-white/50',
    buttonFunction: 'bg-orange-100/50 hover:bg-orange-100/80 text-orange-600',
    buttonOperator: 'bg-blue-100/50 hover:bg-blue-100/80 text-blue-600',
    buttonEqual: 'bg-orange-500 hover:bg-orange-400 text-white shadow-lg shadow-orange-500/30',
    accentGlow: 'shadow-orange-500/20',
  },
  [ThemeMode.Neon]: {
    id: ThemeMode.Neon,
    name: 'Cyberpunk',
    bgGradient: 'bg-gradient-to-br from-black via-purple-900 to-black',
    glassBg: 'bg-black/70 backdrop-blur-2xl',
    glassBorder: 'border-pink-500/20',
    textPrimary: 'text-pink-50',
    textSecondary: 'text-cyan-400/70',
    buttonBase: 'bg-gray-900/60 hover:bg-gray-800/80 text-pink-500 border border-pink-500/20',
    buttonFunction: 'bg-purple-900/30 hover:bg-purple-800/40 text-purple-300 border border-purple-500/30',
    buttonOperator: 'bg-cyan-900/20 hover:bg-cyan-800/30 text-cyan-300 border border-cyan-500/30',
    buttonEqual: 'bg-pink-600 hover:bg-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]',
    accentGlow: 'shadow-pink-500/20',
  },
};

export const MAX_DIGITS = 16;