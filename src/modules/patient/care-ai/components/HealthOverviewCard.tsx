import { Heart, Activity, Droplets, Thermometer, ChevronRight, Watch } from "lucide-react";

export interface HealthVitalsData {
  heartRate: number;
  bpSystolic: number;
  bpDiastolic: number;
  spo2: number;
  temperature: number;
  lastUpdated?: string;
}

interface HealthOverviewCardProps {
  vitals: HealthVitalsData;
  onSyncDevices: () => void;
  onOpenDeviceSync?: () => void;
}

export function HealthOverviewCard({
  vitals,
  onSyncDevices,
  onOpenDeviceSync,
}: HealthOverviewCardProps) {
  return (
    <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm font-sans space-y-3">
      {/* Header with Title + Sync Device (Smartwatch) + View Details */}
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
          Your Health Overview
        </h2>

        <div className="flex items-center gap-1.5">
          {/* Sync Smartwatch Device Action Button */}
          <button
            onClick={onOpenDeviceSync || onSyncDevices}
            className="text-[10px] font-black px-2 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 border border-blue-200/70 dark:border-blue-800/80 flex items-center gap-1 transition-all hover:scale-102 active:scale-98 shadow-2xs"
          >
            <Watch className="h-3 w-3" />
            <span>Sync Device</span>
          </button>

          {/* View Details Link */}
          <button
            onClick={onSyncDevices}
            className="text-[11px] font-extrabold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 flex items-center gap-0.5 transition-colors pl-1"
          >
            <span>View Details</span>
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* 2x2 Grid of Vital Cards */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* 1. Heart Rate */}
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-750/70 space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="h-6 w-6 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
            </div>
            <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              Normal
            </span>
          </div>

          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-slate-900 dark:text-white">
                {vitals.heartRate}
              </span>
              <span className="text-[10px] font-bold text-slate-400">bpm</span>
            </div>
          </div>

          {/* Mini Sparkline Chart */}
          <div className="h-3.5 w-full opacity-80">
            <svg viewBox="0 0 100 20" className="w-full h-full stroke-emerald-500 fill-none" strokeWidth="2.2">
              <path d="M0,12 L15,10 L30,14 L45,6 L55,16 L65,8 L80,12 L100,10" />
            </svg>
          </div>
        </div>

        {/* 2. Blood Pressure */}
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-750/70 space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="h-6 w-6 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Activity className="h-3.5 w-3.5" />
            </div>
            <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              Normal
            </span>
          </div>

          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-slate-900 dark:text-white">
                {vitals.bpSystolic}/{vitals.bpDiastolic}
              </span>
              <span className="text-[10px] font-bold text-slate-400">mmHg</span>
            </div>
          </div>

          {/* Mini Sparkline Chart */}
          <div className="h-3.5 w-full opacity-80">
            <svg viewBox="0 0 100 20" className="w-full h-full stroke-blue-500 fill-none" strokeWidth="2.2">
              <path d="M0,10 L20,12 L40,8 L60,14 L75,9 L90,11 L100,10" />
            </svg>
          </div>
        </div>

        {/* 3. SpO2 */}
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-750/70 space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="h-6 w-6 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
              <Droplets className="h-3.5 w-3.5" />
            </div>
            <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              Normal
            </span>
          </div>

          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-slate-900 dark:text-white">
                {vitals.spo2}%
              </span>
              <span className="text-[10px] font-bold text-slate-400">SpO₂</span>
            </div>
          </div>

          {/* Mini Sparkline Chart */}
          <div className="h-3.5 w-full opacity-80">
            <svg viewBox="0 0 100 20" className="w-full h-full stroke-cyan-500 fill-none" strokeWidth="2.2">
              <path d="M0,11 L25,10 L50,9 L75,11 L85,10 L100,10" />
            </svg>
          </div>
        </div>

        {/* 4. Body Temp */}
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-750/70 space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="h-6 w-6 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Thermometer className="h-3.5 w-3.5" />
            </div>
            <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              Normal
            </span>
          </div>

          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-slate-900 dark:text-white">
                {vitals.temperature}°C
              </span>
              <span className="text-[10px] font-bold text-slate-400">Temp</span>
            </div>
          </div>

          {/* Mini Sparkline Chart */}
          <div className="h-3.5 w-full opacity-80">
            <svg viewBox="0 0 100 20" className="w-full h-full stroke-amber-500 fill-none" strokeWidth="2.2">
              <path d="M0,10 L20,9 L40,12 L60,8 L80,11 L100,10" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
