import { createFileRoute } from "@tanstack/react-router";
import { DoctorCompare } from "@/modules/patient/doctor/pages/DoctorCompare";

export const Route = createFileRoute("/patient/compare")({
  component: DoctorCompare,
});
