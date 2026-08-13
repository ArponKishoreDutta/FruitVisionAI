export interface FruitDetailedMeta {
  name: string;
  scientificName: string;
  emoji: string;
  description: string;
  season: string;
  healthBenefits: string[];
  vitaminC: string;
  potassium: string;
  accentColor: string;
  bgGradient: string;
  sampleSvg: string; // inline SVG data URI for instant sample testing
}

export const ALL_FRUIT_CLASSES = [
  'Apple',
  'Banana',
  'Burmese grape',
  'Date',
  'Jambul',
  'Lemon',
  'Lychee',
  'Mango',
  'Olive',
  'Orange',
  'Red grapes',
] as const;

export type FruitClassName = (typeof ALL_FRUIT_CLASSES)[number];

// Helper to generate colorful SVG sample fruit data URIs for instant test classification
function generateFruitSvgDataUrl(fruitName: string, emoji: string, bgHex: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
    <defs>
      <radialGradient id="bgGrad" cx="50%" cy="50%" r="75%" fx="30%" fy="30%">
        <stop offset="0%" stop-color="${bgHex}" stop-opacity="0.9" />
        <stop offset="100%" stop-color="#0c0e1a" />
      </radialGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="15" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <rect width="400" height="400" fill="url(#bgGrad)" rx="32" />
    <circle cx="200" cy="200" r="130" fill="${bgHex}" opacity="0.15" filter="url(#glow)" />
    <circle cx="200" cy="200" r="100" fill="none" stroke="${bgHex}" stroke-width="2" opacity="0.4" stroke-dasharray="8 6" />
    <text x="200" y="225" font-size="110" text-anchor="middle" dominant-baseline="middle">${emoji}</text>
    <text x="200" y="340" font-size="22" font-weight="bold" fill="#ffffff" text-anchor="middle" font-family="sans-serif">${fruitName}</text>
    <text x="200" y="365" font-size="14" font-weight="600" fill="#94a3b8" text-anchor="middle" font-family="sans-serif">FruitVision AI Sample</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const FRUIT_KNOWLEDGE_BASE: Record<string, FruitDetailedMeta> = {
  Apple: {
    name: 'Apple',
    scientificName: 'Malus domestica',
    emoji: '🍎',
    description: 'Crisp, sweet, or tart pomaceous fruit packed with soluble pectin fiber, Vitamin C, and polyphenols.',
    season: 'Autumn / Year-round',
    healthBenefits: [
      'Supports heart health and healthy cholesterol via pectin fiber',
      'Rich in quercetin and polyphenolic antioxidants for cellular defense',
      'Helps regulate blood sugar levels with a low glycemic load',
    ],
    vitaminC: '4.6 mg (8% DV)',
    potassium: '107 mg',
    accentColor: '#f43f5e',
    bgGradient: 'from-rose-500/20 via-rose-600/10 to-transparent',
    sampleSvg: generateFruitSvgDataUrl('Apple', '🍎', '#f43f5e'),
  },
  Banana: {
    name: 'Banana',
    scientificName: 'Musa spp.',
    emoji: '🍌',
    description: 'Sweet, tropical elongated fruit packed with quick natural energy, potassium, and Vitamin B6.',
    season: 'Year-round',
    healthBenefits: [
      'Excellent quick source of natural energy for workout recovery',
      'High potassium content supports electrolyte balance and healthy blood pressure',
      'Contains resistant starch aiding gut microbiota and digestive regularity',
    ],
    vitaminC: '8.7 mg (15% DV)',
    potassium: '358 mg (10% DV)',
    accentColor: '#eab308',
    bgGradient: 'from-yellow-500/20 via-amber-600/10 to-transparent',
    sampleSvg: generateFruitSvgDataUrl('Banana', '🍌', '#eab308'),
  },
  'Burmese grape': {
    name: 'Burmese grape',
    scientificName: 'Baccaurea ramiflora',
    emoji: '🍇',
    description: 'Tangy, sweet-and-sour Southeast Asian tropical fruit rich in Vitamin C, iron, and organic acids.',
    season: 'Summer (April – June)',
    healthBenefits: [
      'High Vitamin C concentration dramatically boosts immune system response',
      'Traditional Southeast Asian remedy for skin vitality and appetite enhancement',
      'Loaded with natural organic acids and protective phytochemicals',
    ],
    vitaminC: '35.0 mg (58% DV)',
    potassium: '190 mg',
    accentColor: '#a855f7',
    bgGradient: 'from-purple-500/20 via-violet-600/10 to-transparent',
    sampleSvg: generateFruitSvgDataUrl('Burmese grape', '🍇', '#a855f7'),
  },
  Date: {
    name: 'Date',
    scientificName: 'Phoenix dactylifera',
    emoji: '🌴',
    description: 'Naturally sweet, chewy stone fruit from date palm trees, packed with minerals, polyphenols, and fiber.',
    season: 'Autumn',
    healthBenefits: [
      'Dense natural sweetness providing sustained carbohydrate energy',
      'High dietary fiber content supports optimal digestive health',
      'Rich in potassium, magnesium, copper, and anti-inflammatory flavonoids',
    ],
    vitaminC: '0.4 mg',
    potassium: '656 mg (19% DV)',
    accentColor: '#d97706',
    bgGradient: 'from-amber-600/20 via-orange-700/10 to-transparent',
    sampleSvg: generateFruitSvgDataUrl('Date', '🌴', '#d97706'),
  },
  Jambul: {
    name: 'Jambul',
    scientificName: 'Syzygium cumini',
    emoji: '🫐',
    description: 'Deep purple, astringent and sweet tropical berry also known as Java plum or Jamun.',
    season: 'Monsoon / Summer (June – August)',
    healthBenefits: [
      'Contains jamboline and anthocyanins known to assist healthy glucose metabolism',
      'Potent antioxidant protection derived from deep purple anthocyanin pigments',
      'Promotes digestive wellness and oral mucosal protection',
    ],
    vitaminC: '18.0 mg (30% DV)',
    potassium: '79 mg',
    accentColor: '#8b5cf6',
    bgGradient: 'from-indigo-500/20 via-purple-600/10 to-transparent',
    sampleSvg: generateFruitSvgDataUrl('Jambul', '🫐', '#8b5cf6'),
  },
  Lemon: {
    name: 'Lemon',
    scientificName: 'Citrus limon',
    emoji: '🍋',
    description: 'Vibrant yellow, sour citrus fruit prized for its refreshing juice, zest, bioflavonoids, and citric acid.',
    season: 'Year-round',
    healthBenefits: [
      'Outstanding high-capacity source of Vitamin C for immune protection',
      'Citric acid aids kidney stone prevention and stimulates digestive enzymes',
      'Enhances iron absorption from plant-based foods',
    ],
    vitaminC: '53.0 mg (88% DV)',
    potassium: '138 mg',
    accentColor: '#facc15',
    bgGradient: 'from-yellow-400/20 via-amber-500/10 to-transparent',
    sampleSvg: generateFruitSvgDataUrl('Lemon', '🍋', '#facc15'),
  },
  Lychee: {
    name: 'Lychee',
    scientificName: 'Litchi chinensis',
    emoji: '🍒',
    description: 'Fragrant, translucent white aril fruit encased in a bumpy pinkish-red rind with floral notes.',
    season: 'Summer (May – July)',
    healthBenefits: [
      'Contains oligonol and polyphenols supporting cardiovascular circulation',
      'Exceptionally high Vitamin C concentration per serving',
      'Promotes deep cellular hydration and radiant skin tone',
    ],
    vitaminC: '71.5 mg (119% DV)',
    potassium: '171 mg',
    accentColor: '#ec4899',
    bgGradient: 'from-pink-500/20 via-rose-600/10 to-transparent',
    sampleSvg: generateFruitSvgDataUrl('Lychee', '🍒', '#ec4899'),
  },
  Mango: {
    name: 'Mango',
    scientificName: 'Mangifera indica',
    emoji: '🥭',
    description: 'Luscious, juicy tropical stone fruit celebrated worldwide as the "King of Fruits".',
    season: 'Summer (May – August)',
    healthBenefits: [
      'Abundant in beta-carotene and Vitamin A supporting vision and skin repair',
      'Contains natural digestive enzymes (amylases) that aid nutrient absorption',
      'Rich in mangiferin, a unique bioactive antioxidant',
    ],
    vitaminC: '36.4 mg (60% DV)',
    potassium: '168 mg',
    accentColor: '#f97316',
    bgGradient: 'from-orange-500/20 via-amber-600/10 to-transparent',
    sampleSvg: generateFruitSvgDataUrl('Mango', '🥭', '#f97316'),
  },
  Olive: {
    name: 'Olive',
    scientificName: 'Olea europaea',
    emoji: '🫒',
    description: 'Savory Mediterranean drupe rich in heart-healthy monounsaturated oleic acid and oleocanthal.',
    season: 'Autumn / Winter',
    healthBenefits: [
      'Monounsaturated fatty acids promote cardiovascular health and cholesterol balance',
      'Rich in Vitamin E and powerful anti-inflammatory oleocanthal',
      'Supports healthy vascular function and arterial elasticity',
    ],
    vitaminC: '0.9 mg',
    potassium: '42 mg',
    accentColor: '#84cc16',
    bgGradient: 'from-lime-500/20 via-emerald-600/10 to-transparent',
    sampleSvg: generateFruitSvgDataUrl('Olive', '🫒', '#84cc16'),
  },
  Orange: {
    name: 'Orange',
    scientificName: 'Citrus sinensis',
    emoji: '🍊',
    description: 'Juicy, sweet citrus fruit famous for its vibrant hue, refreshing flavor, and immune nutrients.',
    season: 'Winter / Year-round',
    healthBenefits: [
      'Classic high-capacity Vitamin C source for immune system defense',
      'Contains hesperidin flavonoid for vascular wellness and blood pressure regulation',
      'Dietary fiber aids digestive regularity and cholesterol balance',
    ],
    vitaminC: '53.2 mg (89% DV)',
    potassium: '181 mg',
    accentColor: '#fb923c',
    bgGradient: 'from-orange-400/20 via-amber-500/10 to-transparent',
    sampleSvg: generateFruitSvgDataUrl('Orange', '🍊', '#fb923c'),
  },
  'Red grapes': {
    name: 'Red grapes',
    scientificName: 'Vitis vinifera',
    emoji: '🍇',
    description: 'Sweet, juicy berries packed with resveratrol, anthocyanins, and polyphenolic antioxidants.',
    season: 'Autumn / Year-round',
    healthBenefits: [
      'Rich in resveratrol and anthocyanins supporting cardiovascular longevity',
      'Promotes vascular endothelium elasticity and smooth blood flow',
      'High natural moisture content aids optimal hydration',
    ],
    vitaminC: '3.2 mg (5% DV)',
    potassium: '191 mg',
    accentColor: '#c084fc',
    bgGradient: 'from-purple-400/20 via-pink-500/10 to-transparent',
    sampleSvg: generateFruitSvgDataUrl('Red grapes', '🍇', '#c084fc'),
  },
};

export function getFruitDetail(fruitName: string): FruitDetailedMeta {
  const normalized = Object.keys(FRUIT_KNOWLEDGE_BASE).find(
    (k) => k.toLowerCase() === fruitName.toLowerCase()
  );
  if (normalized && FRUIT_KNOWLEDGE_BASE[normalized]) {
    return FRUIT_KNOWLEDGE_BASE[normalized];
  }
  // Default fallback if unknown
  return {
    name: fruitName,
    scientificName: 'Fructus spec.',
    emoji: '🍎',
    description: 'Fresh fruit identified by FruitVision AI deep learning classifier.',
    season: 'Year-round',
    healthBenefits: [
      'Rich in natural vitamins, minerals, and antioxidants',
      'Supports healthy digestion and bodily hydration',
      'Provides wholesome carbohydrate energy',
    ],
    vitaminC: '15.0 mg',
    potassium: '150 mg',
    accentColor: '#f43f5e',
    bgGradient: 'from-rose-500/20 to-transparent',
    sampleSvg: generateFruitSvgDataUrl(fruitName, '🍎', '#f43f5e'),
  };
}
