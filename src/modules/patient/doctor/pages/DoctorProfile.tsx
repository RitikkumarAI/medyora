import { Link, useRouter, useParams } from "@tanstack/react-router";
import { ArrowLeft, Star, Clock, Users, Heart, MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DOCTORS, REVIEWS } from "@/shared/data/mock";
import { useState } from "react";
import { toast } from "sonner";

export function DoctorProfile() {
  const { doctorId } = useParams({ strict: false });
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [ratingInput, setRatingInput] = useState(5);
  const [reviewText, setReviewText] = useState("");

  const doctor = (DOCTORS.find((d) => d.id === doctorId) || DOCTORS[0])!;

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] pb-24">
      {/* Top Image Section with Overlaid Header */}
      <div className="relative h-[340px] w-full">
        <img src={doctor.image} alt={doctor.fullName} className="w-full h-full object-cover" />
        {/* Header Overlay */}
        <div className="absolute top-0 left-0 right-0 p-4 pt-6 flex items-center justify-between z-10">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.history.back()}
            className="h-10 w-10 rounded-full bg-white/90 backdrop-blur border-none shadow-sm text-slate-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsFavorite(!isFavorite)}
            className="h-10 w-10 rounded-full bg-white/90 backdrop-blur border-none shadow-sm text-slate-700"
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
        </div>
        {/* Gradient overlay for text readability if needed */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <main className="flex-1 -mt-8 relative z-20 bg-white rounded-t-[32px] px-6 pt-8 shadow-sm">
        {/* Title and Speciality */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">{doctor.fullName}</h1>
          <p className="text-blue-600 font-semibold text-sm mt-1">{doctor.speciality}</p>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex-1 flex flex-col items-center justify-center bg-blue-50/50 rounded-2xl p-3 border border-blue-100/50">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mb-2 text-blue-600">
              <Users className="h-5 w-5" />
            </div>
            <span className="text-sm font-bold text-slate-900">1000+</span>
            <span className="text-[10px] font-semibold text-slate-500">Patients</span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center bg-teal-50/50 rounded-2xl p-3 border border-teal-100/50">
            <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center mb-2 text-teal-600">
              <Clock className="h-5 w-5" />
            </div>
            <span className="text-sm font-bold text-slate-900">{doctor.experience}</span>
            <span className="text-[10px] font-semibold text-slate-500">Experience</span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center bg-amber-50/50 rounded-2xl p-3 border border-amber-100/50">
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mb-2 text-amber-600">
              <Star className="h-5 w-5 fill-current" />
            </div>
            <span className="text-sm font-bold text-slate-900">4.9</span>
            <span className="text-[10px] font-semibold text-slate-500">Rating</span>
          </div>
        </div>

        {/* About */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-slate-900 mb-3">About Doctor</h2>
          <p className="text-sm text-slate-500 leading-relaxed font-medium">
            {doctor.fullName} is a highly experienced {doctor.speciality} with over{" "}
            {doctor.experience} years of experience. Dedicated to providing the best patient care
            and specialized in advanced treatments.
          </p>
        </section>

        {/* Working Hours */}
        <section className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Working Hours</h2>
          <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-[#F8FAFC]">
            <span className="text-sm font-bold text-slate-700">Mon - Fri</span>
            <div className="flex items-center gap-2 text-sm font-bold text-blue-600">
              <Clock className="h-4 w-4" />
              09:00 AM - 08:00 PM
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="mb-10 pb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900">Patient Reviews</h2>
            <button
              onClick={() => setShowReviewModal(true)}
              className="text-sm font-bold text-blue-600"
            >
              Write a Review
            </button>
          </div>
          <div className="space-y-4">
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="p-4 rounded-2xl border border-slate-100 bg-white shadow-sm"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{rev.patientName}</h4>
                    <p className="text-[10px] text-slate-400 font-medium">{rev.date}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded text-amber-700">
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                    <span className="text-xs font-bold">{rev.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-600">{rev.comment}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Write Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 backdrop-blur-sm transition-opacity">
          <div className="w-full bg-white rounded-t-[32px] shadow-2xl flex flex-col p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">Write a Review</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowReviewModal(false)}
                className="h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="mb-6 flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRatingInput(star)}
                  className="p-2 transition-transform active:scale-95"
                >
                  <Star
                    className={`h-10 w-10 ${ratingInput >= star ? "fill-amber-400 text-amber-400" : "fill-slate-100 text-slate-200"}`}
                  />
                </button>
              ))}
            </div>

            <div className="mb-6">
              <textarea
                placeholder="Share your experience (optional)"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full h-32 p-4 bg-slate-50 border border-slate-100 rounded-2xl resize-none text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
              ></textarea>
            </div>

            <Button
              onClick={() => {
                toast.success("Review submitted successfully");
                setShowReviewModal(false);
              }}
              className="w-full h-14 rounded-2xl text-[15px] font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/25"
            >
              Submit Review
            </Button>
          </div>
        </div>
      )}

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-xl border-t border-slate-200 z-50 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] pb-safe">
        <Button
          asChild
          className="w-full h-14 rounded-2xl text-[15px] font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/25"
        >
          <Link to={`/patient/doctor/$doctorId/book`} params={{ doctorId: doctor.id }}>
            Book Appointment
          </Link>
        </Button>
      </div>
    </div>
  );
}
