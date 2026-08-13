import React from 'react';
import { motion } from 'framer-motion';
import { TopPrediction } from '../types/prediction';
import { getFruitEmoji } from '../utils/fruitThemes';
import { Award, TrendingUp } from 'lucide-react';

interface TopPredictionsProps {
  predictions: TopPrediction[];
}

const MEDALS = ['🥇', '🥈', '🥉'];
const RANK_LABELS = ['Top Match', 'Runner-up', 'Alternative'];
const RANK_COLORS = [
  { bar: 'linear-gradient(90deg, #f43f5e, #ec4899, #f97316)', glow: 'rgba(244,63,94,0.4)', text: 'text-white', badge: 'rgba(244,63,94,0.15)', badgeBorder: 'rgba(244,63,94,0.3)' },
  { bar: 'linear-gradient(90deg, #f59e0b, #fbbf24, #fcd34d)', glow: 'rgba(245,158,11,0.3)', text: 'text-amber-300', badge: 'rgba(245,158,11,0.10)', badgeBorder: 'rgba(245,158,11,0.25)' },
  { bar: 'linear-gradient(90deg, #6b7280, #9ca3af, #d1d5db)', glow: 'rgba(107,114,128,0.2)', text: 'text-slate-400', badge: 'rgba(107,114,128,0.10)', badgeBorder: 'rgba(107,114,128,0.20)' },
];

export const TopPredictions: React.FC<TopPredictionsProps> = ({ predictions }) => {
  if (!predictions || predictions.length === 0) return null;

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
          <Award className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Top Classification Probabilities
          </span>
        </div>
        <span
          className="text-[10px] font-bold text-slate-400 px-2 py-1 rounded-md font-mono"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        >
          MobileNetV2
        </span>
      </div>

      <div className="space-y-3">
        {predictions.slice(0, 3).map((item, idx) => {
          const confidencePercent = item.confidence * 100;
          const emoji = getFruitEmoji(item.class_name);
          const colors = RANK_COLORS[idx] || RANK_COLORS[2];
          const medal = MEDALS[idx] || '🏅';

          return (
            <motion.div
              key={item.class_name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + idx * 0.12, ease: 'easeOut' }}
              className="group"
            >
              <div
                className="p-3.5 rounded-xl transition-all duration-200 cursor-default"
                style={{
                  background: idx === 0 ? 'rgba(244,63,94,0.05)' : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${idx === 0 ? 'rgba(244,63,94,0.15)' : 'rgba(255,255,255,0.06)'}`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    idx === 0 ? 'rgba(244,63,94,0.08)' : 'rgba(255,255,255,0.05)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    idx === 0 ? 'rgba(244,63,94,0.05)' : 'rgba(255,255,255,0.02)';
                }}
              >
                {/* Top row */}
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-3">
                    <span className="text-xl select-none">{medal}</span>
                    <span className="text-xl">{emoji}</span>
                    <div className="flex flex-col">
                      <span className={`font-bold text-sm ${idx === 0 ? 'text-white' : 'text-slate-200'}`}>
                        {item.class_name}
                      </span>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full w-fit mt-0.5"
                        style={{
                          background: colors.badge,
                          border: `1px solid ${colors.badgeBorder}`,
                          color: idx === 0 ? '#fda4af' : idx === 1 ? '#fcd34d' : '#9ca3af',
                        }}
                      >
                        {RANK_LABELS[idx]}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {idx === 0 && (
                      <TrendingUp className="w-3.5 h-3.5 text-rose-400" />
                    )}
                    <span
                      className={`text-base font-extrabold tabular ${colors.text}`}
                      style={{ fontVariantNumeric: 'tabular-nums' }}
                    >
                      {confidencePercent.toFixed(2)}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div
                  className="w-full h-2 rounded-full overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max(confidencePercent, 3)}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 + idx * 0.15 }}
                    className="h-full rounded-full relative"
                    style={{
                      background: colors.bar,
                      boxShadow: `0 0 12px ${colors.glow}`,
                    }}
                  >
                    {/* Shimmer */}
                    {idx === 0 && (
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          background:
                            'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
                          backgroundSize: '200% 100%',
                          animation: 'shimmer 2s linear infinite',
                        }}
                      />
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
