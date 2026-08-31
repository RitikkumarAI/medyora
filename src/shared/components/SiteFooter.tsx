import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { ShieldCheck, Sparkles, Building2 } from "lucide-react";

const COLUMNS = [
  {
    title: "Patients",
    links: [
      { label: "Find Doctors", to: "/doctors" as const },
      { label: "Specialities", to: "/specialities" as const },
      { label: "Book Appointment", to: "/auth/login" as const },
      { label: "Live Queue", to: "/patient/queue" as const },
      { label: "AI Care Copilot", to: "/patient/care-ai" as const },
    ],
  },
  {
    title: "Platform & Portals",
    links: [
      { label: "About Medyora", to: "/about" as const },
      { label: "Health Articles", to: "/patient/articles" as const },
      { label: "For Doctors & Clinics", to: "/doctor" as const },
      { label: "Admin Console", to: "/admin" as const },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors" role="contentinfo">
      <div className="mx-auto grid w-full max-w-[1536px] gap-10 px-6 py-14 sm:px-10 lg:px-16 md:grid-cols-4">
        <div className="md:col-span-2 space-y-4">
          <Logo />
          <p className="max-w-md text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
            Medyora connects patients with verified doctors, provides real-time clinic queue tracking, and powers digital prescriptions across India.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300">
            <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Products by Binarize Technologies</span>
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">{col.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-500 dark:text-slate-400 font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-100 dark:border-slate-800 px-6 py-6 text-center space-y-2">
        <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
          Built and Maintained by <span className="text-blue-600 dark:text-blue-400 font-black">Binarize Technologies</span>
        </p>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
          © 2026 Binarize Technologies. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
