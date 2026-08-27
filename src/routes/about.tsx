import { createFileRoute } from "@tanstack/react-router";
import { HeartPulse, ShieldCheck, Sparkles, Users } from "lucide-react";
import { SiteHeader } from "@/shared/components/SiteHeader";
import { SiteFooter } from "@/shared/components/SiteFooter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About MediConnect — Our Mission in Digital Healthcare" },
      {
        name: "description",
        content:
          "MediConnect connects patients with verified doctors through instant booking, live queues and digital records. Learn about our mission and values.",
      },
      { property: "og:title", content: "About MediConnect" },
      {
        property: "og:description",
        content: "Why we built a healthcare platform around trust, time and transparency.",
      },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Verified care",
    text: "Every doctor is credential-checked before their profile goes live.",
  },
  {
    icon: HeartPulse,
    title: "Patient first",
    text: "Live queues and honest wait times so nobody loses a day in a waiting room.",
  },
  {
    icon: Users,
    title: "Whole family",
    text: "One account covers everyone at home, with separate records per member.",
  },
  {
    icon: Sparkles,
    title: "Always digital",
    text: "Prescriptions, reports and invoices stay searchable forever.",
  },
];

const STATS = [
  { value: "50,000+", label: "Patients served" },
  { value: "2,000+", label: "Verified doctors" },
  { value: "120+", label: "Cities covered" },
  { value: "4.8/5", label: "Average rating" },
];

function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-surface px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold sm:text-4xl">
              Healthcare should respect your time
            </h1>
            <p className="mt-4 text-muted-foreground">
              MediConnect started with a simple frustration: finding the right doctor took days, and
              seeing them took hours of waiting. We built one platform where discovery, booking,
              queueing, prescriptions and payments live together — for patients, doctors and clinic
              teams alike.
            </p>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6">
          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="card-soft p-6 text-center">
                <p className="text-2xl font-bold text-primary">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-surface px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-2xl font-bold">What we stand for</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {VALUES.map((v) => (
                <div key={v.title} className="card-soft flex gap-4 p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                    <v.icon className="size-5" />
                  </span>
                  <span>
                    <span className="block font-semibold">{v.title}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{v.text}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
