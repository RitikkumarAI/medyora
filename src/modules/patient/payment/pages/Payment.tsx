import { useState } from "react";
import { Link, useRouter, useParams, useSearch } from "@tanstack/react-router";
import { ArrowLeft, CreditCard, Smartphone, Building, Wallet, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DOCTORS } from "@/shared/data/mock";

const PAYMENT_METHODS = [
  { id: "upi", label: "UPI", icon: Smartphone },
  { id: "card", label: "Card", icon: CreditCard },
  { id: "netbanking", label: "Net Banking", icon: Building },
  { id: "wallet", label: "Wallet", icon: Wallet },
];

export function Payment() {
  const { doctorId } = useParams({ strict: false });
  // In a real app, date/time comes from state or search params
  const search = useSearch({ strict: false }) as Record<string, string | undefined>;
  const router = useRouter();

  const doctor = (DOCTORS.find((d) => d.id === doctorId) || DOCTORS[0])!;
  const [selectedMethod, setSelectedMethod] = useState("upi");

  const consultationFee = Number(doctor?.fee || 0);
  const bookingFee = 50;
  const totalAmount = consultationFee + bookingFee;

  return (
    <div className="flex flex-col min-h-screen bg-surface pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur px-4 py-3 shadow-sm flex items-center gap-3 border-b">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.history.back()}
          className="h-10 w-10 shrink-0 -ml-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-bold truncate">Payment Summary</h1>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {/* Doctor Summary Card */}
        <div className="card-soft p-4 flex gap-4 items-center">
          <img
            src={doctor.image}
            alt={doctor.fullName}
            className="w-16 h-16 rounded-xl object-cover shadow-sm"
          />
          <div>
            <h2 className="font-bold text-sm">{doctor.fullName}</h2>
            <p className="text-xs text-primary font-medium">{doctor.speciality}</p>
            <p className="text-[10px] text-muted-foreground mt-1">
              {search?.["date"] || "15 May 2025"}, {search?.["time"] || "10:00 AM"}
            </p>
          </div>
        </div>

        {/* Bill Details */}
        <div className="card-soft p-5 space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground font-medium">Consultation Fee</span>
            <span className="font-bold">₹{consultationFee}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground font-medium">Booking Fee</span>
            <span className="font-bold">₹{bookingFee}</span>
          </div>
          <div className="h-px bg-border my-2" />
          <div className="flex justify-between items-center text-base">
            <span className="font-bold">Total Amount</span>
            <span className="font-bold text-primary text-lg">₹{totalAmount}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="text-sm font-bold mb-3">Select Payment Method</h3>
          <div className="grid grid-cols-2 gap-3">
            {PAYMENT_METHODS.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`flex items-center gap-3 p-4 rounded-2xl border transition-colors ${
                  selectedMethod === method.id
                    ? "bg-primary/5 border-primary shadow-sm"
                    : "bg-background border-border hover:border-primary/30"
                }`}
              >
                <method.icon
                  className={`h-5 w-5 ${selectedMethod === method.id ? "text-primary" : "text-muted-foreground"}`}
                />
                <span
                  className={`text-sm font-semibold ${selectedMethod === method.id ? "text-primary" : ""}`}
                >
                  {method.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t pb-safe flex flex-col items-center gap-3">
        <Button
          asChild
          className="w-full h-14 rounded-2xl text-base font-bold shadow-lg shadow-primary/25"
        >
          <Link to="/booking-success">Pay ₹{totalAmount}</Link>
        </Button>
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
          <ShieldCheck className="h-3.5 w-3.5 text-success" />
          <span>Secure Payment</span>
        </div>
      </div>
    </div>
  );
}
