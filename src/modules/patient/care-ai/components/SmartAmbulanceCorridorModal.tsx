import { useState, useEffect } from "react";
import {
  X,
  Ambulance,
  Radio,
  Activity,
  Heart,
  Droplets,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  Building2,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SmartAmbulanceCorridorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SmartAmbulanceCorridorModal({ isOpen, onClose }: SmartAmbulanceCorridorModalProps) {
  const [etaMinutes, setEtaMinutes] = useState(7);
  const [ambulanceSpeedKmph, setAmbulanceSpeedKmph] = useState(58);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setEtaMinutes((prev) => (prev > 1 ? prev - 1 : 1));
      setAmbulanceSpeedKmph(Math.floor(52 + Math.random() * 12));
    }, 4000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl text-slate-100 flex flex-col font-sans">
        {/* HEADER */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-rose-600 flex items-center justify-center shadow-lg shadow-red-600/30">
              <Ambulance className="w-6 h-6 text-white animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Smart Ambulance Telemetry &amp; Traffic Green Corridor
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-red-500/20 text-red-300 border border-red-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                  Live ALS Unit #KA-01-EA-108
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Hospital ER pre-arrival streaming and dynamic traffic light preemption for the Golden Hour.
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg h-9 w-9"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6">
          {/* SPEED & ETA HUD */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Hospital ER ETA</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-black text-amber-300">{etaMinutes}</span>
                <span className="text-xs text-slate-400">Mins</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-medium">Manipal Trauma Bay 1</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Vehicle Speed</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-black text-cyan-300">{ambulanceSpeedKmph}</span>
                <span className="text-xs text-slate-400">km/h</span>
              </div>
              <span className="text-[10px] text-slate-400">Outer Ring Road Corridor</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Traffic Signals</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black text-emerald-400">3 of 3</span>
              </div>
              <span className="text-[10px] text-emerald-300">FORCED GREEN 🟢</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Trauma Surgeon</span>
              <div className="text-sm font-bold text-white mt-1">Dr. S. Nair, MCh</div>
              <span className="text-[10px] text-emerald-400">Scrubbed &amp; Waiting at OT</span>
            </div>
          </div>

          {/* IN-TRANSIT VITALS TELEMETRY STREAM */}
          <div className="p-5 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-rose-500 animate-pulse" />
                <h3 className="text-sm font-bold text-white">
                  Real-time In-Transit Telemetry (Streaming to Hospital ER)
                </h3>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">LATENCY: 42ms &bull; WebRTC AES-256</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[10px] flex items-center justify-between">
                  <span>Heart Rhythm</span>
                  <Heart className="w-3.5 h-3.5 text-rose-400 animate-ping" />
                </span>
                <div className="text-2xl font-black text-white mt-1">112 <span className="text-xs text-slate-400">BPM</span></div>
                <span className="text-[10px] text-amber-400 font-semibold">Sinus Tachycardia</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[10px] flex items-center justify-between">
                  <span>Non-Invasive BP</span>
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                </span>
                <div className="text-2xl font-black text-white mt-1">94/62 <span className="text-xs text-slate-400">mmHg</span></div>
                <span className="text-[10px] text-amber-400 font-semibold">Borderline Low MAP</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[10px] flex items-center justify-between">
                  <span>SpO2 (15L Non-Rebreather)</span>
                  <Droplets className="w-3.5 h-3.5 text-blue-400" />
                </span>
                <div className="text-2xl font-black text-white mt-1">97 <span className="text-xs text-slate-400">%</span></div>
                <span className="text-[10px] text-emerald-400 font-semibold">Oxygenated</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 text-[10px] flex items-center justify-between">
                  <span>Glasgow Coma Scale</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                </span>
                <div className="text-2xl font-black text-white mt-1">14/15 <span className="text-xs text-slate-400">GCS</span></div>
                <span className="text-[10px] text-emerald-400 font-semibold">Conscious / Responding</span>
              </div>
            </div>
          </div>

          {/* DYNAMIC TRAFFIC PREEMPTION (BENGALURU TRAFFIC POLICE BTP) */}
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" /> BTP Dynamic Green Corridor Interface
              </h4>
              <span className="text-[11px] text-slate-400">Automated Traffic Signal Overrides</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                  <div>
                    <strong className="text-white">Junction 1: Bellandur Gate Signal</strong>
                    <p className="text-[11px] text-slate-400">0.8 km away &bull; Cross-traffic held red</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                  FORCED GREEN 🟢
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                  <div>
                    <strong className="text-white">Junction 2: Iblur Flyover Underpass</strong>
                    <p className="text-[11px] text-slate-400">2.1 km away &bull; Preemption countdown active (45s)</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                  PREEMPTED GREEN 🟢
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div>
                    <strong className="text-white">Junction 3: Agara Lake Junction</strong>
                    <p className="text-[11px] text-slate-400">3.6 km away &bull; Traffic police warden notified</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[10px]">
                  CLEARING QUEUE 🟡
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Connected to Karnataka 108 Emergency Medical Services &amp; BTP Smart Traffic Grid</span>
          <Button onClick={onClose} className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs">
            Close Corridor View
          </Button>
        </div>
      </div>
    </div>
  );
}
