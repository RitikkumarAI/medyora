import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Printer,
  QrCode,
  User,
  Phone,
  Clock,
  CheckCircle2,
  Sparkles,
  Ticket,
  Stethoscope,
  Building2,
  Calendar,
  Share2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DoctorShell } from "@/shared/components/DoctorShell";
import { DOCTORS } from "@/shared/data/mock";

export const Route = createFileRoute("/doctor/kiosk")({
  head: () => ({
    meta: [
      { title: "Smart Receptionist Kiosk & QR Token Printer — Medyora" },
      { name: "description", content: "Self-service clinic kiosk for walk-in patient token issuance and thermal print receipts." },
    ],
  }),
  component: KioskPage,
});

interface PrintedToken {
  tokenNumber: number;
  patientName: string;
  phone: string;
  doctorName: string;
  cabin: string;
  time: string;
  date: string;
  etaMinutes: number;
}

function KioskPage() {
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [reason, setReason] = useState("General OPD Consultation");
  const [selectedDoctor, setSelectedDoctor] = useState(DOCTORS[0]!.fullName);
  const [printedSlip, setPrintedSlip] = useState<PrintedToken | null>(null);
  const [issuedCount, setIssuedCount] = useState(17);

  const handleGenerateWalkinToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) {
      toast.error("Please enter patient name");
      return;
    }
    if (!phone.trim()) {
      toast.error("Please enter mobile phone number");
      return;
    }

    const nextToken = issuedCount + 1;
    setIssuedCount(nextToken);

    const slip: PrintedToken = {
      tokenNumber: nextToken,
      patientName: patientName.trim(),
      phone: phone.trim(),
      doctorName: selectedDoctor,
      cabin: "Cabin #02 (Ground Floor)",
      time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      etaMinutes: 25,
    };

    setPrintedSlip(slip);
    toast.success(`Walk-in Token #${nextToken} generated successfully!`);
  };

  const handlePrintSlip = () => {
    window.print();
    toast.info("Thermal paper token receipt sent to printer!");
  };

  return (
    <DoctorShell
      title="Clinic Reception Kiosk"
      subtitle="Issue instant walk-in OPD tokens with thermal QR code slips for patients without smartphones"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
        {/* ================= LEFT: KIOSK REGISTRATION FORM ================= */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                <Ticket className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Walk-in Patient Check-in</h2>
                <p className="text-xs text-slate-500">Touch-friendly counter kiosk terminal</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-medium text-slate-400">Today's Walk-in Tokens</span>
              <p className="text-2xl font-black text-blue-600 dark:text-blue-400">#{issuedCount}</p>
            </div>
          </div>

          <form onSubmit={handleGenerateWalkinToken} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="kiosk-name" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Patient Full Name *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="kiosk-name"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="h-12 pl-10 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="kiosk-phone" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Mobile Phone Number *
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="kiosk-phone"
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="h-12 pl-10 rounded-xl"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="kiosk-doctor" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Consulting Doctor
                </Label>
                <select
                  id="kiosk-doctor"
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="w-full h-12 px-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-medium"
                >
                  {DOCTORS.map((d) => (
                    <option key={d.id} value={d.fullName}>
                      {d.fullName} ({d.speciality})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="kiosk-age" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Patient Age
                </Label>
                <Input
                  id="kiosk-age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 45"
                  className="h-12 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="kiosk-reason" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Chief Complaint / Symptoms
              </Label>
              <Input
                id="kiosk-reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Routine BP checkup, viral fever"
                className="h-12 rounded-xl"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 mt-4"
            >
              <Printer className="h-5 w-5" />
              Generate & Print Walk-in Token
            </Button>
          </form>
        </div>

        {/* ================= RIGHT: THERMAL PRINT RECEIPT PREVIEW ================= */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
              Thermal Receipt Paper Preview
            </h3>
            {printedSlip && (
              <Button size="sm" onClick={handlePrintSlip} className="h-8 rounded-lg text-xs font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                <Printer className="h-3.5 w-3.5 mr-1.5" /> Print Thermal Slip
              </Button>
            )}
          </div>

          {printedSlip ? (
            <div className="bg-white text-slate-900 rounded-3xl p-6 shadow-2xl border-4 border-dashed border-slate-300 relative space-y-5 font-mono print:border-none print:shadow-none print:m-0">
              {/* Receipt Header */}
              <div className="text-center border-b-2 border-dashed border-slate-300 pb-4 space-y-1">
                <div className="inline-flex items-center gap-1.5 font-sans font-black text-sm text-blue-600">
                  <Stethoscope className="h-4 w-4" /> MEDYORA CLINIC OPD
                </div>
                <h4 className="text-base font-black tracking-tight">{printedSlip.doctorName}</h4>
                <p className="text-[11px] text-slate-500">Connaught Place Clinic &bull; Reg: MCI-74892</p>
                <p className="text-[10px] text-slate-400">{printedSlip.date} &bull; {printedSlip.time}</p>
              </div>

              {/* Huge Token Box */}
              <div className="text-center py-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-xs font-sans uppercase font-bold text-slate-500">Live Walk-in Token</span>
                <p className="text-6xl font-black tracking-tight text-slate-900 my-1">
                  #{printedSlip.tokenNumber}
                </p>
                <span className="text-xs font-sans text-emerald-700 bg-emerald-100 px-3 py-0.5 rounded-full font-bold">
                  {printedSlip.cabin}
                </span>
              </div>

              {/* Patient Details */}
              <div className="space-y-1 text-xs text-slate-600 border-b-2 border-dashed border-slate-300 pb-4">
                <div className="flex justify-between">
                  <span>Patient:</span>
                  <strong className="text-slate-900">{printedSlip.patientName}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Phone:</span>
                  <strong className="text-slate-900">{printedSlip.phone}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Est. Waiting:</span>
                  <strong className="text-blue-600">~{printedSlip.etaMinutes} mins</strong>
                </div>
              </div>

              {/* QR Code Section */}
              <div className="text-center space-y-2 pt-1">
                <div className="mx-auto w-28 h-28 bg-white p-2 rounded-xl border border-slate-300 shadow-xs flex items-center justify-center">
                  <QrCode className="w-24 h-24 text-slate-900" />
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">
                  Scan QR with your phone to track your token live on your phone without downloading an app!
                </p>
              </div>

              <div className="text-center text-[10px] text-slate-400 pt-2 border-t border-slate-200">
                Thank you for choosing Medyora Health &bull; Powered by Binarize Technologies
              </div>
            </div>
          ) : (
            <div className="bg-slate-100 dark:bg-slate-900/60 rounded-3xl p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 space-y-3">
              <Printer className="h-10 w-10 text-slate-400 mx-auto" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No Slip Generated Yet</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Fill the walk-in registration form to preview and print a thermal paper QR slip for your patient.
              </p>
            </div>
          )}
        </div>
      </div>
    </DoctorShell>
  );
}
