/**
 * Medyora Healthcare Super App Data Repository
 * Comprehensive mock data for Lab Tests, Pharmacy, Subscriptions, Surgeries, Community Q&A, and Care AI.
 */

// ================= 1. LAB TESTS & PACKAGES =================
export interface LabTest {
  id: string;
  name: string;
  category: string;
  description: string;
  parametersCount: number;
  fastingRequired: boolean;
  sampleType: string;
  reportTimeHours: number;
  originalPrice: number;
  discountedPrice: number;
  popular?: boolean;
}

export interface HealthPackage {
  id: string;
  name: string;
  testsCount: number;
  targetGender?: "All" | "Men" | "Women";
  targetAge?: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  testsIncluded: string[];
  badge?: string;
  image: string;
}

export const LAB_TESTS: LabTest[] = [
  {
    id: "test-thyroid-profile",
    name: "Thyroid Profile (T3, T4, TSH)",
    category: "Hormone",
    description: "Evaluates thyroid gland function and metabolic hormone levels.",
    parametersCount: 3,
    fastingRequired: true,
    sampleType: "Blood",
    reportTimeHours: 12,
    originalPrice: 650,
    discountedPrice: 420,
    popular: true,
  },
  {
    id: "test-cbc",
    name: "Complete Blood Count (CBC)",
    category: "Hematology",
    description: "Measures red cells, white cells, platelets, and hemoglobin to detect anemia and infections.",
    parametersCount: 24,
    fastingRequired: false,
    sampleType: "Blood",
    reportTimeHours: 8,
    originalPrice: 450,
    discountedPrice: 330,
    popular: true,
  },
  {
    id: "test-lipid-profile",
    name: "Lipid Profile (Cholesterol)",
    category: "Cardiac",
    description: "Checks good HDL, bad LDL, triglycerides and cardiovascular risk indicators.",
    parametersCount: 8,
    fastingRequired: true,
    sampleType: "Blood",
    reportTimeHours: 12,
    originalPrice: 850,
    discountedPrice: 499,
    popular: true,
  },
  {
    id: "test-vitamin-d",
    name: "Vitamin D (25-OH)",
    category: "Vitamins",
    description: "Detects vitamin D deficiency linked to bone weakness, fatigue and low immunity.",
    parametersCount: 1,
    fastingRequired: false,
    sampleType: "Blood",
    reportTimeHours: 24,
    originalPrice: 1400,
    discountedPrice: 799,
    popular: true,
  },
  {
    id: "test-vitamin-b12",
    name: "Vitamin B12 Level",
    category: "Vitamins",
    description: "Crucial for nerve health, brain function and red blood cell production.",
    parametersCount: 1,
    fastingRequired: false,
    sampleType: "Blood",
    reportTimeHours: 24,
    originalPrice: 1100,
    discountedPrice: 649,
    popular: false,
  },
  {
    id: "test-liver-function",
    name: "Liver Function Test (LFT)",
    category: "Hepatic",
    description: "Assesses liver enzymes, bilirubin and protein synthesis.",
    parametersCount: 11,
    fastingRequired: true,
    sampleType: "Blood",
    reportTimeHours: 12,
    originalPrice: 900,
    discountedPrice: 550,
    popular: true,
  },
  {
    id: "test-hba1c",
    name: "HbA1c (Glycated Hemoglobin)",
    category: "Diabetes",
    description: "Average blood sugar control over the past 3 months.",
    parametersCount: 2,
    fastingRequired: false,
    sampleType: "Blood",
    reportTimeHours: 8,
    originalPrice: 600,
    discountedPrice: 399,
    popular: true,
  },
  {
    id: "test-kidney-function",
    name: "Kidney Function Test (KFT / RFT)",
    category: "Renal",
    description: "Tests creatinine, urea, BUN, and electrolytes for renal health.",
    parametersCount: 9,
    fastingRequired: false,
    sampleType: "Blood",
    reportTimeHours: 12,
    originalPrice: 850,
    discountedPrice: 520,
    popular: false,
  },
];

