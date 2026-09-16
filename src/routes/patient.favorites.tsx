import { createFileRoute } from "@tanstack/react-router";
import { PatientFavorites } from "@/modules/patient/home/pages/PatientFavorites";

export const Route = createFileRoute("/patient/favorites")({
  component: PatientFavorites,
});
