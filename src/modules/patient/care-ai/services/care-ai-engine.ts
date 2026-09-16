import { DOCTORS, SPECIALIZATIONS } from "@/shared/data/mock";
import { LAB_TESTS, MEDICINES_DATA } from "@/shared/data/superapp-mock";
import type { Doctor } from "@/shared/types";

// ================= TYPES =================

export type AIAnalysisType =
  | "symptom_checker"
  | "image_analysis"
  | "lab_report"
  | "prescription_reader"
  | "medicine_scanner"
  | "health_score"
  | "diet_planner"
  | "fitness_coach"
  | "health_timeline"
  | "health_prediction"
  | "hospital_finder"
  | "family_health"
  | "preventive_care"
  | "medical_search"
  | "emergency";

export type SeverityLevel = "low" | "moderate" | "high" | "emergency";

export interface ConditionProbability {
  condition: string;
  probability: number; // 0 to 100
  explanation: string;
  isUrgent?: boolean;
}

export interface ParameterFinding {
  name: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: "normal" | "high" | "low" | "critical";
  clinicalMeaning: string;
  lifestyleTip?: string;
}

export interface PrescriptionMedicineParsed {
  name: string;
  dosage: string;
  timing: {
    morning: boolean;
    afternoon: boolean;
    night: boolean;
    withFood: "before_meal" | "after_meal" | "with_meal" | "empty_stomach";
  };
  duration: string;
  purpose: string;
  warnings?: string;
}

export interface ParsedPrescription {
  doctorName: string;
  hospitalOrClinic: string;
  date: string;
  patientName?: string;
  diagnosisNotes?: string;
  medicines: PrescriptionMedicineParsed[];
  drugInteractions: string[];
  dietaryPrecautions: string[];
  followUpDays: number;
}

export interface ImageAnalysisResult {
  imageType: "xray" | "mri" | "ct" | "skin" | "eye" | "tongue" | "ecg" | "general";
  findings: string[];
  suspiciousAnomalies: string[];
  simpleExplanation: string;
  possibleConditions: ConditionProbability[];
  confidence: number;
  severity: SeverityLevel;
  recommendedSpecialty: string;
  suggestedTests: string[];
  recommendedDoctors: Doctor[];
  emergencyWarning?: string;
}

export interface LabReportAnalysisResult {
  reportTitle: string;
  testDate: string;
  parameters: ParameterFinding[];
  abnormalCount: number;
  overallSummary: string;
  possibleRootCauses: string[];
  lifestyleAndDietImprovements: string[];
  recommendedNextTests: string[];
  recommendedSpecialist: string;
  recommendedDoctors: Doctor[];
}

export interface MedicineAnalysisResult {
  medicineName: string;
  genericName: string;
  category: string;
  uses: string[];
  dosageGuidelines: string;
  sideEffects: { common: string[]; severe: string[] };
  safetyProfile: {
    pregnancy: "Safe" | "Caution" | "Unsafe" | "Consult Doctor";
    alcohol: "Safe" | "Avoid" | "Dangerous";
    kidneySafety: "Safe" | "Dose adjustment needed" | "Caution";
    liverSafety: "Safe" | "Monitor enzymes" | "Caution";
    driving: "Safe" | "Drowsiness likely" | "Avoid";
  };
  foodInteractions: string[];
  genericAlternatives: {
    name: string;
    manufacturer: string;
    price: number;
    savingsPercent: number;
  }[];
}

export interface HealthScoreAssessment {
  overallScore: number; // 0 to 100
  category: "Excellent" | "Good" | "Needs Attention" | "High Risk";
  bmi: number;
  bmiCategory: string;
  metrics: {
    cardiovascularRisk: { score: number; level: "Low" | "Moderate" | "High"; note: string };
    diabetesRisk: { score: number; level: "Low" | "Moderate" | "High"; note: string };
    hypertensionRisk: { score: number; level: "Low" | "Moderate" | "High"; note: string };
    fattyLiverRisk: { score: number; level: "Low" | "Moderate" | "High"; note: string };
    vitaminDeficiencyRisk: { score: number; level: "Low" | "Moderate" | "High"; note: string };
    sleepAndStress: {
      score: number;
      level: "Optimal" | "Suboptimal" | "High Stress";
      note: string;
    };
  };
  improvementSuggestions: string[];
  customDietPlan: {
    breakfast: string;
    lunch: string;
    dinner: string;
    snacks: string;
    hydrationTarget: string;
    caloriesTarget: number;
    proteinTarget: string;
  };
  customWorkoutPlan: {
    dailySteps: number;
    cardioMinutes: number;
    stretchingTarget: string;
    diseaseSpecificExercises: string[];
  };
}

export interface PersonalizedDietPlan {
  goal: string;
  dietPreference: "vegetarian" | "non_vegetarian" | "jain" | "vegan";
  dailyCalories: number;
  macros: { carbs: string; protein: string; fats: string; fiber: string };
  waterIntakeLiters: number;
  meals: {
    breakfast: { name: string; calories: number; protein: string; ingredients: string[] };
    lunch: { name: string; calories: number; protein: string; ingredients: string[] };
    eveningSnack: { name: string; calories: number; protein: string; ingredients: string[] };
    dinner: { name: string; calories: number; protein: string; ingredients: string[] };
  };
  foodsToAvoid: string[];
  superfoodsToInclude: string[];
  shoppingList: { category: string; items: string[] }[];
}

export interface FitnessCoachPlan {
  fitnessLevel: "beginner" | "intermediate" | "advanced";
  weeklyGoal: string;
  dailyStepsTarget: number;
  dailyBurnCalories: number;
  workouts: {
    title: string;
    duration: string;
    type: "Cardio" | "Yoga" | "Stretching" | "Gym" | "Home Workout" | "Meditation";
    caloriesBurn: number;
    exercises: { name: string; sets: string; reps: string; benefit: string }[];
  }[];
  recoveryAdvice: string;
}

export interface HealthTimelineEvent {
  id: string;
  date: string;
  year: number;
  month: string;
  category:
    | "lab_test"
    | "doctor_visit"
    | "prescription"
    | "vaccination"
    | "surgery"
    | "symptom"
    | "recovery";
  title: string;
  subtitle: string;
  doctorOrLabName?: string;
  status: "completed" | "ongoing" | "scheduled";
  tags: string[];
  attachmentUrl?: string;
}

export interface FutureRiskPrediction {
  cardiacRisk: { score: number; level: "Low" | "Moderate" | "High"; advice: string };
  diabetesRisk: { score: number; level: "Low" | "Moderate" | "High"; advice: string };
  kidneyRisk: { score: number; level: "Low" | "Moderate" | "High"; advice: string };
  liverRisk: { score: number; level: "Low" | "Moderate" | "High"; advice: string };
  vitaminDeficiencyRisk: { score: number; level: "Low" | "Moderate" | "High"; advice: string };
  strokeRisk: { score: number; level: "Low" | "Moderate" | "High"; advice: string };
  overallRiskCategory: "Low Risk" | "Moderate Risk" | "High Risk";
  preventiveSteps: string[];
}

export interface HospitalFinderResult {
  id: string;
  name: string;
  area: string;
  city: string;
  distanceKm: number;
  rating: number;
  totalReviews: number;
  emergencyAvailable24x7: boolean;
  icuBedsAvailable: number;
  specialtiesAvailable: string[];
  phoneNumber: string;
  mapAddress: string;
  emergencyDepartmentContact: string;
}

export interface FamilyHealthMember {
  id: string;
  relation: "Father" | "Mother" | "Self" | "Spouse" | "Child" | "Grandfather" | "Grandmother";
  fullName: string;
  age: number;
  gender: "Male" | "Female";
  bloodGroup: string;
  chronicConditions: string[];
  activeMedicationsCount: number;
  lastCheckupDate: string;
  upcomingVaccineOrTest?: string;
  healthScore: number;
}

export interface PreventiveCareCheck {
  id: string;
  title: string;
  targetAgeGender: string;
  frequency: "Annual" | "Bi-Annual" | "Once every 3 years" | "One-time";
  category:
    | "Cancer Screening"
    | "Cardiac Health"
    | "Diabetes"
    | "Vaccines"
    | "Dental"
    | "Vision"
    | "Bone & Vitamin";
  description: string;
  recommendedTests: string[];
  whyItMatters: string;
}

export interface MedicalSearchResult {
  query: string;
  category: "disease" | "medicine" | "symptom" | "test" | "specialty";
  title: string;
  summary: string;
  keyPoints: string[];
  warningNote?: string;
  suggestedSpecialist?: string;
  matchingDoctors?: Doctor[];
}

export interface DailyCopilotBriefing {
  greeting: string;
  userName: string;
  todayDate: string;
  todaysMedicines: { name: string; time: string; dosage: string; taken: boolean }[];
  todaysAppointments: {
    doctorName: string;
    speciality: string;
    time: string;
    type: "Clinic" | "Video";
  }[];
  waterIntakeCurrent: number;
  waterIntakeTarget: number;
  stepCountCurrent: number;
  stepCountTarget: number;
  sleepHours: number;
  healthScore: number;
  pendingReportsCount: number;
  dailyHealthInsight: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai" | "system";
  text: string;
  timestamp: string;
  type?: AIAnalysisType;
  severity?: SeverityLevel;
  confidence?: number;
  possibleConditions?: ConditionProbability[];
  emergencyAlert?: boolean;
  followUpQuestions?: string[];
  suggestedTests?: string[];
  recommendedSpecialty?: string;
  recommendedDoctors?: Doctor[];
  imageAnalysis?: ImageAnalysisResult;
  labAnalysis?: LabReportAnalysisResult;
  prescriptionAnalysis?: ParsedPrescription;
  medicineAnalysis?: MedicineAnalysisResult;
  healthAssessment?: HealthScoreAssessment;
  dietPlan?: PersonalizedDietPlan;
  fitnessPlan?: FitnessCoachPlan;
  hospitalResults?: HospitalFinderResult[];
  medicalSearch?: MedicalSearchResult;
  actionLinks?: { label: string; to: string; variant?: "default" | "outline" | "destructive" }[];
}

export interface ConversationSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  preview: string;
  messages: ChatMessage[];
}

// ================= KNOWLEDGE BASE & MOCK AI REASONING =================

export const EMERGENCY_KEYWORDS = [
  "chest pain",
  "heart attack",
  "can't breathe",
  "cannot breathe",
  "difficulty breathing",
  "stroke",
  "facial droop",
  "arm weakness",
  "slurred speech",
  "unconscious",
  "heavy bleeding",
  "severe trauma",
  "poisoning",
  "suicide",
  "seizure",
  "anaphylaxis",
  "severe burn",
  "cyanosis",
  "blue lips",
  "coughing blood",
];

export const AI_FOLLOW_UP_TEMPLATES = [
  "How many days have you been experiencing these symptoms?",
  "On a scale of 1 to 10, how severe is the discomfort?",
  "Do you have any associated fever, chills, or nausea?",
  "Are you currently taking any prescription medications?",
  "Do you have any existing chronic conditions (e.g. Diabetes, BP, Asthma)?",
];

