import { Link } from "@tanstack/react-router";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3 group shrink-0" aria-label="Medyora Home">
      <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-white dark:bg-slate-800 p-1 shadow-sm border border-slate-100 dark:border-slate-700 group-hover:scale-105 transition-transform duration-300 overflow-hidden shrink-0">
        <img src="/Logo.webp" alt="Medyora Logo" className="h-full w-full object-contain" />
      </div>
      {!compact && (
        <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
          Medy<span className="text-blue-600 dark:text-blue-400 font-black">ora</span>
        </span>
      )}
    </Link>
  );
}
