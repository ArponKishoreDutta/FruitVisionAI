import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { PredictResponse } from '../types/prediction';
import { getFruitTheme } from '../utils/fruitThemes';
import { getFruitDetail } from '../utils/fruitData';
import { TopPredictions } from './TopPredictions';
import { FruitNutrition } from './FruitNutrition';
import { RefreshCw, CheckCircle2, Zap, Star, Trophy, Copy, Check, HeartPulse, Calendar, Info } from 'lucide-react';

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
  const [copied, setCopied] = useState(false);

  const targetConfidence = result.confidence * 100;
  const theme = getFruitTheme(result.prediction);
  const fruitMeta = getFruitDetail(result.prediction);

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

  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (animatedConfidence / 100) * circumference;

  const confidenceLevel =
    targetConfidence >= 85
      ? { label: 'Very High', color: '#10b981' }
      : targetConfidence >= 70
      ? { label: 'High', color: '#22c55e' }
      : targetConfidence >= 50
      ? { label: 'Medium', color: '#f59e0b' }
      : { label: 'Low', color: '#f43f5e' };

  const handleCopySummary = () => {
    const summary = `FruitVision AI Result:\nClassified Fruit: ${result.prediction} (${fruitMeta.scientificName})\nConfidence: ${targetConfidence.toFixed(2)}%\nCalories: ${result.nutrition.calories} kcal | Carbs: ${result.nutrition.carbs}g | Sugar: ${result.nutrition.sugar}g`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.93, y: -10 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="rounded-3xl overflow-hidden relative"
      style={{
        background: `linear-gradient(135deg, rgba(6,8,16,0.95) 0%, ${theme.accentColor}12 100%)`,
        border: `1.5px solid ${theme.accentColor}40`,
        backdropFilter: 'blur(24px)',
        boxShadow: `0 25px 70px -15px ${theme.accentColor}35`,
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at top left, ${theme.accentColor}15 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10 p-6 sm:p-8">
        {/* Header Bar */}
        <div className="flex items-center justify-between mb-6 pb-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${theme.accentColor}20`, border: `1px solid ${theme.accentColor}40` }}
            >
              <Trophy className="w-5 h-5" style={{ color: theme.accentColor }} />
            </motion.div>
            <div>
              <h3 className="text-lg font-extrabold text-white">✨ AI Classification Result</h3>
              <p className="text-xs text-slate-400">MobileNetV2 Neural Network Prediction</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-200 hover:text-white transition-all bg-white/5 border border-white/10 hover:bg-white/10"
              title="Copy analysis summary to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
            </button>

            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-slate-200 hover:text-white transition-all bg-white/10 border border-white/15 hover:bg-white/20"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Scan Again</span>
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Image & Confidence */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center gap-4">
            <div className="relative w-full max-w-[240px] aspect-square">
              <motion.div
                animate={{ scale: [1, 1.04, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-2xl"
                style={{
                  boxShadow: `0 0 50px -10px ${theme.accentColor}`,
                  border: `2px solid ${theme.accentColor}50`,
                }}
              />

              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black/40">
                {imagePreviewUrl ? (
                  <img
                    src={imagePreviewUrl}
                    alt={result.prediction}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-8xl">
                    {fruitMeta.emoji}
                  </div>
                )}
              </div>

              {/* Emoji badge */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="absolute -bottom-3 -right-3 w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-2xl"
                style={{
                  background: 'rgba(10,12,24,0.95)',
                  border: `2px solid ${theme.accentColor}60`,
                }}
              >
                {fruitMeta.emoji}
              </motion.div>
            </div>

            {/* Confidence pill */}
            <div
              className="flex items-center gap-2 px-4 py-1.5 rounded-full"
              style={{
                background: `${confidenceLevel.color}18`,
                border: `1px solid ${confidenceLevel.color}40`,
              }}
            >
              <Star className="w-3.5 h-3.5" style={{ color: confidenceLevel.color }} />
              <span className="text-xs font-bold" style={{ color: confidenceLevel.color }}>
                {confidenceLevel.label} Match Quality
              </span>
            </div>
          </div>

          {/* Right: Detailed Analysis */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            {/* Primary Classification & Gauge */}
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
                    Top Classification
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <span>{fruitMeta.emoji}</span>
                  <span>{result.prediction}</span>
                </h2>

                <p className="text-sm italic text-slate-400 mt-1 font-serif">
                  {result.fruit?.scientific_name || fruitMeta.scientificName}
                </p>
              </div>

              {/* Radial Gauge */}
              <div
                className="flex items-center gap-4 p-4 rounded-2xl flex-shrink-0"
                style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.08)' }}
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
                      transition={{ duration: 1.4, ease: 'easeOut' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-sm font-extrabold text-white">
                      {animatedConfidence.toFixed(1)}%
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-slate-400">Score</span>
                  </div>
                </div>

                <div className="hidden sm:flex flex-col">
                  <span className="text-xs text-slate-400 font-medium">Confidence Score</span>
                  <span className="text-xl font-extrabold text-white">
                    {animatedConfidence.toFixed(2)}%
                  </span>
                  <div className="flex items-center gap-1 mt-1">
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span className="text-xs text-slate-400">MobileNetV2 Softmax</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description & Health Benefits */}
            <div
              className="p-5 rounded-2xl space-y-4"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="flex items-center justify-between border-b border-white/8 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-rose-400" /> About {result.prediction}
                </span>
                <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Season: {fruitMeta.season}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {fruitMeta.description}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300 mb-2 flex items-center gap-1.5">
                  <HeartPulse className="w-4 h-4 text-rose-400" /> Key Health Benefits:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {fruitMeta.healthBenefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Top Predictions */}
            {result.top_predictions && result.top_predictions.length > 0 && (
              <TopPredictions predictions={result.top_predictions} />
            )}

            {/* Nutrition */}
            {result.nutrition && (
              <FruitNutrition nutrition={result.nutrition} accentColor={theme.accentColor} />
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 max-w-lg leading-relaxed">
            ⚠️ Disclaimer: Prediction confidence represents neural network probability and is provided for informational and educational purposes.
          </p>
          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={onReset}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl text-white font-extrabold text-sm flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #f43f5e, #ec4899, #f97316)',
              boxShadow: '0 4px 20px -4px rgba(244,63,94,0.5)',
            }}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Scan Another Fruit</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
