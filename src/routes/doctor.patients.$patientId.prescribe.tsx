import { createFileRoute } from "@tanstack/react-router";
import { Prescribe } from "@/modules/doctor/patients/pages/Prescribe";

export const Route = createFileRoute("/doctor/patients/$patientId/prescribe")({
  component: Prescribe,
});
