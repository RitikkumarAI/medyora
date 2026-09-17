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
  Maximize2,
  ZoomIn,
  RotateCw,
  Compass,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ORGAN_SYSTEMS } from "../data/organ-systems-data";

interface BodyExplorerProps {
  selectedOrganId: string;
  onSelectOrgan: (id: string) => void;
  onOpenDeepDive: () => void;
}

// System configuration with exact anatomical visual layers & descriptions
const SYSTEMS_CONFIG: Record<
  string,
  {
    label: string;
    icon: any;
    title: string;
    subtitle: string;
    hotspots: { top: string; left: string; color: string; ringColor: string; label: string }[];
    glowColor: string;
    scanOverlay: string;
  }
> = {
  heart: {
    label: "Circulatory",
    icon: Heart,
    title: "Heart & Blood Vessels",
    subtitle: "Coronary Arteries • Left Ventricle • Aorta",
    glowColor: "rgba(244, 63, 94, 0.45)",
    scanOverlay: "circulatory",
    hotspots: [
      { top: "33%", left: "48%", color: "bg-rose-500", ringColor: "bg-rose-400", label: "Myocardium (Heart)" },
      { top: "27%", left: "47%", color: "bg-red-400", ringColor: "bg-red-300", label: "Aortic Arch" },
    ],
  },
  lungs: {
    label: "Respiratory",
    icon: Wind,
    title: "Lungs & Airway",
    subtitle: "Trachea • Bronchial Tree • Alveoli",
    glowColor: "rgba(34, 211, 238, 0.45)",
    scanOverlay: "respiratory",
    hotspots: [
      { top: "30%", left: "44%", color: "bg-cyan-400", ringColor: "bg-cyan-300", label: "Right Lung" },
      { top: "31%", left: "52%", color: "bg-cyan-400", ringColor: "bg-cyan-300", label: "Left Lung" },
      { top: "24%", left: "48%", color: "bg-sky-300", ringColor: "bg-sky-200", label: "Trachea" },
    ],
  },
  stomach: {
    label: "Digestive",
    icon: Flame,
    title: "Digestive & Gut",
    subtitle: "Stomach • Small & Large Intestine • Liver",
    glowColor: "rgba(245, 158, 11, 0.45)",
    scanOverlay: "digestive",
    hotspots: [
      { top: "42%", left: "48%", color: "bg-amber-400", ringColor: "bg-amber-300", label: "Gastric Body" },
      { top: "46%", left: "49%", color: "bg-yellow-400", ringColor: "bg-yellow-300", label: "Intestinal Tract" },
      { top: "39%", left: "44%", color: "bg-orange-500", ringColor: "bg-orange-400", label: "Hepatic Lobes" },
    ],
  },
  brain: {
    label: "Nervous",
    icon: Brain,
    title: "Brain & Nervous Network",
    subtitle: "Cerebral Cortex • Spinal Cord • Axon Fibers",
    glowColor: "rgba(217, 70, 239, 0.45)",
    scanOverlay: "nervous",
    hotspots: [
      { top: "12%", left: "49%", color: "bg-fuchsia-500", ringColor: "bg-fuchsia-400", label: "Cerebral Cortex" },
      { top: "18%", left: "49%", color: "bg-purple-400", ringColor: "bg-purple-300", label: "Brainstem" },
      { top: "34%", left: "49%", color: "bg-indigo-400", ringColor: "bg-indigo-300", label: "Spinal Axis" },
      { top: "42%", left: "32%", color: "bg-pink-400", ringColor: "bg-pink-300", label: "Peripheral Nerves" },
    ],
  },
  bones: {
    label: "Musculoskeletal",
    icon: Bone,
    title: "Skeleton & Joint Architecture",
    subtitle: "Skull • Rib Cage • Spine • Femur • Joints",
    glowColor: "rgba(96, 165, 250, 0.45)",
    scanOverlay: "skeletal",
    hotspots: [
      { top: "28%", left: "48%", color: "bg-blue-400", ringColor: "bg-blue-300", label: "Rib Cage" },
      { top: "52%", left: "48%", color: "bg-blue-400", ringColor: "bg-blue-300", label: "Pelvic Girdle" },
      { top: "68%", left: "44%", color: "bg-cyan-300", ringColor: "bg-cyan-200", label: "Patella & Knee" },
      { top: "38%", left: "30%", color: "bg-blue-400", ringColor: "bg-blue-300", label: "Humerus" },
    ],
  },
  endocrine: {
    label: "Endocrine",
    icon: Activity,
    title: "Endocrine Hormonal Axis",
    subtitle: "Pituitary • Thyroid • Adrenals • Pancreas",
    glowColor: "rgba(251, 191, 36, 0.45)",
    scanOverlay: "endocrine",
    hotspots: [
      { top: "20%", left: "49%", color: "bg-amber-400", ringColor: "bg-amber-300", label: "Thyroid Gland" },
      { top: "43%", left: "48%", color: "bg-yellow-400", ringColor: "bg-yellow-300", label: "Adrenal & Pancreas" },
    ],
  },
  kidney: {
    label: "Urinary",
    icon: ShieldCheck,
    title: "Kidneys & Urinary System",
    subtitle: "Renal Cortex • Ureters • Bladder",
    glowColor: "rgba(52, 211, 153, 0.45)",
    scanOverlay: "urinary",
    hotspots: [
      { top: "43%", left: "45%", color: "bg-emerald-400", ringColor: "bg-emerald-300", label: "Right Kidney" },
      { top: "43%", left: "52%", color: "bg-emerald-400", ringColor: "bg-emerald-300", label: "Left Kidney" },
      { top: "54%", left: "49%", color: "bg-teal-400", ringColor: "bg-teal-300", label: "Urinary Bladder" },
    ],
  },
  womens_health: {
    label: "Reproductive",
    icon: Flower2,
    title: "Reproductive & Pelvic Anatomy",
    subtitle: "Pelvic Viscera • Reproductive Axis",
    glowColor: "rgba(244, 114, 182, 0.45)",
    scanOverlay: "reproductive",
    hotspots: [
      { top: "54%", left: "49%", color: "bg-pink-500", ringColor: "bg-pink-400", label: "Pelvic Cavity" },
    ],
  },
  skin: {
    label: "Integumentary",
    icon: Sparkles,
    title: "Integumentary Skin Boundary",
    subtitle: "Epidermis • Dermis • Subcutaneous Layer",
    glowColor: "rgba(167, 139, 250, 0.45)",
    scanOverlay: "integumentary",
    hotspots: [
      { top: "35%", left: "49%", color: "bg-violet-400", ringColor: "bg-violet-300", label: "Dermal Barrier" },
    ],
  },
};

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
  const currentConfig = SYSTEMS_CONFIG[selectedOrganId] || SYSTEMS_CONFIG["heart"]!;
  const [isZoomed, setIsZoomed] = useState(false);
  const [isRotated, setIsRotated] = useState(false);

  return (
    <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm font-sans space-y-2.5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xs font-black text-slate-900 dark:text-white">
            Body Explorer
          </h2>
          <p className="text-[11px] text-slate-400 font-medium">Click a system to explore</p>
        </div>

        <button
          onClick={onOpenDeepDive}
          className="text-[10px] font-black px-2 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 hover:bg-blue-100 flex items-center gap-1 transition-all"
        >
          <span>Deep Scan</span>
          <Maximize2 className="h-2.5 w-2.5" />
        </button>
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
                    ? "bg-blue-600 text-white shadow-xs font-extrabold scale-102"
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

        {/* Right 3D Holographic Animated Anatomy Viewport */}
        <div className="col-span-7 relative h-60 rounded-2xl overflow-hidden bg-[#020615] border border-blue-900/50 shadow-inner group flex items-center justify-center">
          {/* Laser Biometric Scanner Sweep Line */}
          <motion.div
            animate={{ y: [0, 240, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent pointer-events-none z-20 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
          />

          {/* Animated 3D Body Hologram with Organ-Specific Highlighting */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedOrganId}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{
                opacity: 1,
                scale: isZoomed ? 1.28 : 1,
                rotateY: isRotated ? 180 : 0,
              }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* 3D Holographic Body Scan Base Image */}
              <img
                src="/holographic_body.jpg"
                alt="3D Holographic Body Scan"
                className="w-full h-full object-contain object-center select-none pointer-events-none"
              />

              {/* Dynamic Anatomical System Glow Shader Overlay */}
              <div
                style={{
                  background: `radial-gradient(circle at 49% 38%, ${currentConfig.glowColor}, transparent 65%)`,
                }}
                className="absolute inset-0 pointer-events-none mix-blend-screen animate-pulse"
              />

              {/* Dynamic Organ System Highlighting SVGs */}
              {selectedOrganId === "heart" && (
                <div className="absolute top-[28%] left-[45%] w-10 h-10 pointer-events-none z-10 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-rose-500/30 blur-sm animate-ping absolute" />
                  <Heart className="h-6 w-6 text-rose-500 fill-rose-500 drop-shadow-[0_0_12px_rgba(244,63,94,0.9)] animate-pulse" />
                </div>
              )}

              {selectedOrganId === "lungs" && (
                <div className="absolute top-[26%] left-[43%] w-14 h-12 pointer-events-none z-10 flex items-center justify-center">
                  <div className="w-12 h-10 rounded-full bg-cyan-400/25 blur-md animate-pulse absolute" />
                  <Wind className="h-8 w-8 text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
                </div>
              )}

              {selectedOrganId === "brain" && (
                <div className="absolute top-[8%] left-[44%] w-10 h-10 pointer-events-none z-10 flex items-center justify-center">
                  <div className="w-9 h-9 rounded-full bg-fuchsia-500/35 blur-md animate-pulse absolute" />
                  <Brain className="h-7 w-7 text-fuchsia-400 drop-shadow-[0_0_12px_rgba(217,70,239,0.9)]" />
                </div>
              )}

              {selectedOrganId === "bones" && (
                <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
                  {/* Glowing Skeletal Overlay Nodes */}
                  <div className="absolute top-[28%] left-[48%] -translate-x-1/2 w-8 h-8 rounded-full border border-blue-400/60 bg-blue-500/20 shadow-[0_0_12px_rgba(96,165,250,0.8)] animate-pulse" />
                  <div className="absolute top-[48%] left-[48%] -translate-x-1/2 w-7 h-7 rounded-full border border-blue-400/60 bg-blue-500/20 shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
                  <div className="absolute top-[68%] left-[43%] w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
                  <div className="absolute top-[68%] left-[53%] w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
                </div>
              )}

              {selectedOrganId === "stomach" && (
                <div className="absolute top-[38%] left-[45%] w-10 h-10 pointer-events-none z-10 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-amber-500/30 blur-md animate-pulse absolute" />
                  <Flame className="h-6 w-6 text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.9)]" />
                </div>
              )}

              {selectedOrganId === "kidney" && (
                <div className="absolute top-[40%] left-[44%] w-12 h-8 pointer-events-none z-10 flex items-center justify-between px-1">
                  <div className="w-3.5 h-4.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)] animate-pulse" />
                  <div className="w-3.5 h-4.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)] animate-pulse" />
                </div>
              )}

              {/* Pulsing Hotspot Markers */}
              {currentConfig.hotspots.map((hs, hIdx) => (
                <div
                  key={hIdx}
                  style={{ top: hs.top, left: hs.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
                >
                  <span className="relative flex h-4 w-4 items-center justify-center">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full ${hs.ringColor} opacity-75`}
                    />
                    <span
                      className={`relative inline-flex rounded-full h-2.5 w-2.5 ${hs.color} shadow-[0_0_10px_rgba(34,211,238,0.8)]`}
                    />
                  </span>
                </div>
              ))}

              {/* Interactive Floating Tooltip Tag matching Reference Screenshot */}
              <div
                onClick={onOpenDeepDive}
                className="absolute top-[28%] left-[46%] -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30"
              >
                <div className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-xl bg-slate-900/95 border border-blue-500/40 text-white shadow-2xl backdrop-blur-md text-left transition-all hover:scale-105 active:scale-95">
                  <div className="text-[10px] font-black text-white">{currentConfig.title}</div>
                  <div className="text-[8px] text-cyan-300 font-medium">Click to explore</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Interactive Control Bar: Rotate | Zoom | Explore */}
          <div className="absolute bottom-1.5 left-0 right-0 text-center z-30">
            <span className="inline-flex items-center gap-1.5 text-[9px] font-bold text-slate-300 bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-full border border-blue-900/60 shadow-md">
              <button
                onClick={() => setIsRotated(!isRotated)}
                className={`flex items-center gap-0.5 hover:text-cyan-300 transition-colors ${
                  isRotated ? "text-cyan-400 font-black" : ""
                }`}
              >
                <RotateCw className="h-2.5 w-2.5" />
                <span>Rotate</span>
              </button>
              <span className="text-slate-600">|</span>
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className={`flex items-center gap-0.5 hover:text-cyan-300 transition-colors ${
                  isZoomed ? "text-cyan-400 font-black" : ""
                }`}
              >
                <ZoomIn className="h-2.5 w-2.5" />
                <span>{isZoomed ? "Reset" : "Zoom"}</span>
              </button>
              <span className="text-slate-600">|</span>
              <button
                onClick={onOpenDeepDive}
                className="flex items-center gap-0.5 hover:text-cyan-300 transition-colors"
              >
                <Compass className="h-2.5 w-2.5 text-blue-400" />
                <span>Explore</span>
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
