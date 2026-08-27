import { createFileRoute } from '@tanstack/react-router'
import { DoctorLayout } from '@/modules/doctor/components/DoctorLayout'

export const Route = createFileRoute('/doctor')({
  component: DoctorLayout,
})
