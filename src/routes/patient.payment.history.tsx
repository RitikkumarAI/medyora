import { createFileRoute } from "@tanstack/react-router";
import { PaymentHistory } from "@/modules/patient/payment/pages/PaymentHistory";

export const Route = createFileRoute("/patient/payment/history")({
  component: PaymentHistory,
});
