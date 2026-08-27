import { useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { ArrowLeft, Image as ImageIcon, MessageSquare, Newspaper, Edit3, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CMS_CARDS = [
  { id: "banners", title: "App Banners", icon: ImageIcon, count: 4, desc: "Manage home screen promo banners", color: "bg-blue-50 text-blue-600" },
  { id: "faqs", title: "FAQs", icon: MessageSquare, count: 12, desc: "Edit Help Center questions", color: "bg-emerald-50 text-emerald-600" },
  { id: "articles", title: "Health Articles", icon: Newspaper, count: 28, desc: "Manage health tips and blog posts", color: "bg-amber-50 text-amber-600" },
];

export function AdminCMS() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white px-4 pt-6 pb-4 shadow-sm border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.history.back()} className="h-10 w-10 shrink-0 bg-slate-50 border border-slate-100 shadow-sm rounded-full">
              <ArrowLeft className="h-5 w-5 text-slate-700" />
            </Button>
            <h1 className="text-xl font-bold text-slate-900">Content Mgmt</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-6 pb-24">
        
        <p className="text-sm font-medium text-slate-500 mb-2">
          Manage dynamic content across the Patient and Doctor applications.
        </p>

        <div className="grid gap-4">
          {CMS_CARDS.map(card => (
            <div key={card.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm group hover:border-indigo-200 transition-colors cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${card.color}`}>
                  <card.icon className="h-6 w-6" />
                </div>
                <div className="bg-slate-50 px-2.5 py-1 rounded-lg text-xs font-bold text-slate-600 border border-slate-100">
                  {card.count} items
                </div>
              </div>
              <h3 className="font-bold text-lg text-slate-900">{card.title}</h3>
              <p className="text-xs font-medium text-slate-500 mt-1 mb-4">{card.desc}</p>
              
              <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-sm font-bold text-indigo-600 group-hover:text-indigo-700 transition-colors">Manage Content</span>
                <ArrowRight className="h-4 w-4 text-indigo-400 group-hover:text-indigo-600 transition-colors group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* Floating Action Button */}
      <Button size="icon" className="fixed bottom-[100px] right-6 h-14 w-14 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 z-40">
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
}
