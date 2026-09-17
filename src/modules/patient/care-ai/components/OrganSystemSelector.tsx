import { useRef } from "react";
import {
  Heart,
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
  Smile,
  ChevronRight,
} from "lucide-react";
import { ORGAN_SYSTEMS, type OrganSystemItem } from "../data/organ-systems-data";

interface OrganSystemSelectorProps {
  selectedOrganId: string;
  onSelectOrgan: (id: string) => void;
}

const ICON_MAP: Record<string, any> = {
  heart: Heart,
  lungs: Wind,
  brain: Brain,
  bones: Bone,
  stomach: Flame,
  liver: Shield,
  kidney: ShieldCheck,
  skin: Sparkles,
  eye: Eye,
  ent: Stethoscope,
  womens_health: Activity,
  mens_health: Activity,
  mental_health: Brain,
  child_health: Smile,
  endocrine: Activity,
};

export function OrganSystemSelector({
  selectedOrganId,
  onSelectOrgan,
}: OrganSystemSelectorProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollRight = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({ left: 240, behavior: "smooth" });
  };

  return (
    <div className="relative w-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-2 shadow-xs font-sans select-none flex items-center gap-1.5">
      {/* Horizontal Scrollable Pills */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-2 overflow-x-auto scrollbar-none no-scrollbar py-0.5 px-1 scroll-smooth w-full"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {ORGAN_SYSTEMS.map((system: OrganSystemItem) => {
          const Icon = ICON_MAP[system.id] || Heart;
          const isSelected = system.id === selectedOrganId;

          return (
            <button
              key={system.id}
              onClick={() => onSelectOrgan(system.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 whitespace-nowrap ${
                isSelected
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 font-extrabold"
                  : "bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800"
              }`}
            >
              <Icon
                className={`h-3.5 w-3.5 ${
                  isSelected ? "text-white fill-white" : "text-blue-500"
                }`}
              />
              <span>{system.shortName}</span>
            </button>
          );
        })}
      </div>

      {/* Scroll Right Arrow Button */}
      <button
        onClick={handleScrollRight}
        aria-label="Scroll right"
        className="h-8 w-8 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0 transition-all"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
