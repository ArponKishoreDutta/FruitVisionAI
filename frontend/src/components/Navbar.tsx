import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X, Cpu, Zap } from 'lucide-react';
import { HealthResponse } from '../types/prediction';

interface NavbarProps {
  health: HealthResponse | null;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ health, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: 'Home', target: 'hero' },
    { name: 'Scanner', target: 'scanner' },
    { name: 'How It Works', target: 'how-it-works' },
    { name: 'AI Model', target: 'model-info' },
  ];

  const handleNavClick = (targetId: string) => {
    onNavigate(targetId);
    setMobileMenuOpen(false);
  };

  const isReady = health?.status === 'ok' && health?.model_loaded;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#060810]/90 backdrop-blur-2xl border-b border-white/10 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 md:h-20">

          {/* ── Logo ── */}
          <div
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 8 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-11 h-11 md:w-12 md:h-12"
            >
              {/* Animated ring */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-orange-400 animate-spin-slower opacity-70" />
              <div
                className="relative w-full h-full rounded-2xl flex items-center justify-center text-2xl"
                style={{ background: 'linear-gradient(135deg, #1a0a12, #1a0818)', border: '1.5px solid rgba(244,63,94,0.3)' }}
              >
                🍓
              </div>
            </motion.div>

            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                FruitVision{' '}
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg, #f43f5e, #ec4899, #f97316)', backgroundSize: '200% 200%' }}
                >
                  AI
                </span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400 tracking-[0.15em] uppercase flex items-center gap-1">
                <Cpu className="w-2.5 h-2.5 text-rose-400" />
                Deep Learning
              </span>
            </div>
          </div>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-0.5 bg-white/[0.04] p-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => handleNavClick(link.target)}
                className="relative px-5 py-2 text-sm font-semibold text-slate-300 hover:text-white rounded-full transition-all duration-200 hover:bg-white/10 group"
              >
                <span className="relative z-10">{link.name}</span>
              </button>
            ))}
          </nav>

          {/* ── Right Side ── */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Health status badge */}
            <motion.div
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold border transition-all ${
                isReady
                  ? 'border-emerald-500/40 text-emerald-400'
                  : 'border-amber-500/40 text-amber-300'
              }`}
              style={{
                background: isReady
                  ? 'rgba(16,185,129,0.08)'
                  : 'rgba(245,158,11,0.08)',
                boxShadow: isReady
                  ? '0 0 20px -5px rgba(16,185,129,0.3)'
                  : '0 0 20px -5px rgba(245,158,11,0.3)',
              }}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    isReady ? 'bg-emerald-400' : 'bg-amber-400'
                  }`}
                />
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    isReady ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                />
              </span>
              <Zap className="w-3 h-3" />
              <span>{isReady ? 'Model Ready' : 'Connecting...'}</span>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavClick('scanner')}
              className="relative px-5 py-2.5 rounded-full text-white text-sm font-bold flex items-center gap-2 overflow-hidden transition-all"
              style={{
                background: 'linear-gradient(135deg, #f43f5e, #ec4899, #f97316)',
                backgroundSize: '200% 200%',
                boxShadow: '0 4px 20px -4px rgba(244,63,94,0.5)',
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Scan Fruit</span>
            </motion.button>
          </div>

          {/* ── Mobile Menu Button ── */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition"
              aria-label="Toggle Navigation Menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden border-b border-white/10 overflow-hidden"
            style={{ background: 'rgba(6,8,16,0.97)', backdropFilter: 'blur(24px)' }}
          >
            <div className="px-4 py-5 space-y-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.target}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => handleNavClick(link.target)}
                  className="w-full text-left px-4 py-3.5 text-sm font-semibold text-slate-200 hover:bg-white/8 hover:text-white rounded-xl transition flex items-center gap-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0" />
                  {link.name}
                </motion.button>
              ))}

              <div className="pt-3 mt-3 border-t border-white/8 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className={`h-2 w-2 rounded-full ${isReady ? 'bg-emerald-400' : 'bg-amber-400'} animate-pulse`} />
                  <span>{isReady ? 'AI Model Active' : 'Connecting Backend'}</span>
                </div>
                <button
                  onClick={() => handleNavClick('scanner')}
                  className="px-4 py-2 text-xs font-bold text-white rounded-full"
                  style={{ background: 'linear-gradient(135deg, #f43f5e, #f97316)' }}
                >
                  Start Scanning 🍓
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