// Helper: Rank doctors by AI score
export function rankDoctorsBySpecialty(
  specialtyQuery: string,
  userCity: string = "Bangalore",
): Doctor[] {
  const q = specialtyQuery.toLowerCase();

  const matched = DOCTORS.filter((doc) => {
    const s = doc.speciality.toLowerCase();
    const isSpecialty =
      s.includes(q) ||
      q.includes(s) ||
      (doc.diseases && doc.diseases.some((d) => d.toLowerCase().includes(q))) ||
      (doc.symptoms && doc.symptoms.some((sym) => sym.toLowerCase().includes(q)));
    return isSpecialty;
  });

  const pool = matched.length > 0 ? matched : DOCTORS;

  // Compute composite AI Score
  return [...pool].sort((a, b) => {
    const cityMatchA = a.city.toLowerCase() === userCity.toLowerCase() ? 20 : 0;
    const cityMatchB = b.city.toLowerCase() === userCity.toLowerCase() ? 20 : 0;
    const verifiedScoreA = a.verified ? 15 : 0;
    const verifiedScoreB = b.verified ? 15 : 0;
    const ratingScoreA = a.rating * 10;
    const ratingScoreB = b.rating * 10;
    const expScoreA = Math.min(a.experience * 1.5, 30);
    const expScoreB = Math.min(b.experience * 1.5, 30);

    const scoreA = cityMatchA + verifiedScoreA + ratingScoreA + expScoreA;
    const scoreB = cityMatchB + verifiedScoreB + ratingScoreB + expScoreB;

    return scoreB - scoreA;
  });
}

// Helper: Detect Emergency
export function checkIsEmergency(text: string): boolean {
  const lower = text.toLowerCase();
  return EMERGENCY_KEYWORDS.some((kw) => lower.includes(kw));
}

// Symptom Triage Analyzer
export function analyzeSymptoms(
  query: string,
  userCity: string = "Bangalore",
): {
  explanation: string;
  severity: SeverityLevel;
  confidence: number;
  possibleConditions: ConditionProbability[];
  emergencyAlert: boolean;
  recommendedSpecialty: string;
  suggestedTests: string[];
  followUpQuestions: string[];
  recommendedDoctors: Doctor[];
  actionLinks: { label: string; to: string; variant?: "default" | "outline" | "destructive" }[];
} {
  const lower = query.toLowerCase();
  const isEmergency = checkIsEmergency(lower);

  if (isEmergency) {
    return {
      explanation:
        "⚠️ CRITICAL MEDICAL ALERT: The symptoms described may indicate an acute emergency requiring immediate medical intervention. Do NOT wait for an online appointment. Please contact emergency services (112) or proceed to the nearest Emergency Room immediately.",
      severity: "emergency",
      confidence: 96,
      emergencyAlert: true,
      possibleConditions: [
        {
          condition: "Acute Coronary Syndrome / Cardiac Event",
          probability: 78,
          explanation:
            "Severe chest pressure radiating to arm/jaw is a high-risk cardiac indicator.",
          isUrgent: true,
        },
        {
          condition: "Severe Respiratory Distress / Pulmonary Embolism",
          probability: 64,
          explanation: "Sudden inability to breathe requires oxygenation and immediate ECG.",
          isUrgent: true,
        },
      ],
      recommendedSpecialty: "Cardiologist / Emergency Medicine",
      suggestedTests: [
        "Emergency 12-Lead ECG",
        "Troponin I / T Cardiac Enzymes",
        "Chest X-Ray (PA View)",
        "Echocardiogram",
      ],
      followUpQuestions: [
        "Is there sweating, nausea, or radiating arm pain?",
        "Do you have a personal or family history of heart disease?",
      ],
      recommendedDoctors: rankDoctorsBySpecialty("Cardiologist", userCity).slice(0, 3),
      actionLinks: [
        { label: "🚨 Call 112 Emergency", to: "tel:112", variant: "destructive" },
        {
          label: "🏥 Find Nearest Hospital ER",
          to: "/doctors?q=Emergency",
          variant: "destructive",
        },
        { label: "Book Urgent Cardiologist", to: "/doctors?q=Cardiologist", variant: "default" },
      ],
    };
  }

  // Headache & Neurological
  if (
    lower.includes("headache") ||
    lower.includes("migraine") ||
    lower.includes("dizzy") ||
    lower.includes("vertigo")
  ) {
    return {
      explanation:
        "Your symptoms indicate tension-type or vascular headache patterns. If accompanied by sensitivity to light, nausea, or visual auras, a migraine episode is likely.",
      severity: "moderate",
      confidence: 84,
      emergencyAlert: false,
      possibleConditions: [
        {
          condition: "Migraine with/without Aura",
          probability: 72,
          explanation: "Throbbing unilateral or bilateral pain exacerbated by light and stress.",
        },
        {
          condition: "Tension-Type Headache",
          probability: 65,
          explanation:
            "Band-like pressure around the forehead caused by fatigue, eye strain, or posture.",
        },
        {
          condition: "Sinusitis / Rhinosinusitis",
          probability: 48,
          explanation: "Facial pressure around eyes and forehead with nasal congestion.",
        },
      ],
      recommendedSpecialty: "Neurologist",
      suggestedTests: [
        "MRI Brain with Contrast (if persistent)",
        "Complete Blood Count (CBC)",
        "Ophthalmic Eye Exam",
      ],
      followUpQuestions: [
        "Is the pain throbbing on one side of your head?",
        "Are you sensitive to bright lights or loud sounds?",
        "How many hours of sleep did you get?",
      ],
      recommendedDoctors: rankDoctorsBySpecialty("Neurologist", userCity).slice(0, 3),
      actionLinks: [
        { label: "Book Top Neurologist", to: "/doctors?q=Neurologist", variant: "default" },
        { label: "Book Eye Vision Test", to: "/specialities", variant: "outline" },
        { label: "Ask Community Doctors", to: "/patient/feed", variant: "outline" },
      ],
    };
  }

  // Fever & Infections
  if (
    lower.includes("fever") ||
    lower.includes("cough") ||
    lower.includes("cold") ||
    lower.includes("throat") ||
    lower.includes("weakness")
  ) {
    return {
      explanation:
        "Fever combined with respiratory symptoms typically points to an acute viral upper respiratory tract infection or seasonal flu. Hydration and rest are primary immediate care steps.",
      severity: "moderate",
      confidence: 89,
      emergencyAlert: false,
      possibleConditions: [
        {
          condition: "Acute Viral Upper Respiratory Infection",
          probability: 82,
          explanation: "Viral pathogens causing fever, nasal inflammation, and throat irritation.",
        },
        {
          condition: "Seasonal Influenza (Flu)",
          probability: 68,
          explanation: "Systemic fever with body aches, chills, and productive cough.",
        },
        {
          condition: "Streptococcal Pharyngitis / Tonsillitis",
          probability: 42,
          explanation: "Bacterial infection causing severe throat pain and difficulty swallowing.",
        },
      ],
      recommendedSpecialty: "General Physician",
      suggestedTests: [
        "Complete Blood Count (CBC) with ESR",
        "Thyroid & Viral Panel",
        "Rapid Strep / Throat Swab",
      ],
      followUpQuestions: [
        "What is your current body temperature?",
        "Is there mucus/phlegm when coughing?",
        "Have you experienced shivering or body chills?",
      ],
      recommendedDoctors: rankDoctorsBySpecialty("General Physician", userCity).slice(0, 3),
      actionLinks: [
        { label: "Book General Physician", to: "/doctors?q=General+Physician", variant: "default" },
        { label: "Book CBC Blood Test (₹299)", to: "/patient/lab-tests", variant: "outline" },
        { label: "Instant Video Consult", to: "/patient/consult", variant: "default" },
      ],
    };
  }

  // Stomach & Digestive
  if (
    lower.includes("stomach") ||
    lower.includes("acidity") ||
    lower.includes("gas") ||
    lower.includes("vomit") ||
    lower.includes("diarrhea") ||
    lower.includes("abdomen") ||
    lower.includes("liver")
  ) {
    return {
      explanation:
        "Abdominal discomfort with bloating or acidity suggests gastrointestinal mucosal irritation, GERD (acid reflux), or mild gastroenteritis.",
      severity: "moderate",
      confidence: 86,
      emergencyAlert: false,
      possibleConditions: [
        {
          condition: "Gastroesophageal Reflux Disease (GERD) & Gastritis",
          probability: 79,
          explanation:
            "Excess acid production leading to retrosternal burning and upper abdominal pain.",
        },
        {
          condition: "Acute Gastroenteritis / Food Poisoning",
          probability: 62,
          explanation: "Intestinal bacterial or viral infection causing loose stools and cramps.",
        },
        {
          condition: "Irritable Bowel Syndrome (IBS)",
          probability: 45,
          explanation: "Functional bowel disorder with variable bloating and bowel irregularities.",
        },
      ],
      recommendedSpecialty: "Gastroenterologist",
      suggestedTests: [
        "Liver Function Test (LFT)",
        "Abdominal Ultrasound (USG)",
        "H. Pylori Antigen Test",
      ],
      followUpQuestions: [
        "Is the pain sharp or a dull burning sensation?",
        "Does it worsen after spicy meals or when lying down?",
        "Are you able to keep fluids down?",
      ],
      recommendedDoctors: rankDoctorsBySpecialty("Gastroenterologist", userCity).slice(0, 3),
      actionLinks: [
        {
          label: "Consult Gastroenterologist",
          to: "/doctors?q=Gastroenterologist",
          variant: "default",
        },
        { label: "Book Liver Function Test", to: "/patient/lab-tests", variant: "outline" },
        { label: "Order Antacids & Digestion Care", to: "/patient/medicines", variant: "outline" },
      ],
    };
  }

  // Bone & Joint / Back Pain
  if (
    lower.includes("knee") ||
    lower.includes("bone") ||
    lower.includes("joint") ||
    lower.includes("back pain") ||
    lower.includes("fracture") ||
    lower.includes("spine") ||
    lower.includes("shoulder")
  ) {
    return {
      explanation:
        "Musculoskeletal pain in joints or spine can originate from mechanical strain, ligament sprains, cartilage wear (osteoarthritis), or lumbar disc compression.",
      severity: "moderate",
      confidence: 88,
      emergencyAlert: false,
      possibleConditions: [
        {
          condition: "Lumbar Musculoskeletal Strain / Spondylosis",
          probability: 74,
          explanation:
            "Muscle spasm or spinal degenerative disc strain from posture and heavy lifting.",
        },
        {
          condition: "Knee Osteoarthritis / Meniscal Sprain",
          probability: 67,
          explanation: "Cartilage wear with stiffness on bending or walking down stairs.",
        },
        {
          condition: "Tendinitis / Bursitis",
          probability: 51,
          explanation: "Inflammation of tendons surrounding the joint capsule.",
        },
      ],
      recommendedSpecialty: "Orthopedic",
      suggestedTests: [
        "Digital X-Ray (AP & Lateral View)",
        "MRI Spine / Knee Joint",
        "Serum Uric Acid & RA Factor",
      ],
      followUpQuestions: [
        "Did you experience any direct fall or twist injury?",
        "Does the joint swell or feel warm to touch?",
        "Does pain radiate down your leg or arm?",
      ],
      recommendedDoctors: rankDoctorsBySpecialty("Orthopedic", userCity).slice(0, 3),
      actionLinks: [
        { label: "Book Orthopedic Specialist", to: "/doctors?q=Orthopedic", variant: "default" },
        { label: "Book Joint X-Ray", to: "/patient/lab-tests", variant: "outline" },
        { label: "Explore Knee Care Packages", to: "/patient/surgeries", variant: "outline" },
      ],
    };
  }

  // Skin & Dermatology
  if (
    lower.includes("skin") ||
    lower.includes("acne") ||
    lower.includes("rash") ||
    lower.includes("itching") ||
    lower.includes("hair") ||
    lower.includes("pimples") ||
    lower.includes("fungal")
  ) {
    return {
      explanation:
        "Dermatological presentations involving rashes or breakouts require clinical evaluation under dermatoscope to differentiate between inflammatory acne, contact dermatitis, or fungal dermatomycosis.",
      severity: "low",
      confidence: 91,
      emergencyAlert: false,
      possibleConditions: [
        {
          condition: "Acne Vulgaris (Grade II - Inflammatory)",
          probability: 81,
          explanation:
            "Sebaceous gland inflammation driven by sebum retention and Cutibacterium acnes.",
        },
        {
          condition: "Contact Dermatitis / Eczema",
          probability: 69,
          explanation:
            "Hypersensitivity allergic reaction to cosmetics, detergents, or environmental triggers.",
        },
        {
          condition: "Tinea Fungal Infection",
          probability: 54,
          explanation: "Superficial fungal proliferation in warm, humid skin folds.",
        },
      ],
      recommendedSpecialty: "Dermatologist",
      suggestedTests: [
        "Skin Scraping for KOH Mount",
        "Serum IgE Allergy Profile",
        "Dermoscopy Examination",
      ],
      followUpQuestions: [
        "Is there severe itching or burning?",
        "How long have you had this breakout?",
        "Have you recently switched soap or face products?",
      ],
      recommendedDoctors: rankDoctorsBySpecialty("Dermatologist", userCity).slice(0, 3),
      actionLinks: [
        { label: "Book Top Dermatologist", to: "/doctors?q=Dermatologist", variant: "default" },
        { label: "Order Skin Care Medicines", to: "/patient/medicines", variant: "outline" },
      ],
    };
  }

  // Diabetes & Endocrine
  if (
    lower.includes("diabetes") ||
    lower.includes("sugar") ||
    lower.includes("thirst") ||
    lower.includes("frequent urination") ||
    lower.includes("thyroid") ||
    lower.includes("weight")
  ) {
    return {
      explanation:
        "Metabolic symptoms like polydipsia (excessive thirst), frequent urination, or unexplained weight shifts indicate endocrine dysregulation requiring blood glucose and HbA1c screening.",
      severity: "moderate",
      confidence: 87,
      emergencyAlert: false,
      possibleConditions: [
        {
          condition: "Type 2 Diabetes Mellitus / Impaired Glucose",
          probability: 84,
          explanation: "Peripheral insulin resistance causing elevated circulating glucose levels.",
        },
        {
          condition: "Hypothyroidism / Hashimoto's",
          probability: 63,
          explanation: "Reduced thyroid hormone output leading to fatigue and metabolic slowing.",
        },
        {
          condition: "Metabolic Syndrome",
          probability: 58,
          explanation:
            "Cluster of elevated triglycerides, glucose intolerance, and abdominal adiposity.",
        },
      ],
      recommendedSpecialty: "Endocrinologist / Diabetologist",
      suggestedTests: [
        "HbA1c Glycated Hemoglobin",
        "Fasting & Post-Prandial Blood Sugar",
        "Thyroid Profile (T3, T4, TSH)",
      ],
      followUpQuestions: [
        "When was your last fasting blood sugar test?",
        "Do you feel increased fatigue after meals?",
        "Is there a family history of diabetes?",
      ],
      recommendedDoctors: rankDoctorsBySpecialty("Endocrinologist", userCity).slice(0, 3),
      actionLinks: [
        { label: "Book Diabetes Specialist", to: "/doctors?q=Diabetes", variant: "default" },
        {
          label: "Book HbA1c + Diabetes Package (₹499)",
          to: "/patient/lab-tests",
          variant: "outline",
        },
        { label: "Order Glucometer & Strips", to: "/patient/medicines", variant: "outline" },
      ],
    };
  }

  // Default Medical Assessment
  return {
    explanation: `Based on your description of "${query}", your symptoms have been categorized for primary clinical review. While many symptoms resolve with supportive care, persistent signs should always be evaluated by a verified specialist.`,
    severity: "low",
    confidence: 80,
    emergencyAlert: false,
    possibleConditions: [
      {
        condition: "Non-specific General Health Condition",
        probability: 65,
        explanation: "Symptom constellation requiring routine clinical history and vitals check.",
      },
      {
        condition: "Stress & Lifestyle Induced Fatigue",
        probability: 55,
        explanation: "Suboptimal sleep, hydration, and nutritional micronutrient gaps.",
      },
    ],
    recommendedSpecialty: "General Physician",
    suggestedTests: ["Complete Blood Count (CBC)", "Basic Metabolic Panel", "Vital Signs Checkup"],
    followUpQuestions: [
      "How long have you noticed these symptoms?",
      "Are they progressively getting worse?",
      "Do you have any known allergies?",
    ],
    recommendedDoctors: rankDoctorsBySpecialty("General Physician", userCity).slice(0, 3),
    actionLinks: [
      {
        label: "Consult General Physician",
        to: "/doctors?q=General+Physician",
        variant: "default",
      },
      { label: "Book Complete Health Checkup", to: "/patient/lab-tests", variant: "outline" },
      { label: "Ask Community Doctors", to: "/patient/feed", variant: "outline" },
    ],
  };
}

