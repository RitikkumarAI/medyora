import { useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Download, FileText, ArrowLeft, Pill, Syringe, Volume2, VolumeX, Sparkles, Bell, ShoppingCart, HelpCircle, CheckCircle2, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MEDICAL_RECORDS, PRESCRIPTIONS } from "@/shared/data/app-mock";
import { PrescriptionDDIModal } from "@/modules/patient/prescriptions/components/PrescriptionDDIModal";

export const Route = createFileRoute("/patient/prescriptions")({
  component: PrescriptionsPage,
});

function PrescriptionsPage() {
  const router = useRouter();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showJargonDecoder, setShowJargonDecoder] = useState(false);
  const [isDDIModalOpen, setIsDDIModalOpen] = useState(false);

  // Audio Voice Prescription (Web Speech Synthesis API)
  const handleListenPrescription = (p: typeof PRESCRIPTIONS[0], lang: "hi" | "en" = "hi") => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      toast.error("Audio speech synthesis is not supported on this browser.");
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const medNames = p.medicines.map((m) => `${m.name}, dosage ${m.dosage}`).join(". ");
    const text =
      lang === "hi"
        ? `Namaste! Yeh aapka digital prescription hai doctor ${p.doctorName} se. Bimari ka diagnosis hai: ${p.diagnosis}. Aapko yeh dawaiyan leni hain: ${medNames}. Doctor ki salah hai: ${p.advice || "Samay par dawai lijiye aur aaram kijiye"}.`
        : `Hello. Here is your medical prescription from doctor ${p.doctorName}. Diagnosis is ${p.diagnosis}. Prescribed medications are: ${medNames}. Doctor advice: ${p.advice || "Take adequate rest"}.`;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    toast.info("🔊 Playing Audio Prescription in Hindi / Regional Voice...");
  };

  const handleSetWhatsAppReminder = (p: typeof PRESCRIPTIONS[0]) => {
    toast.success(`📲 WhatsApp Pill Reminders scheduled for ${p.medicines.length} medicines! Alarms set at 8:00 AM, 2:00 PM, and 9:00 PM.`);
  };

  const handleRefillMedicines = (p: typeof PRESCRIPTIONS[0]) => {
    toast.success(`🛒 1-Click Refill: Added ${p.medicines.length} medicines to your Pharmacy Cart with 20% Medyora Care discount!`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors pb-24">
      {/* Header */}
      <header className="px-4 py-4 flex items-center sticky top-0 bg-[#F8FAFC]/90 dark:bg-slate-950/90 backdrop-blur-md z-40 border-b border-slate-100 dark:border-slate-800">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.history.back()}
          className="h-10 w-10 -ml-2 shrink-0 bg-white dark:bg-slate-800 shadow-xs border border-slate-100 dark:border-slate-700 rounded-full"
        >
          <ArrowLeft className="h-5 w-5 text-slate-700 dark:text-slate-200" />
        </Button>
        <div className="ml-3 flex-1">
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">Medical Records & Prescriptions</h1>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Lifelong Cloud Health Vault</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => setIsDDIModalOpen(true)}
            className="text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-500 text-white shadow-sm flex items-center gap-1.5"
          >
            <ShieldAlert className="h-3.5 w-3.5" /> DDI Conflict Shield 🛡️
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowJargonDecoder(!showJargonDecoder)}
            className="text-xs font-bold rounded-xl border-blue-200 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60"
          >
            <Sparkles className="h-3.5 w-3.5 mr-1" /> Jargon Decoder
          </Button>
        </div>
      </header>

      {/* ================= JARGON DECODER MODAL / DRAWER ================= */}
      {showJargonDecoder && (
        <div className="mx-4 mt-3 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-900/60 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" /> AI Medical Jargon & Abbreviation Decoder
            </h3>
            <button onClick={() => setShowJargonDecoder(false)} className="text-xs text-slate-400 hover:text-slate-600">✕ Close</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
              <p className="font-bold text-blue-600">1-0-1 / BD</p>
              <p className="text-[10px] text-slate-500">Subah aur Raat (Twice a day)</p>
            </div>
            <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
              <p className="font-bold text-emerald-600">PC (Post Cibus)</p>
              <p className="text-[10px] text-slate-500">Khana khane ke baad (After meals)</p>
            </div>
            <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
              <p className="font-bold text-amber-600">AC (Ante Cibus)</p>
              <p className="text-[10px] text-slate-500">Khali pet (Before meals)</p>
            </div>
            <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
              <p className="font-bold text-purple-600">1-0-0 / OD</p>
              <p className="text-[10px] text-slate-500">Din mein ek baar (Once a day)</p>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 px-4 py-4 space-y-6">
        {/* Prescriptions */}
        <div>
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">
            Active Prescriptions
          </h2>
          <div className="space-y-4">
            {PRESCRIPTIONS.map((p) => (
              <div
                key={p.id}
                className="bg-white dark:bg-slate-900 rounded-[24px] p-5 shadow-xs border border-slate-100 dark:border-slate-800 space-y-4"
              >
                <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{p.doctorName}</h3>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                      {p.clinic} • {p.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {/* Audio Listen Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleListenPrescription(p, "hi")}
                      className={`h-9 px-3 rounded-full text-xs font-bold border-blue-200 text-blue-600 dark:text-blue-400 ${isPlayingAudio ? "bg-rose-50 border-rose-300 text-rose-600 animate-pulse" : "bg-blue-50 dark:bg-blue-950"}`}
                      title="Listen in Hindi audio"
                    >
                      {isPlayingAudio ? <VolumeX className="h-3.5 w-3.5 mr-1 text-rose-600" /> : <Volume2 className="h-3.5 w-3.5 mr-1 text-blue-600" />}
                      <span>{isPlayingAudio ? "Stop Audio" : "Listen (हिन्दी)"}</span>
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 shrink-0"
                      onClick={() => toast.success("Prescription downloaded as vector PDF")}
                      title="Download PDF"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-[#F8FAFC] dark:bg-slate-800 rounded-2xl p-3">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">
                      Diagnosis
                    </p>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      {p.diagnosis}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide px-1">
                      Medicines & Dosage Instructions
                    </p>
                    {p.medicines.map((m, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-2xl border border-slate-100 dark:border-slate-800"
                      >
                        <div className="h-10 w-10 rounded-full bg-orange-50 dark:bg-orange-950 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0">
                          <Pill className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-slate-900 dark:text-white">
                            {m.name}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {m.dosage} • {m.duration}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {p.advice && (
                    <div className="bg-green-50 dark:bg-green-950/60 rounded-2xl p-3">
                      <p className="text-[10px] font-bold text-green-600 dark:text-green-400 uppercase tracking-wide mb-1">
                        Doctor's Advice
                      </p>
                      <p className="text-sm font-medium text-green-900 dark:text-green-200">
                        {p.advice}
                      </p>
                    </div>
                  )}

                  {/* Smart Actions: WhatsApp Pill Reminder & 1-Click Refill */}
                  <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSetWhatsAppReminder(p)}
                      className="rounded-xl border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 bg-emerald-50/60 dark:bg-emerald-950/40 text-xs font-bold"
                    >
                      <Bell className="h-3.5 w-3.5 mr-1.5 text-emerald-600" />
                      Set WhatsApp Pill Reminder
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleRefillMedicines(p)}
                      className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs"
                    >
                      <ShoppingCart className="h-3.5 w-3.5 mr-1.5" />
                      1-Click Refill Medicines (-20%)
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lab Reports */}
        <div>
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">
            Lab Reports
          </h2>
          <div className="bg-white dark:bg-slate-900 rounded-[24px] border border-slate-100 dark:border-slate-800 shadow-xs overflow-hidden p-2">
            <ul className="space-y-1">
              {MEDICAL_RECORDS.map((r) => (
                <li
                  key={r.id}
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white text-sm">{r.title}</p>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                        {r.date} • {r.size}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full text-slate-400 hover:text-blue-600"
                    onClick={() => toast.success("File downloaded")}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      {/* Prescription Vision OCR & Fatal Drug-Drug Interaction Shield Modal */}
      <PrescriptionDDIModal
        isOpen={isDDIModalOpen}
        onClose={() => setIsDDIModalOpen(false)}
      />
    </div>
  );
}
