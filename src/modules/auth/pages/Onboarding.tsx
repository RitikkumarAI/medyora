import { Link } from "@tanstack/react-router";
import { ArrowRight, HeartPulse, CalendarCheck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroDoctor from "@/assets/hero-doctor.png";

export function Onboarding() {
  return (
    <div className="flex flex-col h-[100dvh] w-full bg-[#F8FAFC] overflow-hidden">
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center pt-8 md:pt-12 px-6 relative z-10 min-h-0">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center shrink-0">
          <img src="/Logo.png" alt="Medyora Logo" className="h-36 object-contain" />
          <p className="text-xs font-medium text-slate-500 mt-2">
            Your Health. Our Priority.
          </p>
          <p className="text-[10px] font-medium text-slate-400 mt-1">
            Powered by <span className="text-blue-600">Binarize Technologies</span>
          </p>
        </div>

        {/* Center Illustration with Blobs */}
        <div className="relative w-full max-w-[300px] flex-1 mt-6 flex items-end justify-center min-h-0">
          {/* Background Blob */}
          <div className="absolute inset-x-4 top-10 bottom-0 bg-blue-100/80 rounded-t-full rounded-bl-[40%] rounded-br-[40%]" />
          
          {/* Floating Icons */}
          <div className="absolute top-1/4 -left-2 bg-white p-2.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] z-20 text-blue-500">
            <HeartPulse className="h-5 w-5" />
          </div>
          <div className="absolute top-[45%] -right-2 bg-white p-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] z-20 text-blue-500">
            <CalendarCheck className="h-5 w-5" />
          </div>
          <div className="absolute bottom-1/4 -left-1 bg-white p-2 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] z-20 text-blue-500">
            <ShieldCheck className="h-4 w-4" />
          </div>
          
          {/* Small dots */}
          <div className="absolute top-10 right-10 w-2 h-2 rounded-full bg-blue-300" />
          <div className="absolute top-1/3 left-6 w-1.5 h-1.5 rounded-full bg-blue-400" />
          <div className="absolute bottom-10 right-4 w-2 h-2 rounded-full bg-blue-400" />
          
          {/* Doctor Image - Shifted Left and Faded at Bottom */}
          <img 
            src={heroDoctor} 
            alt="Doctor" 
            className="relative z-10 h-[95%] max-h-full w-auto max-w-[140%] object-contain object-bottom -ml-4 drop-shadow-md"
            style={{
              maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)'
            }}
          />
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="px-6 pb-8 pt-4 shrink-0 relative z-10 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC] to-transparent">
        <div className="space-y-3.5">
          <Button asChild className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-[15px] font-bold shadow-lg shadow-blue-600/25 flex justify-between px-6">
            <Link to="/auth/language">
              <span className="flex-1 text-center">Get Started</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full h-14 rounded-2xl border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-[15px] font-bold flex justify-between px-6 bg-transparent">
            <Link to="/auth/login">
              <span className="flex-1 text-center">Login to Your Account</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
