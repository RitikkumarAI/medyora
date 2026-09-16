import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value: number;
  size?: number;
  showValue?: boolean;
  reviews?: number;
  className?: string;
}

export function StarRating({ value, size = 16, showValue, reviews, className }: StarRatingProps) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={cn(
            i <= Math.round(value) ? "fill-warning text-warning" : "text-muted-foreground/40",
          )}
        />
      ))}
      {showValue && <span className="ml-1 text-sm font-semibold">{value.toFixed(1)}</span>}
      {reviews !== undefined && <span className="text-xs text-muted-foreground">({reviews})</span>}
    </span>
  );
}
