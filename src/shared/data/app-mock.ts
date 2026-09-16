function fmtDate(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export interface PatientBookingDetails {
  name: string;
  age?: number | undefined;
  gender?: string | undefined;
  relation?: string | undefined;
  medicalHistory?: string | undefined;
  problemDescription?: string | undefined;
  phone?: string | undefined;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  speciality: string;
  clinic: string;
  city?: string | undefined;
  date: string;
  time: string;
  token: string;
  status: "Confirmed" | "Completed" | "Cancelled";
  amount: number;
  patient: string;
  image: string;
  reference?: string | undefined;
  visitType?: "clinic" | "home" | undefined;
  bookedFor?: "self" | "other" | undefined;
  patientDetails?: PatientBookingDetails | undefined;
  paymentMode?: "online" | "pay_at_clinic" | undefined;
  discount?: number | undefined;
  whatsappNotified?: boolean | undefined;
}

export const APPOINTMENTS: Appointment[] = [
  {
    id: "APT1001",
    doctorId: "dr-rajesh-sharma",
    doctorName: "Dr. Rajesh Sharma",
    speciality: "Cardiologist",
    clinic: "City Heart Clinic",
    date: fmtDate(0),
    time: "10:00 AM",
    token: "#12",
    status: "Confirmed",
    amount: 850,
    patient: "Rahul Sharma",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=200&q=70",
  },
  {
    id: "APT1002",
    doctorId: "dr-neha-verma",
    doctorName: "Dr. Neha Verma",
    speciality: "Gynecologist",
    clinic: "Sunrise Hospital",
    date: fmtDate(2),
    time: "11:30 AM",
    token: "#08",
    status: "Confirmed",
    amount: 650,
    patient: "Sunita Sharma",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=200&q=70",
  },
  {
    id: "APT1003",
    doctorId: "dr-amit-patel",
    doctorName: "Dr. Amit Patel",
    speciality: "Dermatologist",
    clinic: "Healthy Skin Clinic",
    date: fmtDate(-5),
    time: "04:00 PM",
    token: "#15",
    status: "Completed",
    amount: 550,
    patient: "Rahul Sharma",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=70",
  },
  {
    id: "APT1004",
    doctorId: "dr-anjali-mehta",
    doctorName: "Dr. Anjali Mehta",
    speciality: "Dentist",
    clinic: "Dental Care Clinic",
    date: fmtDate(-10),
    time: "09:30 AM",
    token: "#05",
    status: "Cancelled",
    amount: 450,
    patient: "Aarav Sharma",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=70",
  },
];

export const QUEUE = [
  { token: "Token 08", status: "Consulting" as const },
  { token: "Token 09", status: "Completed" as const },
  { token: "Token 10", status: "Completed" as const },
  { token: "Token 11", status: "Completed" as const },
  { token: "Token 12", status: "Your turn" as const },
];

export interface Prescription {
  id: string;
  doctorName: string;
  clinic: string;
  date: string;
  diagnosis: string;
  advice: string;
  medicines: { name: string; dosage: string; duration: string }[];
}

export const PRESCRIPTIONS: Prescription[] = [
  {
    id: "PR-2201",
    doctorName: "Dr. Rajesh Sharma",
    clinic: "City Heart Clinic",
    date: "15 May 2025",
    diagnosis: "High blood pressure",
    advice: "Avoid salty food and stress. Walk 30 minutes daily.",
    medicines: [
      { name: "Tab. Ecosprin AV 75", dosage: "1-0-1", duration: "30 days" },
      { name: "Tab. Amlodipine 5mg", dosage: "1-0-0", duration: "30 days" },
      { name: "Tab. Telmisartan 40mg", dosage: "0-1-0", duration: "15 days" },
    ],
  },
  {
    id: "PR-2198",
    doctorName: "Dr. Neha Verma",
    clinic: "Sunrise Hospital",
    date: "18 Apr 2025",
    diagnosis: "Iron deficiency anaemia",
    advice: "Iron-rich diet, follow up after 6 weeks.",
    medicines: [
      { name: "Tab. Ferrous Ascorbate", dosage: "0-1-0", duration: "45 days" },
      { name: "Cap. Vitamin B12", dosage: "1-0-0", duration: "30 days" },
    ],
  },
];

export const MEDICAL_RECORDS = [
  { id: "MR1", title: "Blood Test Report", date: "10 May 2025", size: "PDF · 2.4 MB" },
  { id: "MR2", title: "X-Ray Chest", date: "05 May 2025", size: "PDF · 1.8 MB" },
  { id: "MR3", title: "MRI Scan Report", date: "01 May 2025", size: "PDF · 3.2 MB" },
  { id: "MR4", title: "Vaccination Certificate", date: "20 Apr 2025", size: "PDF · 1.2 MB" },
];

export const PAYMENTS = [
  {
    id: "#TXN001",
    patient: "Rahul Sharma",
    amount: 750,
    method: "UPI",
    status: "Success",
    date: "15 May 2025",
  },
  {
    id: "#TXN002",
    patient: "Priya Patel",
    amount: 600,
    method: "Card",
    status: "Success",
    date: "15 May 2025",
  },
  {
    id: "#TXN003",
    patient: "Amit Joshi",
    amount: 500,
    method: "Net Banking",
    status: "Success",
    date: "14 May 2025",
  },
  {
    id: "#TXN004",
    patient: "Neha Singh",
    amount: 800,
    method: "Wallet",
    status: "Pending",
    date: "14 May 2025",
  },
  {
    id: "#TXN005",
    patient: "Ankit Verma",
    amount: 750,
    method: "UPI",
    status: "Failed",
    date: "13 May 2025",
  },
];

export const FAMILY_MEMBERS = [
  { id: "F1", name: "Rahul Sharma", relation: "Self", age: 30, blood: "O+" },
  { id: "F2", name: "Sunita Sharma", relation: "Wife", age: 28, blood: "B+" },
  { id: "F3", name: "Aarav Sharma", relation: "Son", age: 6, blood: "O+" },
  { id: "F4", name: "Anaya Sharma", relation: "Daughter", age: 3, blood: "A+" },
];

export const NOTIFICATIONS = [
  {
    id: "N1",
    title: "Appointment confirmed",
    message: "Your appointment with Dr. Rajesh Sharma is confirmed.",
    time: "10m ago",
    type: "success" as const,
  },
  {
    id: "N2",
    title: "Payment successful",
    message: "Your payment of ₹850 was successful.",
    time: "16m ago",
    type: "info" as const,
  },
  {
    id: "N3",
    title: "Queue update",
    message: "Your token #12 is near. Please be ready.",
    time: "35m ago",
    type: "warning" as const,
  },
  {
    id: "N4",
    title: "New prescription",
    message: "Dr. Rajesh Sharma uploaded a new prescription.",
    time: "3h ago",
    type: "info" as const,
  },
];

export const DOCTOR_SCHEDULE = [
  { time: "10:00 AM", patient: "Rahul Sharma", token: "#01", status: "Consulting" },
  { time: "10:30 AM", patient: "Priya Patel", token: "#02", status: "Waiting" },
  { time: "11:00 AM", patient: "Amit Joshi", token: "#03", status: "Waiting" },
  { time: "11:30 AM", patient: "Neha Singh", token: "#04", status: "Waiting" },
];

export const REVENUE_SERIES = [
  { label: "1 May", value: 12000 },
  { label: "5 May", value: 18500 },
  { label: "10 May", value: 15200 },
  { label: "15 May", value: 24800 },
  { label: "20 May", value: 21300 },
  { label: "25 May", value: 28600 },
  { label: "30 May", value: 32400 },
];

export const APPOINTMENTS_SERIES = [
  { label: "Mon", value: 18 },
  { label: "Tue", value: 24 },
  { label: "Wed", value: 21 },
  { label: "Thu", value: 30 },
  { label: "Fri", value: 27 },
  { label: "Sat", value: 34 },
  { label: "Sun", value: 12 },
];

export const ADMIN_DOCTORS = [
  {
    id: "D1",
    name: "Dr. Rajesh Sharma",
    speciality: "Cardiologist",
    experience: "12+ Years",
    status: "Approved" as const,
  },
  {
    id: "D2",
    name: "Dr. Neha Verma",
    speciality: "Gynecologist",
    experience: "10+ Years",
    status: "Approved" as const,
  },
  {
    id: "D3",
    name: "Dr. Amit Patel",
    speciality: "Dermatologist",
    experience: "8+ Years",
    status: "Pending" as const,
  },
  {
    id: "D4",
    name: "Dr. Anjali Mehta",
    speciality: "Dentist",
    experience: "9+ Years",
    status: "Approved" as const,
  },
  {
    id: "D5",
    name: "Dr. Vikram Mehta",
    speciality: "Neurologist",
    experience: "15+ Years",
    status: "Rejected" as const,
  },
];

export const ADMIN_PATIENTS = [
  { id: "P1", name: "Rahul Sharma", phone: "+91 98765 43210", city: "Delhi", appointments: 12 },
  { id: "P2", name: "Priya Patel", phone: "+91 98765 43211", city: "Mumbai", appointments: 8 },
  { id: "P3", name: "Amit Joshi", phone: "+91 98765 43212", city: "Pune", appointments: 5 },
  { id: "P4", name: "Neha Singh", phone: "+91 98765 43213", city: "Kolkata", appointments: 3 },
];

export const COUPONS = [
  { code: "WELCOME10", type: "Percentage", value: "10%", uses: 1240, status: "Active" },
  { code: "HEALTH50", type: "Flat", value: "₹50", uses: 860, status: "Active" },
  { code: "SUMMER25", type: "Percentage", value: "25%", uses: 210, status: "Inactive" },
];

export const BANNERS = [
  { id: "B1", title: "Heart Care Special Offer", status: "Active" },
  { id: "B2", title: "Consult Online, Stay Safe", status: "Active" },
  { id: "B3", title: "Women's Health Care", status: "Active" },
  { id: "B4", title: "Flat 20% Off on All Tests", status: "Inactive" },
];

export const TIME_SLOTS = {
  Morning: ["09:00 AM", "10:00 AM", "11:00 AM", "11:30 AM"],
  Afternoon: ["12:00 PM", "12:30 PM", "01:00 PM", "03:00 PM"],
  Evening: ["05:00 PM", "05:30 PM", "06:00 PM", "07:00 PM"],
};
