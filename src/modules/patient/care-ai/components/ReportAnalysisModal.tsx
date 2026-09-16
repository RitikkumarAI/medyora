import { useState } from "react";
import {
  X,
  Upload,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Bot,
  Activity,
  Calendar,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

interface ReportAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialReportTitle?: string | undefined;
}

export function ReportAnalysisModal({
  isOpen,
  onClose,
  initialReportTitle,
}: ReportAnalysisModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(!!initialReportTitle);

  if (!isOpen) return null;

  const handleSimulatedUpload = (selectedFile: File) => {
    setFile(selectedFile);
    setUploadProgress(10);
    setIsProcessing(true);
    setAnalysisComplete(false);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessing(false);
            setAnalysisComplete(true);
            toast.success("Medical report analyzed successfully!");
          }, 400);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleSimulatedUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in font-sans">
      <div className="relative w-full max-w-4xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-white">
                AI Medical Report Analyzer
              </h2>
              <p className="text-xs text-slate-400 font-medium">
                Structured clinical extraction & biomarker verification
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="h-8 w-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-all"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
          {/* Upload Area */}
          {!analysisComplete && (
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="p-8 rounded-3xl border-2 border-dashed border-blue-300 dark:border-blue-800 bg-blue-50/40 dark:bg-blue-950/20 text-center space-y-3 cursor-pointer hover:border-blue-500 transition-colors"
            >
              <div className="h-12 w-12 rounded-2xl bg-blue-600 text-white mx-auto flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Upload className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white">
                  Drag & drop your medical report here
                </h3>
                <p className="text-xs text-slate-400 font-medium mt-1">
                  Supports Blood Test, ECG, X-Ray, MRI, Prescription (PDF, JPG, PNG up to 25MB)
                </p>
              </div>

              <label className="inline-block">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleSimulatedUpload(e.target.files[0]);
                    }
                  }}
                />
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md cursor-pointer transition-all">
                  <span>Browse File</span>
                </span>
              </label>

              {isProcessing && (
                <div className="pt-4 max-w-xs mx-auto space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
                    <span>Extracting lab biomarkers...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 dark:bg-slate-750 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 transition-all duration-200"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Structured Analysis Results */}
          {analysisComplete && (
            <div className="space-y-6">
              {/* Top Banner */}
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <h4 className="text-xs font-black text-emerald-900 dark:text-emerald-300">
                      Report Analyzed: {initialReportTitle || file?.name || "Lipid Profile & Metabolic Panel"}
                    </h4>
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                      Extracted on 12 Sep 2026 • Verified Reference Ranges
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    setAnalysisComplete(false);
                    setFile(null);
                  }}
                  size="sm"
                  variant="outline"
                  className="h-7 text-xs font-bold"
                >
                  Upload Another
                </Button>
              </div>

              {/* 1. Report Summary & Key Findings */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-750 space-y-2">
                <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Bot className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Clinical Report Summary</span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  The uploaded lab panel indicates elevated serum Low-Density Lipoprotein (LDL-C: 158 mg/dL)
                  accompanied by mild total hypercholesterolemia. Fasting Blood Glucose and Liver Transaminases
                  remain well within normal target parameters.
                </p>
              </div>

              {/* 2. Biomarker Values vs Reference Ranges */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  Extracted Biomarker Measurements
                </h4>
                <div className="overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-slate-750">
                  <table className="w-full text-left text-xs font-medium">
                    <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-black">
                      <tr>
                        <th className="p-3">Biomarker</th>
                        <th className="p-3">Observed Value</th>
                        <th className="p-3">Reference Target</th>
                        <th className="p-3">Clinical Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      <tr>
                        <td className="p-3 font-bold text-slate-900 dark:text-white">LDL Cholesterol</td>
                        <td className="p-3 font-extrabold text-rose-600">158 mg/dL</td>
                        <td className="p-3 text-slate-500">&lt; 100 mg/dL</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-600 text-[10px] font-black uppercase">
                            Elevated
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-900 dark:text-white">Total Cholesterol</td>
                        <td className="p-3 font-bold text-amber-600">218 mg/dL</td>
                        <td className="p-3 text-slate-500">&lt; 200 mg/dL</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-600 text-[10px] font-black uppercase">
                            Borderline
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-900 dark:text-white">HDL Cholesterol</td>
                        <td className="p-3 font-bold text-slate-900 dark:text-white">46 mg/dL</td>
                        <td className="p-3 text-slate-500">&gt; 40 mg/dL</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 text-[10px] font-black uppercase">
                            Normal
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-900 dark:text-white">Triglycerides</td>
                        <td className="p-3 font-bold text-slate-900 dark:text-white">138 mg/dL</td>
                        <td className="p-3 text-slate-500">&lt; 150 mg/dL</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 text-[10px] font-black uppercase">
                            Normal
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 3. Questions to Ask Your Doctor */}
              <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 space-y-2">
                <h4 className="text-xs font-black text-blue-900 dark:text-blue-300 uppercase tracking-wider">
                  Questions to Ask Your Physician
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Would lifestyle modifications alone be sufficient to lower my LDL below 100 mg/dL?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Do I require an ApoB or Lipoprotein(a) test to calculate comprehensive cardiac risk?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>When should I schedule a follow-up lipid retest?</span>
                  </li>
                </ul>
              </div>

              {/* 4. Specialist Recommendation & Booking */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-black text-cyan-300">Recommended Specialist</span>
                  <h4 className="text-sm font-black text-white">
                    Consult a Verified Cardiologist
                  </h4>
                  <p className="text-xs text-blue-200 font-medium">
                    Discuss lipid plaque stabilization & personalized cardiovascular care
                  </p>
                </div>

                <Link to="/doctors" search={{ q: "cardiologist" }} onClick={onClose}>
                  <Button className="rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-black text-xs shadow-md">
                    <span>Find Cardiologists</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Medical Disclaimer */}
          <div className="flex items-start gap-2 text-[10px] text-slate-400 font-medium pt-2 border-t border-slate-100 dark:border-slate-800">
            <ShieldAlert className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
            <span>
              Disclaimer: This AI analysis is intended solely for educational health literacy and does not constitute a formal clinical diagnosis. Always review findings with a certified healthcare practitioner.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
