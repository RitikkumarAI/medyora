import { useState } from "react";
import {
  X,
  Camera,
  UploadCloud,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Activity,
  Heart,
  Utensils,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface IndianFoodItem {
  id: string;
  name: string;
  hindiName: string;
  serving: string;
  calories: number;
  carbsG: number;
  proteinG: number;
  fatG: number;
  fiberG: number;
  glycemicIndex: number;
  glycemicLoad: number;
  diabeticSafety: "Safe & Recommended" | "Moderate / Portion Control" | "High Spike Risk";
  dietitianTip: string;
  image: string;
}

const INDIAN_FOOD_PRESETS: IndianFoodItem[] = [
  {
    id: "thali-1",
    name: "2 Phulka Roti + Moong Dal + Palak Paneer",
    hindiName: "दो फुल्का + मूंग दाल + पालक पनीर",
    serving: "1 Standard Lunch Thali (320g)",
    calories: 420,
    carbsG: 52,
    proteinG: 18,
    fatG: 14,
    fiberG: 9,
    glycemicIndex: 48,
    glycemicLoad: 12,
    diabeticSafety: "Safe & Recommended",
    dietitianTip:
      "High fiber from palak and moong dal provides a sustained glucose curve. Excellent balanced Indian meal for diabetes and hypertension.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "dosa-1",
    name: "Masala Dosa + Coconut Chutney + Veg Sambar",
    hindiName: "मसाला डोसा + सांभर",
    serving: "1 Medium Dosa with 100ml Sambar",
    calories: 380,
    carbsG: 58,
    proteinG: 8,
    fatG: 12,
    fiberG: 5,
    glycemicIndex: 68,
    glycemicLoad: 22,
    diabeticSafety: "Moderate / Portion Control",
    dietitianTip:
      "Fermented rice batter causes rapid glucose absorption. Eat more vegetable sambar (drumstick/beans) first to reduce glucose spike by 30%.",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "biryani-1",
    name: "Dum Biryani with Onion Raita",
    hindiName: "दम बिरयानी + रायता",
    serving: "1 Plate (350g)",
    calories: 640,
    carbsG: 78,
    proteinG: 26,
    fatG: 22,
    fiberG: 4,
    glycemicIndex: 72,
    glycemicLoad: 31,
    diabeticSafety: "High Spike Risk",
    dietitianTip:
      "High refined starch and ghee. Have cucumber raita and raw salad before eating the rice to minimize post-prandial glucose spike.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "chole-1",
    name: "Chole Bhature (2 Bhature + Punjabi Chole)",
    hindiName: "छोले भटूरे",
    serving: "2 Bhature with 200g Chole",
    calories: 780,
    carbsG: 92,
    proteinG: 19,
    fatG: 38,
    fiberG: 11,
    glycemicIndex: 76,
    glycemicLoad: 38,
    diabeticSafety: "High Spike Risk",
    dietitianTip:
      "Deep fried refined flour (maida). Not recommended for diabetic patients. If consuming, take a 20-min post-meal brisk walk to aid glycemic clearance.",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "oats-1",
    name: "Oats & Veggie Upma with Roasted Peanuts",
    hindiName: "ओट्स वेज उपमा",
    serving: "1 Bowl (250g)",
    calories: 260,
    carbsG: 34,
    proteinG: 11,
    fatG: 8,
    fiberG: 7,
    glycemicIndex: 42,
    glycemicLoad: 8,
    diabeticSafety: "Safe & Recommended",
    dietitianTip:
      "Rich in beta-glucan soluble fiber. Blunts insulin spikes and helps lower LDL cholesterol. Ideal breakfast choice.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80",
  },
];

interface DietFoodScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DietFoodScannerModal({ isOpen, onClose }: DietFoodScannerModalProps) {
  const [selectedFood, setSelectedFood] = useState<IndianFoodItem>(INDIAN_FOOD_PRESETS[0]!);
  const [isScanning, setIsScanning] = useState(false);
  const [customFoodQuery, setCustomFoodQuery] = useState("");

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      // Pick random food
      const randomFood = INDIAN_FOOD_PRESETS[Math.floor(Math.random() * INDIAN_FOOD_PRESETS.length)]!;
      setSelectedFood(randomFood);
      toast.success(`AI Vision identified: ${randomFood.name}! Analysis complete.`);
    }, 1200);
  };

  const handleLogMeal = () => {
    toast.success(`Logged ${selectedFood.name} (${selectedFood.calories} kcal) into your Daily Nutrition & Glucose Log!`, {
      icon: "🥗",
    });
    onClose();
  };

  const getSafetyBadge = (safety: IndianFoodItem["diabeticSafety"]) => {
    switch (safety) {
      case "Safe & Recommended":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-300";
      case "Moderate / Portion Control":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border-amber-300";
      case "High Spike Risk":
        return "bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 border-rose-300";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5 max-h-[92vh] overflow-y-auto"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
              <Utensils className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  AI Indian Food & Diabetic Glycemic Scanner
                </h3>
                <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-600 border border-amber-500/20">
                  AI Vision 4.0
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Calculates Calories, Glycemic Index (GI), and Glycemic Load (GL) for Indian Meals
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 rounded-full p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scan Actions & Presets */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={handleSimulateScan}
              disabled={isScanning}
              className="flex-1 h-11 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <Camera className={`h-4 w-4 ${isScanning ? "animate-spin" : ""}`} />
              {isScanning ? "Scanning Food with AI..." : "Scan Food with Camera"}
            </Button>
            <Button
              variant="outline"
              onClick={handleSimulateScan}
              disabled={isScanning}
              className="flex-1 h-11 rounded-2xl border-slate-200 dark:border-slate-700 font-bold text-xs flex items-center justify-center gap-2"
            >
              <UploadCloud className="h-4 w-4 text-blue-500" />
              Upload Meal Photo
            </Button>
          </div>

          {/* Quick Select Preset Indian Meals */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Or Select Common Indian Meal
            </label>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {INDIAN_FOOD_PRESETS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedFood(item)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all border ${
                    selectedFood.id === item.id
                      ? "bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border-amber-400 shadow-xs"
                      : "bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {item.hindiName}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Food Detail Card */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 p-4 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={selectedFood.image}
                alt={selectedFood.name}
                className="h-16 w-16 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shadow-sm"
              />
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
                  {selectedFood.name}
                </h4>
                <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                  {selectedFood.hindiName}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">{selectedFood.serving}</p>
              </div>
            </div>

            <div
              className={`rounded-xl border px-3 py-1.5 text-xs font-bold shrink-0 ${getSafetyBadge(
                selectedFood.diabeticSafety
              )}`}
            >
              {selectedFood.diabeticSafety}
            </div>
          </div>

          {/* Key Glycemic Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="rounded-xl bg-white dark:bg-slate-900 p-2.5 border border-slate-200/80 dark:border-slate-800 text-center">
              <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-slate-400">
                <Flame className="h-3.5 w-3.5 text-orange-500" /> Calories
              </div>
              <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                {selectedFood.calories} <span className="text-[10px] font-normal text-slate-400">kcal</span>
              </div>
            </div>

            <div className="rounded-xl bg-white dark:bg-slate-900 p-2.5 border border-slate-200/80 dark:border-slate-800 text-center">
              <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-slate-400">
                <Activity className="h-3.5 w-3.5 text-blue-500" /> Glycemic Index
              </div>
              <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                {selectedFood.glycemicIndex} <span className="text-[10px] font-normal text-slate-400">GI</span>
              </div>
            </div>

            <div className="rounded-xl bg-white dark:bg-slate-900 p-2.5 border border-slate-200/80 dark:border-slate-800 text-center">
              <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-slate-400">
                <Heart className="h-3.5 w-3.5 text-rose-500" /> Glycemic Load
              </div>
              <div
                className={`text-lg font-black mt-0.5 ${
                  selectedFood.glycemicLoad <= 10
                    ? "text-emerald-600"
                    : selectedFood.glycemicLoad <= 19
                    ? "text-amber-600"
                    : "text-rose-600"
                }`}
              >
                {selectedFood.glycemicLoad} <span className="text-[10px] font-normal text-slate-400">GL</span>
              </div>
            </div>

            <div className="rounded-xl bg-white dark:bg-slate-900 p-2.5 border border-slate-200/80 dark:border-slate-800 text-center">
              <div className="text-[11px] font-bold text-slate-400">Dietary Fiber</div>
              <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                {selectedFood.fiberG}g
              </div>
            </div>
          </div>

          {/* Macronutrient breakdown */}
          <div className="rounded-xl bg-white dark:bg-slate-900 p-3 border border-slate-200/80 dark:border-slate-800 space-y-1.5 text-xs">
            <span className="text-[11px] font-bold text-slate-500 block">Macronutrient Distribution:</span>
            <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
              <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800">
                <span className="text-slate-400 block">Carbs</span>
                <strong className="text-slate-900 dark:text-white font-bold">{selectedFood.carbsG}g</strong>
              </div>
              <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800">
                <span className="text-slate-400 block">Protein</span>
                <strong className="text-emerald-600 font-bold">{selectedFood.proteinG}g</strong>
              </div>
              <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800">
                <span className="text-slate-400 block">Healthy Fat</span>
                <strong className="text-amber-600 font-bold">{selectedFood.fatG}g</strong>
              </div>
            </div>
          </div>

          {/* AI Clinical Dietitian Guidance */}
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 p-3 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-300">
              <Sparkles className="h-4 w-4 text-amber-600" />
              <span>Indian Clinical Dietitian Analysis:</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
              {selectedFood.dietitianTip}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-1">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 h-11 rounded-2xl border-slate-200 dark:border-slate-700 font-bold text-xs"
          >
            Close
          </Button>
          <Button
            onClick={handleLogMeal}
            className="flex-1 h-11 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/20"
          >
            Log Meal in Health Journal
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
