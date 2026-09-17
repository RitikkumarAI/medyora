import { ChevronRight, Heart, Wind, Brain, Bone, Flame, Shield, ShieldCheck, Sparkles, Eye, Stethoscope, Activity, Flower2, Smile } from "lucide-react";
import { ORGAN_SYSTEMS, type OrganSystemItem } from "../data/organ-systems-data";

interface OrganSystemGridViewProps {
  onSelectSystem: (id: string) => void;
  onOpenDeepDive: (id: string) => void;
}

// Coordinate mapping for holographic anatomical hotspot nodes
const ORGAN_HOTSPOTS: Record<
  string,
  { top: string; left: string; color: string; ringColor: string; label: string }
> = {
  heart: { top: "33%", left: "48%", color: "bg-rose-500", ringColor: "bg-rose-400", label: "Heart" },
  lungs: { top: "30%", left: "47%", color: "bg-cyan-400", ringColor: "bg-cyan-300", label: "Lungs" },
  brain: { top: "12%", left: "49%", color: "bg-pink-500", ringColor: "bg-pink-400", label: "Brain" },
  bones: { top: "45%", left: "49%", color: "bg-blue-400", ringColor: "bg-blue-300", label: "Joints" },
  stomach: { top: "42%", left: "49%", color: "bg-amber-400", ringColor: "bg-amber-300", label: "Stomach" },
  liver: { top: "40%", left: "45%", color: "bg-orange-500", ringColor: "bg-orange-400", label: "Liver" },
  kidney: { top: "44%", left: "48%", color: "bg-emerald-400", ringColor: "bg-emerald-300", label: "Kidneys" },
  skin: { top: "35%", left: "49%", color: "bg-purple-400", ringColor: "bg-purple-300", label: "Skin Dermis" },
  eye: { top: "14%", left: "49%", color: "bg-cyan-400", ringColor: "bg-cyan-300", label: "Optic Nerve" },
  ent: { top: "18%", left: "49%", color: "bg-teal-400", ringColor: "bg-teal-300", label: "ENT Canal" },
  endocrine: { top: "24%", left: "49%", color: "bg-yellow-400", ringColor: "bg-yellow-300", label: "Endocrine" },
  womens_health: { top: "54%", left: "49%", color: "bg-rose-400", ringColor: "bg-rose-300", label: "Pelvic" },
  mens_health: { top: "55%", left: "49%", color: "bg-blue-500", ringColor: "bg-blue-400", label: "Metabolic" },
  child_health: { top: "28%", left: "49%", color: "bg-emerald-400", ringColor: "bg-emerald-300", label: "Pediatric" },
  mental_health: { top: "11%", left: "49%", color: "bg-indigo-400", ringColor: "bg-indigo-300", label: "Neuro-Axis" },
};