// Medical Image Analysis Simulation
export function analyzeMedicalImage(
  imageType: ImageAnalysisResult["imageType"],
  fileName: string,
  userCity: string = "Bangalore",
): ImageAnalysisResult {
  switch (imageType) {
    case "xray":
      return {
        imageType: "xray",
        findings: [
          "Bilateral lung fields visualized with clear costophrenic angles.",
          "Mild peribronchial thickening and faint patchy opacity noted in the right lower lobe.",
          "Cardiac silhouette is within normal size limits (Cardiothoracic ratio < 0.50).",
          "Bony thoracic cage and clavicles appear intact with no acute fractures.",
        ],
        suspiciousAnomalies: [
          "Faint patchy alveolar opacity in right lower zone — suggestive of mild consolidation or early bronchitis.",
        ],
        simpleExplanation:
          "Your X-ray shows mostly clear lung fields, but there is a small area of mild cloudiness in the lower right lung. This is commonly seen in early chest infections, bronchitis, or mild inflammation.",
        possibleConditions: [
          {
            condition: "Mild Acute Bronchitis / Early Consolidation",
            probability: 78,
            explanation: "Localized airway inflammation leading to subtle parenchymal haziness.",
          },
          {
            condition: "Atypical Viral Pneumonitis",
            probability: 58,
            explanation: "Subtle interstitial markings following viral respiratory illness.",
          },
          {
            condition: "Post-Infectious Atelectasis",
            probability: 35,
            explanation: "Temporary minor airway collapse from retained secretions.",
          },
        ],
        confidence: 91,
        severity: "moderate",
        recommendedSpecialty: "Pulmonologist",
        suggestedTests: [
          "High-Resolution CT (HRCT) Chest if fever persists",
          "Sputum Culture & Gram Stain",
          "Serum CRP (C-Reactive Protein)",
        ],
        recommendedDoctors: rankDoctorsBySpecialty("Pulmonologist", userCity).slice(0, 3),
      };

    case "mri":
    case "ct":
      return {
        imageType: "mri",
        findings: [
          "Cerebral hemispheres demonstrate symmetric gray-white matter differentiation.",
          "Ventricular system and basal cisterns are prominent and age-appropriate.",
          "No acute intracranial hemorrhage, midline shift, or mass effect identified.",
          "Mild focal punctate T2/FLAIR hyperintensities in subcortical white matter (microvascular ischemic changes).",
        ],
        suspiciousAnomalies: [
          "Minimal nonspecific white matter hyperintensities — typically benign, commonly seen in tension headaches, migraines, or vascular age changes.",
        ],
        simpleExplanation:
          "The MRI scan confirms that your brain structure is healthy with no bleeding, stroke, or tumors. The small bright spots noted are very common, harmless micro-changes often associated with migraines or mild blood pressure fluctuations.",
        possibleConditions: [
          {
            condition: "Benign Chronic Migraine White Matter Changes",
            probability: 82,
            explanation:
              "Small punctate T2 hyperintensities frequently noted in long-term migraine sufferers.",
          },
          {
            condition: "Age-related Small Vessel Microangiopathy",
            probability: 64,
            explanation: "Subtle vascular aging without functional deficit.",
          },
        ],
        confidence: 94,
        severity: "low",
        recommendedSpecialty: "Neurologist",
        suggestedTests: [
          "Carotid Doppler Ultrasound",
          "Lipid Profile & Homocysteine",
          "Ophthalmic Fundus Exam",
        ],
        recommendedDoctors: rankDoctorsBySpecialty("Neurologist", userCity).slice(0, 3),
      };

    case "skin":
      return {
        imageType: "skin",
        findings: [
          "Erythematous papules and open/closed comedones distributed on the central facial t-zone.",
          "No irregular asymmetrical pigmentation or hyperkeratotic ulceration detected.",
          "Surrounding skin displays mild follicular inflammation and localized sebum overproduction.",
        ],
        suspiciousAnomalies: [
          "Inflammatory papulopustular lesions with mild erythema — non-malignant, consistent with active acne vulgaris.",
        ],
        simpleExplanation:
          "The photo displays typical inflammatory acne with clogged pores and minor redness. There are no concerning irregular moles or abnormal growths. A tailored topical skincare regimen can clear this up within 4-6 weeks.",
        possibleConditions: [
          {
            condition: "Acne Vulgaris (Grade II - Inflammatory)",
            probability: 89,
            explanation: "Follicular hyperkeratinization combined with sebum excess.",
          },
          {
            condition: "Seborrheic Dermatitis",
            probability: 48,
            explanation: "Mild fungal Malassezia yeast reaction in sebaceous areas.",
          },
        ],
        confidence: 93,
        severity: "low",
        recommendedSpecialty: "Dermatologist",
        suggestedTests: [
          "Dermoscopy Evaluation",
          "Hormonal Panel (PCOS screen if applicable)",
          "Skin Barrier Moisture Analysis",
        ],
        recommendedDoctors: rankDoctorsBySpecialty("Dermatologist", userCity).slice(0, 3),
      };

    case "ecg":
      return {
        imageType: "ecg",
        findings: [
          "Normal Sinus Rhythm at 74 beats per minute (BPM).",
          "PR Interval: 154 ms (Normal: 120-200 ms).",
          "QRS Duration: 88 ms (Narrow complex, within normal limits).",
          "QTc Interval: 418 ms (Normal < 440 ms).",
          "No significant ST elevation, ST depression, or pathological Q waves seen in limb or precordial leads.",
        ],
        suspiciousAnomalies: ["No acute ischemic ST-T changes identified on this tracing."],
        simpleExplanation:
          "Your ECG recording shows a normal, healthy heart rhythm and steady electrical conduction. There are no signs of heart muscle damage, heart attack, or dangerous arrhythmias.",
        possibleConditions: [
          {
            condition: "Normal Sinus Rhythm",
            probability: 96,
            explanation: "Healthy electrical pacemaker pacing at standard rate.",
          },
          {
            condition: "Mild Sinus Arrhythmia (Physiological)",
            probability: 30,
            explanation: "Normal variation of heart rate in synchrony with breathing.",
          },
        ],
        confidence: 97,
        severity: "low",
        recommendedSpecialty: "Cardiologist",
        suggestedTests: [
          "2D Echocardiogram with Doppler",
          "TMT (Treadmill Stress Test) if exertional symptoms occur",
          "Lipid Profile & Hs-CRP",
        ],
        recommendedDoctors: rankDoctorsBySpecialty("Cardiologist", userCity).slice(0, 3),
      };

    default:
      return {
        imageType: "general",
        findings: [
          "Medical image successfully scanned and processed by Medyora Vision AI engine.",
          "Organ boundaries and structural contours identified.",
          "No life-threatening acute structural distortion observed.",
        ],
        suspiciousAnomalies: ["Focal area of interest highlighted for specialist confirmation."],
        simpleExplanation:
          "Our AI processed the uploaded image. To ensure accurate diagnosis and personalized prescription, please share this directly with a verified specialist.",
        possibleConditions: [
          {
            condition: "Clinically Correlated Finding",
            probability: 75,
            explanation: "Image suggests findings that require clinical history correlation.",
          },
        ],
        confidence: 85,
        severity: "low",
        recommendedSpecialty: "General Physician",
        suggestedTests: ["Confirmatory Clinical Diagnostic Test"],
        recommendedDoctors: rankDoctorsBySpecialty("General Physician", userCity).slice(0, 3),
      };
  }
}

