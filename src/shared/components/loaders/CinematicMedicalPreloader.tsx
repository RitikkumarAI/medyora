import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stethoscope, Heart, Pill, ShieldCheck, CheckCircle2, Sparkles } from "lucide-react";

interface CinematicMedicalPreloaderProps {
  onComplete?: () => void;
  durationMs?: number; // default ~1300ms for snappy, fast loading
}

const STAGES = [
  {
    threshold: 40,
    title: "Finding verified doctors & specialists...",
    icon: Stethoscope,
  },
  {
    threshold: 75,
    title: "Syncing clinic schedules & digital prescriptions...",
    icon: Pill,
  },
  {
    threshold: 100,
    title: "Welcome to Medyora",
    icon: ShieldCheck,
  },
];

export function CinematicMedicalPreloader({
  onComplete,
  durationMs = 1300,
}: CinematicMedicalPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const startTime = performance.now();
    let animationFrameId: number;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(100, (elapsed / durationMs) * 100);
      const currentPercent = Math.min(100, Math.floor(rawProgress));

      setProgress(currentPercent);

      if (elapsed < durationMs) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onComplete?.();
          }, 250);
        }, 100);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(animationFrameId);
  }, [durationMs, onComplete]);

  const currentStage =
    STAGES.find((s) => progress <= s.threshold) || STAGES[STAGES.length - 1];

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="medical-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.01,
            transition: { duration: 0.25, ease: "easeOut" },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 select-none px-6 transition-colors duration-200"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 60% 50% at 50% 20%, rgba(37, 99, 235, 0.08), transparent 70%),
              radial-gradient(ellipse 50% 40% at 80% 80%, rgba(16, 185, 129, 0.06), transparent 70%),
              radial-gradient(ellipse 50% 40% at 20% 80%, rgba(59, 130, 246, 0.06), transparent 70%)
            `,
          }}
        >
          {/* Central Elegant Medical Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative flex flex-col items-center max-w-sm sm:max-w-md w-full p-7 rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800 shadow-[0_20px_50px_rgba(37,99,235,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl text-center"
          >
            {/* Medyora Logo with Soft Ripple Glow */}
            <div className="relative mb-4 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-3 rounded-3xl bg-blue-500/20 dark:bg-blue-500/30 blur-md pointer-events-none"
              />
              <div className="relative h-18 w-18 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-center p-2.5">
                <img
                  src="/Logo.webp"
                  alt="Medyora Logo"
                  className="h-full w-full object-contain"
                />
                <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                  <CheckCircle2 className="h-3.5 w-3.5 stroke-[2.5]" />
                </div>
              </div>
            </div>

            {/* Brand Title: Medyora */}
            <div className="mb-1">
              <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                Medy<span className="text-blue-600 dark:text-blue-400">ora</span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-5">
              Doctor Appointments • Digital Rx • Live Clinic Queue
            </p>

            {/* Clean Animated ECG Heartbeat Rhythm */}
            <div className="relative w-full h-11 mb-5 px-3 flex items-center justify-center bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-hidden">
              <svg
                className="w-full h-full"
                viewBox="0 0 300 44"
                fill="none"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="ecgWaveLight" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                    <stop offset="80%" stopColor="#2563eb" stopOpacity="1" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="1" />
                  </linearGradient>
                </defs>

                {/* Heartbeat pulse wave */}
                <motion.path
                  d="M 0 22 L 40 22 L 55 22 L 62 16 L 70 28 L 78 22 L 95 22 L 105 5 L 115 39 L 125 16 L 132 28 L 140 22 L 180 22 L 195 22 L 202 16 L 210 28 L 218 22 L 235 22 L 245 5 L 255 39 L 265 16 L 272 28 L 280 22 L 300 22"
                  stroke="url(#ecgWaveLight)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                />
              </svg>

              {/* Heart Pulse Icon */}
              <div className="absolute right-3 flex items-center gap-1.5 font-mono text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-white/90 dark:bg-slate-900/90 px-2 py-0.5 rounded-full border border-slate-200/60 dark:border-slate-800 shadow-xs">
                <Heart className="h-3 w-3 text-rose-500 fill-rose-500 animate-pulse" />
                <span>72 BPM</span>
              </div>
            </div>

            {/* 3 Medical Badges */}
            <div className="grid grid-cols-3 gap-2 w-full mb-5">
              <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100/60 dark:border-blue-900/30">
                <Stethoscope className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">Doctors</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-100/60 dark:border-emerald-900/30">
                <Pill className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">Medicines</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-100/60 dark:border-purple-900/30">
                <ShieldCheck className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">Verified</span>
              </div>
            </div>

            {/* Clean Progress Bar & Status Text */}
            <div className="w-full space-y-2 mb-4">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-600 dark:text-slate-300 truncate max-w-[220px] text-left">
                  {currentStage.title}
                </span>
                <span className="font-mono text-blue-600 dark:text-blue-400 font-bold ml-2">
                  {progress}%
                </span>
              </div>

              {/* Progress track */}
              <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-500 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Binarize Technologies Product Credit Badge */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 w-full flex items-center justify-center gap-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-400">
              <span>A Product of</span>
              <span className="text-blue-600 dark:text-blue-400 font-extrabold tracking-tight">
                Binarize Technologies
              </span>
              <span className="text-amber-500 text-xs">⭐</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
