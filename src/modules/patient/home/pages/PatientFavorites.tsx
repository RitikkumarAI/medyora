import { Link } from "@tanstack/react-router";
import { Star, Clock, Heart, Search } from "lucide-react";
import { DOCTORS } from "@/shared/data/mock";
import { Input } from "@/components/ui/input";

export function PatientFavorites() {
  const favorites = DOCTORS.slice(0, 2); // Mocking first 2 as favorites

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#F8FAFC] px-6 pt-12 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Saved Doctors</h1>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input 
            placeholder="Search favorites..." 
            className="pl-11 rounded-2xl bg-white border-slate-200 shadow-sm h-14 text-sm focus-visible:ring-blue-600"
          />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center">
            <Heart className="h-12 w-12 text-slate-200 mb-4" />
            <h3 className="text-lg font-bold text-slate-900">No favorites yet</h3>
            <p className="text-sm text-slate-500 mt-2">Doctors you save will appear here.</p>
          </div>
        ) : (
          favorites.map((doc) => (
            <Link key={doc.id} to={`/doctors/$doctorId`} params={{ doctorId: doc.id }} className="flex gap-4 rounded-3xl bg-white p-3 shadow-sm border border-slate-100">
              <img src={doc.image} alt={doc.fullName} className="h-[88px] w-[88px] rounded-2xl object-cover" />
              <div className="flex flex-1 flex-col py-1 justify-center relative">
                <button className="absolute top-0 right-0 p-1 text-red-500 transition-colors">
                  <Heart className="h-4 w-4 fill-current" />
                </button>
                <div className="flex items-start justify-between pr-6">
                  <div>
                    <h4 className="font-bold text-[15px] text-slate-900">{doc.fullName}</h4>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">{doc.speciality}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mt-2.5 text-xs font-medium text-slate-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> 
                    {doc.experience} yrs
                  </div>
                  <span className="w-1 h-1 rounded-full bg-slate-300 mx-1" />
                  <div className="font-bold text-blue-600 text-sm">₹{doc.fee}</div>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-slate-700">4.8</span>
                  <span className="text-[10px] text-slate-400">(230)</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </main>
    </div>
  );
}
