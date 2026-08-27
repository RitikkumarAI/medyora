import { createFileRoute } from "@tanstack/react-router";
import { ListOrdered } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionCard, StatCard } from "@/shared/components/AppShell";
import { DoctorShell } from "@/shared/components/DoctorShell";
import { EmptyState } from "@/shared/components/EmptyState";
import { useVisits } from "@/shared/data/doctor-store";

export const Route = createFileRoute("/doctor/queue")({
  head: () => ({
    meta: [
      { title: "Queue Management — MediConnect Doctor" },
      {
        name: "description",
        content:
          "Call the next token, skip no-shows and keep the live clinic queue accurate for waiting patients.",
      },
      { property: "og:title", content: "Queue Management — MediConnect Doctor" },
      { property: "og:description", content: "Run your clinic queue token by token." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: QueuePage,
});

function QueuePage() {
  const { visits, setStatus, callNext } = useVisits();
  const consulting = visits.find((v) => v.status === "Consulting");
  const waiting = visits.filter((v) => v.status === "Waiting");
  const done = visits.filter((v) => v.status === "Completed").length;

  return (
    <DoctorShell
      title="Queue management"
      subtitle="Live clinic queue — patients see these updates instantly"
      actions={
        <Button
          size="sm"
          onClick={() => {
            const next = callNext();
            toast[next ? "success" : "info"](
              next ? `Now calling ${next.patient} (${next.token})` : "No patients left in the queue",
            );
          }}
        >
          Call next
        </Button>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Now consulting" value={consulting?.token ?? "—"} hint={consulting?.patient ?? "Queue idle"} />
        <StatCard label="Waiting" value={String(waiting.length)} hint={`~${waiting.length * 12} min to clear`} />
        <StatCard label="Completed" value={String(done)} hint="Consultations finished today" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <SectionCard title="In the chair">
          {consulting ? (
            <div className="rounded-xl bg-accent p-5">
              <p className="text-sm text-muted-foreground">Token {consulting.token}</p>
              <p className="text-xl font-bold">{consulting.patient}</p>
              <p className="text-sm text-muted-foreground">
                {consulting.age} yrs · {consulting.gender} · {consulting.reason}
              </p>
              <div className="mt-4 flex gap-2">
                <Button
                  size="sm"
                  onClick={() => {
                    setStatus(consulting.id, "Completed");
                    toast.success("Consultation completed");
                  }}
                >
                  Complete
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setStatus(consulting.id, "Skipped");
                    toast("Patient skipped");
                  }}
                >
                  Skip
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Nobody is being consulted. Press “Call next” to bring in the next token.
            </p>
          )}
        </SectionCard>

        <SectionCard title={`Waiting (${waiting.length})`}>
          {waiting.length === 0 ? (
            <EmptyState
              icon={ListOrdered}
              title="Queue is empty"
              message="Every patient scheduled for today has been seen."
            />
          ) : (
            <ul className="divide-y divide-border">
              {waiting.map((v, i) => (
                <li key={v.id} className="flex items-center gap-3 py-3">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-accent text-sm font-semibold text-accent-foreground">
                    {v.token}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{v.patient}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {v.time} · {v.reason}
                    </p>
                  </div>
                  <Badge variant="secondary">{i === 0 ? "Next" : `#${i + 1} in line`}</Badge>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>
      </div>
    </DoctorShell>
  );
}
