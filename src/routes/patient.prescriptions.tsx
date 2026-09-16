import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Download, FileText, ArrowLeft, Pill, Syringe } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MEDICAL_RECORDS, PRESCRIPTIONS } from "@/shared/data/app-mock";

export const Route = createFileRoute("/patient/prescriptions")({
  component: PrescriptionsPage,
});

function PrescriptionsPage() {
  const router = useRouter();

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
        <div className="ml-3">
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">Medical Records</h1>
        </div>
      </header>

      <main className="flex-1 px-4 py-4 space-y-6">
        {/* Prescriptions */}
        <div>
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">
            Prescriptions
          </h2>
          <div className="space-y-4">
            {PRESCRIPTIONS.map((p) => (
              <div
                key={p.id}
                className="bg-white dark:bg-slate-900 rounded-[24px] p-5 shadow-xs border border-slate-100 dark:border-slate-800"
              >
                <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{p.doctorName}</h3>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                      {p.clinic} • {p.date}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-full bg-blue-50 dark:bg-blue-950 border-none text-blue-600 dark:text-blue-400 shrink-0"
                    onClick={() => toast.success("Prescription downloaded")}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
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
                      Medicines
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
                    <div className="bg-green-50 dark:bg-green-950/60 rounded-2xl p-3 mt-2">
                      <p className="text-[10px] font-bold text-green-600 dark:text-green-400 uppercase tracking-wide mb-1">
                        Doctor's Advice
                      </p>
                      <p className="text-sm font-medium text-green-900 dark:text-green-200">
                        {p.advice}
                      </p>
                    </div>
                  )}
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
    </div>
  );
}
