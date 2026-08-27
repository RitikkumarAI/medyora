import { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { 
  ArrowLeft, Search, ShoppingCart, MessageCircle, Plus, 
  Check, ShieldCheck, Clock, MapPin, Sparkles, X, ChevronRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LAB_TESTS, HEALTH_PACKAGES, type LabTest, type HealthPackage } from "@/shared/data/superapp-mock";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export function LabTestsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHomeCollection, setIsHomeCollection] = useState(true);

  const toggleAddToCart = (id: string, name: string) => {
    if (cart.includes(id)) {
      setCart((prev) => prev.filter((item) => item !== id));
      toast.info(`Removed ${name} from cart`);
    } else {
      setCart((prev) => [...prev, id]);
      toast.success(`Added ${name} to cart!`);
    }
  };

  const filteredTests = LAB_TESTS.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPackages = HEALTH_PACKAGES.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Cart total calculations
  const cartTests = LAB_TESTS.filter((t) => cart.includes(t.id));
  const cartPackages = HEALTH_PACKAGES.filter((p) => cart.includes(p.id));
  const totalAmount =
    cartTests.reduce((sum, t) => sum + t.discountedPrice, 0) +
    cartPackages.reduce((sum, p) => sum + p.discountedPrice, 0);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-28 font-sans transition-colors">
      
      {/* ================= HEADER (SCREEN 6) ================= */}
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
            <h1 className="text-base font-bold text-slate-900 dark:text-white">Blood Tests</h1>
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
                {cart.length}
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
            placeholder="Search for tests, scans & packages"
            className="h-11 pl-9 rounded-2xl bg-slate-100/90 dark:bg-slate-800 border-slate-200/60 dark:border-slate-700 text-xs focus-visible:ring-2 focus-visible:ring-blue-600"
          />
        </div>
      </header>

      <main className="p-4 space-y-6">
        
        {/* ================= HERO PROMO BANNER (SCREEN 6) ================= */}
        <div className="rounded-3xl p-5 bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 text-white relative overflow-hidden shadow-lg">
          <div className="max-w-[65%] space-y-2">
            <h2 className="font-extrabold text-lg leading-tight">
              Save upto 50%<br />On Health Packages
            </h2>
            <Button
              size="sm"
              onClick={() => {
                toggleAddToCart(HEALTH_PACKAGES[0].id, HEALTH_PACKAGES[0].name);
              }}
              className="h-8 text-xs font-bold bg-white hover:bg-slate-100 text-slate-900 rounded-xl px-4 shadow-sm"
            >
              Book Now
            </Button>
          </div>

          <img
            src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=300&q=80"
            alt="Lab Scientist"
            className="absolute right-0 bottom-0 top-0 w-36 h-full object-cover opacity-90 mix-blend-luminosity"
          />
        </div>

        {/* ================= TOP HEALTH PACKAGES (SCREEN 6) ================= */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Top Health Packages
            </h3>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer">
              See all
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {filteredPackages.slice(0, 2).map((pkg) => {
              const inCart = cart.includes(pkg.id);
              return (
                <div
                  key={pkg.id}
                  className="rounded-3xl p-3.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-2 leading-tight">
                      {pkg.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-1">{pkg.testsCount} tests included</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-black text-xs text-slate-900 dark:text-white">
                        ₹{pkg.discountedPrice}
                      </span>
                      <span className="text-[10px] text-slate-400 line-through ml-1">
                        ₹{pkg.originalPrice}
                      </span>
                    </div>

                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="h-10 w-10 rounded-xl object-cover"
                    />
                  </div>

                  <Button
                    size="sm"
                    onClick={() => toggleAddToCart(pkg.id, pkg.name)}
                    variant={inCart ? "secondary" : "outline"}
                    className={`w-full h-8 text-xs font-bold rounded-xl transition-all ${
                      inCart
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 border-emerald-200"
                        : "border-slate-200 dark:border-slate-700 text-blue-600"
                    }`}
                  >
                    {inCart ? "Added ✓" : "+ ADD"}
                  </Button>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= TOP BOOKED TESTS (SCREEN 6) ================= */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Top Booked Tests
            </h3>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer">
              See all
            </span>
          </div>

          <div className="space-y-2.5">
            {filteredTests.map((test) => {
              const inCart = cart.includes(test.id);
              return (
                <div
                  key={test.id}
                  className="flex items-center justify-between p-3.5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs"
                >
                  <div className="space-y-1 max-w-[65%]">
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white leading-tight">
                      {test.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 line-clamp-1">
                      {test.parametersCount} parameters • {test.sampleType} sample
                    </p>
                    <div className="flex items-center gap-1.5 pt-0.5">
                      <span className="font-bold text-xs text-slate-900 dark:text-white">
                        ₹{test.discountedPrice}
                      </span>
                      <span className="text-[10px] text-slate-400 line-through">
                        ₹{test.originalPrice}
                      </span>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    onClick={() => toggleAddToCart(test.id, test.name)}
                    variant={inCart ? "secondary" : "outline"}
                    className={`h-8 px-4 text-xs font-bold rounded-xl transition-all ${
                      inCart
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 border-emerald-200"
                        : "border-blue-600 text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    {inCart ? "ADDED" : "ADD"}
                  </Button>
                </div>
              );
            })}
          </div>
        </section>

      </main>

      {/* ================= FLOATING CHAT TO BOOK TESTS BAR (SCREEN 6) ================= */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3 border-t border-slate-200 dark:border-slate-800 shadow-[0_-4px_24px_rgba(0,0,0,0.06)] pb-safe">
        <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&q=80"
                alt="Expert"
                className="h-7 w-7 rounded-full border-2 border-white dark:border-slate-900 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&q=80"
                alt="Expert"
                className="h-7 w-7 rounded-full border-2 border-white dark:border-slate-900 object-cover"
              />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                20+ Experts Online
              </p>
              <p className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold">Free consultation</p>
            </div>
          </div>

          <Button
            onClick={() => toast.success("Connected to Diagnostic Support via WhatsApp!")}
            className="h-11 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 flex items-center gap-2"
          >
            <MessageCircle className="h-4 w-4 fill-white" />
            <span>Chat to Book Tests</span>
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
                  Diagnostics Cart ({cart.length})
                </h3>
                <button onClick={() => setIsCartOpen(false)} className="p-1 rounded-full text-slate-400">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 space-y-3">
                {cart.length === 0 ? (
                  <p className="text-center text-xs text-slate-400 py-8">Your cart is empty.</p>
                ) : (
                  <>
                    {cartTests.map((t) => (
                      <div key={t.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800">
                        <div>
                          <p className="font-bold text-xs">{t.name}</p>
                          <p className="text-[11px] text-blue-600 font-semibold">₹{t.discountedPrice}</p>
                        </div>
                        <Button size="sm" variant="ghost" onClick={() => toggleAddToCart(t.id, t.name)} className="text-red-500 h-8 text-xs">
                          Remove
                        </Button>
                      </div>
                    ))}
                    {cartPackages.map((p) => (
                      <div key={p.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800">
                        <div>
                          <p className="font-bold text-xs">{p.name}</p>
                          <p className="text-[11px] text-blue-600 font-semibold">₹{p.discountedPrice}</p>
                        </div>
                        <Button size="sm" variant="ghost" onClick={() => toggleAddToCart(p.id, p.name)} className="text-red-500 h-8 text-xs">
                          Remove
                        </Button>
                      </div>
                    ))}
                  </>
                )}
              </div>

              {cart.length > 0 && (
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold">Total Amount:</span>
                    <span className="font-black text-base text-blue-600">₹{totalAmount}</span>
                  </div>
                  <Button
                    onClick={() => {
                      setIsCartOpen(false);
                      toast.success("Order Placed! Home sample collection booked for tomorrow.");
                      setCart([]);
                    }}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-600/30"
                  >
                    Proceed to Checkout
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
