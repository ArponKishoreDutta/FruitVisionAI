import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, RefreshCw, AlertCircle, Sparkles, SwitchCamera, CheckCircle2 } from 'lucide-react';

interface CameraCaptureProps {
  onImageCaptured: (file: File) => void;
  onCancel?: () => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({ onImageCaptured, onCancel }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [isFlashing, setIsFlashing] = useState(false);
  const [capturedPreview, setCapturedPreview] = useState<string | null>(null);
  const [capturedFile, setCapturedFile] = useState<File | null>(null);

  const startCamera = async (mode: 'user' | 'environment') => {
    setErrorMsg(null);
    try {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: mode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(newStream);

      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (err: unknown) {
      console.error('Camera access error:', err);
      let message = 'Unable to access your camera. Please check browser permissions.';
      if (err instanceof DOMException && err.name === 'NotAllowedError') {
        message = 'Camera permission denied. Please allow camera access in browser settings.';
      } else if (err instanceof DOMException && err.name === 'NotFoundError') {
        message = 'No camera device found on your device.';
      }
      setErrorMsg(message);
    }
  };

  useEffect(() => {
    startCamera(facingMode);
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facingMode]);

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  const handleSnap = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    const width = video.videoWidth || 640;
    const height = video.videoHeight || 480;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Trigger flash animation
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 300);

    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0, width, height);

    // Convert canvas to Blob / File
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const file = new File([blob], `camera_snap_${Date.now()}.jpg`, {
          type: 'image/jpeg',
          lastModified: Date.now(),
        });
        const url = URL.createObjectURL(file);
        setCapturedPreview(url);
        setCapturedFile(file);
      },
      'image/jpeg',
      0.92
    );
  };

  const handleRetake = () => {
    if (capturedPreview) {
      URL.revokeObjectURL(capturedPreview);
    }
    setCapturedPreview(null);
    setCapturedFile(null);
  };

  const handleConfirm = () => {
    if (capturedFile) {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      onImageCaptured(capturedFile);
    }
  };

  return (
    <div className="w-full relative">
      <canvas ref={canvasRef} className="hidden" />

      {/* Flashing screen effect */}
      <AnimatePresence>
        {isFlashing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white z-50 rounded-3xl pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div
        className="rounded-3xl overflow-hidden relative"
        style={{
          background: 'rgba(10,12,24,0.9)',
          border: '1.5px solid rgba(244,63,94,0.3)',
          boxShadow: '0 20px 60px -15px rgba(244,63,94,0.2)',
        }}
      >
        {/* Error view */}
        {errorMsg ? (
          <div className="p-8 text-center space-y-5">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto"
              style={{ background: 'rgba(244,63,94,0.12)', border: '1px solid rgba(244,63,94,0.3)' }}
            >
              <AlertCircle className="w-8 h-8 text-rose-400" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white mb-2">Camera Unavailable</h4>
              <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">{errorMsg}</p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => startCamera(facingMode)}
                className="px-5 py-2.5 rounded-xl font-bold text-sm text-white flex items-center gap-2"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
              >
                <RefreshCw className="w-4 h-4" /> Retry Camera
              </button>
              {onCancel && (
                <button
                  onClick={onCancel}
                  className="px-5 py-2.5 rounded-xl font-semibold text-sm text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ) : capturedPreview ? (
          /* Captured Preview confirmation screen */
          <div className="relative p-6 flex flex-col items-center">
            <div className="relative w-full max-w-md aspect-video sm:aspect-square rounded-2xl overflow-hidden mb-6 border border-rose-500/40">
              <img src={capturedPreview} alt="Captured snapshot" className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 bg-emerald-500/90 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                <CheckCircle2 className="w-3.5 h-3.5" /> Snapshot Ready
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConfirm}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-lg"
                style={{ background: 'linear-gradient(135deg, #f43f5e, #ec4899, #f97316)' }}
              >
                <Sparkles className="w-5 h-5" />
                <span>Use Photo for AI Scan</span>
              </motion.button>

              <button
                onClick={handleRetake}
                className="w-full sm:w-auto py-3.5 px-5 rounded-2xl font-semibold text-sm text-slate-300 flex items-center justify-center gap-2 hover:bg-white/10 border border-white/10 transition"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retake</span>
              </button>
            </div>
          </div>
        ) : (
          /* Live Stream view */
          <div className="relative w-full aspect-video sm:aspect-[4/3] bg-black flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
              style={{ transform: facingMode === 'user' ? 'scaleX(-1)' : 'none' }}
            />

            {/* Futuristic reticle frame overlay */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              {/* Corner brackets */}
              <div className="w-[80%] h-[80%] border border-rose-500/30 rounded-2xl relative">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-rose-400 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-rose-400 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-rose-400 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-rose-400 rounded-br-lg" />

                {/* Center target circle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-rose-400/50 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                  </div>
                </div>

                {/* Status indicator badge */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/15 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider">Live Camera Feed</span>
                </div>
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div className="absolute bottom-4 left-0 right-0 px-6 flex items-center justify-between z-30">
              <button
                onClick={toggleFacingMode}
                className="p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-black/80 transition"
                title="Switch Camera (Front/Rear)"
              >
                <SwitchCamera className="w-5 h-5" />
              </button>

              {/* Big Shutter Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSnap}
                className="w-16 h-16 rounded-full border-4 border-white bg-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.8)] flex items-center justify-center cursor-pointer group"
              >
                <Camera className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
              </motion.button>

              <div className="w-11" /> {/* Spacer balancing flex layout */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
