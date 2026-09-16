import { useState } from "react";
import { X, Heart, Activity, Droplets, Thermometer, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type HealthVitalsData } from "./HealthOverviewCard";
import { toast } from "sonner";

interface AddVitalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentVitals: HealthVitalsData;
  onSaveVitals: (vitals: HealthVitalsData) => void;
}

export function AddVitalsModal({
  isOpen,
  onClose,
  currentVitals,
  onSaveVitals,
}: AddVitalsModalProps) {
  const [heartRate, setHeartRate] = useState(currentVitals.heartRate.toString());
  const [bpSystolic, setBpSystolic] = useState(currentVitals.bpSystolic.toString());
  const [bpDiastolic, setBpDiastolic] = useState(currentVitals.bpDiastolic.toString());
  const [spo2, setSpo2] = useState(currentVitals.spo2.toString());
  const [temperature, setTemperature] = useState(currentVitals.temperature.toString());

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: HealthVitalsData = {
      heartRate: Number(heartRate) || currentVitals.heartRate,
      bpSystolic: Number(bpSystolic) || currentVitals.bpSystolic,
      bpDiastolic: Number(bpDiastolic) || currentVitals.bpDiastolic,
      spo2: Number(spo2) || currentVitals.spo2,
      temperature: Number(temperature) || currentVitals.temperature,
      lastUpdated: "Just now",
    };

    onSaveVitals(updated);
    toast.success("Health vitals updated successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in font-sans">
      <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-white">
                Update Health Vitals
              </h2>
              <p className="text-xs text-slate-400 font-medium">Log your daily clinical biometric readings</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="h-8 w-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-all"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {/* Heart Rate */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Heart className="h-3 w-3 text-rose-500" /> Heart Rate (bpm)
              </label>
              <Input
                type="number"
                value={heartRate}
                onChange={(e) => setHeartRate(e.target.value)}
                className="h-10 rounded-xl"
              />
            </div>

            {/* SpO2 */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Droplets className="h-3 w-3 text-cyan-500" /> SpO₂ (%)
              </label>
              <Input
                type="number"
                value={spo2}
                onChange={(e) => setSpo2(e.target.value)}
                className="h-10 rounded-xl"
              />
            </div>

            {/* BP Systolic */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Activity className="h-3 w-3 text-blue-500" /> BP Systolic (mmHg)
              </label>
              <Input
                type="number"
                value={bpSystolic}
                onChange={(e) => setBpSystolic(e.target.value)}
                className="h-10 rounded-xl"
              />
            </div>

            {/* BP Diastolic */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Activity className="h-3 w-3 text-blue-500" /> BP Diastolic (mmHg)
              </label>
              <Input
                type="number"
                value={bpDiastolic}
                onChange={(e) => setBpDiastolic(e.target.value)}
                className="h-10 rounded-xl"
              />
            </div>

            {/* Temperature */}
            <div className="col-span-2 space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Thermometer className="h-3 w-3 text-amber-500" /> Body Temp (°C)
              </label>
              <Input
                type="number"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                className="h-10 rounded-xl"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-xl text-xs font-bold"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
            >
              <Check className="h-3.5 w-3.5" />
              <span>Save Readings</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
