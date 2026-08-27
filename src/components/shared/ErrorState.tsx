import { AlertOctagon, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ 
  title = "Something went wrong", 
  message = "We encountered an error loading this data. Please try again.", 
  onRetry 
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center bg-red-50/50 rounded-3xl border border-red-100">
      <AlertOctagon className="h-10 w-10 text-red-500 mb-3" />
      <h3 className="text-base font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-xs font-medium text-slate-600 mb-5 max-w-[250px] leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <Button 
          onClick={onRetry}
          variant="outline"
          className="rounded-xl font-bold px-5 bg-white border-red-200 text-red-600 hover:bg-red-50"
        >
          <RefreshCcw className="h-4 w-4 mr-2" /> Retry
        </Button>
      )}
    </div>
  );
}
