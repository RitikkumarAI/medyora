import { Outlet, createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/shared/components/SiteHeader";
import { SiteFooter } from "@/shared/components/SiteFooter";

export const Route = createFileRoute("/legal")({
  component: LegalLayout,
});

function LegalLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors font-sans overflow-x-hidden max-w-[100vw] w-full">
      <SiteHeader />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 md:py-12 md:px-8">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
