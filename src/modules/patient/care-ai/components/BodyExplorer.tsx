import { useState } from "react";
import {
  HeartPulse,
  Wind,
  Brain,
  Bone,
  Flame,
  Activity,
  ShieldCheck,
  Flower2,
  Sparkles,
  Maximize2,
  CheckCircle2,
} from "lucide-react";
import { ORGAN_SYSTEMS, type OrganSystemItem } from "../data/organ-systems-data";

interface BodyExplorerProps {
  selectedOrganId: string;
  onSelectOrgan: (id: string) => void;
  onOpenDeepDive: () => void;
}

const SYSTEMS_LIST = [
  { id: "heart", label: "Circulatory", icon: HeartPulse, organ: "Heart" },
  { id: "lungs", label: "Respiratory", icon: Wind, organ: "Lungs" },
  { id: "stomach", label: "Digestive", icon: Flame, organ: "Stomach" },
  { id: "brain", label: "Nervous", icon: Brain, organ: "Brain" },
  { id: "bones", label: "Musculoskeletal", icon: Bone, organ: "Joints" },
  { id: "endocrine", label: "Endocrine", icon: Activity, organ: "Glands" },
  { id: "kidney", label: "Urinary", icon: ShieldCheck, organ: "Kidneys" },
  { id: "womens_health", label: "Reproductive", icon: Flower2, organ: "Pelvic" },
  { id: "skin", label: "Integumentary", icon: Sparkles, organ: "Skin" },
];

export function BodyExplorer({
  selectedOrganId,
  onSelectOrgan,
  onOpenDeepDive,
}: BodyExplorerProps) {
  const currentSystem =
    ORGAN_SYSTEMS.find((s) => s.id === selectedOrganId) || ORGAN_SYSTEMS[0]!;

  const [hoveredSystem, setHoveredSystem] = useState<string | null>(null);

  return (
    <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm font-sans space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
            Body Explorer
          </h2>
          <p className="text-[10px] text-slate-400 font-medium">Explore by system</p>
        </div>

        <button
          onClick={onOpenDeepDive}
          className="inline-flex items-center gap-1 text-[10px] font-extrabold text-blue-600 dark:text-blue-400 hover:text-blue-500 bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-900/60 px-2 py-1 rounded-xl shadow-xs transition-all hover:scale-105 active:scale-95"
        >
          <span>Deep Scan</span>
          <Maximize2 className="h-2.5 w-2.5" />
        </button>
      </div>

      {/* Main Body Grid: Left list + Right 3D Visual */}
      <div className="grid grid-cols-12 gap-2.5 items-center">
        {/* Left Systems List (5 cols) */}
        <div className="col-span-5 flex flex-col gap-1">
          {SYSTEMS_LIST.map((item) => {
            const Icon = item.icon;
            const isSelected = item.id === selectedOrganId;

            return (
              <button
                key={item.id}
                onClick={() => onSelectOrgan(item.id)}
                onMouseEnter={() => setHoveredSystem(item.id)}
                onMouseLeave={() => setHoveredSystem(null)}
                className={`flex items-center gap-1.5 px-2 py-1.5 rounded-xl text-[11px] font-bold text-left transition-all ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-xs font-extrabold"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 shrink-0 ${isSelected ? "text-white" : "text-slate-400"}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right 3D Holographic Human Anatomy (7 cols) */}
        <div className="col-span-7 relative h-56 rounded-2xl overflow-hidden bg-slate-950 border border-blue-900/40 shadow-inner group">
          {/* Holographic Body Image */}
          <img
            src="/holographic_body.jpg"
            alt="3D Holographic Body Scan"
            className="w-full h-full object-contain object-center transform transition-transform duration-700 group-hover:scale-105"
          />

          {/* Interactive Glowing Heart / Organ Overlay */}
          <div
            onClick={onOpenDeepDive}
            className="absolute top-[28%] left-[46%] -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
          >
            {/* Pulsing Ripple */}
            <span className="relative flex h-5 w-5 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500 shadow-md shadow-rose-500" />
            </span>

            {/* Hover Tooltip */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-lg bg-slate-900/90 border border-slate-700 text-white text-[9px] font-black shadow-lg backdrop-blur-md flex items-center gap-1">
              <span>{currentSystem.shortName}</span>
              <span className="text-[8px] text-blue-400">Scan</span>
            </div>
          </div>

          {/* Bottom Footnote Badge */}
          <div className="absolute bottom-1.5 left-2 right-2 text-center pointer-events-none">
            <span className="inline-flex items-center gap-1 text-[9px] font-bold text-slate-300 bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-slate-800">
              <CheckCircle2 className="h-2.5 w-2.5 text-cyan-400" />
              <span>Click organ to deep dive</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
