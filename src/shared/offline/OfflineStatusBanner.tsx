import { WifiOff, RefreshCw, Database } from "lucide-react";
import { useNetworkStatus } from "@/shared/hooks/useNetworkStatus";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function OfflineStatusBanner() {
  const { isOffline } = useNetworkStatus();

  if (!isOffline) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="bg-amber-500 text-slate-950 px-4 py-2 text-xs font-semibold z-[60] relative shadow-md"
        role="status"
        aria-live="assertive"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <WifiOff className="h-4 w-4 shrink-0 animate-pulse text-slate-950" />
            <span>
              <strong>Offline Mode Active</strong> — Showing locally cached appointments,
              prescriptions, and doctors.
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden sm:flex items-center gap-1 text-[11px] bg-amber-600/30 px-2 py-0.5 rounded-full">
              <Database className="h-3 w-3" /> Cached Locally
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.location.reload()}
              className="h-7 text-[11px] font-bold bg-white/90 hover:bg-white text-slate-900 border-none rounded-lg px-2.5 shadow-sm"
            >
              <RefreshCw className="h-3 w-3 mr-1" /> Reconnect
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
