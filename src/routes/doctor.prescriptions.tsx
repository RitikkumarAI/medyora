import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Trash2 } from "lucide-react";
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

function PrescriptionBuilder() {
  const { visits } = useVisits();
  const { prescriptions, issue } = useIssuedPrescriptions();
  const activePatient = visits.find((v) => v.status === "Consulting")?.patient ?? "";

  const [patient, setPatient] = useState(activePatient);
  const [diagnosis, setDiagnosis] = useState("");
  const [advice, setAdvice] = useState("");
  const [medicines, setMedicines] = useState<MedicineRow[]>([{ ...EMPTY_ROW }]);

  const updateRow = (index: number, key: keyof MedicineRow, value: string) =>
    setMedicines((rows) => rows.map((r, i) => (i === index ? { ...r, [key]: value } : r)));

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


    issue({ patient: patient.trim(), diagnosis: diagnosis.trim(), advice: advice.trim(), medicines: filled });
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
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMedicines((rows) => [...rows, { ...EMPTY_ROW }])}
              >
                <Plus className="mr-1 size-4" /> Add row
              </Button>
            }
          >
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