// Lab Report Analyzer Simulation
export function analyzeLabReport(
  reportType: "cbc" | "lipid" | "thyroid" | "diabetes" | "lft" | "general",
  userCity: string = "Bangalore",
): LabReportAnalysisResult {
  switch (reportType) {
    case "lipid":
      return {
        reportTitle: "Comprehensive Lipid Profile (Cholesterol & Heart Health)",
        testDate: "Today",
        parameters: [
          {
            name: "Total Cholesterol",
            value: "238",
            unit: "mg/dL",
            referenceRange: "< 200",
            status: "high",
            clinicalMeaning:
              "Elevated total circulating cholesterol, indicating excess circulating lipoproteins.",
            lifestyleTip: "Reduce saturated fats & ultra-processed fried foods.",
          },
          {
            name: "LDL Cholesterol (Bad)",
            value: "156",
            unit: "mg/dL",
            referenceRange: "< 100",
            status: "high",
            clinicalMeaning: "High LDL can accumulate as plaque inside arterial walls.",
            lifestyleTip: "Incorporate soluble fiber (oats, flaxseeds, psyllium husk).",
          },
          {
            name: "HDL Cholesterol (Good)",
            value: "38",
            unit: "mg/dL",
            referenceRange: "> 40",
            status: "low",
            clinicalMeaning:
              "Low protective HDL reduces clearance of cholesterol back to the liver.",
            lifestyleTip: "Engage in 30 mins brisk walking 5 days/week.",
          },
          {
            name: "Triglycerides",
            value: "210",
            unit: "mg/dL",
            referenceRange: "< 150",
            status: "high",
            clinicalMeaning:
              "Elevated blood fats linked to excess refined carbohydrates and sugars.",
            lifestyleTip: "Cut refined white sugars, fruit juices, and alcohol.",
          },
          {
            name: "Non-HDL Cholesterol",
            value: "200",
            unit: "mg/dL",
            referenceRange: "< 130",
            status: "high",
            clinicalMeaning: "Overall atherogenic particle burden is elevated.",
            lifestyleTip: "Switch to cold-pressed mustard oil or extra virgin olive oil.",
          },
        ],
        abnormalCount: 4,
        overallSummary:
          "Your Lipid Profile shows Moderate Dyslipidemia with high LDL (156 mg/dL) and Triglycerides (210 mg/dL), alongside lower protective HDL (38 mg/dL). This increases long-term cardiovascular risk if left unmanaged.",
        possibleRootCauses: [
          "High dietary intake of saturated/trans fats and refined carbohydrates.",
          "Sedentary lifestyle with minimal aerobic cardiovascular activity.",
          "Genetic predisposition (Familial Hypercholesterolemia tendencies).",
        ],
        lifestyleAndDietImprovements: [
          "Incorporate 30 minutes of brisk aerobic walking or swimming 5 days per week.",
          "Add 30g raw walnuts/almonds and 2 spoons of chia/flax seeds daily.",
          "Replace refined vegetable oils with moderate amounts of olive oil or mustard oil.",
          "Increase intake of green leafy vegetables, garlic, and soluble oat beta-glucans.",
        ],
        recommendedNextTests: [
          "High-Sensitivity CRP (hs-CRP)",
          "Carotid Intima-Media Thickness (CIMT) Scan",
          "Liver Function Test (LFT)",
        ],
        recommendedSpecialist: "Cardiologist",
        recommendedDoctors: rankDoctorsBySpecialty("Cardiologist", userCity).slice(0, 3),
      };

    case "diabetes":
    case "general":
      return {
        reportTitle: "Diabetes & Glycemic Panel (HbA1c & Fasting Glucose)",
        testDate: "Today",
        parameters: [
          {
            name: "HbA1c (Glycated Hemoglobin)",
            value: "7.2",
            unit: "%",
            referenceRange: "< 5.7",
            status: "high",
            clinicalMeaning:
              "Indicates an estimated average 3-month blood glucose level of 160 mg/dL (Diagnosed Diabetes Range).",
            lifestyleTip: "Adopt a low-glycemic index diet with portion control.",
          },
          {
            name: "Fasting Blood Glucose",
            value: "142",
            unit: "mg/dL",
            referenceRange: "70 - 99",
            status: "high",
            clinicalMeaning:
              "High baseline glucose after 8 hours fasting due to hepatic glucose output.",
            lifestyleTip: "Avoid late-night heavy carb dinners before 8 PM.",
          },
          {
            name: "Estimated Average Glucose (eAG)",
            value: "160",
            unit: "mg/dL",
            referenceRange: "< 117",
            status: "high",
            clinicalMeaning: "Average continuous sugar concentration across tissues.",
            lifestyleTip: "Take a 10-minute walk immediately following each main meal.",
          },
          {
            name: "Serum Creatinine",
            value: "0.9",
            unit: "mg/dL",
            referenceRange: "0.6 - 1.2",
            status: "normal",
            clinicalMeaning: "Normal kidney filtration function.",
            lifestyleTip: "Maintain daily hydration with 2.5 - 3 liters of clean water.",
          },
        ],
        abnormalCount: 3,
        overallSummary:
          "Your HbA1c is 7.2% and Fasting Blood Sugar is 142 mg/dL, indicating Type 2 Diabetes Mellitus that requires medical management to prevent microvascular and kidney complications.",
        possibleRootCauses: [
          "Pancreatic beta-cell insulin secretory resistance.",
          "High glycemic carbohydrate load in regular diet.",
          "Visceral abdominal adiposity and low physical activity.",
        ],
        lifestyleAndDietImprovements: [
          "Follow the 'Plate Method': 50% non-starchy vegetables, 25% lean protein, 25% whole grains.",
          "Eliminate sugary sodas, packaged juices, white bread, and maida snacks.",
          "Engage in resistance/strength training 3 days a week to enhance muscular glucose uptake.",
          "Monitor fasting and post-meal blood sugar levels 2-3 times per week.",
        ],
        recommendedNextTests: [
          "Urine Microalbumin/Creatinine Ratio (Kidney check)",
          "Comprehensive Eye Fundus Exam (Retinopathy screen)",
          "Lipid Profile",
        ],
        recommendedSpecialist: "Endocrinologist / Diabetologist",
        recommendedDoctors: rankDoctorsBySpecialty("Endocrinologist", userCity).slice(0, 3),
      };

    case "cbc":
      return {
        reportTitle: "Complete Blood Count (CBC with Differential & Platelets)",
        testDate: "Today",
        parameters: [
          {
            name: "Hemoglobin (Hb)",
            value: "10.8",
            unit: "g/dL",
            referenceRange: "12.0 - 15.5",
            status: "low",
            clinicalMeaning:
              "Mild Microcytic Anemia, causing fatigue, pale conjunctiva, and low stamina.",
            lifestyleTip: "Eat iron-rich foods (spinach, beetroot, pomegranate, lentils).",
          },
          {
            name: "Total Leukocyte Count (WBC)",
            value: "11,800",
            unit: "/cumm",
            referenceRange: "4,000 - 11,000",
            status: "high",
            clinicalMeaning:
              "Mild leukocytosis reflecting active immune response to infection or inflammation.",
            lifestyleTip: "Rest adequately and drink plenty of warm fluids.",
          },
          {
            name: "Platelet Count",
            value: "240,000",
            unit: "/cumm",
            referenceRange: "150,000 - 450,000",
            status: "normal",
            clinicalMeaning: "Healthy blood clotting and coagulation capacity.",
            lifestyleTip: "No intervention needed.",
          },
          {
            name: "Packed Cell Volume (PCV)",
            value: "33.2",
            unit: "%",
            referenceRange: "36.0 - 46.0",
            status: "low",
            clinicalMeaning: "Proportion of red blood cells in circulating blood is reduced.",
            lifestyleTip: "Pair plant iron with Vitamin C (lemon juice) to double absorption.",
          },
        ],
        abnormalCount: 3,
        overallSummary:
          "Your blood test indicates Mild Iron Deficiency Anemia (Hemoglobin 10.8 g/dL) along with a slight immune response (WBC 11,800). Nutritional iron supplementation will restore optimal energy levels.",
        possibleRootCauses: [
          "Nutritional iron deficiency or poor absorption.",
          "Menstrual blood loss in women or occult GI loss.",
          "Mild seasonal viral or bacterial infection.",
        ],
        lifestyleAndDietImprovements: [
          "Include dates, jaggery, beetroot, and green leafy vegetables daily.",
          "Drink amla juice or lemon water with meals to increase non-heme iron absorption.",
          "Avoid tea or coffee within 1 hour before or after meals (tannins block iron absorption).",
        ],
        recommendedNextTests: [
          "Serum Ferritin & Iron Studies",
          "Vitamin B12 & Folate Profile",
          "Stool Occult Blood (if indicated)",
        ],
        recommendedSpecialist: "General Physician / Hematologist",
        recommendedDoctors: rankDoctorsBySpecialty("General Physician", userCity).slice(0, 3),
      };

    case "thyroid":
      return {
        reportTitle: "Thyroid Profile Total (T3, T4, TSH Ultra)",
        testDate: "Today",
        parameters: [
          {
            name: "TSH (Thyroid Stimulating Hormone)",
            value: "6.85",
            unit: "uIU/mL",
            referenceRange: "0.35 - 4.94",
            status: "high",
            clinicalMeaning:
              "Pituitary gland is secreting excess TSH due to underactive thyroid (Subclinical Hypothyroidism).",
            lifestyleTip: "Ensure adequate dietary selenium and zinc intake.",
          },
          {
            name: "Total T3",
            value: "0.95",
            unit: "ng/mL",
            referenceRange: "0.80 - 2.00",
            status: "normal",
            clinicalMeaning: "Circulating active triiodothyronine is within lower normal limits.",
            lifestyleTip: "Manage chronic stress through yoga and mindfulness.",
          },
          {
            name: "Total T4",
            value: "6.4",
            unit: "ug/dL",
            referenceRange: "5.1 - 14.1",
            status: "normal",
            clinicalMeaning: "Thyroxine output is maintained in baseline range.",
            lifestyleTip:
              "Take thyroid medication on an empty stomach with plain water if prescribed.",
          },
        ],
        abnormalCount: 1,
        overallSummary:
          "Your TSH is elevated at 6.85 uIU/mL, which indicates Subclinical Hypothyroidism. This can cause slow metabolism, weight gain, morning sluggishness, dry skin, and hair thinning.",
        possibleRootCauses: [
          "Autoimmune thyroiditis (Hashimoto's antibodies).",
          "Micronutrient deficiency (Iodine, Selenium, Zinc).",
          "Post-viral thyroid inflammation.",
        ],
        lifestyleAndDietImprovements: [
          "Include Brazil nuts (selenium) and pumpkin seeds (zinc) in your morning routine.",
          "Limit raw cruciferous vegetables (raw cabbage, cauliflower, kale) — cook them well before eating.",
          "Maintain regular 7-8 hours of sound nighttime sleep to support endocrine balance.",
        ],
        recommendedNextTests: [
          "Anti-TPO (Thyroid Peroxidase Antibodies)",
          "Vitamin D3 Total",
          "Lipid Profile",
        ],
        recommendedSpecialist: "Endocrinologist",
        recommendedDoctors: rankDoctorsBySpecialty("Endocrinologist", userCity).slice(0, 3),
      };

    default:
      return {
        reportTitle: "General Comprehensive Blood & Organ Profile",
        testDate: "Today",
        parameters: [
          {
            name: "Hemoglobin",
            value: "13.4",
            unit: "g/dL",
            referenceRange: "12.0 - 16.0",
            status: "normal",
            clinicalMeaning: "Healthy oxygen-carrying capacity.",
            lifestyleTip: "Keep up balanced nutrition.",
          },
          {
            name: "Blood Urea Nitrogen (BUN)",
            value: "14",
            unit: "mg/dL",
            referenceRange: "7 - 20",
            status: "normal",
            clinicalMeaning: "Normal protein breakdown and kidney clearance.",
            lifestyleTip: "Drink adequate water.",
          },
          {
            name: "SGPT / ALT (Liver)",
            value: "32",
            unit: "U/L",
            referenceRange: "< 45",
            status: "normal",
            clinicalMeaning: "Healthy liver hepatocytes without cellular strain.",
            lifestyleTip: "Avoid alcohol abuse.",
          },
        ],
        abnormalCount: 0,
        overallSummary:
          "All tested baseline parameters are within optimal clinical reference ranges. Continue maintaining your balanced lifestyle and preventive checkups.",
        possibleRootCauses: ["Healthy physiological baseline."],
        lifestyleAndDietImprovements: [
          "Maintain a balanced whole-food diet, 7 hours sleep, and 30 minutes daily activity.",
        ],
        recommendedNextTests: ["Annual Preventive Master Health Checkup"],
        recommendedSpecialist: "General Physician",
        recommendedDoctors: rankDoctorsBySpecialty("General Physician", userCity).slice(0, 3),
      };
  }
}

