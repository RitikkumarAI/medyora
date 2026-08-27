import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
        <Link to="/" className="text-lg font-bold">
          MediConnect
        </Link>
        <div>
          <h2 className="max-w-sm text-3xl font-bold leading-tight">
            Healthcare that understands you.
          </h2>
          <p className="mt-4 max-w-sm text-sm text-primary-foreground/80">
            Book verified doctors, track live clinic queues and keep every prescription and report
            in one secure place.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-primary-foreground/90">
            <li>· 50,000+ patients served</li>
            <li>· 2,000+ verified doctors</li>
            <li>· Live queue with real wait times</li>
          </ul>
        </div>
        <p className="text-xs text-primary-foreground/70">
          © {new Date().getFullYear()} MediConnect
        </p>
      </div>

      <div className="flex items-center justify-center bg-surface px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
