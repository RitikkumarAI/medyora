import { createFileRoute } from '@tanstack/react-router'
import { LiveQueue } from '@/modules/patient/queue/pages/LiveQueue'

export const Route = createFileRoute('/patient/queue')({
  component: LiveQueue,
})