// Prescription Scanner Simulation
export function analyzePrescription(fileName: string = "prescription.jpg"): ParsedPrescription {
  return {
    doctorName: "Dr. Ananya Sen, MD (Internal Medicine)",
    hospitalOrClinic: "Apollo Medical Clinic, Indiranagar",
    date: "26 Aug 2026",
    patientName: "Ritik Kumar (26 Y / M)",
    diagnosisNotes: "Acute Viral Bronchitis with Mild Pharyngitis & Low-grade Fever",
    medicines: [
      {
        name: "Augmentin 625 Duo Tablet",
        dosage: "625 mg",
        timing: { morning: true, afternoon: false, night: true, withFood: "after_meal" },
        duration: "5 Days (Complete full course)",
        purpose: "Broad-spectrum antibacterial treatment for secondary bacterial airway infection.",
        warnings: "Do not stop midway even if symptoms improve to prevent antibiotic resistance.",
      },
      {
        name: "Dolo 650 mg (Paracetamol)",
        dosage: "650 mg",
        timing: { morning: true, afternoon: true, night: true, withFood: "after_meal" },
        duration: "3 Days (SOS for fever > 100°F or body aches)",
        purpose: "Antipyretic and analgesic for fever and body ache relief.",
        warnings:
          "Maintain at least 6 hours gap between doses. Do not exceed 4 tablets in 24 hours.",
      },
      {
        name: "Pantocid 40 mg (Pantoprazole)",
        dosage: "40 mg",
        timing: { morning: true, afternoon: false, night: false, withFood: "empty_stomach" },
        duration: "5 Days",
        purpose: "Gastric acid blocker to prevent antibiotic-induced stomach irritation.",
        warnings: "Take 30 minutes before morning breakfast with half a glass of plain water.",
      },
      {
        name: "Ascoril-D Cough Syrup",
        dosage: "10 ml (2 Teaspoons)",
        timing: { morning: false, afternoon: false, night: true, withFood: "after_meal" },
        duration: "5 Days",
        purpose: "Relieves throat tickle and nocturnal dry cough.",
        warnings: "May cause mild drowsiness. Avoid driving or alcohol after night dose.",
      },
    ],
    drugInteractions: [
      "No hazardous drug-drug interactions detected between Augmentin and Dolo 650.",
      "Ensure Pantocid is taken 30 minutes BEFORE meals and other morning tablets.",
    ],
    dietaryPrecautions: [
      "Drink warm water or ginger-tulsi tea 3-4 times daily.",
      "Avoid cold ice creams, carbonated chilled beverages, and oily deep-fried foods.",
      "Consume light digestible meals: Khichdi, vegetable soup, steamed idlis.",
    ],
    followUpDays: 5,
  };
}

// Medicine Safety AI Scanner
export function analyzeMedicineSafety(medicineName: string): MedicineAnalysisResult {
  const query = medicineName.toLowerCase();

  if (query.includes("dolo") || query.includes("paracetamol")) {
    return {
      medicineName: "Dolo 650 mg Tablet",
      genericName: "Paracetamol / Acetaminophen (650mg)",
      category: "Antipyretic & Analgesic (Pain & Fever Reliever)",
      uses: [
        "High fever reduction (viral, bacterial, post-vaccination).",
        "Mild to moderate headache, muscle aches, toothache, and body pain.",
      ],
      dosageGuidelines:
        "Adults: 1 tablet every 6 to 8 hours as needed. Maximum 3,000 mg (4 tablets) per 24 hours.",
      sideEffects: {
        common: ["Mild nausea", "Stomach upset if taken on empty stomach"],
        severe: ["Hepatotoxicity (liver damage if overdosed)", "Allergic skin rash / urticaria"],
      },
      safetyProfile: {
        pregnancy: "Safe",
        alcohol: "Avoid",
        kidneySafety: "Safe",
        liverSafety: "Caution",
        driving: "Safe",
      },
      foodInteractions: [
        "Safe with all normal foods. Best taken after meals to minimize gastric discomfort.",
        "Strictly avoid alcohol while on paracetamol as it increases hepatic glutathione depletion and liver toxicity risk.",
      ],
      genericAlternatives: [
        { name: "Paracip 650 (Cipla)", manufacturer: "Cipla Ltd", price: 21, savingsPercent: 32 },
        { name: "Calpol 650 (GSK)", manufacturer: "GlaxoSmithKline", price: 29, savingsPercent: 8 },
        {
          name: "P-650 (Apex Labs)",
          manufacturer: "Apex Laboratories",
          price: 19,
          savingsPercent: 38,
        },
      ],
    };
  }

  if (query.includes("augmentin") || query.includes("amoxicillin")) {
    return {
      medicineName: "Augmentin 625 Duo Tablet",
      genericName: "Amoxicillin (500mg) + Clavulanic Acid (125mg)",
      category: "Broad-Spectrum Penicillin Antibiotic",
      uses: [
        "Bacterial respiratory tract infections (Sinusitis, Bronchitis, Pneumonia).",
        "Ear, nose, throat (ENT), dental abscesses, and urinary tract infections (UTIs).",
      ],
      dosageGuidelines:
        "1 tablet twice daily (every 12 hours) with or immediately after a meal for 5 to 7 days.",
      sideEffects: {
        common: ["Loose stools / diarrhea", "Mild nausea or vomiting", "Abdominal gas"],
        severe: [
          "Severe allergic anaphylaxis (if penicillin allergy exists)",
          "C. difficile colitis",
        ],
      },
      safetyProfile: {
        pregnancy: "Safe",
        alcohol: "Avoid",
        kidneySafety: "Dose adjustment needed",
        liverSafety: "Caution",
        driving: "Safe",
      },
      foodInteractions: [
        "Always take with a meal to maximize Clavulanic acid absorption and prevent stomach upset.",
        "Take probiotics or yogurt 2 hours away from antibiotic dose to restore healthy gut microbiome.",
      ],
      genericAlternatives: [
        {
          name: "Moxikind-CV 625 (Mankind)",
          manufacturer: "Mankind Pharma",
          price: 148,
          savingsPercent: 30,
        },
        {
          name: "Clavam 625 (Alkem)",
          manufacturer: "Alkem Laboratories",
          price: 152,
          savingsPercent: 28,
        },
        {
          name: "Novamox-CV 625 (Cipla)",
          manufacturer: "Cipla Ltd",
          price: 142,
          savingsPercent: 33,
        },
      ],
    };
  }

  // Default medicine profile
  return {
    medicineName: medicineName,
    genericName: `${medicineName} Active Formulation`,
    category: "Prescription / OTC Therapeutic Formulation",
    uses: [
      "Clinical treatment prescribed by a verified physician.",
      "Targeted symptom relief according to pharmacopeia standards.",
    ],
    dosageGuidelines: "Take exactly as prescribed on your prescription label with clean water.",
    sideEffects: {
      common: ["Mild drowsiness", "Digestive sensitivity"],
      severe: ["Allergic skin reaction", "Shortness of breath (discontinue immediately)"],
    },
    safetyProfile: {
      pregnancy: "Consult Doctor",
      alcohol: "Avoid",
      kidneySafety: "Safe",
      liverSafety: "Safe",
      driving: "Safe",
    },
    foodInteractions: [
      "Take after meals with water unless explicitly marked 'empty stomach'.",
      "Avoid grapefruit juice and heavy alcoholic beverages.",
    ],
    genericAlternatives: [
      {
        name: `Generic ${medicineName}`,
        manufacturer: "Jan Aushadhi / Quality Certified",
        price: 35,
        savingsPercent: 45,
      },
    ],
  };
}

