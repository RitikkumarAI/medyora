import { Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, UserPlus, FileText, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const FAMILY = [
  {
    id: "1",
    name: "Anjali Kumar",
    relation: "Spouse",
    age: 28,
    gender: "Female",
    image: "https://ui-avatars.com/api/?name=Anjali+Kumar&background=fdf4ff&color=c026d3",
  },
  {
    id: "2",
    name: "Aarav Kumar",
    relation: "Child",
    age: 5,
    gender: "Male",
    image: "https://ui-avatars.com/api/?name=Aarav+Kumar&background=eff6ff&color=3b82f6",
  },
];

export function FamilyManagement() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-4 pt-6 pb-4 shadow-xs border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.history.back()}
            className="h-10 w-10 shrink-0 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xs rounded-full"
          >
            <ArrowLeft className="h-5 w-5 text-slate-700 dark:text-slate-200" />
          </Button>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Family Members</h1>
        </div>
        <Button
          size="icon"
          className="h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 shadow-xs"
        >
          <UserPlus className="h-5 w-5" />
        </Button>
      </header>

      <main className="flex-1 px-4 py-6 space-y-4">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-6">
          Add family members to book appointments and manage their medical records from your
          account.
        </p>

        {FAMILY.map((member) => (
          <div
            key={member.id}
            className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <img
                src={member.image}
                alt={member.name}
                className="h-14 w-14 rounded-full object-cover border border-slate-100 dark:border-slate-800"
              />
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-[15px]">
                  {member.name}
                </h3>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                  {member.relation} • {member.age} yrs
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        ))}

        <div className="mt-8 bg-blue-50 dark:bg-blue-950/40 p-6 rounded-3xl border border-blue-100 dark:border-blue-900 text-center">
          <div className="h-12 w-12 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-3 shadow-xs">
            <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">Centralized Records</h3>
          <p className="text-xs font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
            All prescriptions and lab reports for your family members will be securely stored and
            easily accessible.
          </p>
        </div>
      </main>
    </div>
  );
}