export const HEALTH_PACKAGES: HealthPackage[] = [
  {
    id: "pkg-vitamin-deficiency",
    name: "Vitamin Deficiency Package",
    testsCount: 5,
    description: "Comprehensive check for Vitamin D, B12, Calcium, Iron and CBC.",
    originalPrice: 2200,
    discountedPrice: 899,
    badge: "55% OFF",
    testsIncluded: ["Vitamin D (25-OH)", "Vitamin B12", "Calcium Total", "Iron Studies", "Complete Blood Count"],
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "pkg-advanced-full-body",
    name: "Advanced Full Body Checkup",
    testsCount: 96,
    description: "Complete wellness screening covering heart, liver, kidney, vitamins, thyroid, and blood count.",
    originalPrice: 5400,
    discountedPrice: 2599,
    badge: "Bestseller",
    testsIncluded: [
      "Thyroid Profile (3 tests)",
      "Lipid Profile (8 tests)",
      "Liver Function (11 tests)",
      "Kidney Function (9 tests)",
      "CBC (24 tests)",
      "HbA1c & Blood Glucose",
      "Vitamin D & B12",
      "Urine Routine (20 tests)",
    ],
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "pkg-comprehensive-diabetes",
    name: "Comprehensive Diabetes Care",
    testsCount: 42,
    description: "Essential package for diabetic management, organ health, and lipid control.",
    originalPrice: 3200,
    discountedPrice: 1499,
    badge: "Popular",
    testsIncluded: ["HbA1c", "Fasting Blood Sugar", "Lipid Profile", "Kidney Function Test", "Microalbumin Urine"],
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "pkg-women-wellness",
    name: "Women's Health & Wellness",
    testsCount: 78,
    targetGender: "Women",
    description: "Tailored screening for hormone balance, thyroid, anemia, bone health, and vitamins.",
    originalPrice: 4800,
    discountedPrice: 2199,
    badge: "Specialized",
    testsIncluded: ["Thyroid Full Profile", "Iron & Ferritin", "Vitamin D3", "Calcium", "CBC", "LFT", "KFT", "Lipids"],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "pkg-senior-citizen",
    name: "Senior Citizen Health Shield",
    testsCount: 88,
    targetAge: "50+ years",
    description: "Specialized geriatric package covering arthritis, cardiac risks, kidney, and vital organs.",
    originalPrice: 5900,
    discountedPrice: 2899,
    badge: "Senior Care",
    testsIncluded: ["Cardiac Risk Markers", "Rheumatoid Factor", "Bone Profile", "LFT", "KFT", "Lipids", "CBC", "Electrolytes"],
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=400&q=80",
  },
];

// ================= 2. MEDICINES & PHARMACY =================
export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  category: "Pain Relief" | "Vitamins" | "Healthcare" | "Baby Care" | "Diabetes" | "Antibiotics" | "Skin Care";
  dosageForm: "Tablet" | "Syrup" | "Capsule" | "Cream" | "Drops";
  packSize: string;
  manufacturer: string;
  mrp: number;
  discountedPrice: number;
  prescriptionRequired: boolean;
  inStock: boolean;
  image: string;
}

export const MEDICINES: Medicine[] = [
  {
    id: "med-paracetamol-650",
    name: "Dolo 650mg Tablet",
    genericName: "Paracetamol (650mg)",
    category: "Pain Relief",
    dosageForm: "Tablet",
    packSize: "Strip of 15 tablets",
    manufacturer: "Micro Labs Ltd",
    mrp: 35,
    discountedPrice: 28,
    prescriptionRequired: false,
    inStock: true,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "med-vitamin-c",
    name: "Limcee 500mg Chewable Tablet",
    genericName: "Vitamin C & Ascorbic Acid (500mg)",
    category: "Vitamins",
    dosageForm: "Tablet",
    packSize: "Strip of 15 chewable tablets",
    manufacturer: "Abbott",
    mrp: 28,
    discountedPrice: 22,
    prescriptionRequired: false,
    inStock: true,
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "med-amoxicillin-500",
    name: "Augmentin 625 Duo Tablet",
    genericName: "Amoxicillin (500mg) + Clavulanic Acid (125mg)",
    category: "Antibiotics",
    dosageForm: "Tablet",
    packSize: "Strip of 10 tablets",
    manufacturer: "GlaxoSmithKline",
    mrp: 215,
    discountedPrice: 172,
    prescriptionRequired: true,
    inStock: true,
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "med-cetirizine-10",
    name: "Cetzine 10mg Tablet",
    genericName: "Cetirizine (10mg)",
    category: "Healthcare",
    dosageForm: "Tablet",
    packSize: "Strip of 10 tablets",
    manufacturer: "Dr Reddy's Labs",
    mrp: 24,
    discountedPrice: 19,
    prescriptionRequired: false,
    inStock: true,
    image: "https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "med-omega-3",
    name: "Seven Seas Original Cod Liver Oil",
    genericName: "Omega-3 Fatty Acids + Vitamin A & D",
    category: "Vitamins",
    dosageForm: "Capsule",
    packSize: "Bottle of 100 capsules",
    manufacturer: "P&G Health",
    mrp: 380,
    discountedPrice: 304,
    prescriptionRequired: false,
    inStock: true,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "med-baby-lotion",
    name: "Sebamed Baby Gentle Protective Lotion",
    genericName: "Baby Moisturizer pH 5.5",
    category: "Baby Care",
    dosageForm: "Cream",
    packSize: "200 ml bottle",
    manufacturer: "Sebapharma",
    mrp: 520,
    discountedPrice: 442,
    prescriptionRequired: false,
    inStock: true,
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=300&q=80",
  },
];

