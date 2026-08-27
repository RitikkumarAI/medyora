import { createFileRoute } from '@tanstack/react-router'
import { DoctorCalendar } from '@/modules/doctor/schedule/pages/DoctorCalendar'

export const Route = createFileRoute('/doctor/calendar')({
  component: DoctorCalendar,
})
