export type UserRole = "patient" | "doctor" | "admin";

export interface Specialization {
  id: string;
  name: string;
  hindiName?: string;
  icon: string;
  image?: string;
  description?: string;
  doctors: number;
  category?: "General Care" | "Advanced Care" | "Specialized Surgery";
  availableToday?: boolean;
}

export interface Clinic {
  id: string;
  name: string;
  address: string;
  area?: string | undefined;
  city: string;
  pincode?: string | undefined;
  homeVisit: boolean;
  online?: boolean | undefined;
  type?: "premium" | "regular" | undefined;
  timings?: string | undefined;
  navigation?: {
    parking: boolean;
    lift: boolean;
    wheelchair: boolean;
    floor: string;
    landmark: string;
    mapsUrl?: string | undefined;
  } | undefined;
}

export type DoctorVerificationLevel = "verified" | "premium" | "top_rated" | "elite";

export interface Doctor {
  id: string;
  fullName: string;
  name?: string | undefined;
  speciality: string;
  qualification?: string | undefined;
  experience: number;
  about?: string | undefined;
  fee: number;
  rating: number;
  totalReviews: number;
  verified: boolean;
  verificationLevel?: DoctorVerificationLevel | undefined;
  availabilityPrediction?: string | undefined;
  videoIntroUrl?: string | undefined;
  multiClinics?: Clinic[] | undefined;
  availableToday: boolean;
  homeVisit: boolean;
  languages: string[];
  gender: "male" | "female";
  city: string;
  clinic: Clinic;
  image: string;
  nextSlot: string;
  diseases?: string[] | undefined;
  symptoms?: string[] | undefined;
  distance?: number | undefined;
  insuranceAccepted?: boolean | undefined;
  isFavorite?: boolean | undefined;
  gallery?: string[] | undefined;
  timings?: string[] | undefined;
  faqs?: { question: string; answer: string }[] | undefined;
  phone?: string | undefined;
  leaveNotice?: string | undefined;
}

export interface Review {
  id: string;
  patientName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Transaction {
  id: string;
  doctorId: string;
  doctorName: string;
  date: string;
  amount: number;
  status: "success" | "failed" | "refunded";
  method: string;
  type: "consultation" | "home_visit";
}
