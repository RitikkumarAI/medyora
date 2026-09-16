import { useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  HelpCircle,
  PhoneCall,
  Share2,
  Crown,
  BookOpen,
  Stethoscope,
  FlaskConical,
  Gift,
  Bell,
  ShieldCheck,
  ChevronRight,
  MessageCircle,
  Mail,
  Search,
  Clock,
  ChevronDown,
  CheckCircle2,
  Headphones,
  AlertTriangle,
  FileQuestion,
  Ticket,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { shareContent } from "@/shared/native/nativeShare";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const FAQ_CATEGORIES = [
  {
    id: "appointments",
    title: "Appointments & Live Queue Tokens",
    icon: "🎟️",
    faqs: [
      {
        q: "How does the Digital Token & Live Queue system work?",
        a: "When you book an appointment on Medyora, you receive a digital token number (e.g. #14). You can track live queue status in real-time on your phone, see the current token being examined, and estimate exact wait times so you only leave home when your turn is near.",
      },
      {
        q: "Can I reschedule my appointment on the same day if I am running late?",
        a: "Yes! Go to 'My Appointments' and tap 'Reschedule Today'. You can select any available evening slot for the same doctor with zero cancellation fee.",
      },
      {
        q: "What is the cancellation and refund policy?",
        a: "Prepaid online consultations can be cancelled up to 1 hour before slot time for an instant 100% refund credited back to your Medyora Wallet or original payment method.",
      },
    ],
  },
  {
    id: "video-consult",
    title: "Video Consultations & E-Prescriptions",
    icon: "📹",
    faqs: [
      {
        q: "Are video consultation prescriptions legally valid at pharmacies?",
        a: "Yes. All Medyora video prescriptions are digitally signed by registered MCI/NMC verified doctors with registration numbers, valid at all pharmacies across India under the Telemedicine Practice Guidelines.",
      },
      {
        q: "Is there a free follow-up consultation included?",
        a: "Yes. Every consultation includes 7 days of free follow-up chat or call review with the same doctor for routine query resolutions.",
      },
    ],
  },
  {
    id: "medicines-labs",
    title: "Lab Tests & Medicine Orders",
    icon: "🧪",
    faqs: [
      {
        q: "How is sample collection done for Home Lab Tests?",
        a: "A certified DMLT phlebotomist visits your home at your scheduled morning slot with sterile vacuum tubes and a cold-chain kit. Digital reports are delivered directly to your Medyora Health Locker within 6-12 hours.",
      },
      {
        q: "How quickly are medicines delivered to my doorstep?",
        a: "In metro cities (Bangalore, Delhi NCR, Mumbai, Pune, Hyderabad), express medicine orders are delivered in 2 to 4 hours with up to 20% discount.",
      },
    ],
  },
  {
    id: "surgeries-insurance",
    title: "Surgical Care & Cashless Insurance",
    icon: "🏥",
    faqs: [
      {
        q: "Does Medyora support 100% Cashless Insurance claims?",
        a: "Yes. Our insurance team handles pre-authorization, TPA documentation, and cashless claims for all major health insurers (Star Health, Care, HDFC Ergo, ICICI Lombard, Max Bupa, etc.).",
      },
      {
        q: "Is 0% No-Cost EMI available for elective surgeries?",
        a: "Yes. We offer 0% interest EMI options with flexible repayment tenures from 3 to 18 months.",
      },
    ],
  },
];

export function HelpCenter() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<string | null>("appointments-0");
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");

  const handleShareApp = () => {
    shareContent({
      title: "Medyora — Healthcare Super App",
      text: "Book top doctors, track live OPD queue, and get lab tests at home with Medyora!",
      url: window.location.origin,
    });
  };

  const handleRaiseTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketDescription.trim()) {
      toast.error("Please fill in both subject and description.");
      return;
    }
    toast.success(
      "Support ticket #MY-89421 created! Our Care Manager will contact you in 15 mins.",
    );
    setIsTicketModalOpen(false);
    setTicketSubject("");
    setTicketDescription("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20 font-sans transition-colors">
      {/* ================= HERO SECTION ================= */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold">
            <Headphones className="h-3.5 w-3.5 text-blue-400" />
            <span>24/7 Medyora Patient Support & Care Desk</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight max-w-3xl mx-auto">
            How can we help you today?
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Find quick answers to common questions about doctor bookings, token queue, test reports,
            and insurance claims.
          </p>

          {/* Search Input Box */}
          <div className="max-w-2xl mx-auto relative pt-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 mt-1" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics (e.g. refund, token tracking, prescription, cashless claims)..."
              className="h-13 pl-12 pr-4 rounded-2xl bg-white/10 border-white/20 text-white placeholder:text-slate-400 text-xs sm:text-sm backdrop-blur-md focus-visible:ring-blue-500"
            />
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTAINER ================= */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* ================= 4 QUICK ACTION CARDS ================= */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">WhatsApp Support</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Chat with our 24/7 virtual assistant & live care agent
              </p>
            </div>
            <Button
              onClick={() => toast.success("Opening Medyora WhatsApp Support Desk...")}
              size="sm"
              className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
            >
              Chat on WhatsApp →
            </Button>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
              <PhoneCall className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Toll-Free Helpline
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Available 24 hours a day for immediate booking support
              </p>
            </div>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="w-full rounded-xl border-blue-200 text-blue-700 font-bold text-xs"
            >
              <a href="tel:18002008899">Call 1800-200-8899</a>
            </Button>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
              <Ticket className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Raise a Ticket</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Submit billing, refund, or clinic feedback request
              </p>
            </div>
            <Button
              onClick={() => setIsTicketModalOpen(true)}
              size="sm"
              className="w-full rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs"
            >
              Create New Ticket
            </Button>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-rose-50 dark:bg-rose-950 text-rose-600 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Emergency SOS</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Immediate 112/108 ambulance dispatch and 24/7 ERs
              </p>
            </div>
            <Button
              asChild
              size="sm"
              className="w-full rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs"
            >
              <Link to="/patient/care-ai">Emergency Care AI →</Link>
            </Button>
          </div>
        </section>

        {/* ================= FREQUENTLY ASKED QUESTIONS ================= */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <FileQuestion className="h-5 w-5 text-blue-600" />
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Detailed guides on managing your bookings, live tokens, health records & refunds
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {FAQ_CATEGORIES.map((category) => (
              <div
                key={category.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4"
              >
                <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{category.icon}</span>
                  <span>{category.title}</span>
                </h3>

                <div className="space-y-2">
                  {category.faqs.map((faq, idx) => {
                    const faqKey = `${category.id}-${idx}`;
                    const isOpen = openFaqIndex === faqKey;

                    return (
                      <div
                        key={idx}
                        className="rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : faqKey)}
                          className="w-full flex items-center justify-between p-3.5 text-left bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-50 font-bold text-xs text-slate-900 dark:text-white"
                        >
                          <span>{faq.q}</span>
                          <ChevronDown
                            className={`h-4 w-4 text-slate-400 shrink-0 transition-transform ${
                              isOpen ? "rotate-180 text-blue-600" : ""
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="p-3.5 text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 leading-relaxed font-normal">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ================= RAISE SUPPORT TICKET MODAL ================= */}
      <AnimatePresence>
        {isTicketModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 p-6"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="h-10 w-10 rounded-2xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
                    <Ticket className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">
                      Raise a Support Ticket
                    </h3>
                    <p className="text-xs text-slate-400">
                      Our Care Team responds in under 15 minutes
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsTicketModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleRaiseTicket} className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-600 dark:text-slate-300 font-bold block">
                    Issue Subject
                  </label>
                  <Input
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    placeholder="e.g. Token queue inquiry, refund status, prescription update"
                    className="h-11 rounded-2xl text-xs"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-600 dark:text-slate-300 font-bold block">
                    Detailed Description
                  </label>
                  <Textarea
                    value={ticketDescription}
                    onChange={(e) => setTicketDescription(e.target.value)}
                    placeholder="Please explain the issue or provide your appointment/order reference..."
                    rows={4}
                    className="rounded-2xl text-xs resize-none"
                    required
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <Button
                    type="button"
                    onClick={() => setIsTicketModalOpen(false)}
                    variant="outline"
                    className="flex-1 h-11 rounded-2xl border-slate-200 dark:border-slate-700 text-xs font-bold"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 h-11 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/20"
                  >
                    Submit Ticket
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