export const MEDICINE_CATEGORIES = [
  { id: "pain", name: "Pain Relief", icon: "Zap", color: "from-amber-500 to-orange-500" },
  { id: "vitamins", name: "Vitamins", icon: "Sparkles", color: "from-emerald-500 to-teal-500" },
  { id: "healthcare", name: "Healthcare", icon: "Shield", color: "from-blue-500 to-indigo-500" },
  { id: "baby", name: "Baby Care", icon: "Heart", color: "from-pink-500 to-rose-500" },
  { id: "skin", name: "Skin Care", icon: "Smile", color: "from-purple-500 to-violet-500" },
  { id: "diabetes", name: "Diabetes", icon: "Activity", color: "from-cyan-500 to-blue-500" },
];

export const MEDICINES_DATA = MEDICINES;

// ================= 3. SUBSCRIPTION PLANS (CARE & PLUS) =================
export interface SubscriptionPlan {
  id: string;
  name: string;
  tagline: string;
  pricePerYear: number;
  monthlyEquivalent: number;
  highlightBadge?: string;
  isPopular?: boolean;
  benefits: string[];
  includedInPersonVisits: number;
  includedVideoConsults: number;
  familyMembersCovered: string;
  specialitiesCovered: number;
  discountPercentage: number;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "medyora-care",
    name: "Medyora Care Plan",
    tagline: "Total Family Healthcare Protection",
    pricePerYear: 2349,
    monthlyEquivalent: 195,
    highlightBadge: "Most Popular",
    isPopular: true,
    benefits: [
      "12 free in-person appointments every year",
      "36 free unlimited video consultations with specialists",
      "Covers up to 4 adults & 2 children",
      "Across all 22+ medical specialities",
      "20% off all Lab Tests and Medicine orders",
      "Priority Live Clinic Queue pass",
      "24/7 dedicated doctor on call",
    ],
    includedInPersonVisits: 12,
    includedVideoConsults: 36,
    familyMembersCovered: "4 Adults + 2 Children",
    specialitiesCovered: 22,
    discountPercentage: 20,
  },
  {
    id: "medyora-plus",
    name: "Medyora PLUS",
    tagline: "Premium Unlimited Health Concierge",
    pricePerYear: 2999,
    monthlyEquivalent: 249,
    highlightBadge: "VIP Access",
    isPopular: false,
    benefits: [
      "24 free in-person appointments per year",
      "Unlimited 24/7 video consultations",
      "Full family coverage (up to 8 members)",
      "Free annual comprehensive health checkup for 2",
      "30% discount on Lab Tests & Diagnostics",
      "Free medicine home delivery within 2 hours",
      "Dedicated personal Care Manager",
    ],
    includedInPersonVisits: 24,
    includedVideoConsults: 999,
    familyMembersCovered: "Up to 8 Family Members",
    specialitiesCovered: 35,
    discountPercentage: 30,
  },
];

// ================= 4. SURGERIES & ESTIMATES =================
export interface SurgeryProcedure {
  id: string;
  name: string;
  speciality: string;
  category: "Day Care" | "General" | "Laser" | "Cosmetic";
  hospitalStayDays: string;
  recoveryDays: string;
  minPrice: number;
  maxPrice: number;
  emiStartsFrom: number;
  insuranceCovered: boolean;
  description: string;
  image: string;
}

