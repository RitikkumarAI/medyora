import { X, Award, ShieldCheck, CheckCircle2, Clock, Sparkles, TrendingUp, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function PatientReliabilityModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-emerald-500/10 to-teal-500/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Patient Reliability Score (PRS)
              </h3>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                Elite Trust Tier • Verified Patient
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Score Body */}
        <div className="p-5 space-y-4">
          <div className="text-center p-4 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
              Current Rating
            </span>
            <p className="text-5xl font-black text-emerald-600 dark:text-emerald-400 my-1">
              98<span className="text-2xl text-slate-400 font-normal">/100</span>
            </p>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              Top 2% of Punctual Clinic Patients in Bengaluru
            </p>
          </div>

          {/* Breakdown Items */}
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">On-Time Clinic Arrivals</span>
              </div>
              <span className="font-black text-emerald-600">12 / 12 Visits</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">Timely Reschedules (&gt;30m notice)</span>
              </div>
              <span className="font-black text-blue-600">100% Courtesy</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span className="font-semibold text-slate-800 dark:text-slate-200">Unexcused No-Shows</span>
              </div>
              <span className="font-black text-emerald-600">0 (Zero)</span>
            </div>
          </div>

          {/* Unlocked Benefits */}
          <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 space-y-2 text-xs">
            <p className="font-bold text-indigo-950 dark:text-indigo-200 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-indigo-600" />
              Elite Patient Privileges Unlocked:
            </p>
            <ul className="space-y-1 text-slate-600 dark:text-slate-300 text-[11px] list-disc list-inside">
              <li><strong>₹0 Advance Token Deposit:</strong> Book in-clinic visits without paying upfront.</li>
              <li><strong>Express Waitlist Priority:</strong> Auto-promoted to the top if a slot opens up.</li>
              <li><strong>15-Minute Leniency Grace:</strong> Extra buffer before slot is marked skipped.</li>
            </ul>
          </div>

          <Button
            onClick={onClose}
            className="w-full h-12 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20"
          >
            Understood
          </Button>
        </div>
      </div>
    </div>
  );
}
