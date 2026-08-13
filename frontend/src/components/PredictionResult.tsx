import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { PredictResponse } from '../types/prediction';
import { getFruitTheme } from '../utils/fruitThemes';
import { TopPredictions } from './TopPredictions';
import { FruitNutrition } from './FruitNutrition';
import { RefreshCw, CheckCircle2, Zap, Star, Trophy } from 'lucide-react';

interface PredictionResultProps {
  result: PredictResponse;
  imagePreviewUrl: string | null;
  onReset: () => void;
}

export const PredictionResult: React.FC<PredictionResultProps> = ({
  result,
  imagePreviewUrl,
  onReset,
}) => {
  const [animatedConfidence, setAnimatedConfidence] = useState(0);
  const targetConfidence = result.confidence * 100;
  const theme = getFruitTheme(result.prediction);

  // Confetti + count-up on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#f43f5e', '#f97316', '#a855f7', '#10b981', '#fbbf24', '#3b82f6'],
        shapes: ['circle', 'square'],
        scalar: 1.1,
      });
      // Second burst
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: ['#f43f5e', '#fbbf24', '#a855f7'],
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: ['#f43f5e', '#fbbf24', '#a855f7'],
        });
      }, 300);
    } catch {
      // Graceful fallback
    }

    // Animate confidence number
    let start = 0;
    const duration = 1400;
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = targetConfidence / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetConfidence) {
        setAnimatedConfidence(targetConfidence);
        clearInterval(timer);
      } else {
        setAnimatedConfidence(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [targetConfidence]);

  const circumference = 2 * Math.PI * 40; // radius = 40
  const strokeDashoffset = circumference - (animatedConfidence / 100) * circumference;

  const confidenceLevel =
    targetConfidence >= 85
      ? { label: 'Very High', color: '#10b981' }
      : targetConfidence >= 70
      ? { label: 'High', color: '#22c55e' }
      : targetConfidence >= 50
      ? { label: 'Medium', color: '#f59e0b' }
      : { label: 'Low', color: '#f43f5e' };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.93, y: -10 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="rounded-3xl overflow-hidden relative"
      style={{
        background: `linear-gradient(135deg, rgba(6,8,16,0.95) 0%, ${theme.gradient
          .replace('from-', '')
          .split(' ')[0]
          .replace(/\/\d+/g, '')}08 100%)`,
        border: `1px solid ${theme.borderColor.replace('border-', '').replace(/\/\d+/g, '')}30`,
        backdropFilter: 'blur(24px)',
        boxShadow: theme.glow.replace('shadow-[', '').replace(']', ''),
      }}
    >
      {/* Background mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top left, ${theme.accentColor}12 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 p-6 sm:p-8">

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-6 pb-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${theme.accentColor}20`, border: `1px solid ${theme.accentColor}40` }}
            >
              <Trophy className="w-5 h-5" style={{ color: theme.accentColor }} />
            </motion.div>
            <div>
              <h3 className="text-lg font-extrabold text-white">✨ AI Classification Result</h3>
              <p className="text-xs text-slate-400">MobileNetV2 · Image successfully classified</p>
            </div>
          </div>

          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-slate-200 hover:text-white transition-all"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)';
            }}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Scan Again</span>
          </button>
        </div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left: Image */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center gap-4">
            <div className="relative w-full max-w-[240px] aspect-square">
              {/* Glow ring */}
              <motion.div
                animate={{ scale: [1, 1.04, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'transparent',
                  boxShadow: `0 0 50px -10px ${theme.accentColor}`,
                  border: `2px solid ${theme.accentColor}50`,
                }}
              />

              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                {imagePreviewUrl ? (
                  <img
                    src={imagePreviewUrl}
                    alt={result.prediction}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-8xl"
                    style={{ background: `${theme.accentColor}10` }}
                  >
                    {theme.emoji}
                  </div>
                )}
              </div>

              {/* Emoji badge */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 250 }}
                className="absolute -bottom-4 -right-4 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-2xl"
                style={{
                  background: 'rgba(10,12,24,0.9)',
                  border: `2px solid ${theme.accentColor}60`,
                  boxShadow: `0 0 20px -5px ${theme.accentColor}`,
                }}
              >
                {theme.emoji}
              </motion.div>
            </div>

            {/* Confidence level label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: `${confidenceLevel.color}15`,
                border: `1px solid ${confidenceLevel.color}30`,
              }}
            >
              <Star className="w-3.5 h-3.5" style={{ color: confidenceLevel.color }} />
              <span className="text-xs font-bold" style={{ color: confidenceLevel.color }}>
                {confidenceLevel.label} Confidence
              </span>
            </motion.div>
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-8 flex flex-col gap-5">

            {/* Prediction name + scientific + confidence ring */}
            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider"
                    style={{
                      background: `${theme.accentColor}20`,
                      border: `1px solid ${theme.accentColor}40`,
                      color: theme.accentColor,
                    }}
                  >
                    Top Prediction
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <span>{theme.emoji}</span>
                  <span>{result.prediction}</span>
                </h2>

                {result.fruit?.scientific_name && (
                  <p className="text-sm italic text-slate-400 mt-1 font-serif">
                    <em>{result.fruit.scientific_name}</em>
                  </p>
                )}
              </div>

              {/* Circular gauge */}
              <div
                className="flex items-center gap-4 p-4 rounded-2xl flex-shrink-0"
                style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="relative w-20 h-20">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50" cy="50" r="40"
                      fill="transparent"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="8"
                    />
                    <motion.circle
                      cx="50" cy="50" r="40"
                      fill="transparent"
                      stroke={theme.accentColor}
                      strokeWidth="8"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      style={{
                        filter: `drop-shadow(0 0 6px ${theme.accentColor})`,
                      }}
                      transition={{ duration: 1.4, ease: 'easeOut' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-sm font-extrabold text-white" style={{ fontVariantNumeric: 'tabular-nums' }}>
                      {animatedConfidence.toFixed(1)}%
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-slate-400 mt-0.5">Match</span>
                  </div>
                </div>

                <div className="hidden sm:flex flex-col">
                  <span className="text-xs text-slate-400 font-medium">AI Confidence</span>
                  <span className="text-xl font-extrabold text-white" style={{ fontVariantNumeric: 'tabular-nums' }}>
                    {animatedConfidence.toFixed(2)}%
                  </span>
                  <div className="flex items-center gap-1 mt-1">
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span className="text-xs text-slate-400">Softmax score</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Top predictions */}
            {result.top_predictions && result.top_predictions.length > 0 && (
              <TopPredictions predictions={result.top_predictions} />
            )}

            {/* Nutrition */}
            {result.nutrition && (
              <FruitNutrition nutrition={result.nutrition} accentColor={theme.accentColor} />
            )}
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="mt-8 pt-5 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 max-w-lg leading-relaxed">
            ⚠️ Confidence represents model prediction probability and may not guarantee correctness. For dietary decisions, consult a professional.
          </p>
          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={onReset}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-white font-extrabold text-sm flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #f43f5e, #ec4899, #f97316)',
              boxShadow: '0 4px 20px -4px rgba(244,63,94,0.5)',
            }}
          >
            <RefreshCw className="w-4 h-4" />
            <span>🔄 Scan Another Fruit</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
