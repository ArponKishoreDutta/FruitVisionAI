import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { NutritionData } from '../types/prediction';
import { Flame, Activity, Wheat, HeartPulse, Droplets, Dumbbell } from 'lucide-react';

interface FruitNutritionProps {
  nutrition: NutritionData;
  accentColor: string;
}

interface NutritionItem {
  label: string;
  value: number;
  unit: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  border: string;
  barColor: string;
  max: number; // for relative bar width
}

// Animated number hook
function useAnimatedNumber(target: number, duration = 1000) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let start = 0;
    const totalSteps = duration / 20;
    const increment = target / totalSteps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCurrent(target);
        clearInterval(timer);
      } else {
        setCurrent(start);
      }
    }, 20);
    return () => clearInterval(timer);
  }, [target, duration]);

  return current;
}

const NutritionCard: React.FC<{ item: NutritionItem; delay: number }> = ({ item, delay }) => {
  const animatedValue = useAnimatedNumber(item.value, 1200);
  const Icon = item.icon;
  const barWidth = Math.min((item.value / item.max) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, ease: 'easeOut' }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative p-4 rounded-2xl overflow-hidden cursor-default transition-shadow duration-200"
      style={{
        background: item.bg,
        border: `1px solid ${item.border}`,
        backdropFilter: 'blur(12px)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = `0 8px 30px -8px ${item.border}`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = 'none';
      }}
    >
      {/* Icon */}
      <div className="flex items-center justify-between mb-3">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: item.bg, border: `1px solid ${item.border}` }}
        >
          <Icon className={`w-4 h-4 ${item.color}`} />
        </div>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{item.label}</span>
      </div>

      {/* Value */}
      <div className="mb-3">
        <span
          className="text-xl font-extrabold text-white"
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {item.value % 1 === 0
            ? Math.round(animatedValue).toString()
            : animatedValue.toFixed(1)}
        </span>
        <span className="text-xs text-slate-400 font-medium ml-1">{item.unit}</span>
      </div>

      {/* Mini bar */}
      <div
        className="w-full h-1 rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${barWidth}%` }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: delay + 0.2 }}
          className="h-full rounded-full"
          style={{ background: item.barColor }}
        />
      </div>
    </motion.div>
  );
};

export const FruitNutrition: React.FC<FruitNutritionProps> = ({ nutrition }) => {
  const items: NutritionItem[] = [
    {
      label: 'Calories',
      value: nutrition.calories,
      unit: 'kcal',
      icon: Flame,
      color: 'text-orange-400',
      bg: 'rgba(249,115,22,0.08)',
      border: 'rgba(249,115,22,0.20)',
      barColor: 'linear-gradient(90deg, #f97316, #fb923c)',
      max: 400,
    },
    {
      label: 'Carbs',
      value: nutrition.carbs,
      unit: 'g',
      icon: Wheat,
      color: 'text-amber-400',
      bg: 'rgba(245,158,11,0.08)',
      border: 'rgba(245,158,11,0.20)',
      barColor: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
      max: 50,
    },
    {
      label: 'Sugar',
      value: nutrition.sugar,
      unit: 'g',
      icon: Droplets,
      color: 'text-pink-400',
      bg: 'rgba(236,72,153,0.08)',
      border: 'rgba(236,72,153,0.20)',
      barColor: 'linear-gradient(90deg, #ec4899, #f472b6)',
      max: 30,
    },
    {
      label: 'Fiber',
      value: nutrition.fiber,
      unit: 'g',
      icon: HeartPulse,
      color: 'text-emerald-400',
      bg: 'rgba(16,185,129,0.08)',
      border: 'rgba(16,185,129,0.20)',
      barColor: 'linear-gradient(90deg, #10b981, #34d399)',
      max: 20,
    },
    {
      label: 'Protein',
      value: nutrition.protein,
      unit: 'g',
      icon: Dumbbell,
      color: 'text-sky-400',
      bg: 'rgba(14,165,233,0.08)',
      border: 'rgba(14,165,233,0.20)',
      barColor: 'linear-gradient(90deg, #0ea5e9, #38bdf8)',
      max: 15,
    },
    {
      label: 'Fat',
      value: nutrition.fat,
      unit: 'g',
      icon: Activity,
      color: 'text-purple-400',
      bg: 'rgba(168,85,247,0.08)',
      border: 'rgba(168,85,247,0.20)',
      barColor: 'linear-gradient(90deg, #a855f7, #c084fc)',
      max: 15,
    },
  ];

  return (
    <div
      className="w-full rounded-2xl p-5"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/8">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-rose-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Nutrition Profile
          </span>
        </div>
        <span
          className="text-[10px] font-bold text-slate-400 px-2 py-1 rounded-md font-mono"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        >
          per 100g · USDA
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {items.map((item, idx) => (
          <NutritionCard key={item.label} item={item} delay={idx * 0.08} />
        ))}
      </div>
    </div>
  );
};
