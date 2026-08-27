import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, CheckCircle2, Clock, Download, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/shared/components/SiteHeader";
import { SiteFooter } from "@/shared/components/SiteFooter";
import { DOCTORS } from "@/shared/data/mock";

export const Route = createFileRoute("/booking-success")({
  validateSearch: (search: Record<string, unknown>): {
    doctorId?: string | undefined;
    date?: string | undefined;
    slot?: string | undefined;
    amount?: number | undefined;
    visitType?: "clinic" | "home" | undefined;
  } => ({
    doctorId: typeof search["doctorId"] === "string" ? (search["doctorId"] as string) : undefined,
    date: typeof search["date"] === "string" ? (search["date"] as string) : undefined,
    slot: typeof search["slot"] === "string" ? (search["slot"] as string) : undefined,
    amount: typeof search["amount"] === "number" ? (search["amount"] as number) : undefined,
    visitType: typeof search["visitType"] === "string" ? (search["visitType"] as "clinic" | "home") : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Appointment Confirmed — MediConnect" },
      {
        name: "description",
        content:
          "Your appointment is confirmed. View your token number, estimated wait time and clinic details.",
      },
      { property: "og:title", content: "Appointment Confirmed — MediConnect" },
      { property: "og:description", content: "Token issued and appointment confirmed." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SuccessPage,
});

function SuccessPage() {
  const { doctorId, date, slot, amount, visitType } = Route.useSearch();
  const doctor = DOCTORS.find((d) => d.id === doctorId) ?? DOCTORS[0]!;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 bg-surface">
        <div className="mx-auto max-w-xl px-4 py-14 sm:px-6">
          <div className="card-soft p-8 text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/12 text-success">
              <CheckCircle2 className="size-8" />
            </span>
            <h1 className="mt-5 text-2xl font-bold">Appointment confirmed</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Your booking with {doctor.fullName} is confirmed. We&apos;ve sent the details to your
              mobile number.
            </p>

            <div className="mt-6 rounded-2xl bg-accent p-5">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Your token</p>
              <p className="text-4xl font-bold text-primary">#12</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Estimated wait time · 25 minutes
              </p>
            </div>

            <dl className="mt-6 space-y-2 text-left text-sm">
              <Row icon={CalendarDays} label="Date" value={date || "Today"} />
              <Row icon={Clock} label="Time" value={slot || doctor.nextSlot} />
              <Row
                icon={visitType === "home" ? Home : CheckCircle2}
                label={visitType === "home" ? "Visit type" : "Clinic"}
                value={visitType === "home" ? "Home visit" : doctor.clinic.name}
              />
              <Row icon={Download} label="Paid" value={`₹${amount || doctor.fee + 67}`} />
            </dl>

            <div className="mt-8 grid gap-2 sm:grid-cols-2">
              <Button asChild variant="hero">
                <Link to="/patient/queue">Track live queue</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/patient/appointments">My appointments</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border px-4 py-3">
      <span className="inline-flex items-center gap-2 text-muted-foreground">
        <Icon className="size-4" /> {label}
      </span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
