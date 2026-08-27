import { useState } from "react";
import { useRouter, useParams } from "@tanstack/react-router";
import { ArrowLeft, Plus, X, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function Prescribe() {
  const router = useRouter();
  const { patientId } = useParams({ strict: false });

  const [diagnosis, setDiagnosis] = useState("");
  const [medicines, setMedicines] = useState([
    { name: "", dose: "", frequency: "", duration: "" }
  ]);
  const [notes, setNotes] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const addMedicine = () => {
    setMedicines([...medicines, { name: "", dose: "", frequency: "", duration: "" }]);
  };

  const removeMedicine = (index: number) => {
    if (medicines.length === 1) return;
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const handleMedicineChange = (index: number, field: "name" | "dose" | "frequency" | "duration", value: string) => {
    const newMeds = [...medicines];
    const current = newMeds[index] || { name: "", dose: "", frequency: "", duration: "" };
    newMeds[index] = { ...current, [field]: value };
    setMedicines(newMeds);
  };

  const handleGenerate = () => {
    // Mock save
    setIsSuccess(true);
    toast.success("Prescription Generated Successfully!");
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-600 px-6 text-center">
        <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center mb-8 shadow-2xl">
          <CheckCircle2 className="h-12 w-12 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Prescription Sent!</h1>
        <p className="text-blue-100 font-medium mb-12">The digital prescription has been sent to the patient's app securely.</p>
        
        <div className="w-full space-y-4">
          <Button onClick={() => router.history.back()} className="w-full h-14 rounded-2xl bg-white text-blue-600 font-bold text-[15px] hover:bg-slate-50">
            Back to Patient
          </Button>
          <Button onClick={() => router.navigate({ to: '/doctor' })} variant="outline" className="w-full h-14 rounded-2xl bg-blue-700/50 border-none text-white font-bold text-[15px] hover:bg-blue-700">
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white px-4 pt-6 pb-4 shadow-sm border-b border-slate-100">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.history.back()} className="h-10 w-10 shrink-0 bg-slate-50 border border-slate-100 shadow-sm rounded-full">
            <ArrowLeft className="h-5 w-5 text-slate-700" />
          </Button>
          <h1 className="text-xl font-bold text-slate-900">Write Prescription</h1>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 space-y-6 pb-28">
        
        {/* Diagnosis */}
        <div>
          <h2 className="text-sm font-bold text-slate-900 mb-2">Diagnosis</h2>
          <Input 
            placeholder="e.g., Viral Fever with Pharyngitis" 
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            className="rounded-2xl bg-white border-slate-200 shadow-sm h-14 focus-visible:ring-blue-600"
          />
        </div>

        {/* Medicines */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-slate-900">Medications</h2>
            <button onClick={addMedicine} className="text-xs font-bold text-blue-600 flex items-center">
              <Plus className="h-3 w-3 mr-1" /> Add
            </button>
          </div>
          
          <div className="space-y-4">
            {medicines.map((med, index) => (
              <div key={index} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm relative">
                {medicines.length > 1 && (
                  <button onClick={() => removeMedicine(index)} className="absolute -top-2 -right-2 h-6 w-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                    <X className="h-3 w-3" />
                  </button>
                )}
                
                <div className="space-y-3">
                  <Input 
                    placeholder="Medicine Name (e.g., Paracetamol 500mg)" 
                    value={med.name}
                    onChange={(e) => handleMedicineChange(index, "name", e.target.value)}
                    className="rounded-xl bg-slate-50 border-none h-12"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input 
                      placeholder="Frequency (e.g., 1-0-1)" 
                      value={med.frequency}
                      onChange={(e) => handleMedicineChange(index, "frequency", e.target.value)}
                      className="rounded-xl bg-slate-50 border-none h-12"
                    />
                    <Input 
                      placeholder="Duration (e.g., 5 days)" 
                      value={med.duration}
                      onChange={(e) => handleMedicineChange(index, "duration", e.target.value)}
                      className="rounded-xl bg-slate-50 border-none h-12"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <h2 className="text-sm font-bold text-slate-900 mb-2">Doctor Notes / Advice</h2>
          <textarea 
            placeholder="e.g., Drink plenty of warm water. Rest for 3 days."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full h-32 p-4 bg-white border border-slate-200 shadow-sm rounded-3xl resize-none text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
          ></textarea>
        </div>
      </main>

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 pb-safe z-50 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
        <Button onClick={handleGenerate} className="w-full h-14 rounded-2xl bg-blue-600 text-white font-bold text-[15px] shadow-lg shadow-blue-600/30 hover:bg-blue-700">
          <FileText className="h-5 w-5 mr-2" /> Generate Prescription
        </Button>
      </div>

    </div>
  );
}
