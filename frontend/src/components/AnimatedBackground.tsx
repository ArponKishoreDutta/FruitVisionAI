import React from 'react';
import { motion } from 'framer-motion';

const FLOATING_FRUITS = [
  { emoji: '🍓', top: '8%', left: '6%', duration: 12, delay: 0, size: 'text-4xl sm:text-5xl', blur: false },
  { emoji: '🍎', top: '22%', left: '87%', duration: 15, delay: 1.5, size: 'text-3xl sm:text-4xl', blur: false },
  { emoji: '🍊', top: '62%', left: '10%', duration: 11, delay: 2, size: 'text-4xl sm:text-5xl', blur: false },
  { emoji: '🍌', top: '78%', left: '80%', duration: 14, delay: 0.5, size: 'text-3xl sm:text-4xl', blur: false },
  { emoji: '🍇', top: '14%', left: '72%', duration: 13, delay: 3, size: 'text-3xl sm:text-4xl', blur: false },
  { emoji: '🥝', top: '42%', left: '94%', duration: 16, delay: 1, size: 'text-2xl sm:text-3xl', blur: false },
  { emoji: '🍉', top: '48%', left: '3%', duration: 10, delay: 2.5, size: 'text-4xl sm:text-5xl', blur: false },
  { emoji: '🍍', top: '88%', left: '42%', duration: 14, delay: 4, size: 'text-3xl sm:text-4xl', blur: false },
  { emoji: '🥭', top: '35%', left: '50%', duration: 18, delay: 5, size: 'text-2xl', blur: true },
  { emoji: '🍋', top: '70%', left: '60%', duration: 20, delay: 2, size: 'text-2xl', blur: true },
];

// Stars/particles
const STARS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 2.5 + 1,
  duration: Math.random() * 3 + 2,
  delay: Math.random() * 5,
}));

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10" style={{ background: '#060810' }}>

      {/* ── Layer 1: Deep base gradient ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 20% 0%, rgba(244,63,94,0.18) 0%, transparent 60%),' +
            'radial-gradient(ellipse 60% 50% at 80% 10%, rgba(168,85,247,0.15) 0%, transparent 60%),' +
            'radial-gradient(ellipse 70% 40% at 50% 100%, rgba(59,130,246,0.10) 0%, transparent 60%)',
        }}
      />

      {/* ── Layer 2: Animated blobs ── */}
      <motion.div
        animate={{ x: [0, 60, -40, 0], y: [0, -80, 40, 0], scale: [1, 1.3, 0.85, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(244,63,94,0.22) 0%, rgba(236,72,153,0.14) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <motion.div
        animate={{ x: [0, -70, 50, 0], y: [0, 60, -70, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 -right-40 w-[550px] h-[550px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(168,85,247,0.20) 0%, rgba(99,102,241,0.12) 40%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />
      <motion.div
        animate={{ x: [0, 50, -60, 0], y: [0, 70, -50, 0], scale: [1, 1.15, 0.95, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-40 left-1/4 w-[480px] h-[480px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(16,185,129,0.16) 0%, rgba(20,184,166,0.10) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <motion.div
        animate={{ x: [0, -40, 30, 0], y: [0, -50, 60, 0], scale: [1, 1.1, 0.92, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(245,158,11,0.10) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      {/* ── Layer 3: Hero grid ── */}
      <div className="absolute inset-0 hero-grid" />

      {/* ── Layer 4: Twinkling stars ── */}
      {STARS.map((star) => (
        <motion.div
          key={star.id}
          style={{
            position: 'absolute',
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: '50%',
            background: 'white',
          }}
          animate={{ opacity: [0.1, 0.8, 0.1], scale: [0.8, 1.3, 0.8] }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: star.delay,
          }}
        />
      ))}

      {/* ── Layer 5: Floating fruit emojis ── */}
      {FLOATING_FRUITS.map((item, index) => (
        <motion.div
          key={index}
          animate={{
            y: [0, -22, 0],
            rotate: [0, 12, -8, 0],
            opacity: [0.25, 0.55, 0.25],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: item.delay,
          }}
          className={`select-none ${item.size} ${item.blur ? 'blur-[2px]' : ''}`}
          style={{
            top: item.top,
            left: item.left,
            position: 'absolute',
            filter: item.blur
              ? 'blur(2px) drop-shadow(0 0 20px rgba(255,255,255,0.15))'
              : 'drop-shadow(0 0 16px rgba(255,255,255,0.2))',
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

      {/* ── Layer 6: Vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 60%, rgba(6,8,16,0.6) 100%)',
        }}
      />
    </div>
  );
};
