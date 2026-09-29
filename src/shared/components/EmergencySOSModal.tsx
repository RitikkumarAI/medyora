import { useState, useEffect } from "react";
import {
  Phone,
  AlertOctagon,
  MapPin,
  Ambulance,
  HeartPulse,
  ShieldAlert,
  Users,
  CheckCircle2,
  X,
  Navigation,
  Activity,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface EmergencySOSModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientName?: string;
  bloodGroup?: string;
}

export function EmergencySOSModal({
  isOpen,
  onClose,
  patientName = "Rahul Kumar",
  bloodGroup = "O+ Positive",
}: EmergencySOSModalProps) {
  const [dispatchStage, setDispatchStage] = useState<"trigger" | "dispatching" | "en_route">("trigger");
  const [etaMinutes, setEtaMinutes] = useState(7);
  const [familyNotified, setFamilyNotified] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      setDispatchStage("trigger");
      setEtaMinutes(7);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTriggerAmbulance = () => {
    setDispatchStage("dispatching");
    toast.error("108 AMBULANCE DISPATCHED: Sirens active. Stay calm!", { duration: 5000 });

    setTimeout(() => {
      setDispatchStage("en_route");
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border-2 border-rose-500/80 text-white shadow-2xl shadow-rose-950/60 overflow-hidden">
        {/* Pulsing Emergency Header */}
        <div className="bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-white/20 animate-bounce">
              <AlertOctagon className="h-6 w-6 text-white" />
            </span>
            <div>
              <h2 className="text-lg font-black tracking-tight uppercase flex items-center gap-2">
                <span>Emergency SOS Network</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-rose-700 font-extrabold tracking-widest animate-pulse">
                  24/7 ACTIVE
                </span>
              </h2>
              <p className="text-xs text-rose-100 font-medium">National Health Service & Emergency ER Dispatch</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {dispatchStage === "trigger" && (
            <div className="text-center space-y-5">
              <div className="mx-auto w-24 h-24 rounded-full bg-rose-500/10 border-4 border-rose-500/40 flex items-center justify-center relative">
                <span className="absolute inset-0 rounded-full border-2 border-rose-500 animate-ping opacity-30"></span>
                <Flame className="h-12 w-12 text-rose-500" />
              </div>

              <div>
                <h3 className="text-xl font-black text-white">Require Immediate Medical Assistance?</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Tapping below dispatches the nearest Advanced Life Support (ALS) 108 Ambulance, transmits your GPS, and alerts local ER Trauma Centers.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-left space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="font-semibold text-slate-400">Patient Emergency Dossier:</span>
                  <span className="font-bold text-white">{patientName}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="font-semibold text-slate-400">Blood Group:</span>
                  <span className="font-bold text-rose-400">{bloodGroup}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="font-semibold text-slate-400">Critical Allergies:</span>
                  <span className="font-bold text-amber-300">Penicillin (Severe), Sulfa Drugs</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="font-semibold text-slate-400">Pre-existing Condition:</span>
                  <span className="font-bold text-slate-200">Hypertension / Cardiac Observation</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <Button
                  onClick={handleTriggerAmbulance}
                  className="w-full h-14 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-base shadow-xl shadow-rose-600/30 flex items-center justify-center gap-2"
                >
                  <Ambulance className="h-6 w-6" />
                  DISPATCH 108 AMBULANCE NOW
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    asChild
                    variant="outline"
                    className="h-11 rounded-xl border-slate-700 bg-slate-800 text-white font-bold text-xs hover:bg-slate-700"
                  >
                    <a href="tel:108">
                      <Phone className="h-4 w-4 mr-1.5 text-rose-400" />
                      Direct Call 108
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-11 rounded-xl border-slate-700 bg-slate-800 text-white font-bold text-xs hover:bg-slate-700"
                  >
                    <a href="tel:112">
                      <ShieldAlert className="h-4 w-4 mr-1.5 text-blue-400" />
                      Direct Call 112 (SOS)
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {dispatchStage === "dispatching" && (
            <div className="py-12 text-center space-y-4">
              <div className="mx-auto w-20 h-20 rounded-full border-4 border-rose-500 border-t-transparent animate-spin flex items-center justify-center">
                <Navigation className="h-8 w-8 text-rose-500" />
              </div>
              <h3 className="text-lg font-bold text-white">Triangulating Nearest GPS Ambulance...</h3>
              <p className="text-xs text-slate-400">Contacting 108 central dispatch and Apollo Hospital Trauma Emergency.</p>
            </div>
          )}

          {dispatchStage === "en_route" && (
            <div className="space-y-5 animate-in fade-in duration-300">
              {/* Radar Simulation */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 relative overflow-hidden text-center">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 text-xs">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                    Ambulance En-Route
                  </span>
                  <span className="font-mono text-slate-400">Vehicle #DL-01-AX-9941</span>
                </div>

                <div className="py-5 flex items-center justify-around">
                  <div>
                    <p className="text-3xl font-black text-rose-400">{etaMinutes} mins</p>
                    <p className="text-[11px] text-slate-400 font-medium">Estimated Arrival</p>
                  </div>
                  <div className="h-10 w-px bg-slate-800"></div>
                  <div>
                    <p className="text-base font-bold text-white">Paramedic Amit</p>
                    <p className="text-[11px] text-slate-400">Paramedic Contact: +91 98112 04829</p>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-rose-400" />
                  <span>Assigned Hospital: <strong>Apollo ER & Trauma Center (1.8 km)</strong></span>
                </div>
              </div>

              {/* Family Alert Confirmation */}
              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-200">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>Family Emergency Circle Notified via SMS & Live GPS Beacon</span>
                </span>
                <span className="font-bold text-emerald-400">Active</span>
              </div>

              <div className="flex gap-2">
                <Button
                  asChild
                  className="flex-1 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                >
                  <a href="tel:+919811204829">
                    <Phone className="h-4 w-4 mr-1.5" /> Call Paramedic
                  </a>
                </Button>
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="h-12 rounded-xl border-slate-700 text-slate-300 font-bold text-xs hover:bg-slate-800"
                >
                  Close Radar
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
