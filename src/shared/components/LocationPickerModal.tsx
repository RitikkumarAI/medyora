import { useState, useMemo } from "react";
import { 
  MapPin, Navigation, Search, X, Check, Building, Compass, Sparkles 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CITIES, POPULAR_LOCATIONS } from "@/shared/data/mock";
import { toast } from "sonner";

interface LocationPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCity?: string;
  selectedArea?: string;
  onSelect: (loc: { city: string; area?: string }) => void;
}

export function LocationPickerModal({
  isOpen,
  onClose,
  selectedCity = "",
  selectedArea = "",
  onSelect,
}: LocationPickerModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDetecting, setIsDetecting] = useState(false);
  const [activeCityTab, setActiveCityTab] = useState(selectedCity || "Bengaluru");

  const filteredLocations = useMemo(() => {
    if (!searchTerm.trim()) return null;
    const term = searchTerm.toLowerCase();

    const matchedCities = CITIES.filter((c) => c.toLowerCase().includes(term));
    const matchedAreas: Array<{ city: string; area: string }> = [];

    POPULAR_LOCATIONS.forEach((loc) => {
      loc.areas.forEach((area) => {
        if (
          area.toLowerCase().includes(term) ||
          loc.city.toLowerCase().includes(term)
        ) {
          matchedAreas.push({ city: loc.city, area });
        }
      });
    });

    return { cities: matchedCities, areas: matchedAreas };
  }, [searchTerm]);

  const handleUseCurrentLocation = () => {
    setIsDetecting(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (_pos) => {
          setIsDetecting(false);
          // Demo GPS simulation mapping to nearest metro
          const detectedLoc = { city: "Bengaluru", area: "Indiranagar" };
          toast.success("Location detected: Indiranagar, Bengaluru");
          onSelect(detectedLoc);
          onClose();
        },
        (_err) => {
          setIsDetecting(false);
          // Graceful fallback for browser permission issues
          const fallbackLoc = { city: "Delhi", area: "Connaught Place" };
          toast.info("Using default location: Connaught Place, Delhi");
          onSelect(fallbackLoc);
          onClose();
        },
        { timeout: 5000 }
      );
    } else {
      setIsDetecting(false);
      const fallbackLoc = { city: "Delhi", area: "Connaught Place" };
      toast.info("Using default location: Connaught Place, Delhi");
      onSelect(fallbackLoc);
      onClose();
    }
  };

  if (!isOpen) return null;

  const currentCityAreas =
    POPULAR_LOCATIONS.find(
      (l) => l.city.toLowerCase() === activeCityTab.toLowerCase()
    )?.areas || [];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-[36px] sm:rounded-3xl shadow-2xl p-6 flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-full sm:zoom-in-95 duration-300 z-10 border border-slate-100 dark:border-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Choose Location</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Find doctors & clinics near you</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* GPS Auto-detect Button */}
        <div className="pt-4">
          <button
            onClick={handleUseCurrentLocation}
            disabled={isDetecting}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/25 transition-all group active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-white/20 flex items-center justify-center">
                <Navigation className={`h-4 w-4 ${isDetecting ? 'animate-spin' : 'group-hover:rotate-45 transition-transform'}`} />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold leading-tight">
                  {isDetecting ? "Detecting GPS Location..." : "Use Current Location"}
                </p>
                <p className="text-[11px] text-blue-100 font-normal">Enable GPS for closest doctors</p>
              </div>
            </div>
            <span className="text-xs bg-white/25 px-2.5 py-1 rounded-lg font-semibold">GPS</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="pt-4 pb-2">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search city, area or locality (e.g. Bangalore, Indiranagar)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 pr-4 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-medium focus-visible:ring-blue-600"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-300 flex items-center justify-center text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Results Area */}
        <div className="flex-1 overflow-y-auto pt-2 space-y-4 max-h-[360px] pr-1">
          
          {/* If Search is Active */}
          {filteredLocations && (
            <div className="space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Search Results</p>
              
              {filteredLocations.cities.length === 0 && filteredLocations.areas.length === 0 && (
                <div className="text-center py-6">
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">No areas found for "{searchTerm}"</p>
                  <p className="text-xs text-slate-400 mt-1">Try searching for Bangalore, Delhi, Indiranagar, etc.</p>
                </div>
              )}

              {/* Matched Cities */}
              {filteredLocations.cities.map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    onSelect({ city });
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/60 border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <Building className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{city}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">All Areas in {city}</p>
                    </div>
                  </div>
                  {selectedCity === city && !selectedArea && (
                    <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  )}
                </button>
              ))}

              {/* Matched Areas */}
              {filteredLocations.areas.map((item, idx) => (
                <button
                  key={`${item.city}-${item.area}-${idx}`}
                  onClick={() => {
                    onSelect({ city: item.city, area: item.area });
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 border border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800 transition-all text-left shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{item.area}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{item.city}</p>
                    </div>
                  </div>
                  {selectedCity === item.city && selectedArea === item.area && (
                    <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Default City Tabs & Popular Localities */}
          {!filteredLocations && (
            <div className="space-y-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Major Cities</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      onSelect({ city: "" });
                      onClose();
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      !selectedCity
                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                  >
                    All Locations
                  </button>
                  {CITIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => setActiveCityTab(c)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        activeCityTab.toLowerCase() === c.toLowerCase()
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Localities in active city */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Popular Localities in {activeCityTab}
                  </p>
                  <button
                    onClick={() => {
                      onSelect({ city: activeCityTab });
                      onClose();
                    }}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Select All {activeCityTab}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {currentCityAreas.map((area) => (
                    <button
                      key={area}
                      onClick={() => {
                        onSelect({ city: activeCityTab, area });
                        onClose();
                      }}
                      className={`flex items-center justify-between p-3 rounded-2xl border text-left transition-all ${
                        selectedCity.toLowerCase() === activeCityTab.toLowerCase() &&
                        selectedArea.toLowerCase() === area.toLowerCase()
                          ? "bg-blue-50 dark:bg-blue-950/80 border-blue-400 dark:border-blue-600 text-blue-900 dark:text-blue-100 font-bold"
                          : "bg-slate-50 dark:bg-slate-800/80 border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-semibold"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <MapPin className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                        <span className="text-xs truncate">{area}</span>
                      </div>
                      {selectedCity.toLowerCase() === activeCityTab.toLowerCase() &&
                        selectedArea.toLowerCase() === area.toLowerCase() && (
                          <Check className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
