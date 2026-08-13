import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Image as ImageIcon, Sparkles, X, RefreshCw, FileText, CheckCircle2 } from 'lucide-react';

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
      alert('Please upload a JPG, JPEG, or PNG image.');
      return;
    }
    onImageSelected(file);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!selectedImage || !imagePreviewUrl ? (
          /* ── Drop Zone ── */
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3 }}
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
              boxShadow: isDragging
                ? '0 0 60px -10px rgba(244,63,94,0.4), inset 0 0 60px -30px rgba(244,63,94,0.1)'
                : 'none',
              transition: 'all 0.3s ease',
            }}
          >
            {/* Hover gradient overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(244,63,94,0.07) 0%, rgba(168,85,247,0.05) 50%, transparent 80%)',
              }}
            />

            {/* Animated corner brackets */}
            {isDragging && (
              <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-rose-400 rounded-tl-lg z-20" />
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-rose-400 rounded-tr-lg z-20" />
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-rose-400 rounded-bl-lg z-20" />
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-rose-400 rounded-br-lg z-20" />
              </>
            )}

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/jpeg,image/jpg,image/png,image/webp"
              className="hidden"
            />

            <div className="relative z-10 flex flex-col items-center justify-center py-16 px-8 text-center">
              {/* Animated upload icon */}
              <motion.div
                animate={
                  isDragging
                    ? { scale: [1, 1.1, 1], rotate: [-5, 5, -5, 0] }
                    : { y: [0, -8, 0] }
                }
                transition={
                  isDragging
                    ? { duration: 0.5, repeat: Infinity }
                    : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                }
                className="mb-6"
              >
                <div
                  className={`w-24 h-24 rounded-3xl flex items-center justify-center relative overflow-hidden transition-all duration-300 ${
                    isDragging ? 'scale-110' : 'group-hover:scale-105'
                  }`}
                  style={{
                    background: isDragging
                      ? 'linear-gradient(135deg, rgba(244,63,94,0.3), rgba(249,115,22,0.3))'
                      : 'linear-gradient(135deg, rgba(244,63,94,0.12), rgba(168,85,247,0.12))',
                    border: isDragging
                      ? '1.5px solid rgba(244,63,94,0.6)'
                      : '1.5px solid rgba(255,255,255,0.1)',
                    boxShadow: isDragging
                      ? '0 0 40px -8px rgba(244,63,94,0.5)'
                      : '0 0 20px -8px rgba(244,63,94,0.2)',
                  }}
                >
                  <Upload
                    className={`w-10 h-10 transition-colors duration-300 ${
                      isDragging ? 'text-rose-300' : 'text-rose-400'
                    }`}
                  />
                  {/* Pulsing ring */}
                  <div
                    className="absolute inset-0 rounded-3xl animate-ping"
                    style={{
                      background: isDragging
                        ? 'rgba(244,63,94,0.2)'
                        : 'rgba(244,63,94,0.05)',
                    }}
                  />
                </div>
              </motion.div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                {isDragging ? '✨ Drop it here!' : 'Drop your fruit image'}
              </h3>
              <p className="text-slate-400 text-sm mb-8">
                or click anywhere to browse files
              </p>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="relative px-7 py-3.5 rounded-2xl text-white font-bold text-sm flex items-center gap-2.5 overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #f43f5e, #ec4899, #f97316)',
                  boxShadow: '0 4px 20px -4px rgba(244,63,94,0.5)',
                }}
              >
                <Upload className="w-4 h-4" />
                <span>Choose Image</span>
              </motion.button>

              <div className="mt-8 flex items-center gap-3">
                {['JPG', 'JPEG', 'PNG', 'WEBP'].map((fmt) => (
                  <span
                    key={fmt}
                    className="px-2.5 py-1 rounded-lg text-xs font-bold text-slate-400 border border-white/10"
                    style={{ background: 'rgba(255,255,255,0.04)' }}
                  >
                    {fmt}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          /* ── Image Preview Card ── */
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

                {/* Image */}
                <div className="relative w-full md:w-60 h-60 rounded-2xl overflow-hidden flex-shrink-0 group">
                  {/* Gradient border */}
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
                  {/* Ready overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 z-20">
                    <span className="text-xs text-white font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Ready for AI Analysis
                    </span>
                  </div>
                  {/* Success badge */}
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

                {/* File info + Actions */}
                <div className="flex-1 w-full space-y-4">
                  {/* Header */}
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

                  {/* File meta */}
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-rose-400" />
                      {formatFileSize(selectedImage.size)}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-600" />
                    <span className="font-mono font-semibold text-slate-300">
                      {selectedImage.type.replace('image/', '').toUpperCase()}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-600" />
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> Valid Format
                    </span>
                  </div>

                  {/* Error */}
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

                  {/* Actions */}
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
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.10)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)';
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
        )}
      </AnimatePresence>
    </div>
  );
};
