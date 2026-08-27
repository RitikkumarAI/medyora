import { createFileRoute } from '@tanstack/react-router'
import { SiteHeader } from '@/shared/components/SiteHeader'

export const Route = createFileRoute('/doctor/analytics')({
  component: DoctorAnalytics,
})

function DoctorAnalytics() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl font-bold mb-4">Analytics</h1>
        <p className="text-muted-foreground">Analytics dashboard coming soon.</p>
      </div>
    </div>
  )
}
