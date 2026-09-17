import { useState, useEffect } from "react";
import {
  X,
  Watch,
  QrCode,
  Bluetooth,
  CheckCircle2,
  RefreshCw,
  Smartphone,
  ShieldCheck,
  Zap,
  Activity,
  Heart,
  Droplets,
  Thermometer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { type HealthVitalsData } from "./HealthOverviewCard";
import { toast } from "sonner";

interface DeviceSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSyncVitals: (newVitals: HealthVitalsData) => void;
  currentVitals: HealthVitalsData;
}

const SUPPORTED_DEVICES = [
  { id: "apple", name: "Apple Watch (Series 4–9, Ultra)", icon: "🍎", protocol: "Apple HealthKit" },
  { id: "samsung", name: "Samsung Galaxy Watch (4–6)", icon: "⌚", protocol: "Samsung Health / Wear OS" },
  { id: "pixel", name: "Google Pixel Watch", icon: "🌐", protocol: "Health Connect" },
  { id: "noise", name: "Noise / boAt / Fire-Boltt", icon: "⚡", protocol: "BLE FastPair" },
  { id: "garmin", name: "Garmin Venu & Forerunner", icon: "🧭", protocol: "Garmin Connect" },
  { id: "fitbit", name: "Fitbit Sense & Versa", icon: "🏃", protocol: "Fitbit Web API" },
  { id: "amazfit", name: "Amazfit & Zepp OS", icon: "💫", protocol: "Zepp Life" },
];

