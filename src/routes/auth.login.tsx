import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Globe } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [phone, setPhone] = useState("");

  const sendOtp = () => {
    toast.success("OTP sent to your mobile number");
    navigate({ to: "/auth/verify", search: { to: phone } });
  };

  const toggleLanguage = () => {
    const current = i18n.language;
    if (current === 'en') i18n.changeLanguage('hi');
    else if (current === 'hi') i18n.changeLanguage('mr');
    else i18n.changeLanguage('en');
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors px-6 py-8">
      {/* Header */}
      <header className="flex items-center justify-between mb-10">
        <Button variant="ghost" size="icon" onClick={() => navigate({ to: "/auth/language" })} className="h-10 w-10 -ml-2 shrink-0 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-full">
          <ArrowLeft className="h-5 w-5 text-slate-700 dark:text-slate-200" />
        </Button>
        
        <Button variant="outline" size="sm" onClick={toggleLanguage} className="rounded-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 font-bold text-xs text-slate-800 dark:text-slate-200">
          <Globe className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" /> 
          {i18n.language === 'hi' ? 'हिंदी' : i18n.language === 'mr' ? 'मराठी' : 'English'}
        </Button>
      </header>

      <div className="flex-1 flex flex-col max-w-md mx-auto w-full">
        {/* Title */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">{t('login.welcome')}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{t('login.subtitle')}</p>
        </div>

        {/* Input */}
        <div className="space-y-6">
          <div className="flex gap-3">
            <div className="flex items-center justify-center bg-white dark:bg-slate-900 px-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs gap-2">
              <span className="text-lg">🇮🇳</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">+91</span>
            </div>
            <Input
              type="tel"
              placeholder={t('login.phone_placeholder')}
              className="h-14 rounded-2xl text-lg font-medium border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs focus-visible:ring-blue-600 focus-visible:border-blue-600"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <Button 
            className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-base font-bold shadow-lg shadow-blue-600/25" 
            onClick={sendOtp}
          >
            {t('login.send_otp')}
          </Button>

          {/* Social */}
          <div className="pt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200 dark:border-slate-800" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-[#F8FAFC] dark:bg-slate-950 px-4 text-slate-400 font-medium">{t('login.or_continue')}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <Button variant="outline" className="h-14 rounded-2xl font-bold border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-xs">
                <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Google
              </Button>
              <Button variant="outline" className="h-14 rounded-2xl font-bold border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-xs">
                <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.62-1.496 3.6-2.946 1.156-1.685 1.632-3.32 1.657-3.411-.036-.013-3.183-1.221-3.21-4.857-.026-3.04 2.484-4.508 2.597-4.579-1.434-2.09-3.64-2.38-4.444-2.42-2.13-.083-4.103 1.149-4.485 1.149zm2.378-4.534c.808-.976 1.353-2.333 1.205-3.677-1.156.046-2.583.768-3.415 1.745-.733.845-1.353 2.23-1.185 3.542 1.282.099 2.588-.636 3.395-1.61z"/></svg>
                Apple
              </Button>
            </div>
          </div>
        </div>

        <p className="mt-auto pt-10 pb-4 text-center text-xs text-slate-400 font-medium">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}
