import { createFileRoute } from '@tanstack/react-router'
import { PaymentGateway } from '@/modules/patient/payment/pages/PaymentGateway'

export const Route = createFileRoute('/patient/payment/checkout')({
  component: PaymentGateway,
})