export const SURGERIES: SurgeryProcedure[] = [
  {
    id: "surg-cataract",
    name: "Laser Cataract Eye Surgery",
    speciality: "Ophthalmology",
    category: "Day Care",
    hospitalStayDays: "Same Day Discharge",
    recoveryDays: "2-3 Days",
    minPrice: 22000,
    maxPrice: 48000,
    emiStartsFrom: 1850,
    insuranceCovered: true,
    description: "Blade-free robotic laser cataract removal with advanced multifocal IOL lens placement.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "surg-lasik",
    name: "Customised Contoura LASIK",
    speciality: "Ophthalmology",
    category: "Laser",
    hospitalStayDays: "Day Care (2 hours)",
    recoveryDays: "24 Hours",
    minPrice: 35000,
    maxPrice: 75000,
    emiStartsFrom: 2900,
    insuranceCovered: false,
    description: "Permanent specs removal using topographic laser mapping for 20/20 HD vision.",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "surg-knee-replacement",
    name: "Robotic Knee Replacement",
    speciality: "Orthopaedics",
    category: "General",
    hospitalStayDays: "2-3 Days",
    recoveryDays: "3-4 Weeks",
    minPrice: 120000,
    maxPrice: 220000,
    emiStartsFrom: 8500,
    insuranceCovered: true,
    description: "Sub-millimeter robotic precision knee arthroplasty with minimal tissue damage and swift walking.",
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "surg-hernia",
    name: "Laparoscopic Hernia Repair",
    speciality: "General Surgery",
    category: "Day Care",
    hospitalStayDays: "1 Day",
    recoveryDays: "5-7 Days",
    minPrice: 42000,
    maxPrice: 78000,
    emiStartsFrom: 3200,
    insuranceCovered: true,
    description: "Keyhole incision mesh placement for inguinal or umbilical hernia with low recurrence.",
    image: "https://images.unsplash.com/photo-1551076805-e18690c5e531?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "surg-kidney-stone",
    name: "Laser Kidney Stone Removal (RIRS)",
    speciality: "Urology",
    category: "Laser",
    hospitalStayDays: "Same Day Discharge",
    recoveryDays: "2-3 Days",
    minPrice: 38000,
    maxPrice: 68000,
    emiStartsFrom: 3100,
    insuranceCovered: true,
    description: "Flexible retrograde laser dusting of renal calculi without any external cuts.",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=400&q=80",
  },
];

// ================= 5. FREE EXPERT Q&A & COMMUNITY =================
export interface CommunityQuestion {
  id: string;
  category: string;
  question: string;
  askedBy: string;
  askedTime: string;
  viewsCount: number;
  likesCount: number;
  commentsCount: number;
  isAnswered: boolean;
  doctorAnswer?: {
    doctorName: string;
    speciality: string;
    avatar: string;
    verified: boolean;
    answerText: string;
    answeredAt: string;
  };
}

