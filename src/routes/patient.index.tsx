import { createFileRoute } from "@tanstack/react-router";
import { PatientHome } from "@/modules/patient/home/pages/PatientHome";

export const Route = createFileRoute("/patient/")({
  head: () => ({
    meta: [
      { title: "Home — MediConnect" },
      { name: "description", content: "Find and book doctors near you." },
    ],
  }),
  component: PatientHome,
});
