import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Layers, Database, Image as ImageIcon, Zap, CheckCircle2, Code2, Box } from 'lucide-react';

const specs = [
  {
    title: 'MobileNetV2',
    category: 'Base Architecture',
    icon: Cpu,
    accent: '#f43f5e',
    description: 'Lightweight inverted residual network optimized for mobile computer vision tasks. 3.4M parameters.',
  },
  {
    title: 'Transfer Learning',
    category: 'Training Strategy',
    icon: Layers,
    accent: '#a855f7',
    description: 'ImageNet pre-trained feature extractors fine-tuned on a curated multi-class fruit dataset.',
  },
  {
    title: '11 Fruit Classes',
    category: 'Target Vocabulary',
    icon: Database,
    accent: '#f59e0b',
    description: 'Apple, Banana, Orange, Lemon, Mango, Lychee, Date, Jambul, Olive, Grapes & Burmese grape.',
  },
  {
    title: 'Image Classification',
    category: 'Computer Vision',
    icon: ImageIcon,
    accent: '#10b981',
    description: 'Input resized to 224×224×3 float32 tensor with MobileNetV2 preprocessing normalization.',
  },
  {
    title: 'TensorFlow / Keras',
    category: 'ML Framework',
    icon: Code2,
    accent: '#3b82f6',
    description: 'Model persisted as HDF5 (.h5) weights. Loaded once at server startup for low-latency inference.',
  },
  {
    title: 'FastAPI Backend',
    category: 'REST API',
    icon: Box,
    accent: '#06b6d4',
    description: 'Async Python API with lifespan model loading, multipart image upload, and CORS middleware.',
  },
];

const techStack = [
  { name: 'React 18', color: '#61dafb' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'Vite', color: '#646cff' },
  { name: 'Framer Motion', color: '#ff4d8f' },
  { name: 'Tailwind CSS', color: '#38bdf8' },
  { name: 'FastAPI', color: '#009688' },
  { name: 'TensorFlow', color: '#ff6f00' },
  { name: 'MobileNetV2', color: '#f43f5e' },
];

export const ModelInfo: React.FC = () => {
  return (
    <section id="model-info" className="relative py-20 md:py-28 overflow-hidden">
      {/* Ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 20% 80%, rgba(244,63,94,0.06) 0%, transparent 60%),' +
            'radial-gradient(ellipse 60% 40% at 80% 20%, rgba(59,130,246,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
              style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.20)' }}
            >
              <Zap className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-bold text-rose-300 uppercase tracking-wider">Deep Learning Architecture</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-5"
            >
              Powered by{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #f43f5e, #f97316)' }}
              >
                Deep Learning
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-base text-slate-400 leading-relaxed mb-7"
            >
              FruitVision AI uses a fine-tuned{' '}
              <span className="text-white font-semibold">MobileNetV2</span> convolutional
              neural network. Inverted residual blocks and linear bottlenecks deliver
              high-precision classification while staying resource-efficient.
            </motion.p>

            {/* Feature checklist */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              {[
                'FastAPI async REST API with lifespan management',
                'TensorFlow/Keras .h5 model persistence',
                'Softmax distribution across top-3 candidates',
                'CORS-enabled for Vite dev & production',
              ].map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-3 text-sm text-slate-300"
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  </div>
                  <span>{feat}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Model stat chips */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8 grid grid-cols-3 gap-3"
            >
              {[
                { label: 'Input Size', value: '224×224', sub: 'pixels' },
                { label: 'Classes', value: '11', sub: 'fruits' },
                { label: 'Precision', value: '32-bit', sub: 'float' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-3 rounded-xl text-center"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <div className="text-xl font-extrabold text-white" style={{ fontVariantNumeric: 'tabular-nums' }}>
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Spec Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {specs.map((spec, idx) => {
              const Icon = spec.icon;
              return (
                <motion.div
                  key={spec.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="p-5 rounded-2xl cursor-default group"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(16px)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = `${spec.accent}08`;
                    el.style.borderColor = `${spec.accent}30`;
                    el.style.boxShadow = `0 10px 40px -10px ${spec.accent}30`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'rgba(255,255,255,0.03)';
                    el.style.borderColor = 'rgba(255,255,255,0.08)';
                    el.style.boxShadow = 'none';
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      {spec.category}
                    </span>
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{
                        background: `${spec.accent}15`,
                        border: `1px solid ${spec.accent}30`,
                      }}
                    >
                      <Icon className="w-4 h-4" style={{ color: spec.accent }} />
                    </motion.div>
                  </div>

                  <h4 className="text-base font-bold text-white mb-2">{spec.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{spec.description}</p>

                  {/* Accent bar */}
                  <div className="mt-4 h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${spec.accent}, transparent)` }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Tech Stack Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-white/8"
        >
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center mb-5">
            Built with
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {techStack.map((tech) => (
              <motion.span
                key={tech.name}
                whileHover={{ scale: 1.08, y: -2 }}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold cursor-default transition-all"
                style={{
                  background: `${tech.color}12`,
                  border: `1px solid ${tech.color}30`,
                  color: tech.color,
                }}
              >
                {tech.name}
              </motion.span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};