// Health Score & Disease Risk Engine
export function calculateHealthScore(inputs: {
  age: number;
  gender: "male" | "female" | "other";
  weightKg: number;
  heightCm: number;
  systolicBp?: number;
  diastolicBp?: number;
  fastingSugar?: number;
  dailySteps?: number;
  sleepHours?: number;
  smokingStatus?: boolean;
}): HealthScoreAssessment {
  const heightM = inputs.heightCm / 100;
  const bmi = Number((inputs.weightKg / (heightM * heightM)).toFixed(1));

  let bmiCategory = "Normal Weight";
  let bmiPenalty = 0;
  if (bmi < 18.5) {
    bmiCategory = "Underweight";
    bmiPenalty = 8;
  } else if (bmi >= 25 && bmi < 30) {
    bmiCategory = "Overweight";
    bmiPenalty = 10;
  } else if (bmi >= 30) {
    bmiCategory = "Obese";
    bmiPenalty = 18;
  }

  const bpSys = inputs.systolicBp || 122;
  const bpDia = inputs.diastolicBp || 78;
  let bpPenalty = 0;
  let bpLevel: "Low" | "Moderate" | "High" = "Low";
  if (bpSys > 140 || bpDia > 90) {
    bpLevel = "High";
    bpPenalty = 16;
  } else if (bpSys > 125 || bpDia > 82) {
    bpLevel = "Moderate";
    bpPenalty = 8;
  }

  const sugar = inputs.fastingSugar || 96;
  let sugarPenalty = 0;
  let sugarLevel: "Low" | "Moderate" | "High" = "Low";
  if (sugar > 126) {
    sugarLevel = "High";
    sugarPenalty = 18;
  } else if (sugar > 100) {
    sugarLevel = "Moderate";
    sugarPenalty = 9;
  }

  const steps = inputs.dailySteps || 6500;
  const activityBonus = steps >= 8000 ? 5 : steps < 4000 ? -8 : 0;

  const sleep = inputs.sleepHours || 7;
  const sleepBonus = sleep >= 7 && sleep <= 9 ? 4 : -6;

  const smokePenalty = inputs.smokingStatus ? 18 : 0;

  let computedScore =
    95 - bmiPenalty - bpPenalty - sugarPenalty + activityBonus + sleepBonus - smokePenalty;
  computedScore = Math.max(35, Math.min(98, computedScore));

  let category: HealthScoreAssessment["category"] = "Excellent";
  if (computedScore < 60) category = "High Risk";
  else if (computedScore < 75) category = "Needs Attention";
  else if (computedScore < 88) category = "Good";

  return {
    overallScore: computedScore,
    category,
    bmi,
    bmiCategory,
    metrics: {
      cardiovascularRisk: {
        score: bpLevel === "High" ? 68 : bpLevel === "Moderate" ? 38 : 14,
        level: bpLevel,
        note: `Blood Pressure ${bpSys}/${bpDia} mmHg indicates ${bpLevel.toLowerCase()} arterial stress.`,
      },
      diabetesRisk: {
        score: sugarLevel === "High" ? 74 : sugarLevel === "Moderate" ? 42 : 12,
        level: sugarLevel,
        note: `Fasting glucose ${sugar} mg/dL is in the ${sugarLevel.toLowerCase()} risk range.`,
      },
      hypertensionRisk: {
        score: bpSys >= 130 ? 55 : 18,
        level: bpSys >= 130 ? "Moderate" : "Low",
        note: "Vascular elasticity and pulse pressure within acceptable limits.",
      },
      fattyLiverRisk: {
        score: bmi >= 27 ? 58 : 20,
        level: bmi >= 27 ? "Moderate" : "Low",
        note:
          bmi >= 27
            ? "Slight visceral adiposity; consider annual ultrasound."
            : "Low risk based on current BMI.",
      },
      vitaminDeficiencyRisk: {
        score: 45,
        level: "Moderate",
        note: "Indoor desk routines commonly cause Vitamin D3 and B12 deficits in urban populations.",
      },
      sleepAndStress: {
        score: sleep >= 7 ? 85 : 52,
        level: sleep >= 7 ? "Optimal" : "Suboptimal",
        note: `${sleep} hours sleep per night recorded.`,
      },
    },
    improvementSuggestions: [
      "Target 8,500 daily steps with 20 minutes brisk cadence.",
      "Add 1 daily bowl of colorful antioxidant salads (spinach, cucumber, carrots, tomatoes).",
      "Drink 2.5 to 3 Liters of water daily.",
      "Limit packaged bakery foods, refined palm oils, and added sugars.",
      "Schedule annual preventive screening (CBC, Lipid, HbA1c, LFT).",
    ],
    customDietPlan: {
      breakfast: "Moong dal chilla / Oats with chia seeds, almonds & fresh berries",
      lunch: "2 Multi-grain rotis, 1 cup mixed vegetable curry, 1 bowl dal & cucumber salad",
      dinner:
        "Grilled paneer / tofu / grilled chicken with sautéed broccoli & light vegetable soup",
      snacks: "Roasted makhana, walnuts, and green tea",
      hydrationTarget: "3.0 Liters Water daily",
      caloriesTarget: 1850,
      proteinTarget: "65g - 75g daily",
    },
    customWorkoutPlan: {
      dailySteps: 8500,
      cardioMinutes: 30,
      stretchingTarget: "10 mins morning mobility & spinal twists",
      diseaseSpecificExercises: [
        "Low-impact brisk walking (Cardiovascular protection)",
        "Squats & Wall sits (Joint strength & insulin sensitivity)",
        "Deep diaphragm breathing & Child's pose (Cortisol reduction)",
      ],
    },
  };
}

// ================= 7. AI DIET PLANNER ENGINE =================
export function generatePersonalizedDietPlan(params: {
  goal?: string;
  preference?: "vegetarian" | "non_vegetarian" | "jain" | "vegan";
  disease?: string;
  age?: number;
  weightKg?: number;
}): PersonalizedDietPlan {
  const pref = params.preference || "vegetarian";
  const goal =
    params.goal || (params.disease ? `${params.disease} Management` : "Weight Loss & Immunity");
  const isJain = pref === "jain";
  const isVegan = pref === "vegan";
  const isNonVeg = pref === "non_vegetarian";

  return {
    goal,
    dietPreference: pref,
    dailyCalories: 1750,
    macros: { carbs: "45% (190g)", protein: "25% (110g)", fats: "30% (58g)", fiber: "35g" },
    waterIntakeLiters: 3.2,
    meals: {
      breakfast: {
        name: isVegan
          ? "Tofu Scramble with Spinach & Chia Oatmeal"
          : isJain
            ? "Moong Dal Chilla with Mint Chutney & Almond Milk"
            : isNonVeg
              ? "3 Egg White Omelet with Whole Grain Toast & Avocado"
              : "Sprouted Moong Chilla with Paneer Filling & Green Tea",
        calories: 380,
        protein: "22g",
        ingredients: ["Sprouted grains", "Healthy fats", "Antioxidant seeds", "Herbal infusion"],
      },
      lunch: {
        name: isNonVeg
          ? "Grilled Herb Chicken Breast with Quinoa, Steamed Beans & Cucumber Raita"
          : isVegan
            ? "Soya Chunk Curry with Brown Rice, Yellow Dal & Roasted Beetroot Salad"
            : isJain
              ? "Multi-grain Roti (2) with Methi Dal, Paneer Bhurji & Lauki Raita"
              : "2 Jowar-Bajra Rotis with Palak Paneer, Tadka Dal & Fresh Sprout Salad",
        calories: 540,
        protein: "34g",
        ingredients: [
          "Low glycemic grains",
          "High biological value protein",
          "Fiber greens",
          "Digestive spices",
        ],
      },
      eveningSnack: {
        name: "Roasted Makhana (Fox nuts) with Walnuts, Roasted Chana & Tender Coconut Water",
        calories: 180,
        protein: "8g",
        ingredients: ["Makhana", "Walnuts", "Roasted Chana", "Electrolyte water"],
      },
      dinner: {
        name: isNonVeg
          ? "Pan-seared Atlantic Salmon / Fish Curry with Sautéed Veggies & Clear Soup"
          : isVegan
            ? "Grilled Tofu Steaks with Sautéed Zucchini, Broccoli & Lentil Soup"
            : isJain
              ? "Moong Dal Khichdi with Steamed Moong Sprouts & Ghee Cumin Tempering"
              : "Stir-fried Paneer & Broccoli with Vegetable Quinoa Upma & Warm Turmeric Milk",
        calories: 420,
        protein: "26g",
        ingredients: [
          "Easily digestible proteins",
          "Cruciferous vegetables",
          "Magnesium rich nuts",
        ],
      },
    },
    foodsToAvoid: [
      "Ultra-processed packaged snacks & trans-fats",
      "Refined white sugar, syrups & sugary carbonated sodas",
      "Deep fried farsan, namkeens, and reheated cooking oils",
      "High sodium canned goods and artificial sweeteners",
    ],
    superfoodsToInclude: [
      "Chia & Flax seeds (Omega-3 fatty acids)",
      "Turmeric with black pepper (Curcumin anti-inflammatory)",
      "Moringa leaf powder & Indian gooseberry (Amla)",
      "Unsweetened curd / Probiotics for gut microbiome",
    ],
    shoppingList: [
      {
        category: "Produce & Greens",
        items: ["Spinach", "Broccoli", "Cucumbers", "Lemons", "Amla", "Zucchini"],
      },
      {
        category: "Proteins & Dairy",
        items: ["Low-fat Paneer", "Organic Tofu", "Eggs / Chicken", "Greek Curd"],
      },
      {
        category: "Pantry & Grains",
        items: ["Jowar Flour", "Quinoa", "Moong Dal", "Makhana", "Chia Seeds"],
      },
      {
        category: "Healthy Fats",
        items: ["Cold-pressed Virgin Olive Oil", "A2 Cow Ghee", "Walnuts", "Almonds"],
      },
    ],
  };
}

