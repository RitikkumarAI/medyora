import { useState, useRef } from "react";
import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/shared/auth/useAuth";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/verify")({
  validateSearch: (search: Record<string, unknown>): { to?: string | undefined } => ({
    to: typeof search["to"] === "string" ? search["to"] : undefined,
  }),
  component: VerifyPage,
});

function VerifyPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { loginAsPatient, loginAsDoctor } = useAuth();
  const search = Route.useSearch();
  const phone = search?.to || "9876543210"; // Default master test phone
  
  const [otp, setOtp] = useState(["1", "2", "3", "4", "5", "6"]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.charAt(0);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyOtp = () => {
    // Testing mode bypass
    if (phone === "9999999992" || phone === "doctor") {
      loginAsDoctor({ name: "Dr. Verified Specialist", phone: `+91 ${phone}` });
      toast.success("Doctor Credentials Verified! Welcome Doctor");
      navigate({ to: "/doctor" });
    } else {
      loginAsPatient(phone, "Patient User");
      toast.success("OTP Verified! Welcome to Medyora");
      navigate({ to: "/patient" }); 
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors px-6 py-8">
      {/* Header */}
      <header className="flex items-center mb-10">
        <Button variant="ghost" size="icon" onClick={() => navigate({ to: "/auth/login" })} className="h-10 w-10 -ml-2 shrink-0 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-full">
          <ArrowLeft className="h-5 w-5 text-slate-700 dark:text-slate-200" />
        </Button>
      </header>

      <div className="flex-1 flex flex-col max-w-md mx-auto w-full">
        {/* Title */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Verify OTP</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {t('login.enter_otp')} <br/>
            <span className="font-bold text-slate-900 dark:text-white">+91 {phone}</span>
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-10">
          <div className="flex justify-between gap-2 sm:gap-3">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-bold rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all shadow-xs"
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
              />
            ))}
          </div>

          <p className="text-center text-sm font-medium text-slate-500 dark:text-slate-400">
            {t('login.resend')} <span className="text-blue-600 dark:text-blue-400 font-bold">00:30</span>
          </p>

          <Button 
            className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-base font-bold shadow-lg shadow-blue-600/25" 
            onClick={verifyOtp}
          >
            {t('login.verify_otp')}
          </Button>
        </div>
      </div>
    </div>
  );
}
