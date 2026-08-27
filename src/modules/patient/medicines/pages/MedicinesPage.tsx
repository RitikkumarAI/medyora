import { useState, useRef } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { 
  ArrowLeft, Search, ShoppingCart, MessageCircle, UploadCloud, 
  FileText, Check, ShieldCheck, Zap, Sparkles, Heart, Smile, 
  X, Plus, Trash2, ChevronRight, Activity 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MEDICINES, MEDICINE_CATEGORIES, type Medicine } from "@/shared/data/superapp-mock";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export function MedicinesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<{ id: string; qty: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [prescriptionFile, setPrescriptionFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddToCart = (id: string, name: string) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === id);
      if (exists) {
        return prev.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...prev, { id, qty: 1 }];
    });
    toast.success(`Added ${name} to medicine cart!`);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handlePrescriptionUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPrescriptionFile(file);
      toast.success(`Prescription "${file.name}" uploaded successfully! Our pharmacist will review it.`);
    }
  };

  const filteredMedicines = MEDICINES.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const cartItemsDetailed = cart.map((item) => {
    const med = MEDICINES.find((m) => m.id === item.id)!;
    return { ...med, qty: item.qty };
  });

  const totalAmount = cartItemsDetailed.reduce((sum, item) => sum + item.discountedPrice * item.qty, 0);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-28 font-sans transition-colors">
      
      {/* ================= HEADER (SCREEN 7) ================= */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 pt-4 pb-3 border-b border-slate-100 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.history.back()}
              className="h-10 w-10 shrink-0 rounded-full border border-slate-200 dark:border-slate-800"
              aria-label="Back"
            >
              <ArrowLeft className="h-5 w-5 text-slate-700 dark:text-slate-300" />
            </Button>
            <h1 className="text-base font-bold text-slate-900 dark:text-white">Medicines</h1>
          </div>

          {/* Cart Icon with badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative h-10 w-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700 shadow-xs"
            aria-label="View Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shadow-sm">
                {cart.reduce((a, b) => a + b.qty, 0)}
              </span>
            )}
          </button>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for medicines"
            className="h-11 pl-9 rounded-2xl bg-slate-100/90 dark:bg-slate-800 border-slate-200/60 dark:border-slate-700 text-xs focus-visible:ring-2 focus-visible:ring-blue-600"
          />
        </div>
      </header>

      <main className="p-4 space-y-6">
        
        {/* ================= HERO PROMO BANNER (SCREEN 7) ================= */}
        <div className="rounded-3xl p-5 bg-gradient-to-r from-teal-700 via-emerald-800 to-slate-900 text-white relative overflow-hidden shadow-lg">
          <div className="max-w-[65%] space-y-2">
            <h2 className="font-extrabold text-lg leading-tight">
              Flat 20% off<br />On all medicines
            </h2>
            <Button
              size="sm"
              onClick={() => handleAddToCart(MEDICINES[0].id, MEDICINES[0].name)}
              className="h-8 text-xs font-bold bg-white hover:bg-slate-100 text-slate-900 rounded-xl px-4 shadow-sm"
            >
              Order Now
            </Button>
          </div>

          <img
            src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&q=80"
            alt="Medicines"
            className="absolute right-0 bottom-0 top-0 w-36 h-full object-cover opacity-90 mix-blend-luminosity"
          />
        </div>

        {/* ================= ORDER WITH PRESCRIPTION (SCREEN 7) ================= */}
        <section className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">Order with Prescription</h3>
              <p className="text-[11px] text-slate-400">Get medicines delivered at your doorstep</p>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePrescriptionUpload}
              accept="image/*,.pdf"
              className="hidden"
            />
          </div>

          {prescriptionFile ? (
            <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 truncate max-w-[200px]">
                  {prescriptionFile.name}
                </span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setPrescriptionFile(null)}
                className="h-7 text-xs text-red-500 hover:bg-red-50"
              >
                Remove
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-11 rounded-2xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 font-bold text-xs flex items-center justify-center gap-2"
            >
              <UploadCloud className="h-4 w-4" />
              <span>Upload Prescription</span>
            </Button>
          )}
        </section>

        {/* ================= POPULAR CATEGORIES (SCREEN 7) ================= */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Popular Categories
            </h3>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer">
              See all
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            {MEDICINE_CATEGORIES.slice(0, 4).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSearchQuery(cat.name)}
                className="flex flex-col items-center p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs hover:border-blue-500 transition-all text-center"
              >
                <div className={`h-11 w-11 rounded-2xl bg-gradient-to-br ${cat.color} text-white flex items-center justify-center mb-1.5 shadow-xs`}>
                  {cat.id === "pain" && <Zap className="h-5 w-5" />}
                  {cat.id === "vitamins" && <Sparkles className="h-5 w-5" />}
                  {cat.id === "healthcare" && <ShieldCheck className="h-5 w-5" />}
                  {cat.id === "baby" && <Heart className="h-5 w-5" />}
                </div>
                <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200 line-clamp-1 leading-tight">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* ================= POPULAR MEDICINES LISTING ================= */}
        <section className="space-y-3">
          <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            All Medicines & Essentials
          </h3>

          <div className="grid gap-3">
            {filteredMedicines.map((med) => {
              const inCart = cart.find((item) => item.id === med.id);
              return (
                <div
                  key={med.id}
                  className="flex items-center justify-between p-3.5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs"
                >
                  <div className="flex items-center gap-3 max-w-[70%]">
                    <img
                      src={med.image}
                      alt={med.name}
                      className="h-12 w-12 rounded-2xl object-cover shrink-0"
                    />
                    <div className="space-y-0.5 min-w-0">
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                        {med.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 truncate">{med.packSize}</p>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-slate-900 dark:text-white">
                          ₹{med.discountedPrice}
                        </span>
                        <span className="text-[10px] text-slate-400 line-through">
                          ₹{med.mrp}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(med.id, med.name)}
                    className="h-8 px-4 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
                  >
                    {inCart ? `ADD (${inCart.qty})` : "ADD"}
                  </Button>
                </div>
              );
            })}
          </div>
        </section>

      </main>

      {/* ================= FLOATING CHAT TO ORDER BAR (SCREEN 7) ================= */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3 border-t border-slate-200 dark:border-slate-800 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] pb-safe">
        <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&q=80"
                alt="Pharmacist"
                className="h-7 w-7 rounded-full border-2 border-white dark:border-slate-900 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&q=80"
                alt="Pharmacist"
                className="h-7 w-7 rounded-full border-2 border-white dark:border-slate-900 object-cover"
              />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                20+ Experts Online
              </p>
              <p className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold">Instant order support</p>
            </div>
          </div>

          <Button
            onClick={() => toast.success("Connected to Pharmacy Order Desk via WhatsApp!")}
            className="h-11 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 flex items-center gap-2"
          >
            <MessageCircle className="h-4 w-4 fill-white" />
            <span>Chat to Order</span>
          </Button>
        </div>
      </div>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-[32px] sm:rounded-[32px] p-5 shadow-2xl border border-slate-100 dark:border-slate-800 max-h-[85vh] flex flex-col"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Pharmacy Cart ({cart.length})
                </h3>
                <button onClick={() => setIsCartOpen(false)} className="p-1 rounded-full text-slate-400">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 space-y-3">
                {cart.length === 0 ? (
                  <p className="text-center text-xs text-slate-400 py-8">Your cart is empty.</p>
                ) : (
                  cartItemsDetailed.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800">
                      <div>
                        <p className="font-bold text-xs">{item.name}</p>
                        <p className="text-[11px] text-blue-600 font-semibold">₹{item.discountedPrice} × {item.qty} = ₹{item.discountedPrice * item.qty}</p>
                      </div>
                      <Button size="sm" variant="ghost" onClick={() => handleRemoveFromCart(item.id)} className="text-red-500 h-8 text-xs">
                        Remove
                      </Button>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold">Total Bill:</span>
                    <span className="font-black text-base text-emerald-600">₹{totalAmount}</span>
                  </div>
                  <Button
                    onClick={() => {
                      setIsCartOpen(false);
                      toast.success("Medicine order placed! Delivering in 2 hours.");
                      setCart([]);
                    }}
                    className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/30"
                  >
                    Proceed to Order
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
