export interface FruitTheme {
  emoji: string;
  gradient: string;
  glow: string;
  badgeBg: string;
  badgeText: string;
  accentColor: string;
  textColor: string;
  borderColor: string;
}

export const DEFAULT_THEME: FruitTheme = {
  emoji: '🍓',
  gradient: 'from-pink-500/20 via-rose-500/20 to-orange-500/20',
  glow: 'shadow-[0_0_50px_-10px_rgba(244,63,94,0.4)]',
  badgeBg: 'bg-rose-500/20',
  badgeText: 'text-rose-300',
  accentColor: '#F43F5E',
  textColor: 'text-rose-400',
  borderColor: 'border-rose-500/40',
};

const THEME_MAP: Record<string, FruitTheme> = {
  'Apple': {
    emoji: '🍎',
    gradient: 'from-red-500/25 via-rose-600/20 to-emerald-500/20',
    glow: 'shadow-[0_0_50px_-10px_rgba(239,68,68,0.4)]',
    badgeBg: 'bg-red-500/20',
    badgeText: 'text-red-300',
    accentColor: '#EF4444',
    textColor: 'text-red-400',
    borderColor: 'border-red-500/40',
  },
  'Banana': {
    emoji: '🍌',
    gradient: 'from-amber-400/25 via-yellow-500/20 to-amber-600/20',
    glow: 'shadow-[0_0_50px_-10px_rgba(245,158,11,0.4)]',
    badgeBg: 'bg-amber-500/20',
    badgeText: 'text-amber-300',
    accentColor: '#F59E0B',
    textColor: 'text-amber-400',
    borderColor: 'border-amber-500/40',
  },
  'Burmese grape': {
    emoji: '🍇',
    gradient: 'from-lime-400/25 via-emerald-500/20 to-teal-500/20',
    glow: 'shadow-[0_0_50px_-10px_rgba(16,185,129,0.4)]',
    badgeBg: 'bg-emerald-500/20',
    badgeText: 'text-emerald-300',
    accentColor: '#10B981',
    textColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/40',
  },
  'Date': {
    emoji: '🌴',
    gradient: 'from-amber-700/25 via-orange-800/20 to-amber-900/20',
    glow: 'shadow-[0_0_50px_-10px_rgba(180,83,9,0.4)]',
    badgeBg: 'bg-amber-800/20',
    badgeText: 'text-amber-200',
    accentColor: '#D97706',
    textColor: 'text-amber-400',
    borderColor: 'border-amber-600/40',
  },
  'Jambul': {
    emoji: '🫐',
    gradient: 'from-purple-600/25 via-indigo-700/20 to-violet-800/20',
    glow: 'shadow-[0_0_50px_-10px_rgba(147,51,234,0.4)]',
    badgeBg: 'bg-purple-600/20',
    badgeText: 'text-purple-300',
    accentColor: '#9333EA',
    textColor: 'text-purple-400',
    borderColor: 'border-purple-500/40',
  },
  'Lemon': {
    emoji: '🍋',
    gradient: 'from-yellow-300/30 via-amber-400/20 to-lime-400/20',
    glow: 'shadow-[0_0_50px_-10px_rgba(234,179,8,0.4)]',
    badgeBg: 'bg-yellow-400/20',
    badgeText: 'text-yellow-200',
    accentColor: '#EAB308',
    textColor: 'text-yellow-300',
    borderColor: 'border-yellow-400/40',
  },
  'Lychee': {
    emoji: '🍒',
    gradient: 'from-pink-500/25 via-rose-400/20 to-red-400/20',
    glow: 'shadow-[0_0_50px_-10px_rgba(244,63,94,0.4)]',
    badgeBg: 'bg-pink-500/20',
    badgeText: 'text-pink-300',
    accentColor: '#EC4899',
    textColor: 'text-pink-400',
    borderColor: 'border-pink-400/40',
  },
  'Mango': {
    emoji: '🥭',
    gradient: 'from-orange-400/25 via-amber-500/20 to-yellow-500/20',
    glow: 'shadow-[0_0_50px_-10px_rgba(249,115,22,0.4)]',
    badgeBg: 'bg-orange-500/20',
    badgeText: 'text-orange-300',
    accentColor: '#F97316',
    textColor: 'text-orange-400',
    borderColor: 'border-orange-400/40',
  },
  'Olive': {
    emoji: '🫒',
    gradient: 'from-emerald-600/25 via-green-700/20 to-teal-800/20',
    glow: 'shadow-[0_0_50px_-10px_rgba(5,150,105,0.4)]',
    badgeBg: 'bg-emerald-600/20',
    badgeText: 'text-emerald-200',
    accentColor: '#059669',
    textColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/40',
  },
  'Orange': {
    emoji: '🍊',
    gradient: 'from-orange-500/25 via-amber-500/20 to-red-500/20',
    glow: 'shadow-[0_0_50px_-10px_rgba(255,140,0,0.4)]',
    badgeBg: 'bg-orange-500/20',
    badgeText: 'text-orange-300',
    accentColor: '#FF8C00',
    textColor: 'text-orange-400',
    borderColor: 'border-orange-500/40',
  },
  'Red grapes': {
    emoji: '🍇',
    gradient: 'from-purple-500/25 via-violet-600/20 to-pink-600/20',
    glow: 'shadow-[0_0_50px_-10px_rgba(168,85,247,0.4)]',
    badgeBg: 'bg-purple-500/20',
    badgeText: 'text-purple-300',
    accentColor: '#A855F7',
    textColor: 'text-purple-400',
    borderColor: 'border-purple-500/40',
  },
};

export function getFruitTheme(fruitName: string): FruitTheme {
  if (!fruitName) return DEFAULT_THEME;
  // Case-insensitive lookup fallback
  const key = Object.keys(THEME_MAP).find(
    (k) => k.toLowerCase() === fruitName.trim().toLowerCase()
  );
  return key ? THEME_MAP[key] : DEFAULT_THEME;
}

export function getFruitEmoji(fruitName: string): string {
  return getFruitTheme(fruitName).emoji;
}
