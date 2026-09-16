import { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  Download,
  CheckCircle2,
  XCircle,
  Clock,
  Receipt,
  FileText,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TRANSACTIONS } from "@/shared/data/mock";

export function PaymentHistory() {
  const router = useRouter();

  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloaded, setDownloaded] = useState<Set<string>>(new Set());

  const handleDownload = (id: string) => {
    setDownloadingId(id);
    // Simulate PDF generation/download delay
    setTimeout(() => {
      setDownloadingId(null);
      setDownloaded(new Set([...downloaded, id]));
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 pt-6 pb-4 shadow-xs border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.history.back()}
          className="h-10 w-10 shrink-0 bg-slate-50 dark:bg-slate-800 rounded-full border border-slate-100 dark:border-slate-700"
        >
          <ArrowLeft className="h-5 w-5 text-slate-700 dark:text-slate-200" />
        </Button>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">Payment History</h1>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 pb-32">
        <div className="space-y-4">
          {TRANSACTIONS.map((txn) => (
            <div
              key={txn.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-xs relative overflow-hidden"
            >
              {/* Status Indicator Bar */}
              <div
                className={`absolute top-0 left-0 w-1.5 h-full ${txn.status === "success" ? "bg-green-500" : txn.status === "failed" ? "bg-red-500" : "bg-amber-500"}`}
              />

              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    {txn.doctorName}
                  </h3>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5 capitalize">
                    {txn.type.replace("_", " ")} • {txn.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-black text-lg text-slate-900 dark:text-white">₹{txn.amount}</p>
                  <div className="flex items-center gap-1 justify-end mt-0.5">
                    {txn.status === "success" && (
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                    )}
                    {txn.status === "failed" && <XCircle className="h-3 w-3 text-red-600" />}
                    {txn.status === "refunded" && <Clock className="h-3 w-3 text-amber-600" />}
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider ${txn.status === "success" ? "text-green-600" : txn.status === "failed" ? "text-red-600" : "text-amber-600"}`}
                    >
                      {txn.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-3 flex justify-between items-center mb-4">
                <div>
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                    Transaction ID
                  </p>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{txn.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                    Paid Via
                  </p>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {txn.method}
                  </p>
                </div>
              </div>

              {/* Actions */}
              {txn.status === "success" && (
                <div className="flex gap-3">
                  <Button
                    onClick={() => handleDownload(txn.id)}
                    disabled={downloadingId === txn.id || downloaded.has(txn.id)}
                    variant="outline"
                    className="flex-1 h-10 rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-750"
                  >
                    {downloadingId === txn.id ? (
                      <span className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full border-2 border-slate-400 border-t-transparent animate-spin" />{" "}
                        Generating...
                      </span>
                    ) : downloaded.has(txn.id) ? (
                      <span className="flex items-center gap-2 text-green-600">
                        <Check className="h-4 w-4" /> Downloaded
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Download className="h-4 w-4 text-blue-600 dark:text-blue-400" /> Download
                        Invoice
                      </span>
                    )}
                  </Button>
                </div>
              )}

              {txn.status === "failed" && (
                <div className="flex gap-3">
                  <Link
                    to="/patient/payment/checkout"
                    className="flex-1 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center hover:bg-blue-100 transition-colors"
                  >
                    Retry Payment
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
