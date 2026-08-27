import type { ReactNode } from "react";
import { CalendarDays, FileSignature, LayoutDashboard, ListOrdered } from "lucide-react";
import { AppShell, type NavItem } from "./AppShell";

export const DOCTOR_NAV: NavItem[] = [
  { to: "/doctor", label: "Dashboard", icon: LayoutDashboard },
  { to: "/doctor/schedule", label: "Schedule", icon: CalendarDays },
  { to: "/doctor/queue", label: "Queue", icon: ListOrdered },
  { to: "/doctor/prescriptions", label: "Prescribe", icon: FileSignature },
];

export function DoctorShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string | undefined;
  actions?: ReactNode | undefined;
  children: ReactNode;
}) {
  return (
    <AppShell title={title} subtitle={subtitle} nav={DOCTOR_NAV} actions={actions}>
      {children}
    </AppShell>
  );
}
