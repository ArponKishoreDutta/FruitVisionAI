import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, CheckCircle2, ShieldCheck, Flame, Brain, Upload, Eye } from 'lucide-react';

const CYCLING_WORDS = ['Identify', 'Classify', 'Discover', 'Analyze'];

interface HeroProps {
  onStartScanning: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartScanning }) => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % CYCLING_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Zap,
      label: 'Instant Vision',
      sub: 'Sub-second inference',
      color: 'text-amber-400',
      bg: 'rgba(245,158,11,0.1)',
      border: 'rgba(245,158,11,0.2)',
    },
    {
      icon: Flame,
      label: '11 Fruit Classes',
      sub: 'Fine-tuned MobileNetV2',
      color: 'text-rose-400',
      bg: 'rgba(244,63,94,0.1)',
      border: 'rgba(244,63,94,0.2)',
    },
    {
      icon: ShieldCheck,
      label: 'Confidence Score',
      sub: 'Top-3 predictions',
      color: 'text-emerald-400',
      bg: 'rgba(16,185,129,0.1)',
      border: 'rgba(16,185,129,0.2)',
    },
    {
      icon: CheckCircle2,
      label: 'Nutrition Data',
      sub: 'Per 100g breakdown',
      color: 'text-sky-400',
      bg: 'rgba(14,165,233,0.1)',
      border: 'rgba(14,165,233,0.2)',
    },
  ];

  return (
    <section id="hero" className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden">

      {/* Extra orb for hero depth */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center top, rgba(244,63,94,0.18) 0%, rgba(168,85,247,0.10) 40%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

        {/* ── Top Badge ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border mb-8"
          style={{
            background: 'linear-gradient(135deg, rgba(244,63,94,0.1), rgba(168,85,247,0.1))',
            borderColor: 'rgba(244,63,94,0.3)',
            boxShadow: '0 0 30px -8px rgba(244,63,94,0.3)',
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-4 h-4 text-rose-400" />
          </motion.div>
          <span className="text-xs sm:text-sm font-bold text-rose-300 tracking-wider uppercase">
            Next-Gen Fruit Recognition Engine
          </span>
          <span
            className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full text-white uppercase tracking-wider"
            style={{ background: 'linear-gradient(135deg, #f43f5e, #a855f7)' }}
          >
            v1.0
          </span>
        </motion.div>

        {/* ── Main Headline ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold text-white tracking-tight leading-[0.95] max-w-5xl mx-auto">
            <span className="block">See. Upload.</span>
            <span className="block mt-2">
              <span className="relative inline-block overflow-hidden h-[1em]">
                <motion.span
                  key={wordIndex}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="block text-transparent bg-clip-text"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #f43f5e, #ec4899, #a855f7, #f97316)',
                    backgroundSize: '200% 200%',
                  }}
                >
                  {CYCLING_WORDS[wordIndex]}.
                </motion.span>
              </span>
              <span className="text-6xl sm:text-7xl md:text-8xl ml-3">🍓</span>
            </span>
          </h1>
        </motion.div>

        {/* ── Sub-headline ── */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-8 text-lg sm:text-xl md:text-2xl font-medium text-slate-300 max-w-2xl mx-auto leading-relaxed"
        >
          Upload a fruit photo and our{' '}
          <span className="font-bold text-white">MobileNetV2</span> deep-learning
          model identifies it in{' '}
          <span
            className="font-bold text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(135deg, #fbbf24, #f97316)' }}
          >
            milliseconds
          </span>
          , with confidence scoring and nutritional insights.
        </motion.p>

        {/* ── CTA Buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={onStartScanning}
            className="relative w-full sm:w-auto px-8 py-4 rounded-2xl text-white font-extrabold text-lg flex items-center justify-center gap-3 overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #f43f5e, #ec4899, #f97316)',
              backgroundSize: '200% 200%',
              boxShadow: '0 8px 32px -8px rgba(244,63,94,0.6), 0 4px 16px -8px rgba(249,115,22,0.4)',
            }}
          >
            {/* Shimmer overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s linear infinite',
              }}
            />
            <Upload className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Start Scanning</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.a
            href="#how-it-works"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl font-semibold text-slate-200 flex items-center justify-center gap-2 transition-all"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.09)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
            }}
          >
            <Brain className="w-5 h-5 text-purple-400" />
            <span>Explore Architecture</span>
          </motion.a>
        </motion.div>

        {/* ── Step indicators ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8 flex items-center justify-center gap-4 text-xs text-slate-500"
        >
          {[
            { icon: Upload, label: '1. Upload' },
            { label: '→', icon: null },
            { icon: Brain, label: '2. Analyze' },
            { label: '→', icon: null },
            { icon: Eye, label: '3. Discover' },
          ].map((step, i) =>
            step.icon ? (
              <span key={i} className="flex items-center gap-1.5 text-slate-400 font-medium">
                <step.icon className="w-3.5 h-3.5 text-rose-400" />
                {step.label}
              </span>
            ) : (
              <span key={i} className="text-slate-600">{step.label}</span>
            )
          )}
        </motion.div>

        {/* ── Feature Cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto"
        >
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="relative p-4 sm:p-5 rounded-2xl flex flex-col items-center text-center cursor-default overflow-hidden group"
                style={{
                  background: f.bg,
                  border: `1px solid ${f.border}`,
                  backdropFilter: 'blur(16px)',
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: f.bg, filter: 'blur(10px)' }}
                />
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 relative z-10"
                  style={{ background: f.bg, border: `1px solid ${f.border}` }}
                >
                  <Icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <span className="text-sm font-bold text-white relative z-10">{f.label}</span>
                <span className="text-xs text-slate-400 mt-0.5 relative z-10">{f.sub}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Scroll indicator ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-slate-600 font-medium tracking-wider uppercase">Scroll to scan</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border border-white/15 flex items-center justify-center"
          >
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-2 rounded-full bg-rose-400"
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
