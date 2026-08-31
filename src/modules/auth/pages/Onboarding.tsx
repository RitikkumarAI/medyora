import { Link } from "@tanstack/react-router";
import { ArrowRight, HeartPulse, CalendarCheck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroDoctor from "@/assets/hero-doctor.webp";

export function Onboarding() {
  return (
    <div className="flex flex-col h-[100dvh] w-full bg-[#F8FAFC] overflow-hidden select-none">
      
      {/* 1. TOP FULL LOGO */}
      <div className="pt-7 sm:pt-10 px-6 shrink-0 flex items-center justify-center">
        <img 
          src="/full-logo.webp" 
          alt="Medyora Healthcare Logo" 
          className="h-12 sm:h-14 w-auto max-w-[240px] object-contain drop-shadow-xs" 
        />
      </div>

      {/* 2. CENTER DOCTOR ILLUSTRATION WITH AMBIENT BLOBS & ICONS */}
      <div className="flex-1 w-full max-w-[320px] mx-auto flex items-end justify-center relative min-h-0 px-4 mt-2">
        {/* Background Blob */}
        <div className="absolute inset-x-4 top-8 bottom-0 bg-blue-100/80 rounded-t-full rounded-bl-[40%] rounded-br-[40%]" />
        
        {/* Floating Badges */}
        <div className="absolute top-1/4 -left-2 bg-white p-2.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] z-20 text-blue-500">
          <HeartPulse className="h-5 w-5" />
        </div>
        <div className="absolute top-[45%] -right-2 bg-white p-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] z-20 text-blue-500">
          <CalendarCheck className="h-5 w-5" />
        </div>
        <div className="absolute bottom-1/4 -left-1 bg-white p-2 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] z-20 text-blue-500">
          <ShieldCheck className="h-4 w-4" />
        </div>
        
        {/* Ambient Dots */}
        <div className="absolute top-10 right-10 w-2 h-2 rounded-full bg-blue-300" />
        <div className="absolute top-1/3 left-6 w-1.5 h-1.5 rounded-full bg-blue-400" />
        <div className="absolute bottom-10 right-4 w-2 h-2 rounded-full bg-blue-400" />
        
        {/* Doctor Image */}
        <img 
          src={heroDoctor} 
          alt="Doctor" 
          className="relative z-10 h-[96%] max-h-full w-auto max-w-[140%] object-contain object-bottom -ml-4 drop-shadow-md"
          style={{
            maskImage: 'linear-gradient(to bottom, black 78%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 78%, transparent 100%)'
          }}
        />
      </div>

      {/* 3. GET STARTED, 4. LOGIN, & 5. FOOTER LINES */}
      <div className="px-6 pb-6 pt-3 shrink-0 relative z-10 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC] to-transparent w-full max-w-md mx-auto space-y-3">
        {/* 3. Get Started Button */}
        <Button asChild className="w-full h-13 sm:h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-[15px] font-bold shadow-lg shadow-blue-600/25 flex justify-between px-6">
          <Link to="/auth/language">
            <span className="flex-1 text-center">Get Started</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>

        {/* 4. Login Button */}
        <Button asChild variant="outline" className="w-full h-13 sm:h-14 rounded-2xl border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-[15px] font-bold flex justify-between px-6 bg-transparent">
          <Link to="/auth/login">
            <span className="flex-1 text-center">Login to Your Account</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>

        {/* 5. Footer Line: Your Health. Our Priority. Powered by Binarize Technologies */}
        <div className="text-center pt-1 pb-1 space-y-0.5">
          <p className="text-xs font-semibold text-slate-500">
            Your Health. Our Priority.
          </p>
          <p className="text-[10px] font-medium text-slate-400">
            Powered by <span className="text-blue-600 font-bold">Binarize Technologies</span>
          </p>
        </div>
      </div>
    </div>
  );
}
