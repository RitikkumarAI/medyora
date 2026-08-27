import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, ArrowRight, CheckCircle2, Stethoscope, Sparkles, Filter } from "lucide-react";
import { SiteHeader } from "@/shared/components/SiteHeader";
import { SiteFooter } from "@/shared/components/SiteFooter";
import { SPECIALIZATIONS } from "@/shared/data/mock";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/specialities")({
  head: () => ({
    meta: [
      { title: "Medical Specialities — Browse by Condition & Organs | Medyora" },
      {
        name: "description",
        content:
          "Explore verified doctors by medical speciality: Dentistry, Orthopedics, Cardiology, Gynecology, Pediatrics, Dermatology and more.",
      },
      { property: "og:title", content: "Medical Specialities — Medyora" },
      {
        property: "og:description",
        content: "Browse verified specialists with clear visual guides and instant booking.",
      },
    ],
  }),
  component: SpecialitiesPage,
});

function SpecialitiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "General Care", "Advanced Care", "Specialized Surgery"];

  const filteredSpecialities = SPECIALIZATIONS.filter((s) => {
    const matchesCategory =
      selectedCategory === "All" || s.category === selectedCategory;
    const matchesQuery =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.hindiName && s.hindiName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.description && s.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors">
      <SiteHeader />

      <main className="flex-1">
        {/* Top Hero Banner */}
        <section className="bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 text-white py-12 px-4 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-blue-100 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              Verified Medical Specialities
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Find Doctors by Speciality & Organ
            </h1>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-blue-100 font-medium">
              Easily recognize doctors by clear medical images, symptoms, and Hindi guides. Book in-person visits or instant video consultations.
            </p>

            {/* Search Box */}
            <div className="mt-6 max-w-xl relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search speciality (e.g., Dentist, Bone, Skin, Heart, दांत, हड्डी)..."
                className="h-13 pl-12 pr-4 rounded-2xl bg-white text-slate-900 shadow-xl border-none text-sm placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-blue-500"
              />
            </div>
          </div>
        </section>

        {/* Categories Tab Bar */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Specialities Grid with Rich Medical Images */}
          <div className="mt-6 mb-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredSpecialities.map((s) => (
              <Link
                key={s.id}
                to="/doctors"
                search={{ q: s.name }}
                className="group flex flex-col justify-between rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 shadow-sm hover:shadow-xl hover:border-blue-500/80 transition-all overflow-hidden"
              >
                <div>
                  {/* Top Image & Badge */}
                  <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-3.5 bg-slate-100 dark:bg-slate-800">
                    <img
                      src={s.image}
                      alt={s.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    
                    {/* Hindi Name Overlay Badge */}
                    {s.hindiName && (
                      <span className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                        {s.hindiName}
                      </span>
                    )}

                    <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase shadow-xs flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-950 animate-pulse" />
                      Available Today
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1">
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {s.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Stats & CTA */}
                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    {s.doctors} Verified Doctors
                  </span>

                  <span className="inline-flex items-center gap-1 text-xs font-extrabold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
                    Consult <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
