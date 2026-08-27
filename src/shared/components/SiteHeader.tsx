import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Globe, Check, Search, User, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES, changeAppLanguage } from "@/i18n";
import { ThemeToggle } from "@/shared/theme/ThemeToggle";
import { platform } from "@/shared/native/platform";
import { useAuth } from "@/shared/auth/useAuth";
import { motion, AnimatePresence } from "framer-motion";

export function SiteHeader() {
  const { t, i18n } = useTranslation();
  const { user, isLoggedIn } = useAuth();
  const [open, setOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const currentLang =
    SUPPORTED_LANGUAGES.find((l) => l.code === i18n.language) || SUPPORTED_LANGUAGES[0];

  const handleSelectLanguage = (code: string) => {
    changeAppLanguage(code);
    setLangMenuOpen(false);
  };

  const handleOpenCommandPalette = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  const navItems = [
    { to: "/doctors", label: t("nav.find_doctors") },
    { to: "/specialities", label: t("nav.specialities") },
    { to: "/patient/care-ai", label: "Care AI ✨" },
    { to: "/patient/feed", label: "Health Feed" },
    { to: "/patient/family", label: t("nav.health_records") },
    { to: "/doctor", label: t("nav.for_doctors") },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-slate-100/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors"
      role="banner"
    >
      <div className="mx-auto flex h-20 w-full max-w-[1536px] items-center justify-between gap-6 px-6 sm:px-10 lg:px-16">
        
        {/* Brand Logo */}
        <Logo />

        {/* Desktop Navigation in Clean Linear Sequence */}
        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex" role="navigation" aria-label="Main Navigation">
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.to}
              className="text-[14px] font-bold text-slate-700 dark:text-slate-200 transition-colors hover:text-blue-600 dark:hover:text-blue-400 relative group py-1 whitespace-nowrap"
              activeProps={{ className: "text-blue-600 dark:text-blue-400 font-extrabold" }}
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Quick Search / Command Palette Trigger */}
          <button
            onClick={handleOpenCommandPalette}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm group"
            aria-label="Open Command Palette Search"
          >
            <Search className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
            <span className="hidden xl:inline">Search...</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-bold bg-white dark:bg-slate-750 text-slate-400 border border-slate-200 dark:border-slate-700 px-1.5 py-0.5 rounded-md shadow-xs">
              {platform.isMacOS ? "⌘K" : "Ctrl+K"}
            </kbd>
          </button>

          {/* Theme Toggle Button */}
          <ThemeToggle variant="ghost" size="icon" />

          {/* Language Switcher */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-full border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
              aria-label="Change language"
              aria-expanded={langMenuOpen}
            >
              <Globe className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span>{currentLang.native}</span>
              <span className="text-[10px] text-slate-400">▼</span>
            </motion.button>

            <AnimatePresence>
              {langMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-48 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xl p-2 z-50 space-y-1"
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleSelectLanguage(lang.code)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                        i18n.language === lang.code
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400 font-bold"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="text-base">{lang.flag}</span>
                        <span>{lang.native}</span>
                      </span>
                      {i18n.language === lang.code && (
                        <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dynamic Auth State: Profile Button vs Login/Signup */}
          {isLoggedIn && user ? (
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to={user.role === "doctor" ? "/doctor" : "/patient/profile"}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all shadow-xs group"
                title="View Profile & Account"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-8 w-8 rounded-xl object-cover border border-blue-200 dark:border-blue-700"
                />
                <div className="text-left pr-1 hidden xl:block">
                  <span className="block text-xs font-bold text-slate-900 dark:text-white leading-none">
                    {user.name.split(" ")[0]}
                  </span>
                  <span className="block text-[10px] text-blue-600 dark:text-blue-400 font-bold leading-tight mt-0.5">
                    {user.role === "doctor" ? "Doctor Portal" : "My Account"}
                  </span>
                </div>
              </Link>
            </motion.div>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="h-10 px-5 rounded-xl border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm"
                >
                  <Link to="/auth/login">{t("nav.login")}</Link>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  asChild
                  size="sm"
                  className="h-10 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/30"
                >
                  <Link to="/auth/login">{t("nav.sign_up")}</Link>
                </Button>
              </motion.div>
            </>
          )}
        </div>

        {/* Mobile View */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle variant="ghost" size="icon" />

          <button
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800"
            aria-label="Select Language"
          >
            <Globe className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span>{currentLang.native}</span>
          </button>

          <Button
            variant="ghost"
            size="icon"
            className="text-slate-700 dark:text-slate-200 rounded-full"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-5 shadow-xl"
          >
            {/* Mobile Search Button */}
            <button
              onClick={() => {
                setOpen(false);
                handleOpenCommandPalette();
              }}
              className="w-full flex items-center justify-between px-4 py-3 mb-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700"
            >
              <span className="flex items-center gap-2">
                <Search className="h-4 w-4 text-blue-600" />
                Search Doctors, Clinics & Queues...
              </span>
              <kbd className="text-[10px] bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-600">
                ⌘K
              </kbd>
            </button>

            <nav className="flex flex-col gap-1.5">
              {navItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5">
              {isLoggedIn && user ? (
                <Link
                  to={user.role === "doctor" ? "/doctor" : "/patient/profile"}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-10 w-10 rounded-xl object-cover border border-blue-300"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{user.name}</p>
                    <p className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">{user.phone} • {user.role === "doctor" ? "Doctor Portal" : "My Account"}</p>
                  </div>
                </Link>
              ) : (
                <>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-center text-xs font-bold rounded-xl h-11 border-slate-200 dark:border-slate-700"
                  >
                    <Link to="/auth/login" onClick={() => setOpen(false)}>
                      {t("nav.login")}
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="w-full justify-center text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white h-11"
                  >
                    <Link to="/auth/login" onClick={() => setOpen(false)}>
                      {t("nav.sign_up")}
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
