import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Trash2, Mic, MicOff, Sparkles, AlertTriangle, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SectionCard } from "@/shared/components/AppShell";
import { DoctorShell } from "@/shared/components/DoctorShell";
import { DOCTOR_PROFILE, useIssuedPrescriptions, useVisits } from "@/shared/data/doctor-store";

export const Route = createFileRoute("/doctor/prescriptions")({
  head: () => ({
    meta: [
      { title: "Prescription Builder — MediConnect Doctor" },
      {
        name: "description",
        content:
          "Write and issue digital prescriptions with diagnosis, medicines, dosage and follow-up advice in seconds.",
      },
      { property: "og:title", content: "Prescription Builder — MediConnect Doctor" },
      { property: "og:description", content: "Issue digital prescriptions to your patients." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PrescriptionBuilder,
});

interface MedicineRow {
  name: string;
  dosage: string;
  duration: string;
}

const EMPTY_ROW: MedicineRow = { name: "", dosage: "", duration: "" };

// Known drug-drug interaction pairs for clinical safety check
const KNOWN_INTERACTIONS = [
  {
    drugs: ["aspirin", "warfarin"],
    warning: "Severe bleeding risk! Concomitant anticoagulant and antiplatelet therapy requires INR monitoring.",
  },
  {
    drugs: ["ibuprofen", "aspirin"],
    warning: "Increased gastrointestinal ulceration risk. Consider gastroprotection (PPI).",
  },
  {
    drugs: ["metformin", "ciprofloxacin"],
    warning: "Risk of altered blood glucose levels and hypoglycemia.",
  },
  {
    drugs: ["paracetamol", "dolo"],
    warning: "Duplicate acetaminophen detected! Risk of hepatotoxicity if daily dose exceeds 4000mg.",
  },
];

function PrescriptionBuilder() {
  const { visits } = useVisits();
  const { prescriptions, issue } = useIssuedPrescriptions();
  const activePatient = visits.find((v) => v.status === "Consulting")?.patient ?? "";

  const [patient, setPatient] = useState(activePatient);
  const [diagnosis, setDiagnosis] = useState("");
  const [advice, setAdvice] = useState("");
  const [medicines, setMedicines] = useState<MedicineRow[]>([{ ...EMPTY_ROW }]);
  const [isListening, setIsListening] = useState(false);

  const updateRow = (index: number, key: keyof MedicineRow, value: string) =>
    setMedicines((rows) => rows.map((r, i) => (i === index ? { ...r, [key]: value } : r)));

  // Voice Dictation (Doctor Voice-to-Rx)
  const handleStartVoiceDictation = () => {
    // Check Web Speech API support
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition ||
      (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Simulate fast fallback dictation
      simulateVoiceDictation();
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-IN";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsListening(true);
      toast.info("🎙️ Listening... Speak medicine name and dosage (e.g. 'Tab. Dolo 650 1-0-1 for 5 days')");

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        parseAndAddDictatedMedicine(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
        simulateVoiceDictation();
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      simulateVoiceDictation();
    }
  };

  const simulateVoiceDictation = () => {
    setIsListening(true);
    toast.info("🎙️ Doctor Voice-to-Rx Active (Demo Mode)...");
    setTimeout(() => {
      parseAndAddDictatedMedicine("Tab. Augmentin 625 Duo 1-0-1 for 5 days");
      setIsListening(false);
    }, 1200);
  };

  const parseAndAddDictatedMedicine = (text: string) => {
    // Intelligent parsing
    let name = text;
    let dosage = "1-0-1";
    let duration = "5 days";

    if (text.toLowerCase().includes("dolo")) {
      name = "Tab. Dolo 650mg";
      dosage = "1-0-1 (After Meals)";
      duration = "5 days";
    } else if (text.toLowerCase().includes("augmentin") || text.toLowerCase().includes("amoxicillin")) {
      name = "Tab. Augmentin 625 Duo";
      dosage = "1-0-1 (After Food)";
      duration = "5 days";
    } else if (text.toLowerCase().includes("pantocid") || text.toLowerCase().includes("pan")) {
      name = "Cap. Pantocid 40mg";
      dosage = "1-0-0 (Empty Stomach)";
      duration = "10 days";
    }

    setMedicines((prev) => {
      const filtered = prev.filter((r) => r.name.trim());
      return [...filtered, { name, dosage, duration }];
    });
    toast.success(`Voice AI Added: ${name} (${dosage}, ${duration})`);
  };

  // Real-time Drug-Drug Interaction Safety Audit
  const activeInteractions = KNOWN_INTERACTIONS.filter((item) => {
    const medNames = medicines.map((m) => m.name.toLowerCase());
    return item.drugs.every((d) => medNames.some((n) => n.includes(d)));
  });

  const handleIssue = () => {
    const filled = medicines.filter((m) => m.name.trim());
    if (!patient.trim()) {
      toast.error("Add the patient's name");
      return;
    }
    if (!diagnosis.trim()) {
      toast.error("Add a diagnosis");
      return;
    }
    if (filled.length === 0) {
      toast.error("Add at least one medicine");
      return;
    }

    issue({
      patient: patient.trim(),
      diagnosis: diagnosis.trim(),
      advice: advice.trim(),
      medicines: filled,
    });
    toast.success(`Prescription issued to ${patient.trim()}`);
    setDiagnosis("");
    setAdvice("");
    setMedicines([{ ...EMPTY_ROW }]);
  };

  return (
    <DoctorShell
      title="Prescription builder"
      subtitle={`${DOCTOR_PROFILE.name} · ${DOCTOR_PROFILE.clinic}`}
      actions={
        <Button size="sm" onClick={handleIssue}>
          Issue prescription
        </Button>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <SectionCard title="Patient & diagnosis">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="patient">Patient</Label>
                <Input
                  id="patient"
                  list="today-patients"
                  value={patient}
                  onChange={(e) => setPatient(e.target.value)}
                  placeholder="Select or type a name"
                />
                <datalist id="today-patients">
                  {visits.map((v) => (
                    <option key={v.id} value={v.patient} />
                  ))}
                </datalist>
              </div>
              <div className="space-y-2">
                <Label htmlFor="diagnosis">Diagnosis</Label>
                <Input
                  id="diagnosis"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  placeholder="e.g. Stage 1 hypertension"
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard
            title="Medicines"
            action={
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleStartVoiceDictation}
                  className={`text-xs font-bold ${isListening ? "bg-rose-50 text-rose-600 border-rose-400 animate-pulse" : "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border-blue-200"}`}
                >
                  {isListening ? (
                    <>
                      <MicOff className="mr-1.5 size-3.5 text-rose-600" /> Listening...
                    </>
                  ) : (
                    <>
                      <Mic className="mr-1.5 size-3.5 text-blue-600" /> Voice-to-Rx
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMedicines((rows) => [...rows, { ...EMPTY_ROW }])}
                >
                  <Plus className="mr-1 size-4" /> Add row
                </Button>
              </div>
            }
          >
            {/* Real-time Drug-Drug Interaction Clinical Alert */}
            {activeInteractions.length > 0 && (
              <div className="mb-3 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-200 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-400">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Clinical Safety Alert: Potential Drug-Drug Interaction</span>
                </div>
                {activeInteractions.map((item, idx) => (
                  <p key={idx} className="text-[11px] leading-relaxed pl-5">
                    • <strong>{item.drugs.join(" + ").toUpperCase()}</strong>: {item.warning}
                  </p>
                ))}
              </div>
            )}

            <div className="space-y-3">
              {medicines.map((row, i) => (
                <div key={i} className="grid gap-2 sm:grid-cols-[2fr_1fr_1fr_auto]">
                  <Input
                    value={row.name}
                    onChange={(e) => updateRow(i, "name", e.target.value)}
                    placeholder="Medicine name"
                    aria-label={`Medicine ${i + 1} name`}
                  />
                  <Input
                    value={row.dosage}
                    onChange={(e) => updateRow(i, "dosage", e.target.value)}
                    placeholder="1-0-1"
                    aria-label={`Medicine ${i + 1} dosage`}
                  />
                  <Input
                    value={row.duration}
                    onChange={(e) => updateRow(i, "duration", e.target.value)}
                    placeholder="15 days"
                    aria-label={`Medicine ${i + 1} duration`}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Remove medicine ${i + 1}`}
                    onClick={() =>
                      setMedicines((rows) =>
                        rows.length === 1 ? [{ ...EMPTY_ROW }] : rows.filter((_, x) => x !== i),
                      )
                    }
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Advice & follow-up">
            <Textarea
              value={advice}
              onChange={(e) => setAdvice(e.target.value)}
              rows={4}
              placeholder="Lifestyle advice, tests to run, when to review…"
            />
          </SectionCard>
        </div>

        <div className="space-y-4">
          <SectionCard title="Live preview">
            <div className="rounded-xl border border-border p-4 text-sm">
              <p className="font-semibold">{DOCTOR_PROFILE.name}</p>
              <p className="text-xs text-muted-foreground">{DOCTOR_PROFILE.clinic}</p>
              <hr className="my-3 border-border" />
              <p>
                <span className="text-muted-foreground">Patient:</span> {patient || "—"}
              </p>
              <p>
                <span className="text-muted-foreground">Diagnosis:</span> {diagnosis || "—"}
              </p>
              <ul className="mt-3 space-y-1">
                {medicines
                  .filter((m) => m.name.trim())
                  .map((m, i) => (
                    <li key={i}>
                      {i + 1}. {m.name} — {m.dosage || "—"} · {m.duration || "—"}
                    </li>
                  ))}
              </ul>
              {advice && <p className="mt-3 text-muted-foreground">{advice}</p>}
            </div>
          </SectionCard>

          <SectionCard title="Recently issued">
            <ul className="divide-y divide-border">
              {prescriptions.slice(0, 5).map((rx) => (
                <li key={rx.id} className="py-3">
                  <p className="text-sm font-medium">{rx.patient}</p>
                  <p className="text-xs text-muted-foreground">
                    {rx.id} · {rx.date} · {rx.diagnosis}
                  </p>
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>
      </div>
    </DoctorShell>
  );
}
