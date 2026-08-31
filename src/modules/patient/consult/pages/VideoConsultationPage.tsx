import { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { 
  ArrowLeft, Video, PhoneCall, Mic, MicOff, VideoOff, 
  MessageSquare, FileText, Download, X, Clock, CheckCircle2, 
  ShieldCheck, AlertCircle, Sparkles, Star, Users, Play,
  Zap, Calendar, Lock, HeartPulse, Stethoscope
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { VIDEO_CONSULTATIONS, type VideoConsultation } from "@/shared/data/superapp-mock";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const INSTANT_SPECIALITIES = [
  {
    id: "general-physician",
    name: "General Physician",
    tagline: "Fever, Cold, Cough & Viral",
    price: 299,
    waitMin: 2,
    icon: "🩺",
    color: "from-blue-500/10 to-indigo-500/10 border-blue-200 dark:border-blue-800",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80",
    doctor: "Dr. Rajesh Sharma (12+ Yrs Exp)"
  },
  {
    id: "gynaecologist",
    name: "Gynaecologist",
    tagline: "Periods, PCOD, Pregnancy & Cramps",
    price: 449,
    waitMin: 3,
    icon: "🌸",
    color: "from-rose-500/10 to-pink-500/10 border-rose-200 dark:border-rose-800",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=300&q=80",
    doctor: "Dr. Neha Verma (10+ Yrs Exp)"
  },
  {
    id: "dermatologist",
    name: "Dermatologist",
    tagline: "Acne, Hairfall, Rashes & Skin Care",
    price: 499,
    waitMin: 4,
    icon: "✨",
    color: "from-purple-500/10 to-violet-500/10 border-purple-200 dark:border-purple-800",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80",
    doctor: "Dr. Amit Patel (8+ Yrs Exp)"
  },
  {
    id: "pediatrician",
    name: "Child Specialist (Pediatrician)",
    tagline: "Child Fever, Vaccination & Colic",
    price: 399,
    waitMin: 3,
    icon: "👶",
    color: "from-amber-500/10 to-orange-500/10 border-amber-200 dark:border-amber-800",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80",
    doctor: "Dr. Anjali Mehta (9+ Yrs Exp)"
  },
  {
    id: "psychiatrist",
    name: "Psychiatrist & Therapy",
    tagline: "Anxiety, Stress, Sleep & Depression",
    price: 599,
    waitMin: 5,
    icon: "🧠",
    color: "from-emerald-500/10 to-teal-500/10 border-emerald-200 dark:border-emerald-800",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80",
    doctor: "Dr. Vikram Mehta (15+ Yrs Exp)"
  },
  {
    id: "gastroenterologist",
    name: "Gastroenterologist",
    tagline: "Acidity, Gas, Stomach Pain & GERD",
    price: 499,
    waitMin: 4,
    icon: "🫁",
    color: "from-cyan-500/10 to-sky-500/10 border-cyan-200 dark:border-cyan-800",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=300&q=80",
    doctor: "Dr. Kavita Reddy (11+ Yrs Exp)"
  }
];

export function VideoConsultationPage() {
  const router = useRouter();
  const [activeCall, setActiveCall] = useState<VideoConsultation | null>(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [selectedSpeciality, setSelectedSpeciality] = useState<typeof INSTANT_SPECIALITIES[0] | null>(null);

  const upcomingConsultations = VIDEO_CONSULTATIONS.filter((c) => c.status === "upcoming");
  const pastConsultations = VIDEO_CONSULTATIONS.filter((c) => c.status === "completed");

  const handleJoinCall = (consult: VideoConsultation) => {
    setActiveCall(consult);
    toast.success(`Connecting to secure encrypted room with ${consult.doctorName}...`);
  };

  const handleStartInstantConsult = (spec: (typeof INSTANT_SPECIALITIES)[0]) => {
    if (!spec) return;
    const instantCall: VideoConsultation = {
      id: `instant-${Date.now()}`,
      doctorId: "dr-instant",
      doctorName: spec.doctor,
      doctorImage: spec.image,
      speciality: spec.name,
      qualification: "Senior Specialist (MD/MS)",
      fee: spec.price,
      meetingId: `meet-${Date.now()}`,
      hasPrescription: false,
      appointmentDate: "Today",
      appointmentTime: "Connecting Now",
      status: "upcoming",
      roomUrl: "https://meet.medyora.live/room-secure",
      prescriptionAvailable: false,
    };
    setActiveCall(instantCall);
    toast.success(`Connecting you to ${spec.doctor}. Please grant camera & microphone access.`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20 font-sans transition-colors">
      
      {/* ================= DESKTOP & MOBILE HERO BANNER ================= */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid grid-cols-12 gap-8 items-center">
            
            <div className="col-span-12 lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold">
                <Zap className="h-3.5 w-3.5 text-blue-400 animate-pulse" />
                <span>Instant Video Consult in 2 Minutes</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Consult India's Top Verified Doctors <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-teal-300 bg-clip-text text-transparent">
                  From Comfort of Your Home
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                Connect with verified Specialists 24/7 over encrypted HD video calls. Receive official digital prescription with dosage instructions immediately after consultation.
              </p>

              {/* 3 Core Guarantees */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <Clock className="h-4 w-4 text-emerald-400 mb-1" />
                  <p className="text-xs font-black">2 Mins Connect</p>
                  <p className="text-[10px] text-slate-400">Doctor ready now</p>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <ShieldCheck className="h-4 w-4 text-blue-400 mb-1" />
                  <p className="text-xs font-black">100% Private</p>
                  <p className="text-[10px] text-slate-400">End-to-end encrypted</p>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
                  <HeartPulse className="h-4 w-4 text-rose-400 mb-1" />
                  <p className="text-xs font-black">7-Day Free Follow-up</p>
                  <p className="text-[10px] text-slate-400">Zero extra cost</p>
                </div>
              </div>
            </div>

            {/* Right Hero Video Card Preview */}
            <div className="col-span-12 lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/10 bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=700&q=80"
                  alt="Doctor Video Consultation"
                  className="h-64 sm:h-80 w-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-bold text-emerald-300">42 Doctors Online Right Now</span>
                  </div>
                  <h3 className="text-base font-bold text-white leading-snug">
                    Need quick advice for fever, cough, or stomach issues?
                  </h3>
                  <Button
                    onClick={() => {
                      if (INSTANT_SPECIALITIES[0]) {
                        handleStartInstantConsult(INSTANT_SPECIALITIES[0]);
                      }
                    }}
                    className="w-full h-11 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-lg shadow-blue-600/40"
                  >
                    Start Instant Consultation (₹299) →
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= MAIN CONTAINER ================= */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* ================= 1. INSTANT SPECIALITIES GRID ================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-600" />
                Choose Speciality for Instant Connect
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pick your symptom or medical speciality to start video call within minutes
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {INSTANT_SPECIALITIES.map((spec) => (
              <div
                key={spec.id}
                className={`p-5 rounded-3xl bg-white dark:bg-slate-900 border ${spec.color} shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="h-12 w-12 rounded-2xl bg-slate-50 dark:bg-slate-800 text-2xl flex items-center justify-center shrink-0 shadow-inner">
                    {spec.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate">{spec.name}</h3>
                      <span className="text-[10px] font-black bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-md">
                        ETA: ~{spec.waitMin}m
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{spec.tagline}</p>
                    <p className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold mt-1 truncate">
                      {spec.doctor}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Consultation Fee</span>
                    <span className="text-base font-black text-slate-900 dark:text-white">₹{spec.price}</span>
                  </div>
                  <Button
                    onClick={() => handleStartInstantConsult(spec)}
                    size="sm"
                    className="h-10 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md shadow-blue-600/20"
                  >
                    Consult Now →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= 2. UPCOMING & SCHEDULED CONSULTATIONS ================= */}
        <section className="space-y-4">
          <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            Your Scheduled Video Sessions ({upcomingConsultations.length})
          </h2>

          {upcomingConsultations.length === 0 ? (
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-center space-y-2">
              <Clock className="h-8 w-8 text-slate-300 mx-auto" />
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">No active video appointments scheduled.</p>
              <p className="text-[11px] text-slate-400">Choose a speciality above to start an instant 2-minute call.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingConsultations.map((consult) => (
                <div
                  key={consult.id}
                  className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/60 shadow-xs flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={consult.doctorImage}
                      alt={consult.doctorName}
                      className="h-14 w-14 rounded-2xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                        {consult.doctorName}
                      </h4>
                      <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">{consult.speciality}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {consult.appointmentDate} • {consult.appointmentTime}
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleJoinCall(consult)}
                    className="h-11 px-5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-lg shadow-blue-600/25 shrink-0"
                  >
                    Join Video Room
                  </Button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ================= 3. PAST CONSULTATIONS & PRESCRIPTIONS ================= */}
        <section className="space-y-4">
          <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-slate-600" />
            Past Video Consultations & Prescriptions ({pastConsultations.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pastConsultations.map((consult) => (
              <div
                key={consult.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={consult.doctorImage}
                    alt={consult.doctorName}
                    className="h-12 w-12 rounded-2xl object-cover border border-slate-100 shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                      {consult.doctorName}
                    </h4>
                    <p className="text-[11px] text-slate-400">{consult.speciality}</p>
                    <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                      Consulted on {consult.appointmentDate}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast.success("Digital Prescription downloaded as PDF!")}
                    className="h-9 rounded-xl text-xs font-bold border-slate-200 dark:border-slate-700 gap-1"
                  >
                    <Download className="h-3.5 w-3.5" /> Rx PDF
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="h-9 rounded-xl bg-blue-600 font-bold text-xs"
                  >
                    <Link to="/booking/$doctorId" params={{ doctorId: consult.doctorId || "dr-1" }}>Rebook</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* ================= ACTIVE VIDEO CALL MODAL ================= */}
      <AnimatePresence>
        {activeCall && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-slate-900 rounded-[32px] overflow-hidden shadow-2xl border border-slate-800 flex flex-col h-[85vh]"
            >
              {/* Call Top Header */}
              <div className="p-4 bg-slate-850 flex items-center justify-between border-b border-slate-800 text-white">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
                  <div>
                    <h3 className="font-bold text-sm text-white">{activeCall.doctorName}</h3>
                    <p className="text-[10px] text-slate-400">{activeCall.speciality} • Secure End-to-End Encrypted Call</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActiveCall(null);
                    toast.success("Consultation session ended. Prescription saved to records.");
                  }}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Video Stream Stage */}
              <div className="relative flex-1 bg-slate-950 flex items-center justify-center overflow-hidden">
                {/* Remote Doctor Feed */}
                <img
                  src={activeCall.doctorImage}
                  alt={activeCall.doctorName}
                  className="h-full w-full object-cover opacity-70"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6">
                  <div className="bg-slate-900/80 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700/60 max-w-md space-y-1">
                    <span className="text-[10px] font-bold text-emerald-400">Doctor Connected</span>
                    <p className="text-xs text-slate-200">
                      "Hello! I am reviewing your health history. Please tell me about your symptoms."
                    </p>
                  </div>
                </div>

                {/* Local Patient PIP Video */}
                <div className="absolute top-4 right-4 h-32 w-24 sm:h-44 sm:w-32 rounded-2xl bg-slate-800 border-2 border-white/20 overflow-hidden shadow-xl">
                  {isVideoOn ? (
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                      alt="You"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-slate-400 text-xs font-bold bg-slate-900">
                      Camera Off
                    </div>
                  )}
                  <span className="absolute bottom-1 left-1 text-[9px] font-bold text-white bg-black/60 px-1.5 py-0.5 rounded">
                    You (Patient)
                  </span>
                </div>
              </div>

              {/* Call Controls Bar */}
              <div className="p-4 bg-slate-850 border-t border-slate-800 flex items-center justify-center gap-4">
                <Button
                  onClick={() => setIsMicOn(!isMicOn)}
                  variant="outline"
                  size="icon"
                  className={`h-12 w-12 rounded-full border-slate-700 ${
                    isMicOn ? "bg-slate-800 text-white" : "bg-red-600 text-white hover:bg-red-700 border-red-600"
                  }`}
                >
                  {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                </Button>

                <Button
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  variant="outline"
                  size="icon"
                  className={`h-12 w-12 rounded-full border-slate-700 ${
                    isVideoOn ? "bg-slate-800 text-white" : "bg-red-600 text-white hover:bg-red-700 border-red-600"
                  }`}
                >
                  {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                </Button>

                <Button
                  onClick={() => {
                    setActiveCall(null);
                    toast.success("Consultation completed! Prescription generated.");
                  }}
                  className="h-12 px-6 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg shadow-red-600/40 flex items-center gap-2"
                >
                  <PhoneCall className="h-4 w-4 rotate-[135deg]" />
                  End Call
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
