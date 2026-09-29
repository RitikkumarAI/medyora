import { useState, useMemo } from "react";
import {
  Utensils,
  Search,
  Sparkles,
  Flame,
  Droplets,
  Heart,
  AlertOctagon,
  CheckCircle2,
  Printer,
  Calendar,
  Clock,
  ShieldCheck,
  ChevronRight,
  Watch,
  Info,
  Apple,
  Salad,
  Fish,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CLINICAL_DIET_CONDITIONS,
  classifyClinicalDiet,
  type ClinicalDietCondition,
  type DayDietPlan,
  type MealSlot,
} from "../data/clinical-diet-plans";
import { AmbientSmartwatchSOSModal } from "../components/AmbientSmartwatchSOSModal";
import { toast } from "sonner";

export function DietMealPlannerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConditionId, setSelectedConditionId] = useState<string>("fatty-body");
  const [dietType, setDietType] = useState<"veg" | "nonVeg">("veg");
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const [isWatchModalOpen, setIsWatchModalOpen] = useState(false);

  // Active condition
  const activeCondition: ClinicalDietCondition = useMemo(() => {
    return (
      CLINICAL_DIET_CONDITIONS.find((c) => c.id === selectedConditionId) ||
      CLINICAL_DIET_CONDITIONS[0]!
    );
  }, [selectedConditionId]);

  // Current day plan
  const activeDayPlan: DayDietPlan = useMemo(() => {
    return (
      activeCondition.sevenDaySchedule[selectedDayIndex] ||
      activeCondition.sevenDaySchedule[0]!
    );
  }, [activeCondition, selectedDayIndex]);

  // Handle Natural Language Search
  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    const matched = classifyClinicalDiet(searchQuery);
    setSelectedConditionId(matched.id);
    setSelectedDayIndex(0);
    toast.success(`Clinical AI matched: ${matched.title}`);
  };

  // Helper to render a meal slot card
  const renderMealSlot = (
    title: string,
    time: string,
    slot: MealSlot,
    badgeColor = "from-emerald-500/20 to-teal-500/20 text-emerald-400"
  ) => {
    return (
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5 mb-3">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r ${badgeColor}`}>
              {title}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" /> {time}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
            <Flame className="w-3.5 h-3.5" />
            <span>{slot.calories} kcal</span>
          </div>
        </div>

        <div className="space-y-2">
          <div>
            <h4 className="text-sm font-bold text-slate-100">{slot.name}</h4>
            {slot.hindiName && (
              <p className="text-xs text-slate-400 font-medium">{slot.hindiName}</p>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-cyan-300">
            <span className="font-semibold text-slate-400">Serving Portion:</span>
            <span>{slot.portion}</span>
          </div>

          {/* Macros Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1 text-[11px]">
            <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20 font-medium">
              P: {slot.proteinG}g
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium">
              C: {slot.carbsG}g
            </span>
            <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 font-medium">
              F: {slot.fatG}g
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium">
              Fiber: {slot.fiberG}g
            </span>
          </div>

          {/* Dietitian Clinical Tip */}
          {slot.dietitianTip && (
            <p className="text-[11px] text-slate-400 bg-slate-950/60 p-2 rounded-lg border border-slate-800/80 leading-relaxed italic">
              💡 {slot.dietitianTip}
            </p>
          )}
        </div>
      </div>
    );
  };

  const currentMeals = dietType === "veg" ? activeDayPlan.veg : activeDayPlan.nonVeg;

  // Print function
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* AMBIENT SMARTWATCH MODAL */}
      <AmbientSmartwatchSOSModal
        isOpen={isWatchModalOpen}
        onClose={() => setIsWatchModalOpen(false)}
      />

      {/* TOP HERO HEADER */}
      <div className="relative border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-950 px-4 sm:px-6 lg:px-8 pt-10 pb-8 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
                <Utensils className="w-3.5 h-3.5" />
                <span>ICMR & Clinical Nutrition AI Protocol</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                AI Clinical Diet & 7-Day Precision Meal Planner
              </h1>
              <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
                Evidence-based clinical nutrition tailored for Fatty Body, Diabetes, Fatty Liver, and Blood Pressure restoration with complete Vegetarian &amp; Non-Vegetarian schedules.
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={() => setIsWatchModalOpen(true)}
                className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg shadow-cyan-600/20 flex items-center gap-2"
              >
                <Watch className="w-4 h-4 animate-pulse" />
                Noise Watch &amp; 108 SOS
              </Button>

              <Button
                variant="outline"
                onClick={handlePrint}
                className="border-slate-700 hover:bg-slate-800 text-slate-300 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                Print / Save PDF
              </Button>
            </div>
          </div>

          {/* NATURAL LANGUAGE SEARCH / PROMPT INPUT */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ask in natural language e.g. 'My diet plan for fatty body' or 'Low BP diet with high salt'..."
                className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl pl-12 pr-36 py-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xl"
              />
              <Button
                type="submit"
                className="absolute right-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Classify Diet
              </Button>
            </div>
          </form>

          {/* CONDITION PRESET CHIPS */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
            <span className="text-slate-400 whitespace-nowrap font-medium text-[11px] uppercase tracking-wider">
              Quick Conditions:
            </span>
            {CLINICAL_DIET_CONDITIONS.map((cond) => {
              const isSelected = cond.id === selectedConditionId;
              return (
                <button
                  key={cond.id}
                  onClick={() => {
                    setSelectedConditionId(cond.id);
                    setSelectedDayIndex(0);
                  }}
                  className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all duration-200 font-medium ${
                    isSelected
                      ? "bg-emerald-500 text-white font-bold shadow-md shadow-emerald-500/20"
                      : "bg-slate-800/80 text-slate-300 hover:bg-slate-750 hover:text-white border border-slate-700/60"
                  }`}
                >
                  {cond.title.split("(")[0]?.trim()}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT WORKSPACE */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* CONDITION OVERVIEW CARD */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {activeCondition.category.replace("-", " ")}
                </span>
                <span className="text-xs text-slate-400">Clinical Protocol</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1.5">
                {activeCondition.title}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-300 font-medium mt-0.5">
                {activeCondition.hindiTitle}
              </p>
            </div>

            {/* VEG / NON-VEG TOGGLE SWITCH */}
            <div className="flex items-center bg-slate-950 p-1.5 rounded-2xl border border-slate-800 self-start lg:self-auto shadow-inner">
              <button
                onClick={() => setDietType("veg")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  dietType === "veg"
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Salad className="w-4 h-4 text-emerald-300" />
                Pure Vegetarian (Veg)
              </button>

              <button
                onClick={() => setDietType("nonVeg")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  dietType === "nonVeg"
                    ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Fish className="w-4 h-4 text-amber-300" />
                Non-Vegetarian (Eggs/Fish/Chicken)
              </button>
            </div>
          </div>

          {/* MACROS & HYDRATION TILES */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[11px] font-semibold text-slate-400">Target Calories</span>
              <div className="text-lg font-black text-white mt-1 flex items-baseline gap-1">
                <span>{activeCondition.targetCalories}</span>
                <span className="text-xs text-slate-400 font-normal">kcal/day</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[11px] font-semibold text-slate-400">Protein Split</span>
              <div className="text-xs font-bold text-blue-400 mt-1.5">
                {activeCondition.macros.protein}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[11px] font-semibold text-slate-400">Carbohydrates</span>
              <div className="text-xs font-bold text-amber-400 mt-1.5">
                {activeCondition.macros.carbs}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[11px] font-semibold text-slate-400">Healthy Fats</span>
              <div className="text-xs font-bold text-rose-400 mt-1.5">
                {activeCondition.macros.fats}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[11px] font-semibold text-slate-400">Dietary Fiber</span>
              <div className="text-xs font-bold text-emerald-400 mt-1.5">
                {activeCondition.macros.fiber}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5 text-cyan-400" /> Hydration
              </span>
              <div className="text-xs font-bold text-cyan-300 mt-1.5">
                {activeCondition.hydrationTarget}
              </div>
            </div>
          </div>

          {/* CLINICAL RATIONALE */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-emerald-400">
              <ShieldCheck className="w-4 h-4" /> Clinical Rationale &amp; Biochemical Mechanism:
            </div>
            <p className="leading-relaxed text-slate-300">
              {activeCondition.clinicalRationale}
            </p>
          </div>
        </div>

        {/* 7-DAY SCHEDULE TABS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-400" /> 7-Day Precision Meal Schedule
            </h3>
            <span className="text-xs text-slate-400">
              Showing: <strong className="text-white">{dietType === "veg" ? "Pure Vegetarian" : "Non-Vegetarian"}</strong>
            </span>
          </div>

          {/* Day selection tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {activeCondition.sevenDaySchedule.map((day, idx) => {
              const isSelected = selectedDayIndex === idx;
              return (
                <button
                  key={day.dayName}
                  onClick={() => setSelectedDayIndex(idx)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-white shadow-md shadow-emerald-500/10 ring-1 ring-emerald-500/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <div className="text-xs font-bold uppercase tracking-wider">
                    {day.dayName}
                  </div>
                  <div className="text-[11px] font-medium text-slate-300 mt-1 truncate">
                    {day.focus}
                  </div>
                </button>
              );
            })}
          </div>

          {/* ACTIVE DAY HEADER */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase text-emerald-400 tracking-wider">
                {activeDayPlan.dayName} Schedule
              </span>
              <h4 className="text-base font-bold text-white mt-0.5">
                Focus: {activeDayPlan.focus}
              </h4>
            </div>

            <div className="text-xs text-slate-400 text-right">
              Total Day Calories:{" "}
              <strong className="text-amber-400 font-bold">
                {Object.values(currentMeals).reduce((acc, m) => acc + m.calories, 0)} kcal
              </strong>
            </div>
          </div>

          {/* 7 MEAL SLOTS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {renderMealSlot("1. Early Morning", "06:30 AM", currentMeals.earlyMorning, "from-amber-500/20 to-orange-500/20 text-amber-300")}
            {renderMealSlot("2. Breakfast", "08:30 AM", currentMeals.breakfast, "from-emerald-500/20 to-teal-500/20 text-emerald-300")}
            {renderMealSlot("3. Mid-Morning Snack", "11:00 AM", currentMeals.midMorning, "from-blue-500/20 to-cyan-500/20 text-cyan-300")}
            {renderMealSlot("4. Lunch", "01:30 PM", currentMeals.lunch, "from-purple-500/20 to-indigo-500/20 text-indigo-300")}
            {renderMealSlot("5. Evening Snack", "05:00 PM", currentMeals.eveningSnack, "from-rose-500/20 to-pink-500/20 text-rose-300")}
            {renderMealSlot("6. Dinner", "08:00 PM", currentMeals.dinner, "from-teal-500/20 to-emerald-500/20 text-teal-300")}
            {renderMealSlot("7. Bedtime Drink", "10:00 PM", currentMeals.bedtime, "from-slate-700/40 to-slate-800/40 text-slate-300")}
          </div>
        </div>

        {/* FOODS TO STRICTLY AVOID VS SUPERFOODS TO EAT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {/* Superfoods to Eat */}
          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Superfoods to Prioritize
            </div>
            <p className="text-xs text-slate-400">
              Incorporate these clinical nutrients daily to accelerate metabolic recovery:
            </p>
            <ul className="space-y-2 text-xs text-slate-200">
              {activeCondition.superfoodsToEat.map((food, i) => (
                <li key={i} className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-emerald-500/20">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{food}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Foods to Avoid */}
          <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/30 space-y-3">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
              <AlertOctagon className="w-5 h-5 text-red-400" /> Foods to Strictly Avoid / Minimize
            </div>
            <p className="text-xs text-slate-400">
              Avoid these foods to prevent metabolic worsening, inflammation, or glycemic spikes:
            </p>
            <ul className="space-y-2 text-xs text-slate-200">
              {activeCondition.foodsToAvoid.map((food, i) => (
                <li key={i} className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-red-500/20">
                  <span className="text-red-400 font-bold">✗</span>
                  <span>{food}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* VIVA DEFENCE / ACCREDITATION FOOTER BANNER */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-slate-200 font-bold block">
                Medyora Clinical Nutrition Engine v2.4
              </span>
              <span>
                Standardized on ICMR-NIN (National Institute of Nutrition) Dietary Guidelines for Indians &amp; ADA protocols.
              </span>
            </div>
          </div>

          <Button
            onClick={() => setIsWatchModalOpen(true)}
            variant="outline"
            className="border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 text-xs px-4"
          >
            <Watch className="w-3.5 h-3.5 mr-1.5" /> Open Noise Smartwatch Monitor
          </Button>
        </div>
      </div>
    </div>
  );
}
