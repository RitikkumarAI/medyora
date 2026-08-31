import { useState, type ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  aspectRatio?: string;
}

export function OptimizedImage({
  src,
  alt = "",
  className,
  fallbackSrc = "/Logo.webp",
  aspectRatio,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const finalSrc = hasError || !src ? fallbackSrc : src;

  return (
    <div
      className={cn("relative overflow-hidden bg-slate-100 dark:bg-slate-800", className)}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800" />
      )}
      <img
        src={finalSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        {...props}
      />
    </div>
  );
}
