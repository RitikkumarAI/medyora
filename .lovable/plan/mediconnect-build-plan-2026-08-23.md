# MediConnect — Build Plan

Healthcare platform for Patients, Doctors and Admins: doctor discovery, appointment booking, live queue, prescriptions, records, payments, and dashboards. Frontend-first, mobile-first, built exactly to the screens in your UI kits (web + mobile) and the PRD workflows.

## One important note on stack

The PRDs ask for Next.js 15 App Router. This workspace runs TanStack Start (React 19 + TypeScript + Vite). Everything else from the spec is kept identically: Tailwind, shadcn/ui, TanStack Query, Zustand, React Hook Form + Zod, Lucide, Framer Motion, feature-driven folders. Only the routing/framework layer differs.

## Design system (Document 4, Part A)

- Primary blue `#2563EB`, emerald secondary, green/orange/red semantic states, white surfaces, `#0F172A` dark background — all as oklch tokens in `src/styles.css`.
- Inter typography, max 3 weights per screen.
- Radii: button 12, input 12, card 18, dialog 20, sheet 24. 8-point spacing grid. Light card shadows only.
- Lucide icons at 20/24/28. Dark mode supported through tokens (no toggle UI in phase 1).

## Architecture

```
src/
  modules/{patient,doctor,admin,auth}/{components,hooks,services,store,types,schemas}
  shared/{components,hooks,services,store,types,constants,config}
  components/ui/           shadcn primitives
  routes/                  route files mapping to screens
```
Mock data lives in `modules/*/services` behind typed service functions so a real API can replace them without touching UI.

## Phases

**Phase 1 — Foundation**
Design tokens, Inter, layout shells (patient bottom nav / doctor bottom nav / admin sidebar), shared UI: Button, Input set, Card, Badge, Avatar, Rating, Tabs, Sheet, Dialog, Toast, Skeleton, EmptyState, ErrorState, Pagination.

**Phase 2 — Public + Auth**
Landing page matching your hero reference (trust bar, headline, search bar with speciality/city/date, feature strip, partner logos), onboarding, language select, login/signup, OTP verify, complete profile, role routing.

**Phase 3 — Patient core**
Home, search + filters + sort + compare, doctor listing, doctor profile (about/experience/clinic/gallery/reviews/slots), booking flow (clinic → date → slot → confirm), payment page, success + token.

**Phase 4 — Patient account**
My appointments (upcoming/completed/cancelled), live queue with token + wait time, prescriptions + detail, medical records, payments & invoices, family members, favourites, notifications, profile settings, help.

**Phase 5 — Doctor**
Dashboard KPIs + today's schedule, appointments, calendar & slot management, queue management, patient details (overview/history/prescriptions/reports), prescription builder, earnings & analytics, reviews, clinic management, settings.

**Phase 6 — Admin**
Dashboard with charts, doctor approvals & management, patient management, appointments, payments & transactions, reports, coupons, banners/CMS, notifications, users & roles, settings.

**Phase 7 — Polish**
Every page gets loading/empty/error states, responsive checks at 360→1920, accessibility pass, per-route SEO metadata, animations.

## Reusable card set

DoctorCard · ClinicCard · AppointmentCard · PaymentCard · NotificationCard · ReviewCard · MedicalRecordCard · AnalyticsCard · DashboardCard · OfferCard — each with loading and empty variants, used everywhere; no bespoke duplicates.

## Out of scope for now

Real backend, payments processing, telemedicine, labs, insurance. Data is typed mock data until you wire your own APIs.

## What I build first if you approve

Phase 1 + Phase 2 in one pass, so you can see the real design system and the landing page immediately.
