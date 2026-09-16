import { useRef } from "react";
import {
  HeartPulse,
  Wind,
  Brain,
  Bone,
  Flame,
  Shield,
  ShieldCheck,
  Sparkles,
  Eye,
  Stethoscope,
  Activity,
  Flower2,
  Baby,
  Smile,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { ORGAN_SYSTEMS, type OrganSystemItem } from "../data/organ-systems-data";

interface OrganSystemSelectorProps {
  selectedOrganId: string;
  onSelectOrgan: (id: string) => void;
}

const ICON_MAP: Record<string, typeof HeartPulse> = {
  HeartPulse,
  Wind,
  Brain,
  Bone,
  Flame,
  Shield,
  ShieldCheck,
  Sparkles,
  Eye,
  Stethoscope,
  Activity,
  Flower2,
  Baby,
  Smile,
};

export function OrganSystemSelector({
  selectedOrganId,
  onSelectOrgan,
}: OrganSystemSelectorProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = direction === "left" ? -280 : 280;
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="relative w-full font-sans select-none">
      {/* Scroll Left Button */}
      <button
        onClick={() => handleScroll("left")}
        aria-label="Scroll left"
        className="hidden sm:flex absolute -left-3 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all hover:scale-110 active:scale-95"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Horizontal Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-2.5 overflow-x-auto scrollbar-none no-scrollbar py-2 px-1 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {ORGAN_SYSTEMS.map((system: OrganSystemItem) => {
          const Icon = ICON_MAP[system.iconName] || HeartPulse;
          const isSelected = system.id === selectedOrganId;

          return (
            <button
              key={system.id}
              onClick={() => onSelectOrgan(system.id)}
              className={`group flex items-center gap-2.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 border ${
                isSelected
                  ? "bg-blue-50 dark:bg-blue-950/70 border-blue-500/70 text-blue-600 dark:text-blue-400 shadow-md shadow-blue-500/10 ring-2 ring-blue-500/30 font-extrabold"
                  : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-850 shadow-xs"
              }`}
            >
              {/* Colored Icon Badge */}
              <div
                className={`h-7 w-7 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white"
                }`}
                style={
                  isSelected
                    ? { backgroundColor: system.accentHex }
                    : undefined
                }
              >
                <Icon className="h-3.5 w-3.5" />
              </div>

              <span className="whitespace-nowrap">{system.shortName}</span>
            </button>
          );
        })}
      </div>

      {/* Scroll Right Button */}
      <button
        onClick={() => handleScroll("right")}
        aria-label="Scroll right"
        className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all hover:scale-110 active:scale-95"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
