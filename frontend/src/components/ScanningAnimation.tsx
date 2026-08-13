import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Brain, Layers } from 'lucide-react';

interface ScanningAnimationProps {
  imagePreviewUrl: string | null;
}

const SCAN_STEPS = [
  { text: 'Loading image tensor...', icon: '📸', color: '#f43f5e' },
  { text: 'Extracting visual features with MobileNetV2...', icon: '🧠', color: '#a855f7' },
  { text: 'Comparing deep-learning fruit patterns...', icon: '🔍', color: '#3b82f6' },
  { text: 'Generating confidence distribution...', icon: '📊', color: '#10b981' },
  { text: 'Computing softmax probabilities...', icon: '⚡', color: '#f97316' },
];

export const ScanningAnimation: React.FC<ScanningAnimationProps> = ({ imagePreviewUrl }) => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % SCAN_STEPS.length);
    }, 900);
    return () => clearInterval(stepInterval);
  }, []);

  const currentStep = SCAN_STEPS[stepIndex];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl overflow-hidden relative"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.10)',
        backdropFilter: 'blur(24px)',
        minHeight: '440px',
      }}
    >
      {/* Background gradient pulse */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(244,63,94,0.08) 0%, rgba(168,85,247,0.06) 40%, transparent 70%)',
        }}
      />

      {/* Horizontal scan line across the whole card */}
      <motion.div
        animate={{ y: ['0%', '100%', '0%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-0 right-0 h-px pointer-events-none z-20"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(244,63,94,0.6), rgba(168,85,247,0.6), transparent)',
          boxShadow: '0 0 12px rgba(244,63,94,0.5)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center h-full gap-6">

        {/* Image + Scan Frame */}
        <div className="relative w-56 h-56 sm:w-64 sm:h-64">
          {/* Outer glow ring */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-2xl"
            style={{
              background: 'transparent',
              border: `2px solid rgba(244,63,94,0.5)`,
              boxShadow: '0 0 40px -5px rgba(244,63,94,0.4), inset 0 0 30px -10px rgba(244,63,94,0.1)',
            }}
          />

          {/* Second ring */}
          <motion.div
            animate={{ scale: [1.04, 1.12, 1.04], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            className="absolute inset-0 rounded-2xl"
            style={{ border: '1px solid rgba(168,85,247,0.3)' }}
          />

          {/* Image or placeholder */}
          <div className="w-full h-full rounded-2xl overflow-hidden relative">
            {imagePreviewUrl ? (
              <img
                src={imagePreviewUrl}
                alt="Scanning"
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.8) saturate(1.2)' }}
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-6xl"
                style={{ background: 'rgba(0,0,0,0.3)' }}
              >
                🍓
              </div>
            )}

            {/* Animated scan line */}
            <motion.div
              animate={{ top: ['0%', '95%', '0%'] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-0 right-0 h-1 z-20"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(244,63,94,0.9) 30%, rgba(168,85,247,0.9) 70%, transparent)',
                boxShadow: '0 0 20px 4px rgba(244,63,94,0.7)',
              }}
            />

            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-25 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(244,63,94,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(244,63,94,0.3) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />

            {/* Scan corners */}
            {[
              'top-2 left-2 border-t-2 border-l-2',
              'top-2 right-2 border-t-2 border-r-2',
              'bottom-2 left-2 border-b-2 border-l-2',
              'bottom-2 right-2 border-b-2 border-r-2',
            ].map((cls, i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.25 }}
                className={`absolute w-5 h-5 border-rose-400 z-30 ${cls}`}
              />
            ))}
          </div>
        </div>

        {/* Status badge */}
        <div
          className="flex items-center gap-2.5 px-5 py-2.5 rounded-full"
          style={{
            background: 'rgba(244,63,94,0.1)',
            border: '1px solid rgba(244,63,94,0.3)',
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <Cpu className="w-4 h-4 text-rose-400" />
          </motion.div>
          <span className="text-xs font-bold text-rose-300 uppercase tracking-wider">
            MobileNetV2 Neural Network Active
          </span>
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-rose-400"
          />
        </div>

        {/* Step text */}
        <div>
          <h4 className="text-xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            Analyzing your fruit...
          </h4>

          <div className="h-8 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={stepIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2"
              >
                <span className="text-lg">{currentStep.icon}</span>
                <span className="text-sm font-medium text-slate-300">
                  {currentStep.text}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Neural network progress visualization */}
        <div
          className="w-full max-w-sm rounded-2xl p-4"
          style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-500 font-mono font-semibold uppercase tracking-wider">Layer Processing</span>
            <Layers className="w-3.5 h-3.5 text-slate-500" />
          </div>
          {/* Layer bars */}
          <div className="space-y-2">
            {['Input (224×224×3)', 'MobileNetV2 Blocks', 'Dense (11 classes)', 'Softmax Output'].map((layer, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[10px] text-slate-500 font-mono w-28 truncate flex-shrink-0">{layer}</span>
                <div
                  className="flex-1 h-1.5 rounded-full overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  <motion.div
                    animate={{ width: ['0%', '100%', '0%'] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.25,
                    }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${
                        ['#f43f5e', '#a855f7', '#3b82f6', '#10b981'][i]
                      }, ${['#ec4899', '#8b5cf6', '#6366f1', '#34d399'][i]})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Loading shimmer bar */}
        <div
          className="w-52 h-1.5 rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        >
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1/2 h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(244,63,94,0.8), rgba(168,85,247,0.8), transparent)',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};