export const COMMUNITY_QUESTIONS: CommunityQuestion[] = [
  {
    id: "q-hair-loss",
    category: "Skin",
    question: "I have hair fall and hair thinning issue from last 3 months. What should I do?",
    askedBy: "Priya Sharma",
    askedTime: "12h ago",
    viewsCount: 234,
    likesCount: 42,
    commentsCount: 24,
    isAnswered: true,
    doctorAnswer: {
      doctorName: "Dr. Rakesh Gupta",
      speciality: "Dermatologist & Trichologist",
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&q=80",
      verified: true,
      answerText:
        "Telogen effluvium or nutritional deficiencies (Vitamin D, Ferritin, Biotin) are the most common causes. Get a serum ferritin and Vitamin D blood panel done. In the interim, avoid harsh sulfate shampoos, eat protein-rich foods, and consult a dermatologist for topical peptide therapy.",
      answeredAt: "10h ago",
    },
  },
  {
    id: "q-acne-pimples",
    category: "Skin",
    question: "I have acne and pimples on my face. Please suggest some good treatment.",
    askedBy: "Ananya Iyer",
    askedTime: "1d ago",
    viewsCount: 412,
    likesCount: 68,
    commentsCount: 31,
    isAnswered: true,
    doctorAnswer: {
      doctorName: "Dr. Kavita Rao",
      speciality: "Dermatologist",
      avatar: "https://images.unsplash.com/photo-1594824813589-3c72b22b1049?auto=format&fit=crop&w=150&q=80",
      verified: true,
      answerText:
        "Start with a gentle 2% Salicylic acid face wash twice daily. Use a non-comedogenic gel moisturizer. If active cystic acne persists, a dermatologist may prescribe topical clindamycin or adapalene. Never pop active pimples.",
      answeredAt: "20h ago",
    },
  },
  {
    id: "q-paracetamol-pregnancy",
    category: "Women's Health",
    question: "Is it safe to take paracetamol during pregnancy for mild headache and fever?",
    askedBy: "Neha Verma",
    askedTime: "1d ago",
    viewsCount: 580,
    likesCount: 94,
    commentsCount: 45,
    isAnswered: true,
    doctorAnswer: {
      doctorName: "Dr. Priya Mehta",
      speciality: "Obstetrician & Gynecologist",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80",
      verified: true,
      answerText:
        "Paracetamol (500mg or 650mg) is generally considered the safest analgesic during pregnancy for fever or mild pain when taken at the lowest effective dose for the shortest duration. Avoid NSAIDs like Ibuprofen. If fever persists over 100°F, consult your OB-GYN immediately.",
      answeredAt: "22h ago",
    },
  },
  {
    id: "q-knee-click",
    category: "Trending",
    question: "My knees make clicking sound when I do squats or climb stairs. There is no pain. Should I worry?",
    askedBy: "Vikram Sen",
    askedTime: "2d ago",
    viewsCount: 320,
    likesCount: 51,
    commentsCount: 18,
    isAnswered: true,
    doctorAnswer: {
      doctorName: "Dr. Amit Verma",
      speciality: "Senior Orthopedic Surgeon",
      avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=150&q=80",
      verified: true,
      answerText:
        "Painless knee crepitus is usually caused by gas bubbles bursting in the synovial fluid or tendons shifting over bony ridges. It is completely benign. However, strengthen quadriceps and hamstrings to support the patella.",
      answeredAt: "1d ago",
    },
  },
];

// ================= 6. VIDEO CONSULTATIONS =================
export interface VideoConsultation {
  id: string;
  doctorId?: string | undefined;
  doctorName: string;
  speciality: string;
  qualification: string;
  doctorImage: string;
  appointmentDate: string;
  appointmentTime: string;
  status: "upcoming" | "completed" | "cancelled";
  meetingId: string;
  hasPrescription: boolean;
  prescriptionAvailable?: boolean | undefined;
  roomUrl?: string | undefined;
  fee: number;
}

export const VIDEO_CONSULTATIONS: VideoConsultation[] = [
  {
    id: "vc-101",
    doctorName: "Dr. Anjali Sharma",
    speciality: "Dentist",
    qualification: "BDS, MDS - Orthodontics (10 yrs exp.)",
    doctorImage: "https://images.unsplash.com/photo-1594824813589-3c72b22b1049?auto=format&fit=crop&w=200&q=80",
    appointmentDate: "Today",
    appointmentTime: "10:30 AM",
    status: "upcoming",
    meetingId: "MED-ROOM-9428",
    hasPrescription: false,
    fee: 500,
  },
  {
    id: "vc-102",
    doctorName: "Dr. Rakesh Gupta",
    speciality: "Dermatologist",
    qualification: "MBBS, MD - Dermatology (12 yrs exp.)",
    doctorImage: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80",
    appointmentDate: "Tomorrow",
    appointmentTime: "04:00 PM",
    status: "upcoming",
    meetingId: "MED-ROOM-1182",
    hasPrescription: false,
    fee: 600,
  },
  {
    id: "vc-103",
    doctorName: "Dr. Priya Mehta",
    speciality: "Gynecologist",
    qualification: "MBBS, MS - OB/GYN (14 yrs exp.)",
    doctorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80",
    appointmentDate: "12 May 2026",
    appointmentTime: "11:00 AM",
    status: "completed",
    meetingId: "MED-ROOM-8472",
    hasPrescription: true,
    fee: 700,
  },
  {
    id: "vc-104",
    doctorName: "Dr. Amit Verma",
    speciality: "Physiotherapist",
    qualification: "BPT, MPT (8 yrs exp.)",
    doctorImage: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=80",
    appointmentDate: "08 May 2026",
    appointmentTime: "03:30 PM",
    status: "completed",
    meetingId: "MED-ROOM-2918",
    hasPrescription: true,
    fee: 500,
  },
];
