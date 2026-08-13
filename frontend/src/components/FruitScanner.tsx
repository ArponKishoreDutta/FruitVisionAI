import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageUploader } from './ImageUploader';
import { ScanningAnimation } from './ScanningAnimation';
import { PredictionResult } from './PredictionResult';
import { predictFruit } from '../services/api';
import { PredictResponse, ScannerState } from '../types/prediction';
import { AlertCircle, RefreshCw, Scan } from 'lucide-react';

export const FruitScanner: React.FC = () => {
  const [scannerState, setScannerState] = useState<ScannerState>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [predictionResult, setPredictionResult] = useState<PredictResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleImageSelected = (file: File) => {
    setSelectedFile(file);
    setErrorMessage(null);
    const url = URL.createObjectURL(file);
    setImagePreviewUrl(url);
    setScannerState('preview');
  };

  const handleClearImage = () => {
    setSelectedFile(null);
    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    setImagePreviewUrl(null);
    setPredictionResult(null);
    setErrorMessage(null);
    setScannerState('idle');
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setErrorMessage('Please choose a fruit image first 🍓');
      return;
    }
    setScannerState('scanning');
    setErrorMessage(null);
    try {
      const data = await predictFruit(selectedFile);
      setPredictionResult(data);
      setScannerState('result');
    } catch (err: unknown) {
      console.error('Prediction API Error:', err);
      const msg =
        err instanceof Error
          ? err.message
          : "Oops! FruitVision couldn't analyze the image. Please try again.";
      setErrorMessage(msg);
      setScannerState('error');
    }
  };

  return (
    <section id="scanner" className="relative py-16 md:py-24 overflow-hidden">
      {/* Section ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(244,63,94,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header ── */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
            style={{
              background: 'rgba(244,63,94,0.08)',
              border: '1px solid rgba(244,63,94,0.22)',
            }}
          >
            <Scan className="w-4 h-4 text-rose-400" />
            <span className="text-xs font-bold text-rose-300 uppercase tracking-wider">
              Interactive AI Scanner
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight"
          >
            ✨ AI Fruit Scanner
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-slate-400 max-w-md mx-auto"
          >
            Drop a photo and watch our neural network identify your fruit in milliseconds.
          </motion.p>
        </div>

        {/* ── Scanner Card ── */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.07)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 30px 80px -20px rgba(0,0,0,0.5)',
          }}
        >
          {/* Top gradient border */}
          <div
            className="h-px w-full"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(244,63,94,0.6), rgba(168,85,247,0.4), rgba(249,115,22,0.5), transparent)',
            }}
          />

          <div className="p-6 sm:p-8 md:p-10">
            <AnimatePresence mode="wait">
              {/* Scanning */}
              {scannerState === 'scanning' && (
                <ScanningAnimation key="scanning" imagePreviewUrl={imagePreviewUrl} />
              )}

              {/* Result */}
              {scannerState === 'result' && predictionResult && (
                <PredictionResult
                  key="result"
                  result={predictionResult}
                  imagePreviewUrl={imagePreviewUrl}
                  onReset={handleClearImage}
                />
              )}

              {/* Error */}
              {scannerState === 'error' && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="rounded-2xl p-10 text-center space-y-6"
                  style={{
                    background: 'rgba(244,63,94,0.06)',
                    border: '1px solid rgba(244,63,94,0.25)',
                  }}
                >
                  <motion.div
                    animate={{ rotate: [0, -5, 5, -5, 0] }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto"
                    style={{
                      background: 'rgba(244,63,94,0.12)',
                      border: '1.5px solid rgba(244,63,94,0.3)',
                      boxShadow: '0 0 30px -8px rgba(244,63,94,0.4)',
                    }}
                  >
                    <AlertCircle className="w-10 h-10 text-rose-400" />
                  </motion.div>

                  <div>
                    <h3 className="text-2xl font-extrabold text-white mb-2">Analysis Failed</h3>
                    <p className="text-rose-200 text-sm max-w-md mx-auto leading-relaxed">
                      {errorMessage ||
                        "Oops! FruitVision couldn't analyze the image. Please ensure the backend is running and try again."}
                    </p>
                  </div>

                  <button
                    onClick={handleClearImage}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.14)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)';
                    }}
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Try Another Image</span>
                  </button>
                </motion.div>
              )}

              {/* Idle / Preview */}
              {(scannerState === 'idle' || scannerState === 'preview') && (
                <motion.div
                  key="uploader"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ImageUploader
                    onImageSelected={handleImageSelected}
                    selectedImage={selectedFile}
                    imagePreviewUrl={imagePreviewUrl}
                    onClearImage={handleClearImage}
                    onAnalyze={handleAnalyze}
                    error={errorMessage}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Bottom hint ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-slate-600 mt-5"
        >
          Supported: Apple · Banana · Burmese Grape · Date · Jambul · Lemon · Lychee · Mango · Olive · Orange · Red Grapes
        </motion.p>
      </div>
    </section>
  );
};
