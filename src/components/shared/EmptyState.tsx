import { Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon = <Inbox className="h-12 w-12 text-slate-300" />,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
      <div className="mb-4 bg-slate-50 p-4 rounded-full">{icon}</div>
      <h3 className="text-lg font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-sm font-medium text-slate-500 mb-6 max-w-[250px] leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="rounded-xl font-bold px-6 bg-blue-600 text-white hover:bg-blue-700"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
