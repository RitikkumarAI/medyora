import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/shared/components/EmptyState";
import { DoctorShell } from "@/shared/components/DoctorShell";
import { useVisits, type VisitStatus } from "@/shared/data/doctor-store";

export const Route = createFileRoute("/doctor/schedule")({
  head: () => ({
    meta: [
      { title: "Today's Schedule — MediConnect Doctor" },
      {
        name: "description",
        content:
          "See every appointment booked for today with patient details, visit reason and consultation status.",
      },
      { property: "og:title", content: "Today's Schedule — MediConnect Doctor" },
      { property: "og:description", content: "Your full appointment list for the day." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SchedulePage,
});

const STATUS_VARIANT: Record<VisitStatus, "default" | "secondary" | "outline"> = {
  Consulting: "default",
  Waiting: "secondary",
  Completed: "outline",
  Skipped: "outline",
};

function SchedulePage() {
  const { visits, setStatus, reset } = useVisits();
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <DoctorShell
      title="Today's schedule"
      subtitle={today}
      actions={
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            reset();
            toast.success("Schedule reset for the day");
          }}
        >
          Reset day
        </Button>
      }
    >
      {visits.length === 0 ? (
        <EmptyState
          icon={CalendarDays}
          title="No appointments today"
          message="Patients who book a slot with you will appear here."
        />
      ) : (
        <ul className="space-y-3">
          {visits.map((v) => (
            <li key={v.id} className="card-soft flex flex-wrap items-center gap-4 p-5">
              <div className="w-20 shrink-0">
                <p className="text-sm font-semibold">{v.time}</p>
                <p className="text-xs text-muted-foreground">Token {v.token}</p>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{v.patient}</p>
                <p className="truncate text-sm text-muted-foreground">
                  {v.age} yrs · {v.gender} · {v.reason}
                </p>
              </div>
              <Badge variant={STATUS_VARIANT[v.status]}>{v.status}</Badge>
              <div className="flex gap-2">
                {v.status !== "Completed" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setStatus(v.id, "Completed");
                      toast.success(`${v.patient} marked as completed`);
                    }}
                  >
                    Mark done
                  </Button>
                )}
                {v.status === "Waiting" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setStatus(v.id, "Skipped");
                      toast(`${v.patient} moved to skipped`);
                    }}
                  >
                    Skip
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </DoctorShell>
  );
}