// ================= 8. AI FITNESS COACH ENGINE =================
export function generateFitnessCoachPlan(params: {
  level?: "beginner" | "intermediate" | "advanced";
  goal?: string;
}): FitnessCoachPlan {
  const level = params.level || "intermediate";

  return {
    fitnessLevel: level,
    weeklyGoal: "Burn 2,400 Active kcal & Increase VO2 Max",
    dailyStepsTarget: level === "beginner" ? 6500 : level === "advanced" ? 12000 : 9000,
    dailyBurnCalories: level === "beginner" ? 350 : level === "advanced" ? 700 : 500,
    workouts: [
      {
        title: "Morning Sun Salutation & Joint Mobility Yoga",
        duration: "20 Mins",
        type: "Yoga",
        caloriesBurn: 110,
        exercises: [
          {
            name: "Surya Namaskar (Sun Salutations)",
            sets: "5 Rounds",
            reps: "Continuous flow",
            benefit: "Spinal flexibility & whole-body circulation",
          },
          {
            name: "Cat-Cow & Cobra Pose",
            sets: "3 Sets",
            reps: "45s holds",
            benefit: "Relieves lumbar compression & improves posture",
          },
          {
            name: "Vrikshasana (Tree Pose)",
            sets: "2 Sets",
            reps: "60s per leg",
            benefit: "Balance & ankle neuromuscular stability",
          },
        ],
      },
      {
        title: "Fat-Burn Interval Cardio & Core Blast",
        duration: "30 Mins",
        type: "Cardio",
        caloriesBurn: 260,
        exercises: [
          {
            name: "High Knee Brisk Cadence",
            sets: "4 Sets",
            reps: "45s work / 15s rest",
            benefit: "Cardiorespiratory stamina",
          },
          {
            name: "Bodyweight Air Squats",
            sets: "4 Sets",
            reps: "20 Reps",
            benefit: "Quadriceps & gluteal power",
          },
          {
            name: "Plank to Shoulder Taps",
            sets: "3 Sets",
            reps: "40s hold",
            benefit: "Transverse abdominal stabilization",
          },
          {
            name: "Glute Bridges & Hamstring Walkouts",
            sets: "3 Sets",
            reps: "15 Reps",
            benefit: "Pelvic floor & posterior chain health",
          },
        ],
      },
      {
        title: "Evening Guided Pranayama & Deep Rest Meditation",
        duration: "15 Mins",
        type: "Meditation",
        caloriesBurn: 40,
        exercises: [
          {
            name: "Anulom Vilom (Alternate Nostril)",
            sets: "1 Session",
            reps: "7 Mins",
            benefit: "Autonomic nervous system balancing",
          },
          {
            name: "Box Breathing (4-4-4-4)",
            sets: "1 Session",
            reps: "5 Mins",
            benefit: "Rapid cortisol and heart rate reduction",
          },
          {
            name: "Yoga Nidra Body Scan",
            sets: "1 Session",
            reps: "3 Mins",
            benefit: "Pre-sleep restorative recovery",
          },
        ],
      },
    ],
    recoveryAdvice:
      "Ensure 7.5 to 8 hours uninterrupted sleep. Perform 5 minutes of hamstring & quad foam rolling post cardio. Hydrate with lemon-salt water.",
  };
}

// ================= 10. AI HEALTH TIMELINE =================
export function getHealthTimelineData(): HealthTimelineEvent[] {
  return [
    {
      id: "ev-1",
      date: "24 Aug 2026",
      year: 2026,
      month: "August",
      category: "lab_test",
      title: "Comprehensive Lipid & CBC Profile",
      subtitle: "Serum Cholesterol 228 mg/dL (Borderline) • HbA1c 5.7%",
      doctorOrLabName: "Medyora Diagnostics Central",
      status: "completed",
      tags: ["Pathology", "Blood Test", "Routine"],
      attachmentUrl: "/reports/lab-aug26.pdf",
    },
    {
      id: "ev-2",
      date: "18 Aug 2026",
      year: 2026,
      month: "August",
      category: "doctor_visit",
      title: "Cardiology In-Clinic Consultation",
      subtitle: "Reviewed ECG & BP variations. Advised lifestyle modifications.",
      doctorOrLabName: "Dr. Kavita Rao (MD Cardiology)",
      status: "completed",
      tags: ["Cardiology", "In-Person", "Checked"],
    },
    {
      id: "ev-3",
      date: "18 Aug 2026",
      year: 2026,
      month: "August",
      category: "prescription",
      title: "Prescription: Atorvastatin & CoQ10",
      subtitle: "Daily at Bedtime for 30 days with dietary fiber tracking",
      doctorOrLabName: "Dr. Kavita Rao",
      status: "ongoing",
      tags: ["Medication", "Night", "Active"],
    },
    {
      id: "ev-4",
      date: "04 July 2026",
      year: 2026,
      month: "July",
      category: "vaccination",
      title: "Annual Influenza (Flu) Quadrivalent Vaccine",
      subtitle: "Administered Deltoid IM • Next booster due in July 2027",
      doctorOrLabName: "Manipal Hospital Preventive Clinic",
      status: "completed",
      tags: ["Immunization", "Preventive", "Booster"],
    },
    {
      id: "ev-5",
      date: "12 May 2026",
      year: 2026,
      month: "May",
      category: "symptom",
      title: "Reported Episodic Tension Headache & Neck Strain",
      subtitle: "AI triage recommended posture ergonomics and optical exam.",
      status: "completed",
      tags: ["Symptom Triage", "Resolved"],
    },
    {
      id: "ev-6",
      date: "15 Sep 2026",
      year: 2026,
      month: "September",
      category: "doctor_visit",
      title: "Scheduled 30-Day Lipid Follow-Up",
      subtitle: "Check response to dietary adjustment & repeat fasting lipid panel",
      doctorOrLabName: "Dr. Kavita Rao",
      status: "scheduled",
      tags: ["Upcoming", "Video Consult"],
    },
  ];
}

// ================= 13. AI HEALTH PREDICTION ENGINE =================
export function predictFutureDiseaseRisks(inputs: {
  age?: number;
  bmi?: number;
  bpSystolic?: number;
  sugarFasting?: number;
  smoking?: boolean;
}): FutureRiskPrediction {
  const age = inputs.age || 32;
  const bmi = inputs.bmi || 24.5;
  const bp = inputs.bpSystolic || 124;
  const sugar = inputs.sugarFasting || 98;

  const cardiacScore = bp >= 135 ? 65 : bp >= 125 ? 38 : 18;
  const diabetesScore = sugar >= 120 ? 72 : sugar >= 100 ? 44 : 15;
  const liverScore = bmi >= 28 ? 62 : bmi >= 25 ? 35 : 14;
  const kidneyScore = bp >= 140 ? 58 : 16;
  const vitaminScore = 48; // Common urban indoor deficit
  const strokeScore = bp >= 140 || inputs.smoking ? 55 : 12;

  let overallCategory: FutureRiskPrediction["overallRiskCategory"] = "Low Risk";
  if (cardiacScore > 60 || diabetesScore > 60 || strokeScore > 50) {
    overallCategory = "High Risk";
  } else if (cardiacScore > 35 || diabetesScore > 35 || liverScore > 35) {
    overallCategory = "Moderate Risk";
  }

  return {
    cardiacRisk: {
      score: cardiacScore,
      level: cardiacScore > 50 ? "High" : cardiacScore > 30 ? "Moderate" : "Low",
      advice:
        "Maintain low sodium diet, avoid saturated oils, and log 150 mins weekly moderate cardio.",
    },
    diabetesRisk: {
      score: diabetesScore,
      level: diabetesScore > 50 ? "High" : diabetesScore > 30 ? "Moderate" : "Low",
      advice: "Incorporate post-meal 10-minute walks to enhance insulin sensitivity.",
    },
    kidneyRisk: {
      score: kidneyScore,
      level: kidneyScore > 50 ? "High" : kidneyScore > 30 ? "Moderate" : "Low",
      advice:
        "Keep hydration above 3 Liters daily; avoid over-the-counter NSAID painkiller overuse.",
    },
    liverRisk: {
      score: liverScore,
      level: liverScore > 50 ? "High" : liverScore > 30 ? "Moderate" : "Low",
      advice: "Eliminate sugary drinks and refined carbs to halt hepatic fat accumulation.",
    },
    vitaminDeficiencyRisk: {
      score: vitaminScore,
      level: "Moderate",
      advice: "Take monthly Vitamin D3 60,000 IU sachets as recommended by your physician.",
    },
    strokeRisk: {
      score: strokeScore,
      level: strokeScore > 50 ? "High" : "Low",
      advice: "Maintain systolic blood pressure under 120 mmHg through aerobic stamina and sleep.",
    },
    overallRiskCategory: overallCategory,
    preventiveSteps: [
      "Schedule Comprehensive Annual Health Screening (Lipid + HbA1c + LFT + KFT)",
      "Daily brisk walking targeting minimum 8,500 steps",
      "Adopt Mediterranean-style plate: 50% fiber veggies, 25% clean protein, 25% complex carbs",
      "Annual preventative ECG and cardiac stress screening after age 35",
    ],
  };
}

// ================= 16. AI HOSPITAL FINDER ENGINE =================
export const TOP_HOSPITALS_DATABASE: HospitalFinderResult[] = [
  {
    id: "hosp-1",
    name: "Manipal Hospital (Old Airport Road)",
    area: "Indiranagar / HAL",
    city: "Bangalore",
    distanceKm: 2.8,
    rating: 4.8,
    totalReviews: 4820,
    emergencyAvailable24x7: true,
    icuBedsAvailable: 14,
    specialtiesAvailable: [
      "Cardiology",
      "Trauma & Ortho",
      "Neurology",
      "Pediatrics",
      "Oncology",
      "Gastroenterology",
    ],
    phoneNumber: "+91 80 2502 4444",
    mapAddress: "98, HAL Old Airport Rd, Kodihalli, Bengaluru, Karnataka 560017",
    emergencyDepartmentContact: "105711 (Toll Free ER)",
  },
  {
    id: "hosp-2",
    name: "Apollo Speciality Hospital (Jayanagar)",
    area: "Jayanagar",
    city: "Bangalore",
    distanceKm: 4.5,
    rating: 4.7,
    totalReviews: 3650,
    emergencyAvailable24x7: true,
    icuBedsAvailable: 8,
    specialtiesAvailable: [
      "Cardiac Care",
      "Emergency Stroke Unit",
      "Critical Care",
      "Obstetrics & Gynecology",
    ],
    phoneNumber: "+91 80 2630 4050",
    mapAddress: "21/2, 14th Cross Rd, Jayanagar 3rd Block, Bengaluru 560011",
    emergencyDepartmentContact: "1066 (Apollo Emergency)",
  },
  {
    id: "hosp-3",
    name: "Fortis Hospital (Bannerghatta Road)",
    area: "Bannerghatta",
    city: "Bangalore",
    distanceKm: 6.2,
    rating: 4.9,
    totalReviews: 5200,
    emergencyAvailable24x7: true,
    icuBedsAvailable: 11,
    specialtiesAvailable: [
      "Cardiothoracic Surgery",
      "Organ Transplant",
      "Pediatric ICU",
      "Orthopedics",
    ],
    phoneNumber: "+91 80 6621 4444",
    mapAddress: "154/9, Bannerghatta Main Rd, Opposite IIM-B, Bengaluru 560076",
    emergencyDepartmentContact: "080 6621 4100",
  },
  {
    id: "hosp-4",
    name: "Max Super Speciality Hospital (Saket)",
    area: "Saket",
    city: "Delhi",
    distanceKm: 3.1,
    rating: 4.8,
    totalReviews: 6100,
    emergencyAvailable24x7: true,
    icuBedsAvailable: 19,
    specialtiesAvailable: ["Cardiac Sciences", "Neurosciences", "Orthopedics", "Emergency Care"],
    phoneNumber: "+91 11 2651 5050",
    mapAddress: "1, 2, Press Enclave Marg, Saket, New Delhi 110017",
    emergencyDepartmentContact: "011 4055 4055",
  },
];

