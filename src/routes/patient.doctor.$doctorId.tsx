import { createFileRoute } from "@tanstack/react-router";
import { DoctorProfile } from "@/modules/patient/doctors/pages/DoctorProfile";

export const Route = createFileRoute("/patient/doctor/$doctorId")({
  component: DoctorProfile,
});
