import { Sun, Moon, Laptop } from "lucide-react";
import { useTheme, type Theme } from "./ThemeProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface ThemeToggleProps {
  variant?: "ghost" | "outline" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showDropdown?: boolean;
}

export function ThemeToggle({
  variant = "outline",
  size = "icon",
  className = "",
  showDropdown = true,
}: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  if (!showDropdown) {
    return (
      <Button
        variant={variant}
        size={size}
        onClick={toggleTheme}
        className={`relative rounded-xl border-slate-200 dark:border-slate-800 transition-colors ${className}`}
        aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
        title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {resolvedTheme === "dark" ? (
            <motion.div
              key="moon"
              initial={{ scale: 0, rotate: 90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="h-4 w-4 text-amber-400" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="h-4 w-4 text-amber-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={`relative rounded-xl border-slate-200 dark:border-slate-800 transition-colors ${className}`}
          aria-label="Toggle theme"
          title="Toggle theme (Light / Dark / System)"
        >
          {resolvedTheme === "dark" ? (
            <Moon className="h-4 w-4 text-amber-400 transition-all" />
          ) : (
            <Sun className="h-4 w-4 text-amber-500 transition-all" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="rounded-2xl p-1.5 shadow-xl border-slate-100 dark:border-slate-800"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold cursor-pointer ${
            theme === "light" ? "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400" : ""
          }`}
        >
          <Sun className="h-4 w-4 text-amber-500" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold cursor-pointer ${
            theme === "dark" ? "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400" : ""
          }`}
        >
          <Moon className="h-4 w-4 text-indigo-400" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold cursor-pointer ${
            theme === "system" ? "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400" : ""
          }`}
        >
          <Laptop className="h-4 w-4 text-slate-500" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
