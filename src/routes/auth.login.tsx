import { useState, useEffect } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { ArrowLeft, Globe, Stethoscope, User, ShieldCheck, CheckCircle2, Lock, Sparkles, KeyRound, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/shared/auth/useAuth";

export const Route = createFileRoute("/auth/login")({
  validateSearch: (search: Record<string, unknown>) => ({
    role: (search.role as "patient" | "doctor") || "patient",
  }),
  component: LoginPage,
});

export function LoginPage() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const { t, i18n } = useTranslation();
  const { loginAsPatient, loginAsDoctor } = useAuth();

  const [activeTab, setActiveTab] = useState<"patient" | "doctor">(search.role || "patient");

  // Patient Login Form State (Clean defaults for testing)
  const [patientPhone, setPatientPhone] = useState("");

  // Doctor Login Form State (Clean defaults for testing)
  const [medicalRegNo, setMedicalRegNo] = useState("");
  const [doctorPhone, setDoctorPhone] = useState("");
  const [doctorPin, setDoctorPin] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (search.role === "doctor") {
      setActiveTab("doctor");
    }
  }, [search.role]);

  // Universal Master Testing Bypass for Patient
  const handlePatientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Testing mode fallback: accepts any input or defaults to master test phone
    const effectivePhone = patientPhone.trim() || "9876543210";
    
    setTimeout(() => {
      loginAsPatient(effectivePhone, "Patient User");
      toast.success("Welcome to Medyora Patient Care");
      setIsSubmitting(false);
      navigate({ to: "/patient" });
    }, 250);
  };

  // Universal Master Testing Bypass for Doctor
  const handleDoctorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Testing mode fallback: accepts any input or defaults to master test credentials
    const effectiveRegNo = (medicalRegNo.trim() || "MCI-74892").toUpperCase();
    const effectivePhone = doctorPhone.trim() || "9876543210";
    const doctorName = effectiveRegNo ? `Dr. Specialist (${effectiveRegNo})` : "Dr. Verified Medical Officer";

    setTimeout(() => {
      loginAsDoctor({
        name: doctorName,
        medicalRegNo: effectiveRegNo,
        phone: effectivePhone,
        speciality: "Senior Consultant Specialist",
        clinicName: "Apex Multi-Speciality Clinic",
      });
      toast.success(`Doctor Console Verified! Welcome ${doctorName}`);
      setIsSubmitting(false);
      navigate({ to: "/doctor" });
    }, 250);
  };

  const handleFillTestCredentials = () => {
    if (activeTab === "patient") {
      setPatientPhone("9876543210");
      toast.info("Filled Master Test Mobile: 9876543210");
    } else {
      setMedicalRegNo("MCI-74892");
      setDoctorPhone("9876543210");
      setDoctorPin("1234");
      toast.info("Filled Master Doctor Credentials: MCI-74892 / 9876543210");
    }
  };

  const toggleLanguage = () => {
    const current = i18n.language;
    if (current === "en") i18n.changeLanguage("hi");
    else if (current === "hi") i18n.changeLanguage("mr");
    else i18n.changeLanguage("en");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors px-6 py-8">
      {/* Top Header */}
      <header className="flex items-center justify-between max-w-md mx-auto w-full mb-5">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate({ to: "/" })}
          className="h-10 w-10 shrink-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full shadow-xs"
          aria-label="Back to home"
        >
          <ArrowLeft className="h-5 w-5 text-slate-700 dark:text-slate-200" />
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="rounded-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 font-bold text-xs text-slate-800 dark:text-slate-200 shadow-xs"
          >
            <Globe className="h-3.5 w-3.5 mr-1.5 text-blue-600 dark:text-blue-400" />
            {i18n.language === "hi" ? "हिंदी" : i18n.language === "mr" ? "मराठी" : "English"}
          </Button>
        </div>
      </header>

      <div className="flex-1 flex flex-col max-w-md mx-auto w-full">
        {/* Brand Logo & Welcome */}
        <div className="text-center mb-5 space-y-1.5">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-white dark:bg-slate-800 p-2 shadow-md border border-slate-200/80 dark:border-slate-700 mx-auto">
            <img src="/Logo.webp" alt="Medyora Logo" className="h-full w-full object-contain" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Medy<span className="text-blue-600 dark:text-blue-400">ora</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Select your role to access the dedicated portal
          </p>
        </div>

        {/* Universal Testing Mode Active Badge */}
        <div className="mb-4 p-3 rounded-2xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-emerald-900 dark:text-emerald-200 text-xs shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <div className="space-y-0.5">
              <p className="font-extrabold text-[11px]">Testing Mode Active (Auth Bypass)</p>
              <p className="text-[10px] text-emerald-700 dark:text-emerald-300 font-medium">
                Test Number: <span className="font-bold">9876543210</span> • OTP/PIN: <span className="font-bold">123456</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleFillTestCredentials}
            className="px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] shadow-xs shrink-0 transition-colors"
          >
            Fill Test Data
          </button>
        </div>

        {/* Dual Role Gateway Switcher */}
        <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-slate-200/70 dark:bg-slate-900 border border-slate-300/60 dark:border-slate-800 mb-5">
          <button
            type="button"
            onClick={() => setActiveTab("patient")}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "patient"
                ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Patient Portal</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("doctor")}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === "doctor"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span>Doctor Console</span>
          </button>
        </div>

        {/* ================= PATIENT LOGIN GATEWAY ================= */}
        {activeTab === "patient" && (
          <form onSubmit={handlePatientSubmit} className="space-y-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Patient Login</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Book appointments, track queues & view digital prescriptions
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Mobile Number
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center justify-center bg-slate-50 dark:bg-slate-800 px-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-2xs gap-1.5 shrink-0">
                    <span className="text-sm">🇮🇳</span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">+91</span>
                  </div>
                  <Input
                    type="tel"
                    placeholder="e.g. 9876543210 (or any number)"
                    className="h-12 rounded-xl text-sm font-semibold border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus-visible:ring-blue-600"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    maxLength={10}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-600/20"
              >
                {isSubmitting ? "Signing in..." : "Continue to Patient Portal"}
              </Button>
            </div>

            {/* Social Divider */}
            <div className="pt-2">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-100 dark:border-slate-800" />
                </div>
                <div className="relative flex justify-center text-[10px]">
                  <span className="bg-white dark:bg-slate-900 px-3 text-slate-400 font-medium">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <Button
                  type="button"
                  onClick={() => {
                    loginAsPatient("9876543210", "Google User");
                    toast.success("Signed in with Google");
                    navigate({ to: "/patient" });
                  }}
                  variant="outline"
                  className="h-11 rounded-xl font-bold border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs"
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Google
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    loginAsPatient("9876543210", "Apple User");
                    toast.success("Signed in with Apple");
                    navigate({ to: "/patient" });
                  }}
                  variant="outline"
                  className="h-11 rounded-xl font-bold border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs"
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.62-1.496 3.6-2.946 1.156-1.685 1.632-3.32 1.657-3.411-.036-.013-3.183-1.221-3.21-4.857-.026-3.04 2.484-4.508 2.597-4.579-1.434-2.09-3.64-2.38-4.444-2.42-2.13-.083-4.103 1.149-4.485 1.149zm2.378-4.534c.808-.976 1.353-2.333 1.205-3.677-1.156.046-2.583.768-3.415 1.745-.733.845-1.353 2.23-1.185 3.542 1.282.099 2.588-.636 3.395-1.61z"/></svg>
                  Apple
                </Button>
              </div>
            </div>
          </form>
        )}

        {/* ================= DOCTOR & CLINIC GATEWAY ================= */}
        {activeTab === "doctor" && (
          <form onSubmit={handleDoctorSubmit} className="space-y-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-blue-600/30 dark:border-blue-500/30 shadow-md">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Doctor Console Login</h2>
                  <span className="text-[10px] font-extrabold uppercase bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded-full">
                    Verified Portal
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Access live queue radar, prescription pad & clinic analytics
                </p>
              </div>
              <ShieldCheck className="h-6 w-6 text-blue-600 dark:text-blue-400 shrink-0" />
            </div>

            <div className="space-y-3.5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Medical Council Reg. Number
                </label>
                <Input
                  type="text"
                  placeholder="e.g. MCI-74892 (or any ID)"
                  className="h-11 rounded-xl text-xs font-mono font-bold uppercase border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus-visible:ring-blue-600"
                  value={medicalRegNo}
                  onChange={(e) => setMedicalRegNo(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Registered Doctor Mobile
                </label>
                <Input
                  type="tel"
                  placeholder="e.g. 9876543210 (or any number)"
                  className="h-11 rounded-xl text-xs font-semibold border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus-visible:ring-blue-600"
                  value={doctorPhone}
                  onChange={(e) => setDoctorPhone(e.target.value)}
                  maxLength={10}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Clinical Security PIN</span>
                  <span className="text-[10px] text-slate-400">Default: 1234</span>
                </label>
                <Input
                  type="password"
                  placeholder="••••"
                  className="h-11 rounded-xl text-xs font-mono tracking-widest border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus-visible:ring-blue-600"
                  value={doctorPin}
                  onChange={(e) => setDoctorPin(e.target.value)}
                  maxLength={6}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-600/20"
              >
                {isSubmitting ? "Verifying..." : "Verify & Launch Doctor Console"}
              </Button>
            </div>
          </form>
        )}

        <p className="mt-auto pt-8 pb-4 text-center text-xs text-slate-400 font-medium">
          Medyora Enterprise Healthcare • Protected by Binarize Technologies
        </p>
      </div>
    </div>
  );
}
