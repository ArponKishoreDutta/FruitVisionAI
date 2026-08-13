import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const FRUIT_CLASSES = [
  { name: 'Apple', emoji: '🍎' },
  { name: 'Banana', emoji: '🍌' },
  { name: 'Burmese Grape', emoji: '🍇' },
  { name: 'Date', emoji: '🌴' },
  { name: 'Jambul', emoji: '🫐' },
  { name: 'Lemon', emoji: '🍋' },
  { name: 'Lychee', emoji: '🍒' },
  { name: 'Mango', emoji: '🥭' },
  { name: 'Olive', emoji: '🫒' },
  { name: 'Orange', emoji: '🍊' },
  { name: 'Red Grapes', emoji: '🍇' },
];

const techBadges = [
  { name: 'React 18', color: '#61dafb' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'Tailwind CSS', color: '#38bdf8' },
  { name: 'Framer Motion', color: '#ff4d8f' },
  { name: 'FastAPI', color: '#009688' },
  { name: 'MobileNetV2', color: '#f43f5e' },
  { name: 'TensorFlow', color: '#ff6f00' },
];

export const Footer: React.FC = () => {
  return (
    <footer
      className="relative border-t border-white/8 mt-0"
      style={{ background: 'rgba(4,5,12,0.97)', backdropFilter: 'blur(20px)' }}
    >
      {/* Gradient separator line */}
      <div
        className="h-px w-full"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(244,63,94,0.5), rgba(168,85,247,0.5), rgba(249,115,22,0.5), transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* ── Top section ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/6">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(244,63,94,0.2), rgba(249,115,22,0.15))',
                  border: '1.5px solid rgba(244,63,94,0.3)',
                }}
              >
                🍓
              </div>
              <div>
                <span className="text-base font-extrabold text-white">
                  FruitVision{' '}
                  <span
                    className="text-transparent bg-clip-text"
                    style={{ backgroundImage: 'linear-gradient(135deg, #f43f5e, #f97316)' }}
                  >
                    AI
                  </span>
                </span>
                <p className="text-xs text-slate-500">Intelligent Fruit Recognition</p>
              </div>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              A deep-learning fruit classification system built with MobileNetV2, FastAPI, and React.
              Designed for university demonstration and AI research.
            </p>
          </div>

          {/* Supported fruits grid */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              Supported Fruits (11 Classes)
            </h4>
            <div className="grid grid-cols-2 gap-1.5">
              {FRUIT_CLASSES.map((f) => (
                <motion.div
                  key={f.name}
                  whileHover={{ x: 3 }}
                  className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-default"
                >
                  <span>{f.emoji}</span>
                  <span>{f.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Model info */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              Model Details
            </h4>
            <div className="space-y-2.5">
              {[
                { label: 'Architecture', value: 'MobileNetV2' },
                { label: 'Framework', value: 'TensorFlow / Keras' },
                { label: 'Input Shape', value: '224 × 224 × 3' },
                { label: 'Output Classes', value: '11 Fruits' },
                { label: 'API', value: 'FastAPI REST' },
                { label: 'Training', value: 'Transfer Learning' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">{item.label}</span>
                  <span
                    className="font-semibold text-slate-300 px-2 py-0.5 rounded font-mono"
                    style={{ background: 'rgba(255,255,255,0.05)' }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tech badges ── */}
        <div className="py-8 border-b border-white/6">
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest text-center mb-4">
            Tech Stack
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {techBadges.map((tech) => (
              <span
                key={tech.name}
                className="px-3 py-1 rounded-full text-xs font-bold"
                style={{
                  background: `${tech.color}10`,
                  border: `1px solid ${tech.color}25`,
                  color: tech.color,
                }}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>

        {/* ── Bottom row ── */}
        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <p>
            © {new Date().getFullYear()} FruitVision AI — Built for university & project demonstration.
          </p>
          <p className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
            <span>Powered by Deep Learning & Computer Vision</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
