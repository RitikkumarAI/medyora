# Medyora Development Guidelines

This repository contains the full source code for the **Medyora Healthcare Platform**.

## Code Standards
- **Component Architecture**: Keep modular components in `src/modules/` and shared layout/UI in `src/shared/` and `src/components/`.
- **Styling**: Use Tailwind CSS with dark mode classes (`dark:bg-slate-950`, `dark:bg-slate-900`, `dark:text-white`, `dark:border-slate-800`).
- **Routing**: TanStack Start file-based routing in `src/routes/`. Parent routes must render `<Outlet />`.
- **Type Safety**: Strictly type all API responses and store objects in TypeScript.
