import { createFileRoute } from "@tanstack/react-router";
import { Payment } from "@/modules/patient/appointment/pages/Payment";

export const Route = createFileRoute("/payment/$doctorId")({
  component: Payment,
});
