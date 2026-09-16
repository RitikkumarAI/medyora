import { FileText, TestTube, Activity, ExternalLink, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface RecentReportItem {
  id: string;
  name: string;
  type: string;
  date: string;
  source: string;
  status: "Normal" | "High LDL" | "Requires Review" | "Borderline";
  statusColor: "emerald" | "rose" | "amber";
  fileIcon: "pdf" | "vial" | "scan";
}

export const DEFAULT_RECENT_REPORTS: RecentReportItem[] = [
  {
    id: "rep-1",
    name: "ECG Report",
    type: "Cardiology Diagnostic",
    date: "12 Sep 2026",
    source: "Apollo Hospital",
    status: "Normal",
    statusColor: "emerald",
    fileIcon: "pdf",
  },
  {
    id: "rep-2",
    name: "Blood Test (Lipid Profile)",
    type: "Pathology Biochemistry",
    date: "5 Sep 2026",
    source: "Dr. Mehta Labs",
    status: "High LDL",
    statusColor: "rose",
    fileIcon: "vial",
  },
  {
    id: "rep-3",
    name: "X-Ray (Chest)",
    type: "Radiology Digital Imaging",
    date: "1 Sep 2026",
    source: "City Diagnostics",
    status: "Normal",
    statusColor: "emerald",
    fileIcon: "scan",
  },
];

interface RecentReportsCardProps {
  reports?: RecentReportItem[];
  onSelectReport: (report: RecentReportItem) => void;
  onUploadNew: () => void;
  onViewAll: () => void;
}

export function RecentReportsCard({
  reports = DEFAULT_RECENT_REPORTS,
  onSelectReport,
  onUploadNew,
  onViewAll,
}: RecentReportsCardProps) {
  return (
    <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm font-sans space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
            Recent Reports
          </h2>
          <p className="text-[10px] text-slate-400 font-medium">Diagnostic history</p>
        </div>

        <button
          onClick={onViewAll}
          className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400 hover:text-blue-500 flex items-center gap-0.5"
        >
          <span>View All</span>
          <ExternalLink className="h-2.5 w-2.5" />
        </button>
      </div>

      {/* Reports List */}
      <div className="space-y-2">
        {reports.map((rep) => {
          return (
            <div
              key={rep.id}
              onClick={() => onSelectReport(rep)}
              className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-750/70 hover:border-blue-300 dark:hover:border-blue-700/60 hover:bg-blue-50/40 dark:hover:bg-blue-950/30 transition-all cursor-pointer flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {/* File Icon Badge */}
                <div
                  className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${
                    rep.fileIcon === "pdf"
                      ? "bg-rose-500/10 text-rose-500"
                      : rep.fileIcon === "vial"
                      ? "bg-blue-500/10 text-blue-500"
                      : "bg-indigo-500/10 text-indigo-500"
                  }`}
                >
                  {rep.fileIcon === "pdf" && <FileText className="h-4 w-4" />}
                  {rep.fileIcon === "vial" && <TestTube className="h-4 w-4" />}
                  {rep.fileIcon === "scan" && <Activity className="h-4 w-4" />}
                </div>

                <div className="min-w-0">
                  <h3 className="text-xs font-black text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {rep.name}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium truncate">
                    {rep.date} • {rep.source}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="shrink-0">
                <span
                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                    rep.statusColor === "emerald"
                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                      : rep.statusColor === "rose"
                      ? "bg-rose-500/15 text-rose-600 dark:text-rose-400"
                      : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                  }`}
                >
                  {rep.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Upload Action */}
      <Button
        onClick={onUploadNew}
        variant="outline"
        className="w-full h-8 rounded-xl border-dashed border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-xs"
      >
        <Plus className="h-3.5 w-3.5" />
        <span>Upload New Medical Report</span>
      </Button>
    </div>
  );
}
