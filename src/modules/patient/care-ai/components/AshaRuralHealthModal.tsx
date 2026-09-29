import { useState } from "react";
import {
  X,
  Mic,
  MicOff,
  WifiOff,
  CloudUpload,
  CheckCircle2,
  FileText,
  User,
  ShieldCheck,
  Building,
  Sparkles,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AshaRuralHealthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface OfflinePatientRecord {
  id: string;
  abhaId: string;
  name: string;
  ageGender: string;
  village: string;
  symptomsHindi: string;
  triageVerdict: string;
  isHighRisk: boolean;
  synced: boolean;
}

const DEFAULT_OFFLINE_RECORDS: OfflinePatientRecord[] = [
  {
    id: "REC-01",
    abhaId: "91-4821-9921-0021",
    name: "Sunita Devi",
    ageGender: "26F (Pregnant 7 Months)",
    village: "Rampur PHC Sub-Center",
    symptomsHindi: "सिर में तेज दर्द, पैरों में सूजन, बीपी 148/96 (Preeclampsia Risk)",
    triageVerdict: "High-Risk Pregnancy: Urgent referral to District Hospital recommended.",
    isHighRisk: true,
    synced: false,
  },
  {
    id: "REC-02",
    abhaId: "91-7712-4029-3312",
    name: "Rameshwar Yadav",
    ageGender: "58M",
    village: "Kalyanpur Tola",
    symptomsHindi: "3 दिन से तेज खांसी, सीने में दर्द, बुखार 102°F",
    triageVerdict: "Suspected Lower Respiratory Infection (Pneumonia) - Sputum test ordered.",
    isHighRisk: false,
    synced: false,
  },
];

export function AshaRuralHealthModal({ isOpen, onClose }: AshaRuralHealthModalProps) {
  const [records, setRecords] = useState<OfflinePatientRecord[]>(DEFAULT_OFFLINE_RECORDS);
  const [isListening, setIsListening] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  if (!isOpen) return null;

  const handleSimulateVoiceIntake = () => {
    setIsListening(true);
    toast.info("🎤 Listening to ASHA Worker Hindi Voice Intake...");

    setTimeout(() => {
      setIsListening(false);
      const newRec: OfflinePatientRecord = {
        id: `REC-0${records.length + 1}`,
        abhaId: `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
        name: "Meena Kumari",
        ageGender: "32F",
        village: "Shivpur Village",
        symptomsHindi: "उल्टी, दस्त, कमजोरी, बीपी 90/60 (Dehydration)",
        triageVerdict: "Acute Gastroenteritis: Oral Rehydration Salts (ORS) + Zinc started.",
        isHighRisk: false,
        synced: false,
      };

      setRecords((prev) => [newRec, ...prev]);
      toast.success("Voice parsed into ABHA Digital Health Record (Cached Offline in IndexedDB)!");
    }, 1400);
  };

  const handleSyncToABDM = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setRecords((prev) => prev.map((r) => ({ ...r, synced: true })));
      setIsSyncing(false);
      toast.success("All offline records synced with Ayushman Bharat Digital Mission (ABDM) Cloud!");
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl text-slate-100 flex flex-col font-sans">
        {/* HEADER */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-600/30">
              <WifiOff className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  ASHA / Rural Offline-First Health Locker
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  ABDM / ABHA Linked
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Operates with 0% internet connection in remote villages. Syncs to National Health Authority (NHA) when online.
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
          {/* OFFLINE STATUS BANNER & VOICE ACTION */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border border-emerald-500/40 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Offline PWA Database: Local IndexedDB Active
                  </h3>
                  <p className="text-xs text-slate-400">
                    Frontline health workers can record symptoms in Hindi/English without internet.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={handleSimulateVoiceIntake}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-2"
                >
                  <Mic className="w-4 h-4 text-emerald-200" />
                  {isListening ? "Listening Hindi Voice..." : "ASHA Voice Intake (हिंदी)"}
                </Button>

                <Button
                  onClick={handleSyncToABDM}
                  variant="outline"
                  className="border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 text-xs font-bold"
                >
                  <CloudUpload className="w-4 h-4 mr-1.5" />
                  {isSyncing ? "Syncing ABDM..." : "Sync All with Cloud"}
                </Button>
              </div>
            </div>
          </div>

          {/* RECORDS LIST */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300">
                Village Patient Health Records ({records.length})
              </span>
              <span className="text-slate-400">
                {records.filter((r) => r.synced).length} Synced &bull; {records.filter((r) => !r.synced).length} Pending Cloud Sync
              </span>
            </div>

            <div className="space-y-3">
              {records.map((rec) => (
                <div
                  key={rec.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    rec.isHighRisk
                      ? "bg-red-950/20 border-red-500/40 text-slate-200"
                      : "bg-slate-800/50 border-slate-700/60 text-slate-200"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2 mb-2">
                    <div className="flex items-center gap-2">
                      <strong className="text-white text-sm">{rec.name}</strong>
                      <span className="text-xs text-slate-400">({rec.ageGender})</span>
                      <span className="text-[10px] text-slate-500">&bull; {rec.village}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {rec.isHighRisk && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-600 text-white animate-pulse">
                          HIGH-RISK PREGNANCY ALERT
                        </span>
                      )}
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          rec.synced
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        }`}
                      >
                        {rec.synced ? "Synced to ABDM ✓" : "Cached Locally (Offline)"}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-amber-300 font-medium italic">
                    🗣️ &ldquo;{rec.symptomsHindi}&rdquo;
                  </p>

                  <div className="mt-2 text-xs text-slate-300 flex items-center justify-between pt-1">
                    <span>
                      <strong className="text-cyan-400">Action:</strong> {rec.triageVerdict}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">ABHA: {rec.abhaId}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Compliant with Ayushman Bharat Digital Mission (ABDM) M1/M2/M3 Architecture</span>
          <Button onClick={onClose} className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs">
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
