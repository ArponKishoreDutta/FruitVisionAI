import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Image as ImageIcon, Sparkles, X, RefreshCw, FileText, CheckCircle2, Camera, HelpCircle } from 'lucide-react';
import { CameraCapture } from './CameraCapture';
import { FRUIT_KNOWLEDGE_BASE } from '../utils/fruitData';

interface ImageUploaderProps {
  onImageSelected: (file: File) => void;
  selectedImage: File | null;
  imagePreviewUrl: string | null;
  onClearImage: () => void;
  onAnalyze: () => void;
  error: string | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelected,
  selectedImage,
  imagePreviewUrl,
  onClearImage,
  onAnalyze,
  error,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'camera'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndPassFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndPassFile(e.target.files[0]);
    }
  };

  const validateAndPassFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid JPG, JPEG, PNG, or WEBP image.');
      return;
    }
    onImageSelected(file);
  };

  // Helper to load sample SVG fruit image into a File object for testing
  const handleSelectSample = async (fruitName: string) => {
    const meta = FRUIT_KNOWLEDGE_BASE[fruitName];
    if (!meta) return;

    try {
      const res = await fetch(meta.sampleSvg);
      const blob = await res.blob();
      const sampleFile = new File([blob], `sample_${fruitName.toLowerCase().replace(/\s+/g, '_')}.png`, {
        type: 'image/png',
        lastModified: Date.now(),
      });
      onImageSelected(sampleFile);
    } catch (err) {
      console.error('Failed to load sample image:', err);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const sampleFruits = ['Apple', 'Banana', 'Orange', 'Mango', 'Lemon', 'Red grapes'];

  return (
    <div className="w-full">
      {/* ── Top Input Mode Switcher Tabs ── */}
      {!selectedImage && (
        <div className="flex items-center justify-center mb-6">
          <div
            className="p-1 rounded-2xl flex items-center gap-1 border border-white/10"
            style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(12px)' }}
          >
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
                activeTab === 'upload'
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Upload className="w-4 h-4" />
              <span>Upload Image</span>
            </button>

            <button
              onClick={() => setActiveTab('camera')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
                activeTab === 'camera'
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Live Camera Stream</span>
            </button>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {selectedImage && imagePreviewUrl ? (
          /* ── Selected Image Preview Card ── */
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -10 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.10)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="p-6 sm:p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Image Preview Container */}
                <div className="relative w-full md:w-60 h-60 rounded-2xl overflow-hidden flex-shrink-0 group">
                  <div
                    className="absolute inset-0 rounded-2xl z-10 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(244,63,94,0.6), rgba(168,85,247,0.4), rgba(249,115,22,0.5))',
                      padding: '1.5px',
                    }}
                  />
                  <img
                    src={imagePreviewUrl}
                    alt="Selected fruit preview"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 z-20">
                    <span className="text-xs text-white font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Ready for AI Analysis
                    </span>
                  </div>
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                    className="absolute top-2 left-2 z-30 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(16,185,129,0.9)' }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </motion.div>
                </div>

                {/* File Metadata & Actions */}
                <div className="flex-1 w-full space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-rose-300 uppercase tracking-wider mb-2"
                        style={{ background: 'rgba(244,63,94,0.12)', border: '1px solid rgba(244,63,94,0.25)' }}
                      >
                        <ImageIcon className="w-3 h-3" />
                        Selected Image
                      </span>
                      <h4 className="text-lg font-bold text-white truncate max-w-xs sm:max-w-md leading-tight">
                        {selectedImage.name}
                      </h4>
                    </div>
                    <button
                      onClick={onClearImage}
                      className="p-2 rounded-xl text-slate-400 hover:text-white transition ml-3 flex-shrink-0"
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-rose-400" />
                      {formatFileSize(selectedImage.size)}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-600" />
                    <span className="font-mono font-semibold text-slate-300">
                      {selectedImage.type.replace('image/', '').toUpperCase() || 'PNG'}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-600" />
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> Ready
                    </span>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-xl text-rose-200 text-sm"
                      style={{ background: 'rgba(244,63,94,0.12)', border: '1px solid rgba(244,63,94,0.3)' }}
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* Primary CTA Buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onAnalyze}
                      className="w-full sm:flex-1 py-4 px-6 rounded-2xl text-white font-extrabold text-base flex items-center justify-center gap-2.5 relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #f43f5e, #ec4899, #f97316)',
                        backgroundSize: '200% 200%',
                        boxShadow: '0 6px 30px -8px rgba(244,63,94,0.6)',
                      }}
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                      >
                        <Sparkles className="w-5 h-5" />
                      </motion.div>
                      <span>Analyze with AI</span>
                    </motion.button>

                    <button
                      onClick={onClearImage}
                      className="w-full sm:w-auto py-4 px-5 rounded-2xl font-semibold text-sm text-slate-200 flex items-center justify-center gap-2 transition-all"
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.12)',
                      }}
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Change Image</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : activeTab === 'camera' ? (
          /* ── Camera Capture Mode ── */
          <motion.div
            key="cameramode"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
          >
            <CameraCapture
              onImageCaptured={(file) => onImageSelected(file)}
              onCancel={() => setActiveTab('upload')}
            />
          </motion.div>
        ) : (
          /* ── Dropzone & Sample Images Mode ── */
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3 }}
          >
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="relative cursor-pointer rounded-3xl overflow-hidden group"
              style={{
                border: isDragging
                  ? '2px dashed rgba(244,63,94,0.8)'
                  : '2px dashed rgba(255,255,255,0.15)',
                background: isDragging
                  ? 'rgba(244,63,94,0.08)'
                  : 'rgba(255,255,255,0.025)',
                backdropFilter: 'blur(20px)',
                transition: 'all 0.3s ease',
              }}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/jpeg,image/jpg,image/png,image/webp"
                className="hidden"
              />

              <div className="relative z-10 flex flex-col items-center justify-center py-14 px-8 text-center">
                <motion.div
                  animate={isDragging ? { scale: [1, 1.1, 1] } : { y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="mb-6"
                >
                  <div
                    className="w-20 h-20 rounded-3xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(244,63,94,0.15), rgba(168,85,247,0.15))',
                      border: '1.5px solid rgba(244,63,94,0.3)',
                      boxShadow: '0 0 30px -8px rgba(244,63,94,0.3)',
                    }}
                  >
                    <Upload className="w-9 h-9 text-rose-400" />
                  </div>
                </motion.div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  {isDragging ? '✨ Drop image here!' : 'Drop your fruit image here'}
                </h3>
                <p className="text-slate-400 text-sm mb-6">
                  or click to select file from your computer or phone
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="px-7 py-3.5 rounded-2xl text-white font-bold text-sm flex items-center gap-2.5"
                  style={{
                    background: 'linear-gradient(135deg, #f43f5e, #ec4899, #f97316)',
                    boxShadow: '0 4px 20px -4px rgba(244,63,94,0.5)',
                  }}
                >
                  <Upload className="w-4 h-4" />
                  <span>Choose Image File</span>
                </motion.button>
              </div>
            </div>

            {/* Quick Sample Selector Ribbon */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-rose-400" /> Or test immediately with a sample:
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {sampleFruits.map((name) => {
                  const meta = FRUIT_KNOWLEDGE_BASE[name];
                  if (!meta) return null;
                  return (
                    <motion.button
                      key={name}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => handleSelectSample(name)}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-200 flex items-center gap-2 transition-all hover:text-white"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.12)',
                      }}
                    >
                      <span className="text-base">{meta.emoji}</span>
                      <span>{name}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
