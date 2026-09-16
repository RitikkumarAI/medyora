import { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Search, Filter, ShieldCheck, User, MoreVertical, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DOCTORS } from "@/shared/data/mock";

// Just using doctors as dummy users for the list
const USERS = DOCTORS.map((d) => ({
  id: d.id,
  name: d.fullName,
  role: "Doctor",
  status: "Active",
  image: d.image,
  speciality: d.speciality,
}));

// Add some patient dummy data
USERS.push(
  {
    id: "u1",
    name: "Ritik Kumar",
    role: "Patient",
    status: "Active",
    image: "https://ui-avatars.com/api/?name=Ritik+Kumar&background=eff6ff&color=3b82f6",
    speciality: "",
  },
  {
    id: "u2",
    name: "Rahul Sharma",
    role: "Patient",
    status: "Inactive",
    image: "https://ui-avatars.com/api/?name=Rahul+Sharma&background=fffbeb&color=b45309",
    speciality: "",
  },
);

export function AdminUsers() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const filtered = USERS.filter((u) => {
    if (activeTab !== "All" && u.role !== activeTab) return false;
    if (search && !u.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white px-4 pt-6 pb-2 shadow-sm border-b border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.history.back()}
              className="h-10 w-10 shrink-0 bg-slate-50 border border-slate-100 shadow-sm rounded-full"
            >
              <ArrowLeft className="h-5 w-5 text-slate-700" />
            </Button>
            <h1 className="text-xl font-bold text-slate-900">User Management</h1>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 rounded-2xl bg-slate-50 border-slate-100 shadow-sm h-12 text-sm focus-visible:ring-indigo-600"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {["All", "Doctor", "Patient", "Admin"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-2 border-b-2 font-bold text-sm transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              {tab}s
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-3 pb-24">
        {filtered.map((user) => (
          <div
            key={user.id}
            className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <img
                src={user.image}
                alt={user.name}
                className="h-12 w-12 rounded-full object-cover border border-slate-100"
              />
              <div>
                <h3 className="font-bold text-slate-900 text-[15px]">{user.name}</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                      user.role === "Doctor"
                        ? "bg-blue-50 text-blue-600"
                        : user.role === "Admin"
                          ? "bg-indigo-50 text-indigo-600"
                          : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {user.role}
                  </span>
                  <span className="text-[10px] font-medium text-slate-400">
                    {user.status === "Active" ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>

            <Button variant="ghost" size="icon" className="text-slate-400">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        ))}
      </main>
    </div>
  );
}
