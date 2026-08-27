import { createFileRoute } from '@tanstack/react-router'
import { PatientDetail } from '@/modules/doctor/patients/pages/PatientDetail'

export const Route = createFileRoute('/doctor/patients/$patientId/')({
  component: PatientDetail,
})
