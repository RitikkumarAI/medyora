import { createFileRoute } from '@tanstack/react-router'
import { BookingFlow } from '@/modules/patient/appointment/pages/BookingFlow'

export const Route = createFileRoute('/patient/doctor/$doctorId/book')({
  component: BookingFlow,
})
