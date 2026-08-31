import { useState, useEffect } from "react";
import { Download, X, Smartphone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePWAInstall } from "./usePWAInstall";
import { safeSessionStorage } from "@/shared/utils/safeStorage";
import { motion, AnimatePresence } from "framer-motion";

export function PWAInstallPrompt() {
  const { isInstallable, isInstalled, promptInstall } = usePWAInstall();
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = safeSessionStorage.getItem("medyora-pwa-dismissed");
    if (dismissed) {
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    safeSessionStorage.setItem("medyora-pwa-dismissed", "true");
  };

  const handleInstall = async () => {
    const outcome = await promptInstall();
    if (outcome === "accepted") {
      setIsDismissed(true);
    }
  };

  if (!isInstallable || isInstalled || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed bottom-6 right-6 z-50 max-w-md w-[calc(100vw-3rem)] rounded-3xl bg-white/95 dark:bg-slate-900/95 p-4 shadow-2xl border border-blue-100 dark:border-slate-800 backdrop-blur-md"
        role="dialog"
        aria-label="Install Medyora App"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-600/30 shrink-0">
              <Smartphone className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Install Medyora App</h3>
                <span className="flex items-center gap-0.5 text-[10px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded-full">
                  <Sparkles className="h-2.5 w-2.5" /> Fast
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                Instant bookings, real-time queue alerts & offline cards.
              </p>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-full transition-colors"
            aria-label="Dismiss install banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="text-xs font-semibold text-slate-600 dark:text-slate-300 h-9 rounded-xl px-3"
          >
            Not now
          </Button>
          <Button
            size="sm"
            onClick={handleInstall}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold h-9 rounded-xl px-4 shadow-md shadow-blue-600/20 flex items-center gap-1.5"
          >
            <Download className="h-3.5 w-3.5" />
            Install App
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
