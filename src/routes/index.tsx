import { createFileRoute } from '@tanstack/react-router'
import { Onboarding } from '@/modules/auth/pages/Onboarding'
import { DesktopLandingPage } from '@/shared/components/DesktopLandingPage'

function IndexPage() {
  return (
    <>
      <div className="hidden lg:block">
        <DesktopLandingPage />
      </div>
      <div className="block lg:hidden">
        <Onboarding />
      </div>
    </>
  );
}

export const Route = createFileRoute('/')({
  component: IndexPage,
})
