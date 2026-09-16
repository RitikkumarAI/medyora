import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  icon: LucideIcon;
  to: string;
  badge?: string | number | undefined;
}

interface LiquidGlassBottomNavProps {
  items: NavItem[];
  className?: string;
}

export function LiquidGlassBottomNav({ items, className }: LiquidGlassBottomNavProps) {
  const location = useLocation();

  return (
    <nav
      className={cn(
        "lg:hidden fixed bottom-4 inset-x-3 sm:inset-x-6 max-w-[430px] mx-auto z-50 pointer-events-auto select-none",
        className,
      )}
      role="navigation"
      aria-label="Mobile Bottom Navigation"
    >
      {/* Outer Chromatic Iridescent Border Layer */}
      <div className="relative p-[1.5px] rounded-[30px] bg-gradient-to-r from-blue-400/50 via-indigo-400/50 to-purple-400/50 dark:from-blue-500/30 dark:via-indigo-500/30 dark:to-purple-500/30 shadow-[0_12px_36px_rgba(15,23,42,0.12)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
        {/* Inner Liquid Glass Body */}
        <div className="relative flex items-center justify-around h-[68px] p-1.5 rounded-[28.5px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-hidden">
          {/* Top Specular Glare */}
          <div
            aria-hidden="true"
            className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/30 to-transparent pointer-events-none z-20"
          />

          {/* Nav Items */}
          {items.map((item) => {
            const isActive =
              item.to === "/patient"
                ? location.pathname === "/patient" || location.pathname === "/patient/"
                : location.pathname.startsWith(item.to);

            return (
              <Link
                key={item.to}
                to={item.to}
                className="relative flex-1 flex flex-col items-center justify-center h-full z-20 group outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-[22px] transition-all"
              >
                {/* Active Elevated 3D Glass Card Indicator (Matching Reference Image) */}
                {isActive && (
                  <motion.div
                    layoutId="liquid-glass-active-card"
                    className="absolute inset-x-1 inset-y-1 rounded-[22px] bg-white/95 dark:bg-slate-800/95 shadow-[0_8px_20px_rgba(0,0,0,0.1),0_2px_6px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,1)] dark:shadow-[0_8px_20px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.15)] border border-white/80 dark:border-slate-700/60 z-0"
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 30,
                      mass: 0.8,
                    }}
                  />
                )}

                {/* Icon & Label Container */}
                <motion.div
                  whileTap={{ scale: 0.88 }}
                  className="relative flex flex-col items-center justify-center gap-1 z-10 py-1 transition-transform duration-200"
                >
                  {/* Icon */}
                  <motion.div
                    animate={{
                      scale: isActive ? 1.08 : 1,
                      y: isActive ? -1 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 450, damping: 25 }}
                    className="relative"
                  >
                    <item.icon
                      className={cn(
                        "h-[21px] w-[21px] transition-colors duration-200",
                        isActive
                          ? "text-blue-600 dark:text-blue-400 stroke-[2.4px] drop-shadow-[0_1px_4px_rgba(37,99,235,0.3)]"
                          : "text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white stroke-[1.85px]",
                      )}
                    />

                    {/* Badge */}
                    {item.badge !== undefined && (
                      <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                        {item.badge}
                      </span>
                    )}
                  </motion.div>

                  {/* Label */}
                  <span
                    className={cn(
                      "text-[10px] tracking-tight transition-all duration-200 leading-none",
                      isActive
                        ? "font-bold text-slate-900 dark:text-white"
                        : "font-medium text-slate-700 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200",
                    )}
                  >
                    {item.label}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
