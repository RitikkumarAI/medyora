import { useState } from "react";
import {
  Heart,
  Wind,
  Brain,
  Bone,
  Flame,
  Activity,
  ShieldCheck,
  Flower2,
  Sparkles,
} from "lucide-react";
import { ORGAN_SYSTEMS } from "../data/organ-systems-data";

interface BodyExplorerProps {
  selectedOrganId: string;
  onSelectOrgan: (id: string) => void;
  onOpenDeepDive: () => void;
}

const SYSTEMS_LIST = [
  { id: "heart", label: "Circulatory", icon: Heart },
  { id: "lungs", label: "Respiratory", icon: Wind },
  { id: "stomach", label: "Digestive", icon: Flame },
  { id: "brain", label: "Nervous", icon: Brain },
  { id: "bones", label: "Musculoskeletal", icon: Bone },
  { id: "endocrine", label: "Endocrine", icon: Activity },
  { id: "kidney", label: "Urinary", icon: ShieldCheck },
  { id: "womens_health", label: "Reproductive", icon: Flower2 },
  { id: "skin", label: "Integumentary", icon: Sparkles },
];

export function BodyExplorer({
  selectedOrganId,
  onSelectOrgan,
  onOpenDeepDive,
}: BodyExplorerProps) {
  const currentSystem =
    ORGAN_SYSTEMS.find((s) => s.id === selectedOrganId) || ORGAN_SYSTEMS[0]!;

  return (
    <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm font-sans space-y-2.5">
      {/* Header */}
      <div>
        <h2 className="text-xs font-black text-slate-900 dark:text-white">
          Body Explorer
        </h2>
        <p className="text-[11px] text-slate-400 font-medium">Click a system to explore</p>
      </div>

      {/* Main Split Grid: Left Systems List (5 cols) + Right 3D Visual (7 cols) */}
      <div className="grid grid-cols-12 gap-2 items-center">
        {/* Left Systems List */}
        <div className="col-span-5 flex flex-col gap-1">
          {SYSTEMS_LIST.map((item) => {
            const Icon = item.icon;
            const isSelected = item.id === selectedOrganId;

            return (
              <button
                key={item.id}
                onClick={() => onSelectOrgan(item.id)}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-left transition-all ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-xs font-extrabold"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Icon
                  className={`h-3.5 w-3.5 shrink-0 ${
                    isSelected ? "text-white fill-white" : "text-slate-400"
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right 3D Holographic Body Scan */}
        <div className="col-span-7 relative h-56 rounded-2xl overflow-hidden bg-[#03091e] border border-blue-900/40 shadow-inner group">
          {/* Holographic Body Model Image */}
          <img
            src="/holographic_body.jpg"
            alt="3D Holographic Body Scan"
            className="w-full h-full object-contain object-center transform transition-transform duration-700 group-hover:scale-105"
          />

          {/* Interactive Floating Tooltip on Heart / Selected Organ */}
          <div
            onClick={onOpenDeepDive}
            className="absolute top-[28%] left-[46%] -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
          >
            {/* Glowing Pulse Node */}
            <span className="relative flex h-5 w-5 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500 shadow-md shadow-rose-500" />
            </span>

            {/* Tooltip Tag matching Reference Screenshot: "Heart \n Click to explore" */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-xl bg-slate-900/95 border border-blue-500/40 text-white shadow-xl backdrop-blur-md text-left">
              <div className="text-[10px] font-black text-white">{currentSystem.shortName}</div>
              <div className="text-[8px] text-slate-300 font-medium">Click to explore</div>
            </div>
          </div>

          {/* Bottom Control Bar: Rotate | Zoom | Explore */}
          <div className="absolute bottom-1.5 left-0 right-0 text-center pointer-events-none z-10">
            <span className="inline-flex items-center gap-1.5 text-[9px] font-bold text-slate-300 bg-slate-950/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-blue-900/50 shadow-xs">
              <span>Rotate</span>
              <span className="text-slate-600">|</span>
              <span>Zoom</span>
              <span className="text-slate-600">|</span>
              <span>Explore</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
