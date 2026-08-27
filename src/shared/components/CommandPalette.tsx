import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Search,
  Stethoscope,
  Activity,
  Calendar,
  FileText,
  Users,
  Sun,
  Moon,
  Globe,
  Download,
  Share2,
  Shield,
  LayoutDashboard,
  Heart,
  Sparkles,
} from "lucide-react";
import { useTheme } from "@/shared/theme/ThemeProvider";
import { usePWAInstall } from "@/shared/pwa/usePWAInstall";
import { shareContent } from "@/shared/native/nativeShare";
import { DOCTORS, SPECIALIZATIONS } from "@/shared/data/mock";
import { toast } from "sonner";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, setTheme, toggleTheme } = useTheme();
  const { isInstallable, promptInstall } = usePWAInstall();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    const handleCustomOpen = () => setOpen(true);

    document.addEventListener("keydown", down);
    window.addEventListener("open-command-palette", handleCustomOpen);

    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command, doctor name, symptom, or speciality..." />
      <CommandList className="max-h-[380px] p-2">
        <CommandEmpty>No matching results found.</CommandEmpty>

        {/* AI Healthcare Copilot Group */}
        <CommandGroup heading="Medyora Care AI (24/7 Clinical Assistant)">
          <CommandItem
            onSelect={() =>
              runCommand(() => {
                window.dispatchEvent(new CustomEvent("open-care-ai", { detail: { mode: "chat" } }));
              })
            }
            className="rounded-xl cursor-pointer"
          >
            <Sparkles className="mr-2 h-4 w-4 text-blue-600 animate-pulse" />
            <span className="font-bold">Ask Care AI Doctor Assistant</span>
            <CommandShortcut>⌘ AI</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              runCommand(() => {
                window.dispatchEvent(new CustomEvent("open-care-ai", { detail: { mode: "symptom_checker" } }));
              })
            }
            className="rounded-xl cursor-pointer"
          >
            <Activity className="mr-2 h-4 w-4 text-emerald-600" />
            <span>AI Symptom Triage & Diagnosis</span>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              runCommand(() => {
                window.dispatchEvent(new CustomEvent("open-care-ai", { detail: { mode: "image_analyzer" } }));
              })
            }
            className="rounded-xl cursor-pointer"
          >
            <Stethoscope className="mr-2 h-4 w-4 text-indigo-600" />
            <span>X-Ray, MRI & CT Vision AI</span>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              runCommand(() => {
                window.dispatchEvent(new CustomEvent("open-care-ai", { detail: { mode: "lab_analyzer" } }));
              })
            }
            className="rounded-xl cursor-pointer"
          >
            <FileText className="mr-2 h-4 w-4 text-amber-600" />
            <span>Lab Report OCR Reader</span>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              runCommand(() => {
                window.dispatchEvent(new CustomEvent("open-care-ai", { detail: { mode: "emergency_sos" } }));
              })
            }
            className="rounded-xl cursor-pointer text-rose-600"
          >
            <Shield className="mr-2 h-4 w-4 text-rose-600" />
            <span className="font-bold">Emergency SOS & Nearest Hospital (112/108)</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator className="my-1" />

        {/* Quick Navigation Group */}
        <CommandGroup heading="Navigation">
          <CommandItem
            onSelect={() =>
              runCommand(() => navigate({ to: "/doctors" }))
            }
            className="rounded-xl cursor-pointer"
          >
            <Stethoscope className="mr-2 h-4 w-4 text-blue-600" />
            <span>Find Verified Doctors</span>
            <CommandShortcut>G D</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              runCommand(() => navigate({ to: "/patient/queue" }))
            }
            className="rounded-xl cursor-pointer"
          >
            <Activity className="mr-2 h-4 w-4 text-emerald-600" />
            <span>Live Clinic Queue & Token</span>
            <CommandShortcut>G Q</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              runCommand(() => navigate({ to: "/patient/appointments" }))
            }
            className="rounded-xl cursor-pointer"
          >
            <Calendar className="mr-2 h-4 w-4 text-purple-600" />
            <span>My Appointments</span>
            <CommandShortcut>G A</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              runCommand(() => navigate({ to: "/patient/prescriptions" }))
            }
            className="rounded-xl cursor-pointer"
          >
            <FileText className="mr-2 h-4 w-4 text-amber-600" />
            <span>Digital Prescriptions</span>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              runCommand(() => navigate({ to: "/patient/family" }))
            }
            className="rounded-xl cursor-pointer"
          >
            <Users className="mr-2 h-4 w-4 text-indigo-600" />
            <span>Family Health Records</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator className="my-1" />

        {/* Doctors Quick Search */}
        <CommandGroup heading="Top Doctors">
          {DOCTORS.slice(0, 4).map((doc) => (
            <CommandItem
              key={doc.id}
              onSelect={() =>
                runCommand(() =>
                  navigate({
                    to: "/doctors/$doctorId",
                    params: { doctorId: doc.id },
                  })
                )
              }
              className="rounded-xl cursor-pointer"
            >
              <Heart className="mr-2 h-4 w-4 text-rose-500" />
              <span>{doc.name}</span>
              <span className="ml-2 text-xs text-muted-foreground">({doc.specialty})</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator className="my-1" />

        {/* Specialities */}
        <CommandGroup heading="Medical Specialities">
          {SPECIALIZATIONS.slice(0, 4).map((spec) => (
            <CommandItem
              key={spec.id}
              onSelect={() =>
                runCommand(() =>
                  navigate({
                    to: "/doctors",
                    search: { q: spec.name },
                  })
                )
              }
              className="rounded-xl cursor-pointer"
            >
              <Search className="mr-2 h-4 w-4 text-slate-500" />
              <span>{spec.name}</span>
              <span className="ml-2 text-xs text-muted-foreground">{spec.doctors} doctors</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator className="my-1" />

        {/* Portals & Apps */}
        <CommandGroup heading="Portals">
          <CommandItem
            onSelect={() =>
              runCommand(() => navigate({ to: "/doctor" }))
            }
            className="rounded-xl cursor-pointer"
          >
            <LayoutDashboard className="mr-2 h-4 w-4 text-blue-500" />
            <span>Doctor Practice Portal</span>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              runCommand(() => navigate({ to: "/admin" }))
            }
            className="rounded-xl cursor-pointer"
          >
            <Shield className="mr-2 h-4 w-4 text-indigo-500" />
            <span>Admin Management Console</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator className="my-1" />

        {/* System & Appearance Actions */}
        <CommandGroup heading="Actions & Appearance">
          <CommandItem
            onSelect={() => runCommand(() => toggleTheme())}
            className="rounded-xl cursor-pointer"
          >
            {theme === "dark" ? (
              <Sun className="mr-2 h-4 w-4 text-amber-500" />
            ) : (
              <Moon className="mr-2 h-4 w-4 text-indigo-400" />
            )}
            <span>Toggle Dark / Light Mode</span>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              runCommand(() => navigate({ to: "/auth/language" }))
            }
            className="rounded-xl cursor-pointer"
          >
            <Globe className="mr-2 h-4 w-4 text-teal-500" />
            <span>Change App Language</span>
          </CommandItem>

          {isInstallable && (
            <CommandItem
              onSelect={() => runCommand(() => promptInstall())}
              className="rounded-xl cursor-pointer"
            >
              <Download className="mr-2 h-4 w-4 text-emerald-500" />
              <span>Install Medyora PWA App</span>
            </CommandItem>
          )}

          <CommandItem
            onSelect={() =>
              runCommand(() =>
                shareContent({
                  title: "Medyora Healthcare Platform",
                  url: window.location.href,
                })
              )
            }
            className="rounded-xl cursor-pointer"
          >
            <Share2 className="mr-2 h-4 w-4 text-blue-500" />
            <span>Share This Page Link</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
