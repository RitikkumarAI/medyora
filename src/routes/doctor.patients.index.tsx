import { createFileRoute } from "@tanstack/react-router";
import { DoctorPatients } from "@/modules/doctor/patients/pages/DoctorPatients";

export const Route = createFileRoute("/doctor/patients/")({
  component: DoctorPatients,
});
