import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";
import { Search, type LucideIcon } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "@/shared/theme/ThemeToggle";
import { platform } from "@/shared/native/platform";

export interface NavItem {
  to: NonNullable<LinkProps["to"]>;
  label: string;
  icon: LucideIcon;
}

interface AppShellProps {
  title: string;
  subtitle?: string | undefined;
  nav: NavItem[];
  bottomNav?: NavItem[];
  actions?: ReactNode | undefined;
  children: ReactNode;
}

export function AppShell({ title, subtitle, nav, bottomNav, actions, children }: AppShellProps) {
  const mobileNav = bottomNav ?? nav.slice(0, 5);
  const rootTo = nav[0]?.to;

  const handleOpenCommandPalette = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  return (
    <div className="flex min-h-screen bg-surface text-foreground">
      {/* Desktop Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-card px-4 py-6 lg:flex">
        <div className="flex items-center justify-between">
          <Logo />
          <ThemeToggle variant="ghost" size="icon" />
        </div>

        {/* Command Search Quick Button */}
        <button
          onClick={handleOpenCommandPalette}
          className="mt-6 flex items-center justify-between px-3 py-2 rounded-xl bg-accent/60 text-xs font-semibold text-muted-foreground hover:bg-accent transition-colors"
        >
          <span className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5" />
            Quick search
          </span>
          <kbd className="text-[10px] bg-card px-1.5 py-0.5 rounded border border-border">
            {platform.isMacOS ? "⌘K" : "Ctrl+K"}
          </kbd>
        </button>

        <nav className="mt-4 flex flex-1 flex-col gap-1 overflow-y-auto" role="navigation" aria-label="Portal Sidebar">
          {nav.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              activeOptions={{ exact: item.to === rootTo }}
              activeProps={{ className: "bg-accent text-accent-foreground font-semibold" }}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
            >
              <item.icon className="size-5" />
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/"
          className="mt-4 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          ← Back to site
        </Link>
      </aside>

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col pb-20 lg:pb-0">
        <header className="sticky top-0 z-40 flex items-center justify-between gap-4 border-b border-border bg-background/90 px-4 py-4 backdrop-blur sm:px-6">
          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold sm:text-xl">{title}</h1>
            {subtitle && <p className="truncate text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2">
            {actions}
            <div className="lg:hidden">
              <ThemeToggle variant="ghost" size="icon" />
            </div>
          </div>
        </header>

        <main id="main-content" tabIndex={-1} className="flex-1 px-4 py-6 sm:px-6 focus:outline-none">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed inset-x-0 bottom-0 z-50 flex border-t border-border bg-card/95 backdrop-blur pb-safe lg:hidden">
        {mobileNav.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            activeOptions={{ exact: item.to === rootTo }}
            activeProps={{ className: "text-primary font-bold" }}
            className="flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-muted-foreground"
          >
            <item.icon className="size-5" />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string;
  value: string;
  hint?: string;
  icon?: LucideIcon;
}) {
  return (
    <div className="card-soft p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-muted-foreground">{label}</p>
        {Icon && (
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-accent-foreground">
            <Icon className="size-5" />
          </span>
        )}
      </div>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function SectionCard({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="card-soft p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
