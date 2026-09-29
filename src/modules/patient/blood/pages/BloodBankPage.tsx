import { useState } from "react";
import {
  Heart,
  Droplets,
  Search,
  MapPin,
  PhoneCall,
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Send,
  User,
  Truck,
  FileText,
  BadgeCheck,
  Share2,
  Award,
  ChevronRight,
  Info,
  Sparkles,
  Home,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-" | "Bombay (hh)";

interface BloodBankItem {
  id: string;
  name: string;
  type: "Government / Red Cross" | "Rotary" | "Private Hospital";
  distanceKm: number;
  location: string;
  phone: string;
  stock: Record<BloodGroup, number>;
  lastVerified: string;
  isOpen24x7: boolean;
}

const BLOOD_BANKS_DATA: BloodBankItem[] = [
  {
    id: "bb-1",
    name: "Indian Red Cross Society Central Blood Bank",
    type: "Government / Red Cross",
    distanceKm: 1.8,
    location: "Race Course Road, Central Bengaluru",
    phone: "+91 80 2226 8435",
    isOpen24x7: true,
    lastVerified: "4 mins ago (Real-time IoT)",
    stock: {
      "A+": 24,
      "A-": 6,
      "B+": 32,
      "B-": 4,
      "AB+": 12,
      "AB-": 2,
      "O+": 45,
      "O-": 5,
      "Bombay (hh)": 1,
    },
  },
  {
    id: "bb-2",
    name: "Manipal Hospital Blood Center & Cryo-Bank",
    type: "Private Hospital",
    distanceKm: 2.6,
    location: "HAL Old Airport Road, Kodihalli",
    phone: "+91 80 2502 4444",
    isOpen24x7: true,
    lastVerified: "12 mins ago",
    stock: {
      "A+": 18,
      "A-": 3,
      "B+": 22,
      "B-": 1,
      "AB+": 8,
      "AB-": 0,
      "O+": 29,
      "O-": 3,
      "Bombay (hh)": 0,
    },
  },
  {
    id: "bb-3",
    name: "Rotary TTK Voluntary Blood Bank",
    type: "Rotary",
    distanceKm: 3.4,
    location: "New Thippasandra, Indiranagar",
    phone: "+91 80 2528 7903",
    isOpen24x7: true,
    lastVerified: "18 mins ago",
    stock: {
      "A+": 30,
      "A-": 8,
      "B+": 40,
      "B-": 7,
      "AB+": 14,
      "AB-": 4,
      "O+": 52,
      "O-": 9,
      "Bombay (hh)": 2,
    },
  },
  {
    id: "bb-4",
    name: "NIMHANS Blood Center",
    type: "Government / Red Cross",
    distanceKm: 5.1,
    location: "Hosur Road, Lakkasandra",
    phone: "+91 80 2699 5000",
    isOpen24x7: true,
    lastVerified: "25 mins ago",
    stock: {
      "A+": 15,
      "A-": 2,
      "B+": 19,
      "B-": 3,
      "AB+": 6,
      "AB-": 1,
      "O+": 22,
      "O-": 2,
      "Bombay (hh)": 0,
    },
  },
];

export function BloodBankPage() {
  const [activeTab, setActiveTab] = useState<"radar" | "donate-home" | "history">("donate-home");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<BloodGroup>("O-");
  const [searchQuery, setSearchQuery] = useState("");
  const [sosBroadcastActive, setSosBroadcastActive] = useState(false);

  // Home Donation Form State
  const [donorName, setDonorName] = useState("Ritik Kumar");
  const [donorPhone, setDonorPhone] = useState("+91 98765 43210");
  const [donorAge, setDonorAge] = useState("24");
  const [donorWeight, setDonorWeight] = useState("68");
  const [donorBloodGroup, setDonorBloodGroup] = useState<BloodGroup>("O+");
  const [selectedSlot, setSelectedSlot] = useState("Tomorrow, 09:00 AM - 11:30 AM");
  const [pickupAddress, setPickupAddress] = useState(
    "Flat 402, Green Glen Layout, Outer Ring Road, Bellandur, Bengaluru - 560103"
  );
  const [aadhaarLast4, setAadhaarLast4] = useState("8921");

  // Health Criteria Checkbox Checklist
  const [criteria, setCriteria] = useState({
    weightEligible: true,
    noTattoos6Months: true,
    noRecentSurgery: true,
    noAntibiotics14Days: true,
    noChronicIllness: true,
    properMealTaken: true,
  });

  // Home Booking Success State
  const [confirmedBooking, setConfirmedBooking] = useState<{
    bookingId: string;
    phlebotomistName: string;
    bloodBank: string;
    etaMinutes: number;
    kitId: string;
  } | null>(null);

  const bloodGroups: BloodGroup[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Bombay (hh)"];

  // Handle Home Donation Form Submit
  const handleHomeDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!criteria.noTattoos6Months || !criteria.noRecentSurgery || !criteria.noAntibiotics14Days) {
      toast.error("Eligibility Warning: Phlebotomist clinical protocol requires 6 months gap after tattoos/surgeries.");
      return;
    }

    const booking = {
      bookingId: `MED-BLD-${Math.floor(100000 + Math.random() * 900000)}`,
      phlebotomistName: "Nurse Ramesh Kumar (Certified Red Cross Phlebotomist, ID #RC-4821)",
      bloodBank: "Indian Red Cross Society Central Blood Center",
      etaMinutes: 28,
      kitId: "VAC-COLD-894-GEL",
    };

    setConfirmedBooking(booking);
    toast.success("Home Blood Donation Confirmed! Phlebotomist dispatched.");
  };

  // Trigger Emergency SOS Broadcast
  const handleTriggerBloodSOS = () => {
    setSosBroadcastActive(true);
    toast.error(`EMERGENCY SOS: Broadcasting urgent request for ${selectedBloodGroup} to 142 nearby registered voluntary donors!`, {
      duration: 6000,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20 font-sans">
      {/* HEADER HERO */}
      <div className="relative border-b border-slate-800 bg-gradient-to-b from-slate-900 via-rose-950/20 to-slate-950 px-4 sm:px-6 lg:px-8 pt-10 pb-8 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto space-y-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-3">
                <Droplets className="w-3.5 h-3.5 fill-rose-400" />
                <span>National Blood Transfusion Council (NBTC) &amp; Red Cross Network</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Emergency Blood Radar &amp; Home Donation Hub
              </h1>
              <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
                Real-time stock of rare blood groups across city blood banks, 1-click Emergency SOS broadcast, and certified phlebotomist home blood collection.
              </p>
            </div>

            {/* TAB SELECTOR */}
            <div className="flex items-center bg-slate-900 p-1.5 rounded-2xl border border-slate-800 self-start md:self-auto shadow-xl">
              <button
                onClick={() => setActiveTab("donate-home")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "donate-home"
                    ? "bg-rose-600 text-white shadow-lg shadow-rose-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                Donate Blood (Home Pickup) 🩸
              </button>

              <button
                onClick={() => setActiveTab("radar")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "radar"
                    ? "bg-rose-600 text-white shadow-lg shadow-rose-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Droplets className="w-3.5 h-3.5" />
                Live Blood Radar
              </button>

              <button
                onClick={() => setActiveTab("history")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "history"
                    ? "bg-rose-600 text-white shadow-lg shadow-rose-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                Donor Card
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* ================= TAB 1: DONATE BLOOD (HOME PICKUP PHLEBOTOMIST) ================= */}
        {activeTab === "donate-home" && (
          <div className="space-y-6">
            {confirmedBooking ? (
              /* BOOKING CONFIRMATION & LIVE PHLEBOTOMIST TRACKER */
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-emerald-500/80 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="space-y-6 relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                          Order Confirmed &bull; Booking ID: {confirmedBooking.bookingId}
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black text-white">
                          Certified Phlebotomist Dispatched to Your Home!
                        </h2>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <Button
                        onClick={() => setConfirmedBooking(null)}
                        variant="outline"
                        className="border-slate-700 hover:bg-slate-800 text-xs"
                      >
                        Book Another Donation
                      </Button>
                    </div>
                  </div>

                  {/* Phlebotomist Details Card */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                        <User className="w-4 h-4 text-cyan-400" />
                        <span>Assigned Phlebotomist</span>
                      </div>
                      <p className="text-sm font-bold text-white">
                        {confirmedBooking.phlebotomistName}
                      </p>
                      <p className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                        <BadgeCheck className="w-3.5 h-3.5" /> Red Cross &amp; NBTC Certified
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                        <Truck className="w-4 h-4 text-rose-400" />
                        <span>Cold-Box Kit &amp; Equipment</span>
                      </div>
                      <p className="text-sm font-bold text-white">
                        Kit #{confirmedBooking.kitId}
                      </p>
                      <p className="text-xs text-slate-300">
                        Vacuum Sealed 450ml CPD-A Bag + Ice-Gel Cold Transport Box (2°C–6°C)
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                        <Clock className="w-4 h-4 text-amber-400" />
                        <span>Live ETA to Your Home</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-amber-300">
                          {confirmedBooking.etaMinutes}
                        </span>
                        <span className="text-xs text-slate-400">Minutes</span>
                      </div>
                      <p className="text-xs text-emerald-400 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        Phlebotomist on motorcycle with GPS kit
                      </p>
                    </div>
                  </div>

                  {/* Procedure Instructions */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-2">
                    <h4 className="font-bold text-white flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-cyan-400" /> What to Expect When Phlebotomist Arrives:
                    </h4>
                    <ol className="list-decimal list-inside space-y-1 text-slate-400 leading-relaxed">
                      <li>The phlebotomist will verify your Government Photo ID (Aadhaar / Driving License).</li>
                      <li>They will do a quick 30-second digital fingerprick test for Hemoglobin (&gt;12.5 g/dL) and check your Blood Pressure.</li>
                      <li>Collection takes only 8–10 minutes using a sterile single-use needle. You will receive an apple juice box and energetic snack.</li>
                      <li>Your blood unit will be barcoded and transported in a temperature-logged cryo-box to Indian Red Cross Blood Bank.</li>
                    </ol>
                  </div>
                </div>
              </div>
            ) : (
              /* OFFICIAL HOME DONATION CLINICAL QUESTIONNAIRE */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Form on left (8 cols) */}
                <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        Phlebotomist Home Service
                      </span>
                      <span className="text-xs text-slate-400">Govt. Certified Blood Donor Intake Form</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white mt-1.5">
                      Request Blood Collection at Your Doorstep
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">
                      Can&apos;t travel to a blood bank? A certified phlebotomist from an accredited blood center will visit your home with sterile cold-box equipment to collect your voluntary donation.
                    </p>
                  </div>

                  <form onSubmit={handleHomeDonationSubmit} className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300">Donor Full Name</label>
                        <Input
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          placeholder="Your legal name"
                          className="bg-slate-950 border-slate-700 text-xs"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300">Mobile Number (OTP Verified)</label>
                        <Input
                          value={donorPhone}
                          onChange={(e) => setDonorPhone(e.target.value)}
                          placeholder="+91 Phone"
                          className="bg-slate-950 border-slate-700 text-xs"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300">Age (18 – 65 Years)</label>
                        <Input
                          type="number"
                          value={donorAge}
                          onChange={(e) => setDonorAge(e.target.value)}
                          min="18"
                          max="65"
                          className="bg-slate-950 border-slate-700 text-xs"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300">Weight in kg (Min 45 kg required)</label>
                        <Input
                          type="number"
                          value={donorWeight}
                          onChange={(e) => setDonorWeight(e.target.value)}
                          min="45"
                          className="bg-slate-950 border-slate-700 text-xs"
                          required
                        />
                      </div>
                    </div>

                    {/* Blood Group Selection */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-300">Select Your Blood Group</label>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {bloodGroups.map((bg) => (
                          <button
                            type="button"
                            key={bg}
                            onClick={() => setDonorBloodGroup(bg)}
                            className={`p-2.5 rounded-xl border text-xs font-bold transition-all ${
                              donorBloodGroup === bg
                                ? "bg-rose-600 border-rose-500 text-white shadow-md shadow-rose-600/30"
                                : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700"
                            }`}
                          >
                            {bg}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Preferred Slot & Address */}
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300">Preferred Collection Slot</label>
                        <select
                          value={selectedSlot}
                          onChange={(e) => setSelectedSlot(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500"
                        >
                          <option value="Today, 04:00 PM - 06:30 PM">Today, 04:00 PM - 06:30 PM (Evening)</option>
                          <option value="Tomorrow, 09:00 AM - 11:30 AM">Tomorrow, 09:00 AM - 11:30 AM (Morning - Best)</option>
                          <option value="Tomorrow, 02:00 PM - 04:30 PM">Tomorrow, 02:00 PM - 04:30 PM (Afternoon)</option>
                          <option value="Sunday, 10:00 AM - 01:00 PM">Sunday Weekend Camp, 10:00 AM - 01:00 PM</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                          <span>Home Pickup Address</span>
                          <span className="text-[10px] text-cyan-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> GPS Auto-Filled
                          </span>
                        </label>
                        <textarea
                          rows={2}
                          value={pickupAddress}
                          onChange={(e) => setPickupAddress(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500"
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300">
                          Aadhaar / Driving License (Last 4 Digits for Identity Card)
                        </label>
                        <Input
                          value={aadhaarLast4}
                          onChange={(e) => setAadhaarLast4(e.target.value)}
                          maxLength={4}
                          placeholder="e.g. 8921"
                          className="bg-slate-950 border-slate-700 text-xs w-48"
                          required
                        />
                      </div>
                    </div>

                    {/* MANDATORY MEDICAL ELIGIBILITY CHECKLIST */}
                    <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
                        <ShieldCheck className="w-4 h-4" /> Mandatory Clinical Pre-Screening (Govt of India Guidelines)
                      </div>

                      <div className="space-y-2 text-xs text-slate-300">
                        <label className="flex items-start gap-2.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={criteria.noTattoos6Months}
                            onChange={(e) =>
                              setCriteria((prev) => ({ ...prev, noTattoos6Months: e.target.checked }))
                            }
                            className="mt-0.5 rounded border-slate-700 text-rose-600 focus:ring-0"
                          />
                          <span>No tattoos, ear/body piercings, or dental extraction in the last 6 months.</span>
                        </label>

                        <label className="flex items-start gap-2.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={criteria.noRecentSurgery}
                            onChange={(e) =>
                              setCriteria((prev) => ({ ...prev, noRecentSurgery: e.target.checked }))
                            }
                            className="mt-0.5 rounded border-slate-700 text-rose-600 focus:ring-0"
                          />
                          <span>No major surgeries or blood transfusions received in the last 12 months.</span>
                        </label>

                        <label className="flex items-start gap-2.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={criteria.noAntibiotics14Days}
                            onChange={(e) =>
                              setCriteria((prev) => ({ ...prev, noAntibiotics14Days: e.target.checked }))
                            }
                            className="mt-0.5 rounded border-slate-700 text-rose-600 focus:ring-0"
                          />
                          <span>Not currently taking antibiotics or recovering from fever/flu in the last 14 days.</span>
                        </label>

                        <label className="flex items-start gap-2.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={criteria.properMealTaken}
                            onChange={(e) =>
                              setCriteria((prev) => ({ ...prev, properMealTaken: e.target.checked }))
                            }
                            className="mt-0.5 rounded border-slate-700 text-rose-600 focus:ring-0"
                          />
                          <span>I will take a light meal &amp; drink water 1–2 hours before phlebotomist arrival (Do not fast).</span>
                        </label>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-3.5 rounded-2xl shadow-xl shadow-rose-600/30 text-sm flex items-center justify-center gap-2"
                    >
                      <Home className="w-4 h-4" />
                      Confirm &amp; Dispatch Phlebotomist for Home Blood Collection
                    </Button>
                  </form>
                </div>

                {/* Right Info Box (4 cols) */}
                <div className="lg:col-span-4 space-y-4">
                  {/* How it Works Card */}
                  <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-rose-400" /> How Home Blood Donation Works
                    </h3>

                    <div className="space-y-3 text-xs text-slate-300">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs shrink-0">
                          1
                        </div>
                        <div>
                          <strong className="text-white block">Submit Screening Form</strong>
                          Fill your health checklist, blood group, and preferred time slot.
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs shrink-0">
                          2
                        </div>
                        <div>
                          <strong className="text-white block">Phlebotomist Arrives</strong>
                          Certified nurse arrives at your home with sterilized medical kit &amp; temperature cold-box.
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs shrink-0">
                          3
                        </div>
                        <div>
                          <strong className="text-white block">Painless 10-Min Draw</strong>
                          Vitals &amp; Hb verified on-the-spot. 350ml/450ml drawn painlessly.
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs shrink-0">
                          4
                        </div>
                        <div>
                          <strong className="text-white block">Save 3 Lives &amp; Get Card</strong>
                          Blood transported to Red Cross. Digital Donor Certificate issued instantly.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Impact Stats Card */}
                  <div className="p-5 rounded-3xl bg-gradient-to-br from-rose-950/40 to-slate-900 border border-rose-900/40 space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-rose-400">
                      <span>Medyora Home Pickup Network</span>
                      <span>Bengaluru Central</span>
                    </div>

                    <div className="text-2xl font-black text-white">
                      1,840+ Lives Saved
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Every single unit of blood you donate is separated into Red Blood Cells, Platelets, and Cryoprecipitate, saving up to 3 emergency trauma &amp; cancer patients.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 2: LIVE BLOOD RADAR & RARE GROUP MATCH ================= */}
        {activeTab === "radar" && (
          <div className="space-y-6">
            {/* SEARCH & BLOOD GROUP SELECTOR */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-rose-400 fill-rose-400" /> Geofenced Blood Inventory Radar
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Real-time stock verified directly with accredited Blood Centers via NBTC IoT API.
                  </p>
                </div>

                {/* EMERGENCY SOS BROADCAST TRIGGER */}
                <Button
                  onClick={handleTriggerBloodSOS}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-lg shadow-red-600/30 flex items-center gap-2"
                >
                  <AlertTriangle className="w-4 h-4 animate-bounce" />
                  Trigger Urgent Blood SOS Broadcast
                </Button>
              </div>

              {/* Blood group selection row */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
                  Filter Blood Group:
                </span>
                {bloodGroups.map((bg) => {
                  const isSelected = selectedBloodGroup === bg;
                  return (
                    <button
                      key={bg}
                      onClick={() => setSelectedBloodGroup(bg)}
                      className={`px-3.5 py-1.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
                        isSelected
                          ? "bg-rose-600 text-white shadow-md shadow-rose-600/30 ring-2 ring-rose-400/30"
                          : "bg-slate-800/80 text-slate-300 hover:bg-slate-750"
                      }`}
                    >
                      {bg}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SOS Active Banner */}
            {sosBroadcastActive && (
              <div className="p-4 rounded-2xl bg-red-950/80 border-2 border-red-500 shadow-xl text-xs space-y-2 animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-red-200">
                    <AlertTriangle className="w-4 h-4 text-yellow-300" />
                    <span>EMERGENCY SOS BROADCAST ACTIVE FOR {selectedBloodGroup}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSosBroadcastActive(false)}
                    className="text-white hover:bg-red-900/50 text-[11px] h-7"
                  >
                    Cancel Broadcast
                  </Button>
                </div>
                <p className="text-red-300">
                  Transmitted urgent push notifications and SMS to 142 registered voluntary donors within 8 km of Bellandur.
                  First 3 responsive donors are connecting with hospital blood bank coordinator.
                </p>
              </div>
            )}

            {/* BLOOD BANKS CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {BLOOD_BANKS_DATA.map((bb) => {
                const units = bb.stock[selectedBloodGroup] || 0;
                const isLowStock = units <= 2;
                return (
                  <div
                    key={bb.id}
                    className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all space-y-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                            {bb.type}
                          </span>
                          {bb.isOpen24x7 && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              24×7 Available
                            </span>
                          )}
                        </div>
                        <h4 className="text-base font-bold text-white mt-1.5">{bb.name}</h4>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span>{bb.location} ({bb.distanceKm} km away)</span>
                        </p>
                      </div>

                      {/* Stock badge */}
                      <div className="text-right shrink-0">
                        <div
                          className={`text-2xl font-black ${
                            units === 0
                              ? "text-red-500"
                              : isLowStock
                              ? "text-amber-400"
                              : "text-emerald-400"
                          }`}
                        >
                          {units} <span className="text-xs font-normal text-slate-400">units</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {selectedBloodGroup} Stock
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-500">Updated: {bb.lastVerified}</span>

                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${bb.phone}`}
                          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold flex items-center gap-1.5 transition-all text-xs"
                        >
                          <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                          Call Bank
                        </a>

                        <Button
                          size="sm"
                          onClick={() => {
                            toast.success(`Reserved 1 unit of ${selectedBloodGroup} at ${bb.name} for 2 hours! Hospital slip generated.`);
                          }}
                          className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
                        >
                          Hold / Reserve Unit
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= TAB 3: DIGITAL DONOR CARD & BADGES ================= */}
        {activeTab === "history" && (
          <div className="max-w-2xl mx-auto space-y-6">
            {/* DIGITAL DONOR CARD */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-tr from-rose-950 via-slate-900 to-red-950 border-2 border-rose-500/40 shadow-2xl relative overflow-hidden text-white">
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-rose-900/50 pb-4">
                <div className="flex items-center gap-2">
                  <Droplets className="w-6 h-6 text-rose-400 fill-rose-400" />
                  <span className="text-sm font-black tracking-wider uppercase">
                    Medyora &bull; National Donor Registry
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Active Voluntary Donor
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 my-6">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Donor Name</span>
                  <div className="text-lg font-black mt-0.5">{donorName}</div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Blood Group</span>
                  <div className="text-3xl font-black text-rose-400 mt-0.5">{donorBloodGroup}</div>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Donor ID</span>
                  <div className="text-xs font-mono font-bold text-slate-300 mt-0.5">MY-BLD-8921-KA</div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Next Donation Eligible</span>
                  <div className="text-xs font-bold text-emerald-400 mt-0.5">Eligible Now</div>
                </div>
              </div>

              <div className="pt-4 border-t border-rose-900/50 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">Authorized by Red Cross Society</span>
                <span className="text-rose-300 font-bold flex items-center gap-1">
                  <Award className="w-4 h-4 text-amber-400" /> Silver Lifesaver Tier
                </span>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center justify-center gap-3">
              <Button
                variant="outline"
                onClick={() => toast.success("Donor Card downloaded as high-res PDF!")}
                className="border-slate-700 hover:bg-slate-800 text-xs"
              >
                <FileText className="w-3.5 h-3.5 mr-1.5" /> Download Digital Card
              </Button>
              <Button
                onClick={() => setActiveTab("donate-home")}
                className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold"
              >
                <Home className="w-3.5 h-3.5 mr-1.5" /> Schedule Home Pickup
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
