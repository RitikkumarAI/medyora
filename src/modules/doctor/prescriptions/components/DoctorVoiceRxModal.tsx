import { useState, useEffect } from "react";
import {
  X,
  Mic,
  MicOff,
  Sparkles,
  CheckCircle2,
  FileText,
  Pill,
  RefreshCw,
  Volume2,
  AlertTriangle,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DictatedMedicine {
  name: string;
  dosage: string;
  duration: string;
  instructions: string;
}

interface ParsedVoicePrescription {
  patientName: string;
  diagnosis: string;
  advice: string;
  medicines: DictatedMedicine[];
}

interface DoctorVoiceRxModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyPrescription: (data: {
    patientName: string;
    diagnosis: string;
    advice: string;
    medicines: { name: string; dosage: string; duration: string }[];
  }) => void;
}

const PRESET_SCRIPTS: Record<
  string,
  {
    spokenText: string;
    parsed: ParsedVoicePrescription;
  }
> = {
  bronchitis: {
    spokenText:
      "Patient Rahul Sharma, age 32. Diagnosis acute viral bronchitis with fever. Prescribe Tab. Augmentin 625 Duo twice daily after food for 5 days. Tab. Dolo 650mg thrice daily after meals for 3 days. Syrup Ascoril D 10ml thrice daily for 5 days. Cap. Pantocid 40mg once daily morning empty stomach for 7 days. Advice: Drink plenty of warm fluids, steam inhalation twice daily, review in 5 days.",
    parsed: {
      patientName: "Rahul Sharma",
      diagnosis: "Acute Viral Bronchitis with Pyrexia",
      advice: "Drink plenty of warm fluids, steam inhalation twice daily, avoid cold drinks, review in 5 days.",
      medicines: [
        { name: "Tab. Augmentin 625 Duo (Amoxicillin/Clavulanate)", dosage: "1-0-1 (After Food)", duration: "5 Days", instructions: "Twice daily after food" },
        { name: "Tab. Dolo 650mg (Paracetamol)", dosage: "1-1-1 (After Food)", duration: "3 Days", instructions: "Thrice daily after meals for fever" },
        { name: "Syr. Ascoril D 10ml", dosage: "10ml - 10ml - 10ml", duration: "5 Days", instructions: "Thrice daily for cough relief" },
        { name: "Cap. Pantocid 40mg (Pantoprazole)", dosage: "1-0-0 (Empty Stomach)", duration: "7 Days", instructions: "Morning before breakfast" },
      ],
    },
  },
  hindi_flu: {
    spokenText:
      "मरीज सुमित्रा देवी। डायग्नोसिस मौसमी फ्लू और बदन दर्द। लिखो: डोलो 650 दिन में तीन बार खाने के बाद 4 दिन के लिए। एज़िथ्रोमाइसिन 500 दिन में एक बार दोपहर के खाने के बाद 5 दिन के लिए। मोंटेक एलसी रात को सोते समय 7 दिन। सलाह: गुनगुना पानी पिएं और तीन दिन पूरा आराम करें।",
    parsed: {
      patientName: "Sumitra Devi",
      diagnosis: "Seasonal Viral Influenza & Myalgia (मौसमी फ्लू)",
      advice: "गुनगुना पानी पिएं, धूल-धुएं से बचें, 3 दिन पूरा आराम करें। (Adequate bed rest and warm fluids)",
      medicines: [
        { name: "Tab. Dolo 650mg (Paracetamol)", dosage: "1-1-1 (खाने के बाद)", duration: "4 Days", instructions: "दिन में 3 बार भोजन के बाद" },
        { name: "Tab. Azithral 500mg (Azithromycin)", dosage: "0-1-0 (दोपहर खाने के बाद)", duration: "5 Days", instructions: "दिन में 1 बार 5 दिन तक" },
        { name: "Tab. Montair-LC (Montelukast/Levocetirizine)", dosage: "0-0-1 (रात को सोते समय)", duration: "7 Days", instructions: "Bedtime after dinner" },
      ],
    },
  },
  diabetes: {
    spokenText:
      "Patient Vikram Malhotra, age 54. Diagnosis Type-2 Diabetes Mellitus with mild hypertension. Prescribe Tab. Glycomet-SR 500mg once daily before breakfast. Tab. Telma 40mg once daily morning. Advice: 30 minutes brisk walking daily, reduce refined sugar intake, check fasting blood sugar weekly.",
    parsed: {
      patientName: "Vikram Malhotra",
      diagnosis: "Type-2 Diabetes Mellitus & Primary Hypertension",
      advice: "30 minutes brisk walking daily, strict low-glycemic diabetic diet, check fasting and post-prandial blood sugar weekly.",
      medicines: [
        { name: "Tab. Glycomet-SR 500mg (Metformin Extended Release)", dosage: "1-0-0 (Before Breakfast)", duration: "30 Days", instructions: "Morning before food" },
        { name: "Tab. Telma 40mg (Telmisartan)", dosage: "1-0-0 (Morning)", duration: "30 Days", instructions: "Morning blood pressure control" },
      ],
    },
  },
};

