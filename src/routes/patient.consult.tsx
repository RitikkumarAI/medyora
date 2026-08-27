import { createFileRoute } from '@tanstack/react-router'
import { VideoConsultationPage } from '@/modules/patient/consult/pages/VideoConsultationPage'

export const Route = createFileRoute('/patient/consult')({
  component: VideoConsultationPage,
})
