import { createFileRoute } from "@tanstack/react-router";
import { PatientAppointments } from "@/modules/patient/appointment/pages/PatientAppointments";

export const Route = createFileRoute("/patient/appointments")({
  component: PatientAppointments,
});
