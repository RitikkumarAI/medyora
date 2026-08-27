import { useState, useEffect } from "react";
import { Link, useRouter, useParams } from "@tanstack/react-router";
import { 
  ArrowLeft, CalendarDays, Clock, MapPin, CheckCircle2, User, 
  Video, Home, Ticket, AlertCircle, X, Repeat, MessageSquare, 
  Send, Sparkles, ShieldCheck, HeartPulse, CreditCard, Wallet, 
  Phone, Users, Info, Bell, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DOCTORS } from "@/shared/data/mock";
import { addAppointment, createAppointment } from "@/shared/data/patient-store";
import { toast } from "sonner";

type ConsultType = "clinic" | "video" | "home";
type BookingStep = "patient" | "type" | "datetime" | "payment" | "success" | "failed";
type BookedFor = "self" | "other";

export function BookingFlow() {
  const router = useRouter();
  const { doctorId } = useParams({ strict: false }) as { doctorId?: string };
  const doctor = (DOCTORS.find(d => d.id === doctorId) || DOCTORS[0])!;

  const [step, setStep] = useState<BookingStep>("patient");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showManageSheet, setShowManageSheet] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

  // 1. Patient Selection
  const [bookedFor, setBookedFor] = useState<BookedFor>("self");
  const [selfData] = useState({
    name: "Rahul Kumar",
    age: 28,
    gender: "Male",
    phone: "+91 98765 43210",
    medicalHistory: "None",
    problemDescription: "Routine health consultation",
  });

  const [otherPatient, setOtherPatient] = useState({
    name: "Sunita Kumar",
    relation: "Mother",
    age: "58",
    gender: "Female",
    city: doctor.city || "Bengaluru",
    phone: "+91 98765 12345",
    medicalHistory: "Hypertension, Mild Diabetes",
    problemDescription: "Chest discomfort and shortness of breath since 2 days",
  });

  // 2. Consultation & Slot
  const [consultType, setConsultType] = useState<ConsultType>("clinic");
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<string>("10:00 AM");

  // 3. Payment Mode
  const [paymentMode, setPaymentMode] = useState<"online" | "pay_at_clinic">("online");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");

  // 4. Result Data
  const [generatedToken, setGeneratedToken] = useState<string>("#14");
  const [bookingRef, setBookingRef] = useState<string>("MC-8F4K29");

  const dates = [
    { day: "Today", date: "27", month: "Aug", fullDate: "27 Aug 2026" },
    { day: "Tomorrow", date: "28", month: "Aug", fullDate: "28 Aug 2026" },
    { day: "Fri", date: "29", month: "Aug", fullDate: "29 Aug 2026" },
    { day: "Sat", date: "30", month: "Aug", fullDate: "30 Aug 2026" },
    { day: "Sun", date: "31", month: "Aug", fullDate: "31 Aug 2026" },
  ];

  const timeSlots = {
    Morning: ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:30 AM"],
    Afternoon: ["12:30 PM", "02:00 PM", "03:30 PM", "04:30 PM"],
    Evening: ["05:30 PM", "06:30 PM", "07:30 PM", "08:00 PM"]
  };

  // Pricing calculations
  const baseFee = consultType === "video" 
    ? Math.round(doctor.fee * 0.8) 
    : consultType === "home" 
      ? doctor.fee + 500 
      : doctor.fee;
  
  const taxes = 45;
  const onlineDiscount = paymentMode === "online" ? 100 : 0;
  const finalAmount = Math.max(0, baseFee + taxes - onlineDiscount);

  const activePatientName = bookedFor === "self" ? selfData.name : otherPatient.name || "Patient";
  const activePatientRelation = bookedFor === "self" ? "Self" : otherPatient.relation || "Relative";

  const handleConfirmBooking = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const tokenNo = `#${Math.floor(Math.random() * 15) + 10}`;
      const ref = `MC-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setGeneratedToken(tokenNo);
      setBookingRef(ref);

      // Save into patient store
      const activeDate = dates[selectedDateIndex]?.fullDate || "27 Aug 2026";
      const newApt = createAppointment({
        doctorId: doctor.id,
        doctorName: doctor.fullName,
        speciality: doctor.speciality,
        clinic: doctor.clinic.name,
        city: doctor.city,
        date: activeDate,
        time: selectedTime || "10:00 AM",
        amount: finalAmount,
        patient: activePatientName,
        image: doctor.image,
        visitType: consultType === "home" ? "home" : "clinic",
        reference: ref,
        bookedFor,
        patientDetails: {
          name: activePatientName,
          age: bookedFor === "self" ? selfData.age : Number(otherPatient.age || 0),
          gender: bookedFor === "self" ? selfData.gender : otherPatient.gender,
          relation: activePatientRelation,
          medicalHistory: bookedFor === "self" ? selfData.medicalHistory : otherPatient.medicalHistory,
          problemDescription: bookedFor === "self" ? selfData.problemDescription : otherPatient.problemDescription,
          phone: bookedFor === "self" ? selfData.phone : otherPatient.phone,
        },
        paymentMode,
        discount: onlineDiscount,
        whatsappNotified: true,
      });

      addAppointment(newApt);
      setStep("success");
      toast.success(`Appointment Confirmed! Token ${tokenNo}`);
    }, 1200);
  };

  const selectedDateObj = dates[selectedDateIndex] || dates[0]!;

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
      
      {/* Header */}
      {step !== "success" && step !== "failed" && (
        <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 pt-6 pb-3 shadow-xs border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => {
              if (step === "patient") router.history.back();
              if (step === "type") setStep("patient");
              if (step === "datetime") setStep("type");
              if (step === "payment") setStep("datetime");
            }} className="h-10 w-10 shrink-0 bg-slate-50 dark:bg-slate-800 rounded-full border border-slate-100 dark:border-slate-700">
              <ArrowLeft className="h-5 w-5 text-slate-700 dark:text-slate-200" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">Book Appointment</h1>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">{doctor.fullName}</p>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex items-center gap-1.5">
            <span className={`h-2 w-6 rounded-full transition-colors ${step === 'patient' ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'}`} />
            <span className={`h-2 w-6 rounded-full transition-colors ${step === 'type' || step === 'datetime' ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'}`} />
            <span className={`h-2 w-6 rounded-full transition-colors ${step === 'payment' ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'}`} />
          </div>
        </header>
      )}

      <main className="flex-1 overflow-y-auto pb-28">
        
        {/* ================= STEP 1: PATIENT SELECTION (SELF VS ANOTHER PERSON) ================= */}
        {step === "patient" && (
          <div className="p-4 sm:p-6 space-y-6 animate-in slide-in-from-right-4">
            
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Who is this appointment for?</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Select yourself or fill in details for a family member or friend</p>
            </div>

            {/* Selection Cards */}
            <div className="grid grid-cols-2 gap-3">
              {/* Option 1: Myself */}
              <div 
                onClick={() => setBookedFor("self")}
                className={`p-4 rounded-3xl border-2 transition-all cursor-pointer relative overflow-hidden ${
                  bookedFor === "self" 
                    ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 shadow-md shadow-blue-600/10" 
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`h-11 w-11 rounded-2xl flex items-center justify-center ${bookedFor === "self" ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                    <User className="h-5 w-5" />
                  </div>
                  {bookedFor === "self" && <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">For Myself</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Use your saved profile</p>
              </div>

              {/* Option 2: Someone Else */}
              <div 
                onClick={() => setBookedFor("other")}
                className={`p-4 rounded-3xl border-2 transition-all cursor-pointer relative overflow-hidden ${
                  bookedFor === "other" 
                    ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 shadow-md shadow-blue-600/10" 
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`h-11 w-11 rounded-2xl flex items-center justify-center ${bookedFor === "other" ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                    <Users className="h-5 w-5" />
                  </div>
                  {bookedFor === "other" && <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Someone Else</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Mother, Father, Friend...</p>
              </div>
            </div>

            {/* FORM: For Myself Preview */}
            {bookedFor === "self" && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-xs space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center text-sm">
                      RK
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{selfData.name}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{selfData.gender}, {selfData.age} yrs • {selfData.phone}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full">
                    Primary Profile
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Your registered medical ID will be automatically linked to this booking.</p>
              </div>
            )}

            {/* FORM: For Someone Else (Detailed Inputs) */}
            {bookedFor === "other" && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-xs space-y-4 animate-in fade-in">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <HeartPulse className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Patient Information</h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Patient Full Name *</label>
                    <Input 
                      placeholder="e.g. Sunita Kumar"
                      value={otherPatient.name}
                      onChange={(e) => setOtherPatient(prev => ({ ...prev, name: e.target.value }))}
                      className="rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 h-11 text-sm font-medium text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Relationship *</label>
                    <select
                      value={otherPatient.relation}
                      onChange={(e) => setOtherPatient(prev => ({ ...prev, relation: e.target.value }))}
                      className="w-full rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 h-11 px-3 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white"
                    >
                      <option value="Mother">Mother</option>
                      <option value="Father">Father</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Child">Child / Kid</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Friend">Friend</option>
                      <option value="Other">Other Relative</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Patient Age *</label>
                    <Input 
                      type="number"
                      placeholder="e.g. 58"
                      value={otherPatient.age}
                      onChange={(e) => setOtherPatient(prev => ({ ...prev, age: e.target.value }))}
                      className="rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 h-11 text-sm font-medium text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Gender *</label>
                    <select
                      value={otherPatient.gender}
                      onChange={(e) => setOtherPatient(prev => ({ ...prev, gender: e.target.value }))}
                      className="w-full rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 h-11 px-3 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Patient City / Location</label>
                    <Input 
                      placeholder="e.g. Bengaluru"
                      value={otherPatient.city}
                      onChange={(e) => setOtherPatient(prev => ({ ...prev, city: e.target.value }))}
                      className="rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 h-11 text-sm font-medium text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="col-span-2 space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Past Medical History / Existing Illnesses</label>
                    <Input 
                      placeholder="e.g. Diabetes, High Blood Pressure, Heart Stent, None"
                      value={otherPatient.medicalHistory}
                      onChange={(e) => setOtherPatient(prev => ({ ...prev, medicalHistory: e.target.value }))}
                      className="rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 h-11 text-sm font-medium text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="col-span-2 space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Problem / Reason for Consultation *</label>
                    <Textarea 
                      rows={3}
                      placeholder="Describe what symptoms the patient is experiencing (e.g. chest heaviness, breathlessness since 2 days)..."
                      value={otherPatient.problemDescription}
                      onChange={(e) => setOtherPatient(prev => ({ ...prev, problemDescription: e.target.value }))}
                      className="rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            <Button 
              onClick={() => setStep("type")} 
              disabled={bookedFor === "other" && (!otherPatient.name || !otherPatient.problemDescription)}
              className="w-full h-14 rounded-2xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-600/25"
            >
              Continue to Consultation Type
            </Button>
          </div>
        )}

        {/* ================= STEP 2: CONSULTATION TYPE ================= */}
        {step === "type" && (
          <div className="p-4 sm:p-6 space-y-4 animate-in slide-in-from-right-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Select Consultation Mode</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Choose how you'd like the consultation to take place</p>
            </div>

            <div className="space-y-3">
              {/* Clinic Visit */}
              <div 
                onClick={() => setConsultType("clinic")}
                className={`p-4 rounded-3xl border-2 transition-all cursor-pointer ${consultType === "clinic" ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 shadow-md shadow-blue-600/10' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900'}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 ${consultType === "clinic" ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-slate-900 dark:text-white">In-Clinic Visit</h3>
                      <span className="font-black text-blue-600 dark:text-blue-400 text-base">₹{doctor.fee}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1">{doctor.clinic.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{doctor.clinic.address}, {doctor.clinic.city}</p>
                  </div>
                </div>
              </div>

              {/* Video Consult */}
              <div 
                onClick={() => setConsultType("video")}
                className={`p-4 rounded-3xl border-2 transition-all cursor-pointer ${consultType === "video" ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 shadow-md shadow-blue-600/10' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900'}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 ${consultType === "video" ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                    <Video className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-slate-900 dark:text-white">Online Video Consultation</h3>
                      <span className="font-black text-blue-600 dark:text-blue-400 text-base">₹{Math.round(doctor.fee * 0.8)}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">High quality encrypted video call with digital prescription</p>
                    <span className="inline-block mt-2 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                      20% Lower Fee
                    </span>
                  </div>
                </div>
              </div>

              {/* Home Visit */}
              {doctor.homeVisit && (
                <div 
                  onClick={() => setConsultType("home")}
                  className={`p-4 rounded-3xl border-2 transition-all cursor-pointer ${consultType === "home" ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 shadow-md shadow-blue-600/10' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900'}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 ${consultType === "home" ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                      <Home className="h-6 w-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-slate-900 dark:text-white">Doctor Home Visit</h3>
                        <span className="font-black text-blue-600 dark:text-blue-400 text-base">₹{doctor.fee + 500}</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Doctor visits patient at their home/locality in {doctor.city}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Button onClick={() => setStep("datetime")} className="w-full h-14 rounded-2xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-600/25 mt-6">
              Continue to Date & Time
            </Button>
          </div>
        )}

        {/* ================= STEP 3: DATE & TIME ================= */}
        {step === "datetime" && (
          <div className="animate-in slide-in-from-right-4">
            <div className="p-4 sm:p-6 pb-2">
              <h2 className="text-xl font-black text-slate-900 dark:text-white mb-1">Select Date</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-4">Choose consultation date</p>
              
              <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-2">
                {dates.map((d, i) => (
                  <button 
                    key={i}
                    onClick={() => setSelectedDateIndex(i)}
                    className={`shrink-0 w-[78px] h-[92px] rounded-2xl flex flex-col items-center justify-center border-2 transition-all ${
                      selectedDateIndex === i 
                        ? 'border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/25 scale-[1.02]' 
                        : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 hover:border-slate-200 dark:hover:border-slate-700'
                    }`}
                  >
                    <span className={`text-[11px] font-bold uppercase mb-0.5 ${selectedDateIndex === i ? 'text-blue-100' : 'text-slate-400'}`}>{d.day}</span>
                    <span className={`text-2xl font-black ${selectedDateIndex === i ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{d.date}</span>
                    <span className={`text-[10px] font-bold ${selectedDateIndex === i ? 'text-blue-200' : 'text-slate-400'}`}>{d.month}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div className="p-5 bg-white dark:bg-slate-900 rounded-t-[36px] mt-4 border-t border-slate-100 dark:border-slate-800 min-h-[380px] shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Available Time Slots</h2>
              
              <div className="space-y-5">
                {Object.entries(timeSlots).map(([period, slots]) => (
                  <div key={period}>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">{period}</h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                      {slots.map(time => (
                        <button 
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                            selectedTime === time 
                              ? 'border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                              : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <Button 
                disabled={!selectedTime}
                onClick={() => setStep("payment")} 
                className="w-full h-14 rounded-2xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-600/25 mt-8 disabled:opacity-50"
              >
                Continue to Payment
              </Button>
            </div>
          </div>
        )}

        {/* ================= STEP 4: PAYMENT OPTIONS (ONLINE DISCOUNT VS PAY AT CLINIC) ================= */}
        {step === "payment" && (
          <div className="p-4 sm:p-6 space-y-5 animate-in slide-in-from-right-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">Choose Payment Method</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Prepay online to save ₹100 instantly, or pay in cash at clinic</p>
            </div>

            {/* Payment Method Cards */}
            <div className="space-y-3">
              
              {/* Option 1: Pay Online with Discount */}
              <div 
                onClick={() => setPaymentMode("online")}
                className={`p-4 rounded-3xl border-2 transition-all cursor-pointer relative overflow-hidden ${
                  paymentMode === "online" 
                    ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 shadow-md shadow-blue-600/10" 
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300"
                }`}
              >
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-white px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                    <Sparkles className="h-3 w-3" /> Save ₹100
                  </span>
                </div>

                <div className="flex items-start gap-3.5 pr-20">
                  <div className={`h-11 w-11 rounded-2xl flex items-center justify-center shrink-0 ${paymentMode === "online" ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}>
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">Pay Online Now</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">UPI, GPay, PhonePe, Cards, NetBanking</p>
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1.5 flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" /> Instant ₹100 Prepaid Discount Applied
                    </p>
                  </div>
                </div>

                {paymentMode === "online" && (
                  <div className="mt-4 pt-3 border-t border-blue-100 dark:border-slate-800 flex gap-2">
                    <button 
                      onClick={() => setPaymentMethod("upi")}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${paymentMethod === "upi" ? "bg-blue-600 text-white border-blue-600" : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"}`}
                    >
                      UPI / QR
                    </button>
                    <button 
                      onClick={() => setPaymentMethod("card")}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${paymentMethod === "card" ? "bg-blue-600 text-white border-blue-600" : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"}`}
                    >
                      Debit / Credit Card
                    </button>
                    <button 
                      onClick={() => setPaymentMethod("netbanking")}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${paymentMethod === "netbanking" ? "bg-blue-600 text-white border-blue-600" : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700"}`}
                    >
                      Net Banking
                    </button>
                  </div>
                )}
              </div>

              {/* Option 2: Pay at Clinic */}
              <div 
                onClick={() => setPaymentMode("pay_at_clinic")}
                className={`p-4 rounded-3xl border-2 transition-all cursor-pointer relative ${
                  paymentMode === "pay_at_clinic" 
                    ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 shadow-md shadow-blue-600/10" 
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className={`h-11 w-11 rounded-2xl flex items-center justify-center shrink-0 ${paymentMode === "pay_at_clinic" ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}>
                    <Wallet className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">Pay at Clinic Counter</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Pay via Cash / Card when you arrive for consultation</p>
                    <p className="text-xs font-bold text-slate-600 dark:text-slate-400 mt-1.5">No advance fee charged right now</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Summary Breakdown */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Bill Summary</h3>
              
              <div className="space-y-2 text-sm font-medium">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Consultation Fee</span>
                  <span>₹{baseFee}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Hospital & Platform Charges</span>
                  <span>₹{taxes}</span>
                </div>
                {paymentMode === "online" && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                    <span>Prepaid Online Discount</span>
                    <span>-₹100</span>
                  </div>
                )}
                
                <div className="flex justify-between font-black text-slate-900 dark:text-white pt-3 border-t border-slate-100 dark:border-slate-800 text-base">
                  <span>{paymentMode === "online" ? "Total Amount to Pay" : "Total Due at Clinic"}</span>
                  <span className="text-blue-600 dark:text-blue-400 text-xl">₹{finalAmount}</span>
                </div>
              </div>

              {/* Patient info preview */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
                <span>Booked for: <strong className="text-slate-800 dark:text-slate-200">{activePatientName} ({activePatientRelation})</strong></span>
                <span>{selectedDateObj.day}, {selectedTime}</span>
              </div>
            </div>

            <Button 
              onClick={handleConfirmBooking} 
              disabled={isProcessing}
              className="w-full h-14 rounded-2xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-600/25"
            >
              {isProcessing 
                ? "Securing Appointment..." 
                : paymentMode === "online" 
                  ? `Pay ₹${finalAmount} & Confirm Token` 
                  : "Confirm Booking (Pay at Clinic)"}
            </Button>
          </div>
        )}

        {/* ================= STEP 5: SUCCESS & LIVE TOKEN & WHATSAPP PREVIEW ================= */}
        {step === "success" && (
          <div className="p-4 sm:p-6 space-y-6 animate-in fade-in zoom-in-95 duration-400">
            
            {/* Top Confirmed Badge */}
            <div className="text-center pt-2">
              <div className="inline-flex h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 items-center justify-center mb-3 shadow-inner">
                <CheckCircle2 className="h-9 w-9" />
              </div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">Appointment Confirmed!</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Ref: <strong>{bookingRef}</strong> • Confirmed with clinic</p>
            </div>

            {/* LIVE TOKEN CARD */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-[36px] p-6 shadow-xl relative overflow-hidden text-center">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Ticket className="h-36 w-36" />
              </div>
              
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-bold tracking-wider uppercase mb-2">
                  Live Queue Token
                </span>
                
                <p className="text-6xl font-black tracking-tight my-2 text-white drop-shadow-xs">
                  {generatedToken}
                </p>

                <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-2 gap-3 text-left">
                  <div>
                    <p className="text-[11px] text-blue-100 font-medium">Doctor</p>
                    <p className="font-bold text-sm text-white truncate">{doctor.fullName}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-blue-100 font-medium">Scheduled For</p>
                    <p className="font-bold text-sm text-white">{selectedDateObj.day}, {selectedTime}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-blue-100 font-medium">Patient</p>
                    <p className="font-bold text-sm text-white truncate">{activePatientName} ({activePatientRelation})</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-blue-100 font-medium">Payment</p>
                    <p className="font-bold text-sm text-emerald-300">
                      {paymentMode === "online" ? `Prepaid (₹${finalAmount})` : `Pay at Clinic (₹${finalAmount})`}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* WHATSAPP NOTIFICATION PREVIEW CARD */}
            <div className="bg-emerald-50 dark:bg-emerald-950/40 rounded-3xl p-5 border border-emerald-200 dark:border-emerald-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-emerald-950 dark:text-emerald-200">WhatsApp Confirmation Sent</h3>
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">Sent to registered mobile number</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowWhatsAppModal(true)}
                  className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700 px-3 py-1.5 rounded-xl hover:bg-emerald-100 transition-colors"
                >
                  View Message
                </button>
              </div>

              {/* Message Box */}
              <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-emerald-100 dark:border-emerald-900/60 text-xs text-slate-700 dark:text-slate-300 space-y-1.5 leading-relaxed">
                <p className="font-bold text-slate-900 dark:text-white">
                  🏥 MediConnect Appointment Confirmed
                </p>
                <p>
                  Hello <strong>{activePatientName}</strong>, your appointment is confirmed with <strong>{doctor.fullName}</strong> at <strong>{doctor.clinic.name}</strong> for <strong>{selectedDateObj.day}, {selectedTime}</strong>.
                </p>
                <div className="bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 p-2 rounded-xl text-amber-900 dark:text-amber-200 font-bold flex items-center gap-2 mt-2">
                  <Info className="h-4 w-4 text-amber-600 shrink-0" />
                  <span>Please arrive 15 minutes before your scheduled appointment time.</span>
                </div>
              </div>

              {/* Hourly Reminder Notice */}
              <div className="flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-300 font-medium pt-1">
                <Bell className="h-3.5 w-3.5 text-emerald-600" />
                <span>You will receive hourly countdown reminders & live queue updates.</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <Link
                to="/patient/queue"
                className="w-full h-14 rounded-2xl bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2"
              >
                Track Live Clinic Queue
              </Link>
              <Link
                to="/patient/appointments"
                className="w-full h-14 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm shadow-xs flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                View My Appointments
              </Link>
            </div>

          </div>
        )}

      </main>

      {/* WhatsApp Modal Simulation */}
      {showWhatsAppModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-[#ECE5DD] dark:bg-slate-900 w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in-95 border border-slate-300 dark:border-slate-800">
            {/* WhatsApp Header */}
            <div className="bg-[#075E54] dark:bg-emerald-950 text-white p-4 flex items-center justify-between border-b border-emerald-800">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-emerald-700 flex items-center justify-center font-bold text-sm">
                  MC
                </div>
                <div>
                  <h4 className="font-bold text-sm">MediConnect Alerts</h4>
                  <p className="text-[10px] text-emerald-200">Official Healthcare Account</p>
                </div>
              </div>
              <button onClick={() => setShowWhatsAppModal(false)} className="text-white hover:text-emerald-200">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 space-y-3 max-h-[360px] overflow-y-auto">
              <div className="bg-white dark:bg-slate-850 p-3.5 rounded-2xl rounded-tl-sm shadow-xs text-xs text-slate-800 dark:text-slate-200 space-y-2 border border-slate-200 dark:border-slate-750">
                <p className="font-bold text-emerald-800 dark:text-emerald-400 text-sm">✅ Appointment Confirmed!</p>
                <p>Dear <strong>{activePatientName}</strong>,</p>
                <p>Your appointment has been successfully scheduled:</p>
                <div className="bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl space-y-1 font-medium text-[11px]">
                  <p>👨‍⚕️ <strong>Doctor:</strong> {doctor.fullName} ({doctor.speciality})</p>
                  <p>📍 <strong>Clinic:</strong> {doctor.clinic.name}, {doctor.clinic.city}</p>
                  <p>🗓️ <strong>Date & Time:</strong> {selectedDateObj.day}, {selectedTime}</p>
                  <p>🎟️ <strong>Live Token:</strong> {generatedToken}</p>
                  <p>💳 <strong>Payment:</strong> {paymentMode === "online" ? `Paid Online (₹${finalAmount})` : `Pay at Clinic (₹${finalAmount})`}</p>
                </div>
                <div className="bg-amber-50 dark:bg-amber-950/60 p-2 rounded-lg text-amber-900 dark:text-amber-200 font-bold text-[11px]">
                  ⚠️ Note: Please arrive 15 minutes before your scheduled appointment.
                </div>
                <p className="text-[10px] text-slate-400 text-right">Just now • Delivered</p>
              </div>

              {/* Simulated Reminder */}
              <div className="bg-white dark:bg-slate-850 p-3 rounded-2xl rounded-tl-sm shadow-xs text-xs text-slate-800 dark:text-slate-200 space-y-1 border border-slate-200 dark:border-slate-750">
                <p className="font-bold text-blue-700 dark:text-blue-400">⏰ Automated Reminder</p>
                <p className="text-[11px]">Next reminder will trigger 1 hour before appointment with live queue token call status.</p>
                <p className="text-[10px] text-slate-400 text-right">Scheduled</p>
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
              <Button onClick={() => setShowWhatsAppModal(false)} className="w-full rounded-xl bg-[#075E54] dark:bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs h-10">
                Close Preview
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
