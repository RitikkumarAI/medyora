import { Link, useRouter, useSearch } from "@tanstack/react-router";
import { ArrowLeft, Check, Minus, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DOCTORS } from "@/shared/data/mock";

export function DoctorCompare() {
  const router = useRouter();
  const search: any = useSearch({ strict: false });
  const doctorIds = search.doctors || [];
  
  const selectedDoctors = DOCTORS.filter(d => doctorIds.includes(d.id));

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 pt-6 pb-4 shadow-xs border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3 mb-2">
          <Button variant="ghost" size="icon" onClick={() => router.history.back()} className="h-10 w-10 shrink-0 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xs rounded-full">
            <ArrowLeft className="h-5 w-5 text-slate-700 dark:text-slate-200" />
          </Button>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Compare Doctors</h1>
        </div>
      </header>

      {selectedDoctors.length < 2 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center flex-1">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Not enough doctors</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 mb-4">Please select at least 2 doctors to compare.</p>
          <Button asChild className="rounded-full bg-blue-600 text-white font-bold px-6">
            <Link to="/doctors">Go back</Link>
          </Button>
        </div>
      ) : (
        <main className="flex-1 overflow-x-auto p-4 pb-24">
          <div className="flex gap-4 min-w-max pb-4">
            
            {/* Attribute Labels (Sticky Left) */}
            <div className="sticky left-0 bg-[#F8FAFC] dark:bg-slate-950 z-10 w-28 shrink-0 flex flex-col gap-2 pt-28 shadow-[10px_0_15px_-10px_rgba(0,0,0,0.05)]">
              <div className="h-12 flex items-center px-2 text-xs font-bold text-slate-400 uppercase tracking-wide">Experience</div>
              <div className="h-12 flex items-center px-2 text-xs font-bold text-slate-400 uppercase tracking-wide">Fees</div>
              <div className="h-12 flex items-center px-2 text-xs font-bold text-slate-400 uppercase tracking-wide">Rating</div>
              <div className="h-12 flex items-center px-2 text-xs font-bold text-slate-400 uppercase tracking-wide">Home Visit</div>
              <div className="h-12 flex items-center px-2 text-xs font-bold text-slate-400 uppercase tracking-wide">Online</div>
              <div className="h-16 flex items-center px-2 text-xs font-bold text-slate-400 uppercase tracking-wide">City</div>
              <div className="h-24 flex items-center px-2 text-xs font-bold text-slate-400 uppercase tracking-wide">Languages</div>
            </div>

            {/* Doctor Columns */}
            {selectedDoctors.map(doc => (
              <div key={doc.id} className="w-40 shrink-0 flex flex-col gap-2 relative">
                
                {/* Doctor Card Top */}
                <div className="bg-white dark:bg-slate-900 p-3 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs flex flex-col items-center text-center h-28 justify-center relative">
                  <img src={doc.image} alt={doc.fullName} className="h-12 w-12 rounded-full object-cover mb-2 border border-slate-100 dark:border-slate-800" />
                  <h3 className="text-[13px] font-bold text-slate-900 dark:text-white leading-tight line-clamp-1">{doc.fullName}</h3>
                  <p className="text-[10px] text-blue-600 dark:text-blue-400 font-medium line-clamp-1">{doc.speciality}</p>
                </div>

                {/* Attributes */}
                <div className="h-12 flex items-center justify-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-sm font-bold text-slate-700 dark:text-slate-300">
                  {doc.experience} Years
                </div>
                
                <div className="h-12 flex items-center justify-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-sm font-black text-blue-600 dark:text-blue-400">
                  ₹{doc.fee}
                </div>
                
                <div className="h-12 flex items-center justify-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 text-sm font-bold text-slate-700 dark:text-slate-300 gap-1">
                  <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" /> {doc.rating}
                </div>
                
                <div className="h-12 flex items-center justify-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                  {doc.homeVisit ? <Check className="h-5 w-5 text-green-500" /> : <Minus className="h-5 w-5 text-slate-300 dark:text-slate-700" />}
                </div>

                <div className="h-12 flex items-center justify-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                  {doc.clinic.online ?? true ? <Check className="h-5 w-5 text-green-500" /> : <Minus className="h-5 w-5 text-slate-300 dark:text-slate-700" />}
                </div>

                <div className="h-16 flex flex-col items-center justify-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 px-2 text-center">
                  <MapPin className="h-3.5 w-3.5 text-slate-400 mb-1" />
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 line-clamp-2">{doc.city}</span>
                </div>

                <div className="h-24 flex items-center justify-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-2">
                  <div className="flex flex-wrap justify-center gap-1">
                    {doc.languages.map(lang => (
                      <span key={lang} className="bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold px-1.5 py-0.5 rounded">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-2">
                  <Button asChild className="w-full rounded-2xl bg-blue-600 font-bold text-xs h-10 shadow-xs shadow-blue-600/20">
                    <Link to="/doctors/$doctorId" params={{ doctorId: doc.id }}>
                      Book Now
                    </Link>
                  </Button>
                </div>
                
              </div>
            ))}
          </div>
        </main>
      )}
    </div>
  );
}
