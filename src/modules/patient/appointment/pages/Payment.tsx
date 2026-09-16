import { Link, useRouter, useParams, useSearch } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, CreditCard, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DOCTORS } from "@/shared/data/mock";
import { useState } from "react";

export function Payment() {
  const { doctorId } = useParams({ strict: false });
  const search = useSearch({ strict: false }) as Record<string, string | undefined>;
  const router = useRouter();
  const doctor = (DOCTORS.find((d) => d.id === doctorId) || DOCTORS[0])!;
  const [selectedMethod, setSelectedMethod] = useState("upi");

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#F8FAFC] px-4 pt-6 pb-4 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.history.back()}
          className="h-10 w-10 shrink-0 bg-white shadow-sm border border-slate-100 rounded-full"
        >
          <ArrowLeft className="h-5 w-5 text-slate-700" />
        </Button>
        <h1 className="text-xl font-bold text-slate-900">Payment</h1>
      </header>

      <main className="flex-1 px-6 py-4 space-y-6">
        {/* Summary Card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
            Appointment Summary
          </h2>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img
                src={doctor.image}
                alt={doctor.fullName}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{doctor.fullName}</h3>
                <p className="text-xs text-slate-500 font-medium">{doctor.speciality}</p>
              </div>
            </div>
          </div>
          <div className="bg-[#F8FAFC] rounded-2xl p-4 flex justify-between items-center">
            <div>
              <p className="text-xs text-slate-500 font-bold mb-1">Date & Time</p>
              <p className="text-sm font-bold text-slate-900">
                {search["date"] || "2025-05-14"} • {search["time"] || "10:00 AM"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 font-bold mb-1">Total Fee</p>
              <p className="text-sm font-bold text-blue-600">₹{doctor.fee}</p>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-4">Payment Method</h2>
          <div className="space-y-3">
            {/* UPI */}
            <button
              onClick={() => setSelectedMethod("upi")}
              className={`w-full flex items-center p-4 rounded-2xl border transition-colors ${
                selectedMethod === "upi"
                  ? "border-blue-600 bg-blue-50/50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mr-4">
                <span className="font-bold text-slate-600 text-xs">UPI</span>
              </div>
              <div className="flex-1 text-left">
                <p
                  className={`font-bold text-sm ${selectedMethod === "upi" ? "text-blue-900" : "text-slate-900"}`}
                >
                  Google Pay / PhonePe
                </p>
                <p className="text-xs text-slate-500">Pay via UPI apps</p>
              </div>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  selectedMethod === "upi" ? "text-blue-600" : "border-2 border-slate-300"
                }`}
              >
                {selectedMethod === "upi" && <CheckCircle2 className="h-6 w-6" />}
              </div>
            </button>

            {/* Cards */}
            <button
              onClick={() => setSelectedMethod("card")}
              className={`w-full flex items-center p-4 rounded-2xl border transition-colors ${
                selectedMethod === "card"
                  ? "border-blue-600 bg-blue-50/50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mr-4">
                <CreditCard className="h-5 w-5 text-slate-600" />
              </div>
              <div className="flex-1 text-left">
                <p
                  className={`font-bold text-sm ${selectedMethod === "card" ? "text-blue-900" : "text-slate-900"}`}
                >
                  Credit / Debit Card
                </p>
                <p className="text-xs text-slate-500">Visa, Mastercard, RuPay</p>
              </div>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  selectedMethod === "card" ? "text-blue-600" : "border-2 border-slate-300"
                }`}
              >
                {selectedMethod === "card" && <CheckCircle2 className="h-6 w-6" />}
              </div>
            </button>
          </div>
        </div>

        {/* Secure Note */}
        <div className="flex items-center justify-center gap-2 text-slate-400 mt-8">
          <ShieldCheck className="h-4 w-4" />
          <span className="text-xs font-medium">100% Secure Payment by Razorpay</span>
        </div>
      </main>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 pb-safe">
        <Button
          asChild
          className="w-full h-14 rounded-2xl text-[15px] font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/25"
        >
          <Link to="/patient/appointments">Pay ₹{doctor.fee}</Link>
        </Button>
      </div>
    </div>
  );
}
