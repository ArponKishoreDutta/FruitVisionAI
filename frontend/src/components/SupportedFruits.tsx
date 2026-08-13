import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FRUIT_KNOWLEDGE_BASE, ALL_FRUIT_CLASSES, FruitDetailedMeta } from '../utils/fruitData';
import { Search, Sparkles, HeartPulse, Flame, Calendar, ChevronRight, CheckCircle2 } from 'lucide-react';

interface SupportedFruitsProps {
  onSelectSampleFruit?: (fruitName: string, sampleSvg: string) => void;
}

export const SupportedFruits: React.FC<SupportedFruitsProps> = ({ onSelectSampleFruit }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFruit, setSelectedFruit] = useState<FruitDetailedMeta | null>(null);

  const filteredFruits = ALL_FRUIT_CLASSES.filter((name) => {
    const meta = FRUIT_KNOWLEDGE_BASE[name];
    if (!meta) return false;
    const query = searchQuery.toLowerCase();
    return (
      meta.name.toLowerCase().includes(query) ||
      meta.scientificName.toLowerCase().includes(query) ||
      meta.description.toLowerCase().includes(query)
    );
  });

  return (
    <section id="supported-fruits" className="relative py-20 md:py-28 overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(244,63,94,0.06) 0%, rgba(168,85,247,0.05) 50%, transparent 80%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
            style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.22)' }}
          >
            <Sparkles className="w-4 h-4 text-rose-400" />
            <span className="text-xs font-bold text-rose-300 uppercase tracking-wider">
              11 Trained Fruit Classes
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight"
          >
            Supported Fruit Catalog
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-slate-400"
          >
            Explore scientific names, health benefits, and nutritional breakdowns for all fruits supported by our fine-tuned MobileNetV2 model.
          </motion.p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div
            className="relative flex items-center rounded-2xl overflow-hidden px-4 py-3"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.12)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <Search className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by fruit or scientific name (e.g. Malus, Mango)..."
              className="w-full bg-transparent text-white text-sm focus:outline-none placeholder-slate-500 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-400 hover:text-white px-2 py-1 bg-white/10 rounded-md ml-2"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Fruit Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFruits.map((name, idx) => {
            const meta = FRUIT_KNOWLEDGE_BASE[name];
            if (!meta) return null;

            return (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedFruit(meta)}
                className="group relative rounded-3xl p-6 cursor-pointer overflow-hidden transition-all duration-300 flex flex-col justify-between"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(20px)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
                  (e.currentTarget as HTMLElement).style.borderColor = `${meta.accentColor}50`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 40px -15px ${meta.accentColor}35`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <div>
                  {/* Top Bar: Emoji & Season Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-lg transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `${meta.accentColor}18`,
                        border: `1.5px solid ${meta.accentColor}40`,
                      }}
                    >
                      {meta.emoji}
                    </div>

                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-slate-300"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {meta.season.split('/')[0].trim()}
                    </span>
                  </div>

                  {/* Fruit Name & Scientific Name */}
                  <h3 className="text-xl font-extrabold text-white mb-1 group-hover:text-rose-300 transition-colors flex items-center gap-2">
                    {meta.name}
                  </h3>
                  <p className="text-xs italic text-slate-400 font-serif mb-3">
                    {meta.scientificName}
                  </p>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {meta.description}
                  </p>
                </div>

                {/* Footer details & Action */}
                <div>
                  <div className="pt-3 border-t border-white/8 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                      <span className="flex items-center gap-1 text-rose-400">
                        <Flame className="w-3.5 h-3.5" /> {meta.vitaminC}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSelectSampleFruit) {
                          onSelectSampleFruit(meta.name, meta.sampleSvg);
                        } else {
                          setSelectedFruit(meta);
                        }
                      }}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-white flex items-center gap-1 transition-all"
                      style={{ background: `${meta.accentColor}25`, border: `1px solid ${meta.accentColor}50` }}
                    >
                      <span>Test Scan</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Modal Detail View */}
        <AnimatePresence>
          {selectedFruit && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 overflow-hidden"
                style={{
                  background: '#0a0d18',
                  border: `1.5px solid ${selectedFruit.accentColor}50`,
                  boxShadow: `0 25px 70px -15px ${selectedFruit.accentColor}40`,
                }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedFruit(null)}
                  className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white bg-white/10"
                >
                  ✕
                </button>

                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl"
                    style={{
                      background: `${selectedFruit.accentColor}20`,
                      border: `1.5px solid ${selectedFruit.accentColor}50`,
                    }}
                  >
                    {selectedFruit.emoji}
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-white">{selectedFruit.name}</h3>
                    <p className="text-sm italic text-slate-400 font-serif">{selectedFruit.scientificName}</p>
                    <span className="inline-block text-[11px] font-bold text-rose-300 mt-1">
                      Season: {selectedFruit.season}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {selectedFruit.description}
                </p>

                <div className="mb-6 space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <HeartPulse className="w-4 h-4 text-rose-400" /> Key Health Benefits
                  </h4>
                  <ul className="space-y-2">
                    {selectedFruit.healthBenefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    onClick={() => {
                      if (onSelectSampleFruit) {
                        onSelectSampleFruit(selectedFruit.name, selectedFruit.sampleSvg);
                      }
                      setSelectedFruit(null);
                    }}
                    className="w-full py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2"
                    style={{ background: 'linear-gradient(135deg, #f43f5e, #a855f7)' }}
                  >
                    <Sparkles className="w-4 h-4" /> Load Sample to Scanner
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