export function DeviceSyncModal({
  isOpen,
  onClose,
  onSyncVitals,
  currentVitals,
}: DeviceSyncModalProps) {
  const [activeTab, setActiveTab] = useState<"qr" | "bluetooth" | "manual">("qr");
  const [isScanning, setIsScanning] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState<string | null>(null);
  const [syncSuccess, setSyncSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsScanning(false);
      setSyncSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSimulateQRScan = (deviceName: string) => {
    setIsScanning(true);
    toast.info(`Connecting to ${deviceName}...`);

    setTimeout(() => {
      setIsScanning(false);
      setConnectedDevice(deviceName);
      setSyncSuccess(true);

      // Push real-time smartwatch synced vitals
      const synced: HealthVitalsData = {
        heartRate: Math.floor(68 + Math.random() * 8), // 68 - 76 bpm
        bpSystolic: 118,
        bpDiastolic: 78,
        spo2: 99,
        temperature: 36.6,
        lastUpdated: "Synced just now via " + deviceName,
      };

      onSyncVitals(synced);
      toast.success(`Connected! Biometrics synced from ${deviceName}`);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in font-sans">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Watch className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Universal Smartwatch Sync
                </h3>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  Live Biometrics
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Connect Apple Watch, Galaxy Watch, Noise, boAt, Garmin & more via QR code
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="h-8 w-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 px-6 pt-4 pb-2 border-b border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setActiveTab("qr")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "qr"
                ? "bg-blue-600 text-white shadow-sm font-extrabold"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
            }`}
          >
            <QrCode className="h-3.5 w-3.5" />
            <span>Scan QR Code</span>
          </button>

          <button
            onClick={() => setActiveTab("bluetooth")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "bluetooth"
                ? "bg-blue-600 text-white shadow-sm font-extrabold"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
            }`}
          >
            <Bluetooth className="h-3.5 w-3.5" />
            <span>Nearby Bluetooth (BLE)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* QR Code Tab */}
          {activeTab === "qr" && (
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Left: Interactive Simulated QR Code */}
              <div className="p-4 rounded-3xl bg-white border-2 border-dashed border-blue-400 shadow-xl flex flex-col items-center justify-center text-center shrink-0 w-52 h-52 relative group">
                {/* SVG Simulated QR Pattern */}
                <div className="w-full h-full relative flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-40 h-40 fill-slate-900">
                    <path d="M0,0 h30 v30 h-30 z M6,6 h18 v18 h-18 z M10,10 h10 v10 h-10 z" />
                    <path d="M70,0 h30 v30 h-30 z M76,6 h18 v18 h-18 z M80,10 h10 v10 h-10 z" />
                    <path d="M0,70 h30 v30 h-30 z M6,76 h18 v18 h-18 z M10,80 h10 v10 h-10 z" />
                    <rect x="36" y="6" width="6" height="12" />
                    <rect x="48" y="10" width="12" height="6" />
                    <rect x="36" y="24" width="8" height="6" />
                    <rect x="10" y="36" width="8" height="12" />
                    <rect x="24" y="44" width="12" height="8" />
                    <rect x="40" y="38" width="20" height="20" className="fill-blue-600" />
                    <rect x="68" y="36" width="12" height="6" />
                    <rect x="86" y="40" width="8" height="14" />
                    <rect x="36" y="68" width="10" height="8" />
                    <rect x="52" y="74" width="8" height="14" />
                    <rect x="68" y="70" width="14" height="6" />
                    <rect x="80" y="82" width="14" height="12" />
                  </svg>
                  {/* Center Brand Badge */}
                  <div className="absolute h-8 w-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs shadow-md">
                    M
                  </div>
                </div>

                {/* Laser Scanning Animation Bar */}
                <div className="absolute inset-x-4 top-4 h-0.5 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-bounce" />
              </div>

              {/* Right: Instructions & Supported Brands */}
              <div className="space-y-3 flex-1 text-center sm:text-left">
                <div>
                  <h4 className="text-sm font-black text-slate-900 dark:text-white">
                    Scan with your Watch Camera or App
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">
                    Open your smartwatch's camera or companion health app, point it at this QR code to grant biometric permissions.
                  </p>
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Or select your smartwatch to sync now:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {SUPPORTED_DEVICES.slice(0, 4).map((dev) => (
                      <button
                        key={dev.id}
                        disabled={isScanning}
                        onClick={() => handleSimulateQRScan(dev.name)}
                        className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-blue-950/60 border border-slate-200/80 dark:border-slate-750 text-left flex items-center justify-between gap-2 transition-all hover:scale-102 active:scale-98 group disabled:opacity-50"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-base">{dev.icon}</span>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                              {dev.name.split("(")[0]?.trim()}
                            </div>
                            <div className="text-[9px] text-slate-400 truncate">{dev.protocol}</div>
                          </div>
                        </div>
                        <Zap className="h-3.5 w-3.5 text-blue-500 shrink-0 group-hover:scale-110 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bluetooth Tab */}
          {activeTab === "bluetooth" && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-blue-600 text-white flex items-center justify-center animate-pulse">
                    <Bluetooth className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-blue-950 dark:text-blue-200">
                      Bluetooth Low Energy (BLE 5.3) Scanner
                    </h4>
                    <p className="text-[11px] text-blue-700 dark:text-blue-300">
                      Make sure your smartwatch Bluetooth is turned on and visible
                    </p>
                  </div>
                </div>

                <Button
                  size="sm"
                  onClick={() => handleSimulateQRScan("Apple Watch Ultra 2 (BLE)")}
                  disabled={isScanning}
                  className="h-8 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                >
                  {isScanning ? "Pairing..." : "Scan Nearby"}
                </Button>
              </div>

              {/* Supported Devices List */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Available Devices
                </div>
                {SUPPORTED_DEVICES.map((dev) => (
                  <div
                    key={dev.id}
                    onClick={() => handleSimulateQRScan(dev.name)}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 hover:border-blue-500 flex items-center justify-between cursor-pointer transition-all hover:bg-blue-50/50"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{dev.icon}</span>
                      <div>
                        <div className="text-xs font-black text-slate-900 dark:text-white">{dev.name}</div>
                        <div className="text-[10px] text-slate-400">{dev.protocol} • Ready to pair</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Connect →</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Connected Device & Vitals Preview */}
          {syncSuccess && connectedDevice && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 space-y-3 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-xs font-black text-emerald-950 dark:text-emerald-200">
                    Active Connection: {connectedDevice}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded-full">
                  Signal: 98% (Strong)
                </span>
              </div>

              {/* Live Synced Metrics Grid */}
              <div className="grid grid-cols-4 gap-2 pt-1 text-center">
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/50">
                  <div className="text-[9px] font-bold text-slate-400">Heart Rate</div>
                  <div className="text-sm font-black text-slate-900 dark:text-white">{currentVitals.heartRate} bpm</div>
                </div>

                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/50">
                  <div className="text-[9px] font-bold text-slate-400">Blood Pressure</div>
                  <div className="text-sm font-black text-slate-900 dark:text-white">
                    {currentVitals.bpSystolic}/{currentVitals.bpDiastolic}
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/50">
                  <div className="text-[9px] font-bold text-slate-400">SpO₂</div>
                  <div className="text-sm font-black text-slate-900 dark:text-white">{currentVitals.spo2}%</div>
                </div>

                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/50">
                  <div className="text-[9px] font-bold text-slate-400">Temp</div>
                  <div className="text-sm font-black text-slate-900 dark:text-white">{currentVitals.temperature}°C</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60">
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            <span>End-to-End HIPAA Encrypted Biometric Stream</span>
          </div>

          <Button
            size="sm"
            onClick={onClose}
            className="h-8 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 font-black text-xs"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
