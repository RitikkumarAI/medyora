import { createFileRoute } from "@tanstack/react-router";
import { DoctorProfile } from "@/modules/patient/doctor/pages/DoctorProfile";

export const Route = createFileRoute("/doctors/$doctorId")({
  component: DoctorProfile,
});
