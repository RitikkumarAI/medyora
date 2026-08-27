import { Link } from "@tanstack/react-router";
import { BadgeCheck, Clock, Home, MapPin } from "lucide-react";
import type { Doctor } from "@/shared/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { StarRating } from "./StarRating";

export function DoctorCardSkeleton() {
  return (
    <div className="card-soft flex gap-4 p-4">
      <Skeleton className="h-20 w-20 rounded-2xl" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-2/5" />
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-9 w-28 rounded-xl" />
      </div>
    </div>
  );
}

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <article className="card-soft flex flex-col gap-4 p-4 transition-shadow hover:shadow-[var(--shadow-float)] sm:flex-row">
      <img
        src={doctor.image}
        alt={`${doctor.fullName}, ${doctor.speciality}`}
        loading="lazy"
        width={160}
        height={160}
        className="h-20 w-20 shrink-0 rounded-2xl object-cover"
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="flex items-center gap-1.5 truncate text-base font-semibold">
              {doctor.fullName}
              {doctor.verified && <BadgeCheck className="size-4 text-primary" />}
            </h3>
            <p className="truncate text-sm text-muted-foreground">
              {doctor.speciality} · {doctor.qualification}
            </p>
          </div>
          <StarRating value={doctor.rating} reviews={doctor.totalReviews} showValue />
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" /> {doctor.experience} yrs experience
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3.5" /> {doctor.clinic.name}, {doctor.city}
          </span>
          {doctor.homeVisit && (
            <span className="inline-flex items-center gap-1">
              <Home className="size-3.5" /> Home visit
            </span>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold">₹{doctor.fee}</span>
            {doctor.availableToday ? (
              <Badge className="bg-success/12 text-success hover:bg-success/12">
                Available today · {doctor.nextSlot}
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-muted text-muted-foreground">
                Next: {doctor.nextSlot}
              </Badge>
            )}
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/doctors/$doctorId" params={{ doctorId: doctor.id }}>
                View profile
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/booking/$doctorId" params={{ doctorId: doctor.id }}>
                Book
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
