import { createFileRoute } from '@tanstack/react-router'
import { SubscriptionsPage } from '@/modules/patient/subscriptions/pages/SubscriptionsPage'

export const Route = createFileRoute('/patient/subscriptions')({
  component: SubscriptionsPage,
})