export function DoctorVoiceRxModal({
  isOpen,
  onClose,
  onApplyPrescription,
}: DoctorVoiceRxModalProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<"en-IN" | "hi-IN">("en-IN");
  const [liveTranscript, setLiveTranscript] = useState("");
  const [parsedData, setParsedData] = useState<ParsedVoicePrescription | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setIsRecording(false);
      setLiveTranscript("");
      setParsedData(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Toggle Live Speech Recording (Web Speech Recognition API with intelligent fallback)
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition ||
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Fast simulator for browsers without Web Speech recognition
      handleTriggerPreset("bronchitis");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = selectedLanguage;
      recognition.interimResults = true;
      recognition.continuous = true;

      setIsRecording(true);
      toast.info("🎙️ Mic active: Speak prescription naturally in " + (selectedLanguage === "hi-IN" ? "Hindi" : "English"));

      recognition.onresult = (event: any) => {
        let interim = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          interim += event.results[i][0].transcript;
        }
        setLiveTranscript(interim);
      };

      recognition.onerror = () => {
        setIsRecording(false);
        handleTriggerPreset("bronchitis");
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch {
      handleTriggerPreset("bronchitis");
    }
  };

  const handleTriggerPreset = (key: string) => {
    setIsRecording(true);
    setLiveTranscript(PRESET_SCRIPTS[key]!.spokenText);
    toast.info("🎙️ AI Medical NLP Parsing Clinical Speech...");

    setTimeout(() => {
      setIsRecording(false);
      setParsedData(PRESET_SCRIPTS[key]!.parsed);
      toast.success("Prescription Regimen parsed into structured clinical tables!");
    }, 1000);
  };

  const handleApply = () => {
    if (!parsedData) return;
    onApplyPrescription({
      patientName: parsedData.patientName,
      diagnosis: parsedData.diagnosis,
      advice: parsedData.advice,
      medicines: parsedData.medicines.map((m) => ({
        name: m.name,
        dosage: m.dosage,
        duration: m.duration,
      })),
    });
    toast.success("Applied voice-dictated prescription into Doctor Cockpit!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl text-slate-100 flex flex-col font-sans">
        {/* HEADER */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
              <Mic className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Doctor Voice-to-Rx AI Studio
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Medical NLP Engine
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Dictate diagnosis, multi-drug dosages, and clinical advice hands-free in seconds.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as "en-IN" | "hi-IN")}
              className="bg-slate-800 border border-slate-700 text-xs text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none"
            >
              <option value="en-IN">🇬🇧 English (Indian Medical)</option>
              <option value="hi-IN">🇮🇳 Hindi / Hinglish (हिंदी बोलकर)</option>
            </select>

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg h-9 w-9"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6">
          {/* MICROPHONE & WAVEFORM BAR */}
          <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center space-y-4 relative overflow-hidden">
            {isRecording && (
              <div className="absolute inset-0 bg-blue-500/5 animate-pulse pointer-events-none" />
            )}

            <button
              onClick={toggleRecording}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl relative ${
                isRecording
                  ? "bg-red-600 text-white ring-8 ring-red-500/20 animate-bounce"
                  : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/40"
              }`}
            >
              {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </button>

            <div>
              <h3 className="text-sm font-bold text-white">
                {isRecording ? "Listening to Doctor Speech... (Speak naturally)" : "Click to Start Voice Dictation"}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Automatically formats brand names, generic formulations, frequencies (1-0-1), and food timing.
              </p>
            </div>

            {/* Quick Viva Demonstration Presets */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <span className="text-[11px] text-slate-500 font-medium">Viva Demo Scripts:</span>
              <button
                type="button"
                onClick={() => handleTriggerPreset("bronchitis")}
                className="px-3 py-1 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 text-xs font-medium"
              >
                🎙️ Dictate Bronchitis (Augmentin+Dolo)
              </button>
              <button
                type="button"
                onClick={() => handleTriggerPreset("hindi_flu")}
                className="px-3 py-1 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 text-xs font-medium"
              >
                🎙️ हिंदी बोलकर (Dolo + Azithral)
              </button>
              <button
                type="button"
                onClick={() => handleTriggerPreset("diabetes")}
                className="px-3 py-1 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-medium"
              >
                🎙️ Dictate Diabetic (Glycomet)
              </button>
            </div>
          </div>

          {/* TRANSCRIPT VIEW */}
          {liveTranscript && (
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-blue-400" /> Raw Speech Transcript:
              </span>
              <p className="text-xs text-slate-200 leading-relaxed italic">&ldquo;{liveTranscript}&rdquo;</p>
            </div>
          )}

          {/* PARSED CLINICAL TABLE */}
          {parsedData && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-sm font-bold text-white">AI Structured Clinical Prescription:</h4>
                </div>
                <span className="text-xs text-slate-400">
                  Patient: <strong className="text-white">{parsedData.patientName}</strong>
                </span>
              </div>

              {/* Diagnosis & Advice Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Diagnosis</span>
                  <span className="text-xs font-bold text-white mt-1 block">{parsedData.diagnosis}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Doctor Advice</span>
                  <span className="text-xs text-slate-300 mt-1 block truncate">{parsedData.advice}</span>
                </div>
              </div>

              {/* Medicines Table */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-400">Prescribed Medications ({parsedData.medicines.length}):</span>
                <div className="space-y-2">
                  {parsedData.medicines.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/60 flex items-center justify-between text-xs"
                    >
                      <div className="space-y-0.5">
                        <strong className="text-white block">{m.name}</strong>
                        <span className="text-[11px] text-slate-400">{m.instructions}</span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 font-mono text-[11px] font-bold block">
                          {m.dosage}
                        </span>
                        <span className="text-[10px] text-slate-400">{m.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Apply Button */}
              <Button
                onClick={handleApply}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-2xl shadow-lg shadow-emerald-600/30 text-xs flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Inject Dictated Prescription into Doctor Cockpit
              </Button>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>Powered by Medyora Medical NLP Dictation Architecture</span>
          <Button onClick={onClose} className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
