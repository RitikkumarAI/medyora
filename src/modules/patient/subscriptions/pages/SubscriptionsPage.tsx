import { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  ShieldCheck,
  Check,
  Sparkles,
  Crown,
  Users,
  Video,
  Calendar,
  Star,
  Zap,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SUBSCRIPTION_PLANS, type SubscriptionPlan } from "@/shared/data/superapp-mock";
import { toast } from "sonner";
import { motion } from "framer-motion";

export function SubscriptionsPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string>("medyora-care");

  const handleSubscribe = (planName: string) => {
    toast.success(`Successfully activated ${planName}! Welcome to Medyora Care.`);
    setTimeout(() => {
      router.navigate({ to: "/patient/profile" });
    }, 1200);
  };

  const primaryPlan = SUBSCRIPTION_PLANS[0]!; // Medyora Care Plan
  const plusPlan = SUBSCRIPTION_PLANS[1]!; // Medyora PLUS

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-24 font-sans transition-colors">
      {/* ================= HEADER (SCREEN 8) ================= */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 pt-4 pb-3 border-b border-slate-100 dark:border-slate-800 shadow-xs flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.history.back()}
          className="h-10 w-10 shrink-0 rounded-full border border-slate-200 dark:border-slate-800"
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5 text-slate-700 dark:text-slate-300" />
        </Button>
        <h1 className="text-base font-bold text-slate-900 dark:text-white">
          Subscriptions & Plans
        </h1>
      </header>

      <main className="p-4 space-y-5 max-w-lg mx-auto w-full">
        {/* ================= 1. PRIMARY MEDYORA CARE PLAN (SCREEN 8) ================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[32px] p-6 bg-gradient-to-b from-blue-700 via-blue-800 to-indigo-900 text-white shadow-xl space-y-6 relative overflow-hidden"
        >
          {/* Top Brand & Badge */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-blue-200 text-xs font-bold tracking-wider uppercase">
              <Crown className="h-4 w-4 text-amber-300 fill-amber-300" />
              <span>Medyora</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white">Care Plan</h2>
            <p className="text-sm font-semibold text-blue-100 pt-1">
              For only{" "}
              <span className="text-white font-extrabold text-lg">
                ₹{primaryPlan.pricePerYear}/year
              </span>
            </p>
          </div>

          {/* Benefit Checkpoints */}
          <div className="space-y-3.5 pt-2 border-t border-white/10">
            {primaryPlan.benefits.slice(0, 5).map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Check className="h-3.5 w-3.5 text-white stroke-[3]" />
                </div>
                <span className="text-xs font-medium text-blue-50 leading-tight">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Action CTA */}
          <div className="space-y-3 pt-2">
            <Button
              onClick={() => handleSubscribe(primaryPlan.name)}
              className="w-full h-12 rounded-2xl bg-white hover:bg-slate-100 text-blue-900 font-extrabold text-sm shadow-lg shadow-blue-950/40"
            >
              Get Medyora Care Plan
            </Button>

            <button
              onClick={() => toast.info("Full Medyora Care Plan coverage brochure loaded.")}
              className="w-full text-center text-xs font-bold text-blue-200 hover:text-white transition-colors"
            >
              Explore more &gt;
            </button>
          </div>
        </motion.div>

        {/* ================= 2. MEDYORA PLUS CARD (SCREEN 8) ================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-[32px] p-6 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 dark:from-pink-950/30 dark:via-purple-950/30 dark:to-indigo-950/30 border border-purple-200/80 dark:border-purple-800/60 shadow-xs flex items-center justify-between"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base text-slate-900 dark:text-white">
                Medyora
              </span>
              <span className="font-black text-xs uppercase bg-gradient-to-r from-pink-600 to-purple-600 text-white px-2 py-0.5 rounded-md">
                PLUS
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Starts from{" "}
              <strong className="text-slate-900 dark:text-white">
                ₹{plusPlan.pricePerYear}/year
              </strong>
            </p>
          </div>

          <Button
            size="sm"
            onClick={() => handleSubscribe(plusPlan.name)}
            className="h-10 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/20"
          >
            Upgrade
          </Button>
        </motion.div>

        {/* ================= 3. MEMBERSHIP GUARANTEE & STATS ================= */}
        <div className="grid grid-cols-3 gap-2.5 pt-2 text-center">
          <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs">
            <ShieldCheck className="h-5 w-5 text-blue-600 mx-auto mb-1" />
            <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300">
              100% Verified
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs">
            <Users className="h-5 w-5 text-purple-600 mx-auto mb-1" />
            <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300">Family Cover</p>
          </div>
          <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs">
            <Zap className="h-5 w-5 text-amber-500 mx-auto mb-1" />
            <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300">
              Zero Wait Time
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
