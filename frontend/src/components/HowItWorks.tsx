import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Camera, Cpu, Eye, ArrowRight, ChevronRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Upload',
    emoji: '📸',
    icon: Camera,
    description: 'Upload any clear fruit photo in JPG, JPEG, or PNG format. Drag & drop or click to browse.',
    accent: '#f43f5e',
    bg: 'rgba(244,63,94,0.07)',
    border: 'rgba(244,63,94,0.20)',
    glow: 'rgba(244,63,94,0.3)',
    tag: 'Any format',
  },
  {
    number: '02',
    title: 'Analyze',
    emoji: '🧠',
    icon: Cpu,
    description: 'Our fine-tuned MobileNetV2 model processes visual features through 11 deep-learning layers in milliseconds.',
    accent: '#a855f7',
    bg: 'rgba(168,85,247,0.07)',
    border: 'rgba(168,85,247,0.20)',
    glow: 'rgba(168,85,247,0.3)',
    tag: 'AI-powered',
  },
  {
    number: '03',
    title: 'Discover',
    emoji: '✨',
    icon: Eye,
    description: 'Receive the predicted fruit class, confidence score, top-3 probabilities, and full nutritional breakdown.',
    accent: '#f97316',
    bg: 'rgba(249,115,22,0.07)',
    border: 'rgba(249,115,22,0.20)',
    glow: 'rgba(249,115,22,0.3)',
    tag: 'Instant results',
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="relative py-20 md:py-28 overflow-hidden">
      {/* Section ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(168,85,247,0.05) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
            style={{
              background: 'rgba(168,85,247,0.10)',
              border: '1px solid rgba(168,85,247,0.25)',
            }}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">Simple 3-Step Process</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight"
          >
            How{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(135deg, #f43f5e, #a855f7, #f97316)',
                backgroundSize: '200% 200%',
              }}
            >
              FruitVision AI
            </span>{' '}
            Works
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-5 text-lg text-slate-400 leading-relaxed"
          >
            From pixels to predictions — in three simple steps.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.number}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="relative rounded-3xl overflow-hidden cursor-default group"
                  style={{
                    background: step.bg,
                    border: `1px solid ${step.border}`,
                    backdropFilter: 'blur(20px)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow = `0 20px 60px -15px ${step.glow}`;
                    el.style.borderColor = step.accent + '50';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow = 'none';
                    el.style.borderColor = step.border;
                  }}
                >
                  {/* Top accent stripe */}
                  <div
                    className="h-1 w-full"
                    style={{ background: `linear-gradient(90deg, ${step.accent}, transparent)` }}
                  />

                  <div className="p-8">
                    {/* Step # and icon */}
                    <div className="flex items-center justify-between mb-8">
                      <span
                        className="text-5xl font-extrabold font-mono"
                        style={{ color: `${step.accent}30` }}
                      >
                        {step.number}
                      </span>
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 8 }}
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl relative"
                        style={{
                          background: `${step.accent}15`,
                          border: `1.5px solid ${step.accent}35`,
                          boxShadow: `0 0 20px -5px ${step.glow}`,
                        }}
                      >
                        <span>{step.emoji}</span>
                        <div
                          className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg flex items-center justify-center"
                          style={{ background: 'rgba(6,8,16,0.9)', border: `1px solid ${step.accent}40` }}
                        >
                          <Icon className="w-3.5 h-3.5" style={{ color: step.accent }} />
                        </div>
                      </motion.div>
                    </div>

                    {/* Tag */}
                    <div className="mb-3">
                      <span
                        className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                        style={{
                          background: `${step.accent}15`,
                          border: `1px solid ${step.accent}30`,
                          color: step.accent,
                        }}
                      >
                        {step.tag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-extrabold text-white mb-3 flex items-center gap-2">
                      <span>{step.title}</span>
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Hover CTA */}
                    <div className="mt-6 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-xs font-bold" style={{ color: step.accent }}>
                        {idx === 0 ? 'Upload your image' : idx === 1 ? 'Watch AI work' : 'Get insights'}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5" style={{ color: step.accent }} />
                    </div>
                  </div>
                </motion.div>

                {/* Connector arrow */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:flex absolute items-center justify-center"
                    style={{
                      left: `calc(${(idx + 1) * (100 / 3)}% - 20px)`,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 20,
                    }}
                  >
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        background: 'rgba(6,8,16,0.9)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                      }}
                    >
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </motion.div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-slate-500 mb-4">
            Ready to try it? Scroll up to the scanner or click below.
          </p>
          <motion.a
            href="#scanner"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-white font-bold text-sm"
            style={{
              background: 'linear-gradient(135deg, #f43f5e, #a855f7)',
              boxShadow: '0 4px 20px -4px rgba(244,63,94,0.4)',
            }}
          >
            <Sparkles className="w-4 h-4" />
            <span>Try the Scanner</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
};
