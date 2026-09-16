import { createFileRoute } from "@tanstack/react-router";
import { DoctorsListing } from "@/modules/patient/doctors/pages/DoctorsListing";

export const Route = createFileRoute("/patient/doctors")({
  component: DoctorsListing,
});