export function OrganSystemGridView({
  onSelectSystem,
  onOpenDeepDive,
}: OrganSystemGridViewProps) {
  return (
    <section className="w-full pt-8 pb-12 space-y-4 font-sans select-none">
      {/* Section Header Matching Exact Reference Image */}
      <div className="space-y-1">
        <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
          Organ System Views (Use Same UI Style for All)
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          When user clicks on any organ/system, show the same layout with that organ highlighted in
          the human body, consistent style, colors and design.
        </p>
      </div>

      {/* Grid of 15 Organ System Cards (All using consistent 3D Holographic Anatomy) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5">
        {ORGAN_SYSTEMS.slice(0, 15).map((sys: OrganSystemItem, idx: number) => {
          const hotspot = ORGAN_HOTSPOTS[sys.id] || {
            top: "33%",
            left: "48%",
            color: "bg-cyan-400",
            ringColor: "bg-cyan-300",
            label: sys.shortName,
          };

          return (
            <div key={sys.id} className="space-y-1.5">
              {/* Numbered Header Label (e.g. 1. Heart / Circulatory) */}
              <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 truncate">
                {idx + 1}. {sys.name.split("/")[0]?.trim()} / {sys.systemName.replace(" System", "")}
              </div>

              {/* Card Body with Dark Navy Holographic Theme */}
              <div
                onClick={() => {
                  onSelectSystem(sys.id);
                  onOpenDeepDive(sys.id);
                }}
                className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#05112a] via-[#07193c] to-[#040e22] border border-blue-900/50 hover:border-cyan-400/70 p-3 text-white shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer group flex flex-col justify-between h-[215px]"
              >
                {/* Top System Name & Arrow */}
                <div className="flex items-center justify-between gap-1 pb-1.5 border-b border-blue-900/40">
                  <span className="text-[11px] font-black text-white truncate group-hover:text-cyan-300 transition-colors">
                    {sys.systemName}
                  </span>
                  <ChevronRight className="h-3 w-3 text-slate-400 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>

                {/* Card Middle: Left List of Capabilities + Right Consistent 3D Holographic Body Scan */}
                <div className="grid grid-cols-12 gap-1 py-1.5 items-center flex-1">
                  {/* Left List of Capabilities */}
                  <div className="col-span-6 flex flex-col gap-1 text-[9px] text-slate-300 font-medium">
                    <div className="flex items-center gap-1 hover:text-cyan-300 transition-colors">
                      <span className="text-cyan-400 text-[8px]">⦿</span>
                      <span className="truncate">Overview</span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-cyan-300 transition-colors">
                      <span className="text-cyan-400 text-[8px]">⦿</span>
                      <span className="truncate">Conditions</span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-cyan-300 transition-colors">
                      <span className="text-cyan-400 text-[8px]">⦿</span>
                      <span className="truncate">Symptoms</span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-cyan-300 transition-colors">
                      <span className="text-cyan-400 text-[8px]">⦿</span>
                      <span className="truncate">Tests & Reports</span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-cyan-300 transition-colors">
                      <span className="text-cyan-400 text-[8px]">⦿</span>
                      <span className="truncate">Treatments</span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-cyan-300 transition-colors">
                      <span className="text-cyan-400 text-[8px]">⦿</span>
                      <span className="truncate">Lifestyle Tips</span>
                    </div>
                  </div>

                  {/* Right: Consistent 3D Holographic Body Anatomy (ZERO stock photos!) */}
                  <div className="col-span-6 relative h-26 rounded-xl overflow-hidden bg-[#020614] border border-blue-900/50 flex items-center justify-center group-hover:border-cyan-500/50 transition-colors">
                    {/* Consistent 3D Holographic Body Model for All 15 Systems */}
                    <img
                      src="/holographic_body.jpg"
                      alt={`${sys.systemName} Holographic Scan`}
                      className="w-full h-full object-contain object-center transform transition-transform duration-500 group-hover:scale-108"
                    />

                    {/* Glowing Anatomical Hotspot for this specific organ */}
                    <div
                      style={{ top: hotspot.top, left: hotspot.left }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
                    >
                      <span className="relative flex h-4 w-4 items-center justify-center">
                        <span
                          className={`animate-ping absolute inline-flex h-full w-full rounded-full ${hotspot.ringColor} opacity-75`}
                        />
                        <span
                          className={`relative inline-flex rounded-full h-2.5 w-2.5 ${hotspot.color} shadow-[0_0_10px_rgba(34,211,238,0.8)]`}
                        />
                      </span>
                    </div>

                    {/* Small Cybernetic Organ Pill at bottom of scan */}
                    <div className="absolute bottom-1 left-1 right-1 text-center pointer-events-none z-10">
                      <span className="text-[8px] font-bold text-cyan-200 bg-slate-950/80 backdrop-blur-xs px-1.5 py-0.5 rounded border border-blue-800/60 truncate inline-block max-w-full">
                        {hotspot.label}
                      </span>
                    </div>

                    {/* Radial Glow Overlay */}
                    <div className="absolute inset-0 bg-radial-at-c from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Bottom Bar: Mini Metrics & Normal Status Badge */}
                <div className="pt-1.5 border-t border-blue-900/40 flex items-center justify-between text-[9px] font-semibold text-slate-300">
                  <div className="truncate max-w-[110px] text-slate-400">
                    {sys.quickStats[0] ? `${sys.quickStats[0].label} ${sys.quickStats[0].value}` : "Vital Normal"}
                  </div>
                  <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 text-[8px] font-black uppercase">
                    Normal
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
