import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { CalendarDays, MapPin, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SPECIALIZATIONS } from "@/shared/data/mock";
import { LocationPickerModal } from "./LocationPickerModal";

export function SearchBar() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const displayLocation = selectedArea
    ? `${selectedArea}, ${selectedCity}`
    : selectedCity || "All Locations";

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate({
            to: "/doctors",
            search: {
              q: keyword || undefined,
              city: selectedCity || undefined,
            },
          });
        }}
        className="card-soft grid gap-3 p-3 shadow-[var(--shadow-float)] md:grid-cols-[1.4fr_1.2fr_1fr_auto] md:items-center md:gap-0 md:divide-x md:divide-border"
      >
        <label className="flex items-center gap-3 rounded-xl px-3 py-2">
          <Search className="size-5 shrink-0 text-muted-foreground" />
          <span className="w-full">
            <span className="block text-xs font-medium text-muted-foreground">
              Search doctor, speciality
            </span>
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              list="speciality-options"
              placeholder="e.g. Cardiologist, Fever"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
            />
          </span>
        </label>
        <datalist id="speciality-options">
          {SPECIALIZATIONS.map((s) => (
            <option key={s.id} value={s.name} />
          ))}
        </datalist>

        {/* Location Picker Trigger */}
        <div
          onClick={() => setIsLocationOpen(true)}
          className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 cursor-pointer hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-3 truncate">
            <MapPin className="size-5 shrink-0 text-blue-600" />
            <div className="truncate text-left">
              <span className="block text-xs font-medium text-muted-foreground">Location</span>
              <span className="block text-sm font-bold text-foreground truncate">
                {displayLocation}
              </span>
            </div>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
        </div>

        <label className="flex items-center gap-3 rounded-xl px-3 py-2">
          <CalendarDays className="size-5 shrink-0 text-muted-foreground" />
          <span className="w-full">
            <span className="block text-xs font-medium text-muted-foreground">
              Appointment date
            </span>
            <input
              type="date"
              className="w-full bg-transparent text-sm outline-none"
              defaultValue={new Date().toISOString().slice(0, 10)}
            />
          </span>
        </label>

        <div className="md:pl-3">
          <Button type="submit" variant="hero" size="lg" className="w-full gap-2 md:w-auto">
            Find Doctors <Search className="size-4" />
          </Button>
        </div>
      </form>

      {/* Location Picker Modal */}
      <LocationPickerModal
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
        selectedCity={selectedCity}
        selectedArea={selectedArea}
        onSelect={(loc) => {
          setSelectedCity(loc.city);
          setSelectedArea(loc.area || "");
        }}
      />
    </>
  );
}