export function getNearestEmergencyHospitals(city: string = "Bangalore"): HospitalFinderResult[] {
  const filtered = TOP_HOSPITALS_DATABASE.filter(
    (h) => h.city.toLowerCase() === city.toLowerCase(),
  );
  return filtered.length > 0 ? filtered : TOP_HOSPITALS_DATABASE;
}

// ================= 18. DAILY COPILOT BRIEFING =================
export function getDailyCopilotBriefing(userName: string = "Ritik"): DailyCopilotBriefing {
  const hours = new Date().getHours();
  const greeting = hours < 12 ? "Good Morning" : hours < 17 ? "Good Afternoon" : "Good Evening";

  return {
    greeting,
    userName,
    todayDate: new Date().toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    todaysMedicines: [
      {
        name: "Atorvastatin 10mg",
        time: "09:30 PM (Night)",
        dosage: "1 Tablet after dinner",
        taken: false,
      },
      {
        name: "Vitamin D3 60k",
        time: "Weekly (Sunday)",
        dosage: "1 Sachet with milk",
        taken: true,
      },
    ],
    todaysAppointments: [
      {
        doctorName: "Dr. Kavita Rao",
        speciality: "Cardiologist",
        time: "04:30 PM Today",
        type: "Video",
      },
    ],
    waterIntakeCurrent: 1.8,
    waterIntakeTarget: 3.0,
    stepCountCurrent: 5420,
    stepCountTarget: 8500,
    sleepHours: 7.2,
    healthScore: 84,
    pendingReportsCount: 0,
    dailyHealthInsight:
      "Your blood glucose and activity trends are on track! Remember your 4:30 PM video checkup with Dr. Kavita Rao today.",
  };
}

// ================= 19. AI FAMILY HEALTH PROFILES =================
export function getFamilyHealthProfiles(): FamilyHealthMember[] {
  return [
    {
      id: "fam-1",
      relation: "Self",
      fullName: "Ritik Kumar",
      age: 28,
      gender: "Male",
      bloodGroup: "O+",
      chronicConditions: ["Borderline High Cholesterol"],
      activeMedicationsCount: 1,
      lastCheckupDate: "24 Aug 2026",
      upcomingVaccineOrTest: "Lipid Profile (15 Sep 2026)",
      healthScore: 84,
    },
    {
      id: "fam-2",
      relation: "Father",
      fullName: "Suresh Kumar",
      age: 58,
      gender: "Male",
      bloodGroup: "B+",
      chronicConditions: ["Hypertension", "Type 2 Diabetes"],
      activeMedicationsCount: 3,
      lastCheckupDate: "10 Jul 2026",
      upcomingVaccineOrTest: "HbA1c & Kidney Function (05 Oct 2026)",
      healthScore: 71,
    },
    {
      id: "fam-3",
      relation: "Mother",
      fullName: "Sunita Devi",
      age: 54,
      gender: "Female",
      bloodGroup: "A+",
      chronicConditions: ["Thyroid (Hypothyroidism)", "Osteoarthritis"],
      activeMedicationsCount: 2,
      lastCheckupDate: "15 Jun 2026",
      upcomingVaccineOrTest: "TSH Thyroid Profile & DEXA Bone Scan",
      healthScore: 76,
    },
  ];
}

// ================= 20. PREVENTIVE CARE RECOMMENDATIONS =================
export function getPreventiveCarePlan(
  age: number = 28,
  gender: "Male" | "Female" = "Male",
): PreventiveCareCheck[] {
  const list: PreventiveCareCheck[] = [
    {
      id: "prev-1",
      title: "Comprehensive Metabolic & Lipid Panel",
      targetAgeGender: "All Adults (20+ yrs)",
      frequency: "Annual",
      category: "Cardiac Health",
      description:
        "Screen for silent lipid plaque buildup, diabetes, and hepatic-renal biomarkers.",
      recommendedTests: ["Fasting Lipid Profile", "HbA1c", "Serum Creatinine", "SGPT / LFT"],
      whyItMatters:
        "Early detection prevents cardiovascular events and metabolic syndrome before symptoms manifest.",
    },
    {
      id: "prev-2",
      title: "Vitamin D3 & B12 Vitality Screening",
      targetAgeGender: "All Adults",
      frequency: "Annual",
      category: "Bone & Vitamin",
      description: "Checks active 25-OH Vitamin D and cyanocobalamin nerve protection levels.",
      recommendedTests: ["Vitamin D Total", "Vitamin B12 Serum"],
      whyItMatters:
        "90% of urban working adults suffer fatigue and bone density decline due to hidden deficiencies.",
    },
    {
      id: "prev-3",
      title: "Annual Dental & Periodontal Assessment",
      targetAgeGender: "All Ages",
      frequency: "Bi-Annual",
      category: "Dental",
      description: "Plaque removal, enamel inspection, and gingivitis prevention.",
      recommendedTests: ["Oral Prophylaxis (Cleaning)", "Bite-wing X-Ray"],
      whyItMatters:
        "Periodontal bacteria has direct correlation with systemic arterial inflammation and cardiac health.",
    },
  ];

  if (gender === "Female" && age >= 30) {
    list.push({
      id: "prev-4",
      title: "Women's Wellness & Cervical Screening",
      targetAgeGender: "Women (30+ yrs)",
      frequency: "Once every 3 years",
      category: "Cancer Screening",
      description: "Liquid-based cytology Pap smear and high-risk HPV DNA screening.",
      recommendedTests: ["Pap Smear (LBC)", "HPV DNA Test", "Clinical Breast Exam"],
      whyItMatters: "Early detection prevents 99% of invasive cervical carcinoma.",
    });
  }

  if (age >= 45) {
    list.push({
      id: "prev-5",
      title: "Cardiac Stress & Echo Screening",
      targetAgeGender: "Adults (45+ yrs)",
      frequency: "Bi-Annual",
      category: "Cardiac Health",
      description: "2D Echocardiogram and Treadmill Stress Test (TMT).",
      recommendedTests: ["2D Echo with Doppler", "TMT Stress Test"],
      whyItMatters: "Evaluates ejection fraction and inducible ischemia under exercise workload.",
    });
  }

  return list;
}

// ================= 17. MEDICAL KNOWLEDGE SEARCH =================
export function searchMedicalKnowledgeBase(query: string): MedicalSearchResult {
  const q = query.toLowerCase().trim();

  if (q.includes("diabetes") || q.includes("sugar") || q.includes("glucose")) {
    return {
      query,
      category: "disease",
      title: "Type 2 Diabetes Mellitus — Complete Medical Overview",
      summary:
        "A metabolic disorder characterized by elevated blood glucose levels due to insulin resistance and progressive pancreatic beta-cell dysfunction.",
      keyPoints: [
        "Normal Fasting Blood Sugar: 70–99 mg/dL; Prediabetes: 100–125 mg/dL; Diabetes: ≥126 mg/dL",
        "Target HbA1c for good control is typically below 6.5% – 7.0%",
        "Key lifestyle pillars: Low glycemic index diet, strength training, 150 mins weekly cardio",
        "Recommended annual screenings: Retinal fundoscopy, urine microalbuminuria, diabetic foot exam",
      ],
      warningNote:
        "Unmanaged hyperglycemia can lead to nephropathy, neuropathy, and cardiovascular complications.",
      suggestedSpecialist: "Endocrinologist / Diabetologist",
      matchingDoctors: DOCTORS.filter(
        (d) =>
          d.speciality.toLowerCase().includes("endocrino") ||
          d.speciality.toLowerCase().includes("physician"),
      ),
    };
  }

  if (q.includes("paracetamol") || q.includes("crocin") || q.includes("dolo")) {
    return {
      query,
      category: "medicine",
      title: "Paracetamol (Acetaminophen) — Analgesic & Antipyretic",
      summary:
        "Widely used medication for relieving mild-to-moderate pain and reducing fever by inhibiting prostaglandin synthesis in the central nervous system.",
      keyPoints: [
        "Typical Adult Dosage: 500mg to 650mg every 6 to 8 hours as needed (Max 3000mg/day)",
        "Onset of action: 30 to 45 minutes; Duration: 4 to 6 hours",
        "Safe in pregnancy under standard clinical guidance",
        "Avoid concurrent alcohol consumption to prevent hepatic toxicity",
      ],
      warningNote:
        "Excessive doses exceeding 4g/day can trigger acute liver failure. Avoid combining multiple paracetamol-containing OTC formulations.",
      suggestedSpecialist: "General Physician",
      matchingDoctors: DOCTORS.filter((d) => d.speciality.toLowerCase().includes("physician")),
    };
  }

  // Default General Medical Response
  return {
    query,
    category: "symptom",
    title: `Medical Insights on "${query}"`,
    summary: `Comprehensive clinical perspective on ${query}, including pathophysiology, differential indicators, and best practice diagnostic pathways.`,
    keyPoints: [
      "Maintain a detailed symptom diary with onset time, duration, and severity triggers.",
      "Ensure balanced hydration and adequate rest while monitoring for red-flag escalation signs.",
      "Consult a qualified specialist for individualized physical examination and tailored diagnostic tests.",
    ],
    suggestedSpecialist: "General Physician",
    matchingDoctors: DOCTORS.slice(0, 3),
  };
}

// Conversation Storage Helpers
const STORAGE_KEY = "medyora_ai_copilot_sessions_v1";

export function loadSavedSessions(): ConversationSession[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveSessions(sessions: ConversationSession[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch (e) {
    console.error("Failed to save AI sessions", e);
  }
}
