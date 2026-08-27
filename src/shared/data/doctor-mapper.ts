import type { Database } from "@/integrations/supabase/types";
import type { Doctor } from "@/shared/types";

export type DoctorRow = Database["public"]["Tables"]["doctors"]["Row"];

export function mapDoctor(row: DoctorRow): Doctor {
  return {
    id: row.id,
    fullName: row.full_name,
    name: row.full_name,
    speciality: row.speciality,
    qualification: row.qualification,
    experience: row.experience,
    about: row.about,
    fee: row.fee,
    rating: Number(row.rating),
    totalReviews: row.total_reviews,
    verified: row.verified,
    availableToday: row.available_today,
    homeVisit: row.home_visit,
    languages: row.languages ?? [],
    gender: row.gender === "female" ? "female" : "male",
    city: row.city,
    clinic: {
      id: row.clinic_id,
      name: row.clinic_name,
      address: row.clinic_address,
      area: row.clinic_address,
      city: row.clinic_city,
      pincode: "110001",
      homeVisit: row.home_visit,
      online: true,
      type: "regular",
    },
    image: row.image,
    nextSlot: row.next_slot,
    diseases: [],
    symptoms: [],
    distance: 2.5,
    insuranceAccepted: true,
    isFavorite: false,
    gallery: [],
    timings: ["Mon-Sat: 09:00 AM - 05:00 PM"],
    faqs: [],
    phone: "+91 98765 43210",
  };
}
