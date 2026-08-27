import { useState, useEffect } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES, changeAppLanguage } from "@/i18n";

export function LanguageSelection() {
  const router = useRouter();
  const { i18n } = useTranslation();
  const [selected, setSelected] = useState(i18n.language || "en");

  const handleSelect = (code: string) => {
    setSelected(code);
    changeAppLanguage(code);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="px-4 py-4 flex items-center mb-4">
        <Button variant="ghost" size="icon" onClick={() => router.history.back()} className="h-10 w-10 -ml-2 shrink-0">
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </header>

      <main className="flex-1 px-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Choose Your Language</h1>
          <p className="text-sm text-slate-500">Select the language you prefer for a better experience</p>
        </div>

        <div className="space-y-4">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`w-full flex items-center p-4 rounded-2xl border transition-colors ${
                selected === lang.code 
                  ? "border-blue-600 bg-blue-50/50" 
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-lg mr-4 ${
                selected === lang.code ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
              }`}>
                {lang.flag}
              </div>
              <div className="flex-1 text-left">
                <p className={`font-bold text-base ${selected === lang.code ? "text-blue-900" : "text-slate-900"}`}>
                  {lang.label}
                </p>
                {lang.label !== lang.native && (
                  <p className="text-xs text-slate-500">{lang.native}</p>
                )}
              </div>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                selected === lang.code ? "text-blue-600" : "border-2 border-slate-300"
              }`}>
                {selected === lang.code && <CheckCircle2 className="h-6 w-6" />}
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* Fixed Bottom Action */}
      <div className="px-6 pb-10 pt-4 bg-gradient-to-t from-[#F8FAFC] to-transparent">
        <Button asChild className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-base font-bold shadow-lg shadow-blue-600/25">
          <Link to="/auth/login">
            Continue
          </Link>
        </Button>
      </div>
    </div>
  );
}
