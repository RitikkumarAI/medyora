import { DOCTORS } from "@/shared/data/mock";
import type { Doctor } from "@/shared/types";

// ==========================================
// 1. CORE TYPES & INTERFACES
// ==========================================

export type SpecialtyCategoryId =
  | "cardiology"
  | "dermatology"
  | "orthopedics"
  | "pediatrics"
  | "gynecology"
  | "neurology"
  | "gastroenterology"
  | "pulmonology"
  | "endocrinology"
  | "urology"
  | "ent"
  | "ophthalmology"
  | "general_medicine"
  | "mental_wellness";

export type SeverityLevel = "normal" | "mild" | "moderate" | "high" | "critical";

export interface SpecialtyCategoryMeta {
  id: SpecialtyCategoryId;
  name: string;
  hindiName: string;
  iconName: string;
  tagline: string;
  organSystem: string;
  typicalTests: string[];
  keyBiomarkers: string[];
  clinicalGuidelineAuthority: string;
}

export interface ExtractedBiomarker {
  name: string;
  value: string;
  numericValue?: number;
  unit: string;
  referenceRange: string;
  status: "normal" | "high" | "low" | "critical";
  diagnosticWeight: "primary" | "secondary" | "supporting";
  clinicalSignificance: string;
  biochemicalMechanism: string;
}

export interface DeficienciesAndAnomalies {
  category: "Deficiency" | "Elevated Marker" | "Structural Anomaly" | "Functional Impairment";
  name: string;
  observed: string;
  optimal: string;
  impactOnHealth: string;
  urgency: "routine" | "soon" | "immediate";
}

export interface PrecautionItem {
  title: string;
  instruction: string;
  urgency: "critical_red_flag" | "high_priority" | "general_caution";
  reason: string;
}

export interface WhatToAvoidItem {
  item: string;
  category: "food" | "activity" | "lifestyle" | "medication";
  whyAvoid: string;
  consequenceIfIgnored: string;
}

export interface WhatToEatItem {
  food: string;
  category: "superfood" | "daily_staple" | "therapeutic_spice" | "hydration";
  portion: string;
  benefits: string;
  biochemicalMechanism: string;
}

export interface WhatToDoItem {
  action: string;
  category: "exercise" | "monitoring" | "routine" | "therapy";
  frequency: string;
  instruction: string;
  expectedOutcome: string;
}

export interface ExplainableEvidenceItem {
  biomarker: string;
  observedValue: string;
  standardBaseline: string;
  diagnosticContributionPercentage: number;
  explanation: string;
}

export interface ClinicalGuidelineCitation {
  authorityName: string;
  guidelineTitle: string;
  editionYear: number;
  recommendationLevel: string; // e.g. "Class I, Level of Evidence A"
  summaryOfStandard: string;
}

export interface LongitudinalTrendPoint {
  date: string;
  parameterName: string;
  value: number;
  unit: string;
  status: "improving" | "stable" | "deteriorating";
  changePercentage: number;
  interpretation: string;
}

export interface SpecialtyReportItem {
  id: string;
  specialtyId: SpecialtyCategoryId;
  title: string;
  date: string;
  labName: string;
  doctorReferred?: string;
  fileType: "lab_blood" | "ecg" | "xray_mri" | "ultrasound" | "prescription" | "clinical_summary";
  extractedTextSnippet: string;
  parameters: ExtractedBiomarker[];
}

export interface SpecialtyXAIAnalysisResult {
  specialtyId: SpecialtyCategoryId;
  analysisDate: string;
  reportCountAnalyzed: number;
  primaryConditionTitle: string;
  hindiConditionTitle: string;
  severity: SeverityLevel;
  overallConfidenceScore: number; // 0 - 100%
  summaryParagraph: string;

  // Explainable AI (XAI) Deep-Dive ("Kyun ho raha hai")
  pathophysiologyExplanation: string;
  biomarkerEvidenceChain: ExplainableEvidenceItem[];
  clinicalGuideline: ClinicalGuidelineCitation;
  ruleOutDifferentialDiagnosis: Array<{
    condition: string;
    whyRuledOut: string;
  }>;

  // The 4 Core Patient Guidance Quadrants
  deficienciesAndAnomalies: DeficienciesAndAnomalies[];
  precautions: PrecautionItem[];
  whatToAvoid: WhatToAvoidItem[];
  whatToEat: WhatToEatItem[];
  whatToDo: WhatToDoItem[];

  // Longitudinal Trends across history
  longitudinalTrends?: LongitudinalTrendPoint[];

  // Doctor recommendations
  recommendedDoctorQuery: string;
  suggestedDoctors: Doctor[];
  recommendedNextTests: string[];
}

// ==========================================
// 2. SPECIALTY METADATA CATALOG
// ==========================================

export const SPECIALTY_CATEGORIES: SpecialtyCategoryMeta[] = [
  {
    id: "cardiology",
    name: "Cardiology",
    hindiName: "हृदय रोग (दिल की देखभाल)",
    iconName: "HeartPulse",
    tagline: "Heart Rhythm, Lipid Profile, Angiogram, ECG & Vascular Health",
    organSystem: "Cardiovascular System",
    typicalTests: [
      "Lipid Profile (LDL/HDL)",
      "12-Lead ECG",
      "2D Echocardiogram",
      "Troponin I/T",
      "TMT Stress Test",
    ],
    keyBiomarkers: [
      "LDL-C",
      "ApoB",
      "Troponin-I",
      "Total Cholesterol",
      "Blood Pressure",
      "Ejection Fraction",
    ],
    clinicalGuidelineAuthority: "AHA / ACC / ESC Guidelines 2024",
  },
  {
    id: "dermatology",
    name: "Dermatology",
    hindiName: "त्वचा एवं बाल रोग",
    iconName: "Sparkles",
    tagline: "Acne, Psoriasis, Eczema, Hair Fall, Allergies & Skin Biopsy",
    organSystem: "Integumentary System",
    typicalTests: [
      "Dermoscopy",
      "Serum IgE Allergy Panel",
      "Serum Ferritin",
      "Skin Scraping KOH",
      "Thyroid Profile",
    ],
    keyBiomarkers: ["Serum IgE", "Ferritin", "Vitamin D3", "Biotin Levels", "Sebum Index"],
    clinicalGuidelineAuthority: "Indian Association of Dermatologists (IADVL) & AAD Guidelines",
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    hindiName: "हड्डी एवं जोड़ विशेषज्ञ",
    iconName: "Bone",
    tagline: "Joint Pain, Arthritis, Spine, Fractures, DEXA & Cartilage",
    organSystem: "Musculoskeletal System",
    typicalTests: [
      "Digital X-Ray",
      "DEXA Bone Density Scan",
      "Serum Uric Acid",
      "Rheumatoid Factor (RF)",
      "Anti-CCP",
    ],
    keyBiomarkers: ["DEXA T-Score", "Serum Uric Acid", "ESR / CRP", "Vitamin D3", "Calcium"],
    clinicalGuidelineAuthority: "American Academy of Orthopaedic Surgeons (AAOS) & IOF Guidelines",
  },
  {
    id: "endocrinology",
    name: "Endocrinology & Diabetes",
    hindiName: "मधुमेह एवं हार्मोन रोग",
    iconName: "Activity",
    tagline: "HbA1c, Fasting Sugar, Thyroid (TSH/T3/T4), Insulin & PCOD",
    organSystem: "Endocrine & Metabolic System",
    typicalTests: [
      "HbA1c Glycated Hemoglobin",
      "Fasting & PP Glucose",
      "Thyroid Panel (TSH, FT3, FT4)",
      "HOMA-IR",
    ],
    keyBiomarkers: ["HbA1c", "Fasting Plasma Glucose", "TSH", "Serum Cortisol", "C-Peptide"],
    clinicalGuidelineAuthority: "American Diabetes Association (ADA 2025) & RSSDI India Guidelines",
  },
  {
    id: "gastroenterology",
    name: "Gastroenterology",
    hindiName: "पेट एवं पाचन तंत्र रोग",
    iconName: "Zap",
    tagline: "Liver Function (LFT), Fatty Liver, Acidity, IBS, Endoscopy & Gut",
    organSystem: "Digestive & Hepatobiliary System",
    typicalTests: [
      "Complete LFT Panel",
      "Ultrasound Abdomen",
      "H. Pylori Stool Antigen",
      "Upper GI Endoscopy",
    ],
    keyBiomarkers: [
      "SGPT/ALT",
      "SGOT/AST",
      "Serum Bilirubin",
      "Serum Albumin",
      "Alkaline Phosphatase",
    ],
    clinicalGuidelineAuthority: "American College of Gastroenterology (ACG) & INASL Guidelines",
  },
  {
    id: "pulmonology",
    name: "Pulmonology",
    hindiName: "फेफड़े एवं श्वसन रोग",
    iconName: "Wind",
    tagline: "Asthma, Chronic Cough, Spirometry (PFT), Chest X-Ray & Allergy",
    organSystem: "Respiratory System",
    typicalTests: [
      "Spirometry (FEV1/FVC)",
      "Chest High-Resolution CT",
      "SpO2 Pulse Oximetry",
      "Absolute Eosinophil Count",
    ],
    keyBiomarkers: ["FEV1/FVC Ratio", "SpO2 %", "Absolute Eosinophils (AEC)", "Serum IgE"],
    clinicalGuidelineAuthority:
      "Global Initiative for Chronic Obstructive Lung Disease (GOLD 2024)",
  },
  {
    id: "neurology",
    name: "Neurology",
    hindiName: "दिमाग एवं तंत्रिका रोग",
    iconName: "Brain",
    tagline: "Migraine, Neuropathy, Brain MRI, Seizures, EEG & Nerve Signals",
    organSystem: "Nervous System",
    typicalTests: [
      "Brain MRI with Angio",
      "Digital EEG",
      "Nerve Conduction Velocity (NCV)",
      "Serum Vitamin B12",
    ],
    keyBiomarkers: ["Vitamin B12", "Homocysteine", "Serum Folate", "C-Reactive Protein"],
    clinicalGuidelineAuthority: "American Academy of Neurology (AAN) Guidelines",
  },
  {
    id: "urology",
    name: "Nephrology & Urology",
    hindiName: "किडनी एवं मूत्र रोग",
    iconName: "Shield",
    tagline: "Kidney Stones, Creatinine, eGFR, UTI, Urine Microalbumin & Prostate",
    organSystem: "Renal & Urinary Tract",
    typicalTests: [
      "Renal Function Test (KFT)",
      "Urine Routine & Microscopic",
      "eGFR Calculation",
      "USG KUB",
    ],
    keyBiomarkers: [
      "Serum Creatinine",
      "eGFR",
      "Blood Urea Nitrogen (BUN)",
      "Urine Albumin-to-Creatinine Ratio (UACR)",
    ],
    clinicalGuidelineAuthority: "Kidney Disease: Improving Global Outcomes (KDIGO 2024)",
  },
  {
    id: "pediatrics",
    name: "Pediatrics",
    hindiName: "बाल रोग (बच्चों का स्वास्थ्य)",
    iconName: "Baby",
    tagline: "Child Growth Milestones, Vaccination, Infant Cold, Nutrition & Fever",
    organSystem: "Pediatric Developmental Health",
    typicalTests: [
      "Pediatric CBC",
      "Growth Percentile Chart",
      "Serum Ferritin",
      "Urinary Organic Acids",
    ],
    keyBiomarkers: [
      "Hemoglobin",
      "Weight-for-Age Z-Score",
      "Serum Ferritin",
      "Neutrophil-to-Lymphocyte Ratio",
    ],
    clinicalGuidelineAuthority: "Indian Academy of Pediatrics (IAP) & WHO Growth Standards",
  },
  {
    id: "gynecology",
    name: "Gynecology & Obstetrics",
    hindiName: "महिला स्वास्थ्य एवं प्रसूति रोग",
    iconName: "Flower2",
    tagline: "PCOD/PCOS, Hormonal Panels, Pregnancy Scans, Periods & Fertility",
    organSystem: "Female Reproductive System",
    typicalTests: ["Pelvic Ultrasound", "Serum AMH", "LH:FSH Ratio", "Prolactin", "Beta hCG"],
    keyBiomarkers: ["AMH", "LH/FSH Ratio", "Total Testosterone", "Prolactin", "Progesterone"],
    clinicalGuidelineAuthority:
      "Federation of Obstetric and Gynaecological Societies of India (FOGSI)",
  },
  {
    id: "ent",
    name: "ENT (Ear, Nose, Throat)",
    hindiName: "कान, नाक एवं गला रोग",
    iconName: "Stethoscope",
    tagline: "Sinusitis, Audiometry Hearing Loss, Tonsillitis, Vertigo & Tinnitus",
    organSystem: "Ear, Nose, Throat & Auditory System",
    typicalTests: [
      "Pure Tone Audiometry (PTA)",
      "CT Paranasal Sinuses (PNS)",
      "Diagnostic Nasal Endoscopy",
    ],
    keyBiomarkers: [
      "Pure Tone Threshold (dB)",
      "Sinus Opacification Score",
      "Tympanogram Peak Pressure",
    ],
    clinicalGuidelineAuthority:
      "American Academy of Otolaryngology-Head and Neck Surgery (AAO-HNS)",
  },
  {
    id: "ophthalmology",
    name: "Ophthalmology",
    hindiName: "नेत्र रोग (आंखों की देखभाल)",
    iconName: "Eye",
    tagline: "Refraction, Cataract, Intraocular Pressure, Glaucoma & Retina OCT",
    organSystem: "Visual System",
    typicalTests: [
      "Slit Lamp Examination",
      "Goldmann Applanation Tonometry",
      "Optical Coherence Tomography (OCT)",
    ],
    keyBiomarkers: [
      "Intraocular Pressure (IOP mmHg)",
      "Central Corneal Thickness",
      "Cup-to-Disc Ratio",
    ],
    clinicalGuidelineAuthority:
      "All India Ophthalmological Society (AIOS) & AAO Preferred Practice",
  },
  {
    id: "general_medicine",
    name: "General Medicine",
    hindiName: "सामान्य चिकित्सा एवं वायरल रोग",
    iconName: "ShieldCheck",
    tagline: "Fever, Viral Infections, CBC, Weakness, Sepsis & Metabolic Panel",
    organSystem: "Whole Body Systemic Health",
    typicalTests: [
      "Complete Blood Count (CBC)",
      "ESR / CRP",
      "Dengue NS1 / Widal",
      "Serum Electrolytes",
    ],
    keyBiomarkers: [
      "Platelet Count",
      "Total Leukocyte Count (TLC)",
      "C-Reactive Protein",
      "Serum Sodium",
    ],
    clinicalGuidelineAuthority:
      "Association of Physicians of India (API) & ICMR Clinical Protocols",
  },
  {
    id: "mental_wellness",
    name: "Mental Wellness & Psychiatry",
    hindiName: "मानसिक स्वास्थ्य एवं तनाव",
    iconName: "Smile",
    tagline: "Anxiety, Depression, Sleep Architecture, PHQ-9, Burnout & Stress",
    organSystem: "Psychological & Neuro-Endocrine",
    typicalTests: [
      "PHQ-9 Depression Inventory",
      "GAD-7 Anxiety Scale",
      "Sleep Polysomnography",
      "Serum Cortisol",
    ],
    keyBiomarkers: [
      "PHQ-9 Score",
      "GAD-7 Score",
      "Pittsburgh Sleep Quality Index (PSQI)",
      "Serum Cortisol",
    ],
    clinicalGuidelineAuthority: "Indian Psychiatric Society (IPS) & DSM-5-TR Clinical Guidelines",
  },
];

// ==========================================
// 3. SAMPLE PRE-POPULATED CLINICAL REPORTS
// ==========================================

export const INITIAL_SPECIALTY_REPORTS: Record<SpecialtyCategoryId, SpecialtyReportItem[]> = {
  cardiology: [
    {
      id: "cardio-rep-1",
      specialtyId: "cardiology",
      title: "Comprehensive Lipid Profile & Cardiac Risk Panel",
      date: "12 Oct 2024",
      labName: "Max Pathology & Cardiac Labs",
      doctorReferred: "Dr. Arvind Mehta (Cardiologist)",
      fileType: "lab_blood",
      extractedTextSnippet:
        "Patient presents with occasional exertion dyspnea. Serum lipids show elevated LDL and low HDL.",
      parameters: [
        {
          name: "Low-Density Lipoprotein (LDL-C)",
          value: "172 mg/dL",
          numericValue: 172,
          unit: "mg/dL",
          referenceRange: "< 100 mg/dL",
          status: "high",
          diagnosticWeight: "primary",
          clinicalSignificance:
            "Major atherogenic lipoprotein driving plaque deposition inside coronary arterial walls.",
          biochemicalMechanism:
            "Excess circulating LDL penetrates the endothelium, undergoes oxidation, and forms foam cells in arterial intima.",
        },
        {
          name: "High-Density Lipoprotein (HDL-C)",
          value: "36 mg/dL",
          numericValue: 36,
          unit: "mg/dL",
          referenceRange: "> 45 mg/dL",
          status: "low",
          diagnosticWeight: "secondary",
          clinicalSignificance: "Suboptimal reverse cholesterol transport efficiency.",
          biochemicalMechanism:
            "Reduced ApoA-I mediated cholesterol efflux from peripheral tissues back to hepatic processing.",
        },
        {
          name: "Total Cholesterol",
          value: "248 mg/dL",
          numericValue: 248,
          unit: "mg/dL",
          referenceRange: "< 200 mg/dL",
          status: "high",
          diagnosticWeight: "secondary",
          clinicalSignificance: "Elevated overall circulating sterol burden.",
          biochemicalMechanism:
            "Hepatic HMG-CoA reductase upregulation combined with reduced LDL-receptor clearance.",
        },
        {
          name: "Triglycerides",
          value: "198 mg/dL",
          numericValue: 198,
          unit: "mg/dL",
          referenceRange: "< 150 mg/dL",
          status: "high",
          diagnosticWeight: "supporting",
          clinicalSignificance:
            "Mild hypertriglyceridemia, contributes to dense small-particle LDL formation.",
          biochemicalMechanism:
            "VLDL clearance delay and elevated carbohydrate hepatic lipogenesis.",
        },
        {
          name: "High-Sensitivity CRP (hs-CRP)",
          value: "3.2 mg/L",
          numericValue: 3.2,
          unit: "mg/L",
          referenceRange: "< 1.0 mg/L",
          status: "high",
          diagnosticWeight: "primary",
          clinicalSignificance: "Active vascular endothelial inflammatory activity.",
          biochemicalMechanism:
            "Hepatic acute phase reactant synthesized in response to interleukin-6 and vascular inflammation.",
        },
      ],
    },
    {
      id: "cardio-rep-2",
      specialtyId: "cardiology",
      title: "12-Lead Electrocardiogram (ECG) & Blood Pressure Log",
      date: "15 Jan 2025",
      labName: "Apollo Heart Institute",
      doctorReferred: "Dr. Arvind Mehta (Cardiologist)",
      fileType: "ecg",
      extractedTextSnippet:
        "Normal sinus rhythm at 82 bpm. Mild ST depression observed in lateral precordial leads (V5-V6). Resting BP 142/92 mmHg.",
      parameters: [
        {
          name: "Systolic Blood Pressure",
          value: "142 mmHg",
          numericValue: 142,
          unit: "mmHg",
          referenceRange: "< 120 mmHg",
          status: "high",
          diagnosticWeight: "primary",
          clinicalSignificance:
            "Stage 1 Essential Hypertension, increases left ventricular afterload.",
          biochemicalMechanism:
            "Arterial stiffness and elevated systemic peripheral vascular resistance.",
        },
        {
          name: "Diastolic Blood Pressure",
          value: "92 mmHg",
          numericValue: 92,
          unit: "mmHg",
          referenceRange: "< 80 mmHg",
          status: "high",
          diagnosticWeight: "primary",
          clinicalSignificance: "Elevated baseline resting vascular tone.",
          biochemicalMechanism:
            "Renin-angiotensin-aldosterone axis activation and sodium sensitivity.",
        },
        {
          name: "ECG ST-Segment Trend",
          value: "0.8 mm Depression in V5-V6",
          unit: "mm",
          referenceRange: "Isoelectric",
          status: "high",
          diagnosticWeight: "primary",
          clinicalSignificance: "Subendocardial ischemic strain during elevated demand.",
          biochemicalMechanism:
            "Delayed repolarization in lateral myocardial segments during afterload elevation.",
        },
        {
          name: "Resting Heart Rate",
          value: "82 bpm",
          numericValue: 82,
          unit: "bpm",
          referenceRange: "60 - 100 bpm",
          status: "normal",
          diagnosticWeight: "supporting",
          clinicalSignificance: "Sinus rhythm within acceptable physiological parameters.",
          biochemicalMechanism: "Sinoatrial node autonomic equilibrium.",
        },
      ],
    },
  ],

  dermatology: [
    {
      id: "derm-rep-1",
      specialtyId: "dermatology",
      title: "Dermatological Allergy & Chronic Eczema Biomarker Panel",
      date: "20 Nov 2024",
      labName: "DermaCare Skin Pathology",
      fileType: "lab_blood",
      extractedTextSnippet:
        "Erythematous pruriginous lesions across flexural surfaces. Elevated serum IgE and deficient 25-OH Vitamin D3.",
      parameters: [
        {
          name: "Serum Total IgE",
          value: "410 IU/mL",
          numericValue: 410,
          unit: "IU/mL",
          referenceRange: "< 100 IU/mL",
          status: "high",
          diagnosticWeight: "primary",
          clinicalSignificance: "Marked atopic diathesis and allergic hypersensitivity.",
          biochemicalMechanism:
            "Th2 immune activation producing IL-4/IL-13 stimulating B-cell IgE isotype switching.",
        },
        {
          name: "25-Hydroxy Vitamin D3",
          value: "14.2 ng/mL",
          numericValue: 14.2,
          unit: "ng/mL",
          referenceRange: "30 - 100 ng/mL",
          status: "low",
          diagnosticWeight: "primary",
          clinicalSignificance:
            "Severe Vitamin D deficiency impairing epidermal antimicrobial peptides.",
          biochemicalMechanism:
            "Reduced cathelicidin and defensin production in keratinocytes, increasing barrier susceptibility.",
        },
        {
          name: "Serum Ferritin (Hair & Skin Matrix)",
          value: "18 ng/mL",
          numericValue: 18,
          unit: "ng/mL",
          referenceRange: "30 - 200 ng/mL",
          status: "low",
          diagnosticWeight: "secondary",
          clinicalSignificance:
            "Depleted cellular iron stores causing telogen effluvium and impaired wound healing.",
          biochemicalMechanism:
            "Ribonucleotide reductase cofactor depletion slowing matrix keratinocyte proliferation.",
        },
      ],
    },
  ],

  orthopedics: [
    {
      id: "ortho-rep-1",
      specialtyId: "orthopedics",
      title: "Bilateral Knee Digital X-Ray & Joint Metabolic Panel",
      date: "05 Dec 2024",
      labName: "Fortis Bone & Joint Diagnostics",
      fileType: "xray_mri",
      extractedTextSnippet:
        "Medial compartment joint space narrowing (Grade 2 Kellgren-Lawrence). Serum uric acid borderline high at 7.4 mg/dL.",
      parameters: [
        {
          name: "Medial Joint Space Width (X-Ray)",
          value: "2.1 mm (Narrowed)",
          unit: "mm",
          referenceRange: "> 4.0 mm",
          status: "critical",
          diagnosticWeight: "primary",
          clinicalSignificance:
            "Grade 2 Tibiofemoral Osteoarthritis with articular cartilage erosion.",
          biochemicalMechanism:
            "MMP-13 matrix metalloproteinase degradation of Type II collagen network.",
        },
        {
          name: "Serum Uric Acid",
          value: "7.6 mg/dL",
          numericValue: 7.6,
          unit: "mg/dL",
          referenceRange: "3.5 - 7.0 mg/dL",
          status: "high",
          diagnosticWeight: "primary",
          clinicalSignificance:
            "Hyperuricemia approaching monosodium urate precipitation threshold in synovial fluid.",
          biochemicalMechanism: "Purine catabolism outstripping renal URAT1 tubular excretion.",
        },
        {
          name: "High-Sensitivity CRP",
          value: "4.8 mg/L",
          numericValue: 4.8,
          unit: "mg/L",
          referenceRange: "< 1.0 mg/L",
          status: "high",
          diagnosticWeight: "secondary",
          clinicalSignificance: "Low-grade synovial inflammatory environment.",
          biochemicalMechanism:
            "Synovial macrophage activation generating pro-inflammatory cytokines IL-1beta and TNF-alpha.",
        },
      ],
    },
  ],

  endocrinology: [
    {
      id: "endo-rep-1",
      specialtyId: "endocrinology",
      title: "Glycemic Profiling & Comprehensive Thyroid Panel",
      date: "18 Dec 2024",
      labName: "Thyrocare Technologies",
      fileType: "lab_blood",
      extractedTextSnippet:
        "HbA1c indicates suboptimal glycemic management. Fasting blood sugar 154 mg/dL. TSH elevated at 6.8 uIU/mL.",
      parameters: [
        {
          name: "HbA1c (Glycated Hemoglobin)",
          value: "8.2 %",
          numericValue: 8.2,
          unit: "%",
          referenceRange: "< 5.7 % (Normal), < 6.5 % (Target)",
          status: "critical",
          diagnosticWeight: "primary",
          clinicalSignificance:
            "Type 2 Diabetes Mellitus with elevated microvascular and macrovascular complication risk.",
          biochemicalMechanism:
            "Non-enzymatic glycation of valine terminal residues on hemoglobin beta-chains reflecting 90-day mean glucose.",
        },
        {
          name: "Fasting Plasma Glucose",
          value: "154 mg/dL",
          numericValue: 154,
          unit: "mg/dL",
          referenceRange: "70 - 99 mg/dL",
          status: "high",
          diagnosticWeight: "primary",
          clinicalSignificance: "Significant unsuppressed nocturnal hepatic gluconeogenesis.",
          biochemicalMechanism:
            "Hepatic insulin resistance causing continuous glucose-6-phosphatase activity.",
        },
        {
          name: "Thyroid Stimulating Hormone (TSH)",
          value: "6.8 uIU/mL",
          numericValue: 6.8,
          unit: "uIU/mL",
          referenceRange: "0.4 - 4.5 uIU/mL",
          status: "high",
          diagnosticWeight: "primary",
          clinicalSignificance:
            "Subclinical Hypothyroidism slowing metabolic clearance and worsening insulin sensitivity.",
          biochemicalMechanism:
            "Pituitary TRH-driven upregulation compensating for subtle peripheral thyroxine deficits.",
        },
      ],
    },
  ],

  gastroenterology: [
    {
      id: "gastro-rep-1",
      specialtyId: "gastroenterology",
      title: "Hepatic Function Panel & Abdominal Sonography",
      date: "10 Nov 2024",
      labName: "Medanta Hepatology Lab",
      fileType: "lab_blood",
      extractedTextSnippet:
        "Ultrasound reveals Grade 2 Hepatic Steatosis. SGPT/ALT and SGOT/AST elevated with inverted ratio.",
      parameters: [
        {
          name: "Alanine Transaminase (SGPT/ALT)",
          value: "68 U/L",
          numericValue: 68,
          unit: "U/L",
          referenceRange: "< 45 U/L",
          status: "high",
          diagnosticWeight: "primary",
          clinicalSignificance:
            "Active hepatocellular damage secondary to non-alcoholic fatty liver disease (MASLD).",
          biochemicalMechanism:
            "Lipid droplet accumulation in hepatocytes causing mitochondrial oxidative stress and enzyme leakage.",
        },
        {
          name: "Aspartate Transaminase (SGOT/AST)",
          value: "54 U/L",
          numericValue: 54,
          unit: "U/L",
          referenceRange: "< 40 U/L",
          status: "high",
          diagnosticWeight: "secondary",
          clinicalSignificance: "Hepatocyte cytosolic membrane permeability impairment.",
          biochemicalMechanism:
            "Transaminase enzyme efflux from inflamed hepatic lobules into systemic circulation.",
        },
        {
          name: "Ultrasound Liver Echogenicity",
          value: "Grade 2 Hepatic Steatosis",
          unit: "Grade",
          referenceRange: "Normal Echotexture",
          status: "high",
          diagnosticWeight: "primary",
          clinicalSignificance:
            "Moderate intrahepatic triglyceride accumulation affecting 33-66% of parenchymal volume.",
          biochemicalMechanism:
            "De novo lipogenesis exceeding fatty acid beta-oxidation and VLDL export.",
        },
      ],
    },
  ],

  pulmonology: [
    {
      id: "pulmo-rep-1",
      specialtyId: "pulmonology",
      title: "Spirometry Pulmonary Function Test & Chest Imaging",
      date: "02 Jan 2025",
      labName: "Chest Research Foundation",
      fileType: "lab_blood",
      extractedTextSnippet:
        "Obstructive ventilatory defect with 14% post-bronchodilator reversibility, consistent with Bronchial Asthma.",
      parameters: [
        {
          name: "FEV1 / FVC Ratio",
          value: "0.64",
          numericValue: 0.64,
          unit: "ratio",
          referenceRange: "> 0.75",
          status: "critical",
          diagnosticWeight: "primary",
          clinicalSignificance: "Moderate airway airflow obstruction.",
          biochemicalMechanism:
            "Smooth muscle bronchospasm and subepithelial basement membrane eosinophilic inflammation.",
        },
        {
          name: "Absolute Eosinophil Count (AEC)",
          value: "580 cells/mcL",
          numericValue: 580,
          unit: "cells/mcL",
          referenceRange: "40 - 400 cells/mcL",
          status: "high",
          diagnosticWeight: "primary",
          clinicalSignificance: "Atopic allergic airway inflammation driving hyper-reactivity.",
          biochemicalMechanism:
            "Major basic protein and eosinophil cationic protein release damaging respiratory cilia.",
        },
      ],
    },
  ],

  neurology: [
    {
      id: "neuro-rep-1",
      specialtyId: "neurology",
      title: "Brain Neuro-Vascular MRI & Neuropathy Biomarkers",
      date: "14 Dec 2024",
      labName: "AIIMS Neuro Sciences Centre",
      fileType: "xray_mri",
      extractedTextSnippet:
        "Severe Vitamin B12 deficiency. Homocysteine elevated. History of episodic unilateral throbbing headaches with photophobia.",
      parameters: [
        {
          name: "Serum Vitamin B12 (Cobalamin)",
          value: "112 pg/mL",
          numericValue: 112,
          unit: "pg/mL",
          referenceRange: "200 - 900 pg/mL",
          status: "critical",
          diagnosticWeight: "primary",
          clinicalSignificance:
            "Severe Cobalamin deficiency impairing myelin sheath maintenance and nerve conduction.",
          biochemicalMechanism:
            "Methionine synthase dysfunction causing impaired myelin basic protein synthesis.",
        },
        {
          name: "Serum Homocysteine",
          value: "22.4 mcmol/L",
          numericValue: 22.4,
          unit: "mcmol/L",
          referenceRange: "< 12.0 mcmol/L",
          status: "high",
          diagnosticWeight: "primary",
          clinicalSignificance:
            "Hyperhomocysteinemia promoting neurovascular endothelial dysfunction and migraine aura.",
          biochemicalMechanism:
            "Blocked remethylation of homocysteine to methionine due to B12/folate cofactor shortage.",
        },
      ],
    },
  ],

  urology: [
    {
      id: "uro-rep-1",
      specialtyId: "urology",
      title: "Renal Function Assessment (KFT) & USG KUB",
      date: "28 Nov 2024",
      labName: "Narayana Health Renal Labs",
      fileType: "lab_blood",
      extractedTextSnippet:
        "Creatinine 1.52 mg/dL. eGFR 52 mL/min. USG KUB reveals 4.2 mm non-obstructive calculus in right lower pole calyx.",
      parameters: [
        {
          name: "Serum Creatinine",
          value: "1.52 mg/dL",
          numericValue: 1.52,
          unit: "mg/dL",
          referenceRange: "0.7 - 1.2 mg/dL",
          status: "high",
          diagnosticWeight: "primary",
          clinicalSignificance:
            "Reduced glomerular clearance indicating Stage 3a Chronic Kidney Insufficiency.",
          biochemicalMechanism:
            "Reduced viable nephron filtration capacity causing retention of muscle phosphocreatine byproduct.",
        },
        {
          name: "Estimated GFR (CKD-EPI)",
          value: "52 mL/min/1.73m2",
          numericValue: 52,
          unit: "mL/min/1.73m2",
          referenceRange: "> 90 mL/min/1.73m2",
          status: "critical",
          diagnosticWeight: "primary",
          clinicalSignificance:
            "Moderate reduction in total renal filtration rate requiring hemodynamic care.",
          biochemicalMechanism:
            "Intraglomerular hyperfiltration followed by glomerulosclerosis and tubular atrophy.",
        },
        {
          name: "USG Renal Calculus",
          value: "4.2 mm Right Calyx",
          unit: "mm",
          referenceRange: "No Calculi",
          status: "high",
          diagnosticWeight: "secondary",
          clinicalSignificance: "Calcium oxalate nephrolithiasis prone to colic upon movement.",
          biochemicalMechanism:
            "Supersaturation of urinary calcium and oxalate with low citrate inhibition.",
        },
      ],
    },
  ],

  pediatrics: [
    {
      id: "ped-rep-1",
      specialtyId: "pediatrics",
      title: "Pediatric Growth & Micronutrient Panel (Age 5)",
      date: "10 Jan 2025",
      labName: "Rainbow Children's Hospital",
      fileType: "lab_blood",
      extractedTextSnippet:
        "Microcytic hypochromic anemia in 5-year-old. Hemoglobin 9.4 g/dL. Low serum ferritin and suboptimal zinc levels.",
      parameters: [
        {
          name: "Hemoglobin (Pediatric)",
          value: "9.4 g/dL",
          numericValue: 9.4,
          unit: "g/dL",
          referenceRange: "11.5 - 14.5 g/dL",
          status: "critical",
          diagnosticWeight: "primary",
          clinicalSignificance:
            "Moderate Nutritional Iron Deficiency Anemia impairing cognitive focus and growth velocity.",
          biochemicalMechanism:
            "Insufficient heme synthesis leading to microcytic hypochromic erythrocyte morphology.",
        },
        {
          name: "Serum Ferritin",
          value: "8.2 ng/mL",
          numericValue: 8.2,
          unit: "ng/mL",
          referenceRange: "20 - 150 ng/mL",
          status: "critical",
          diagnosticWeight: "primary",
          clinicalSignificance: "Exhausted reticuloendothelial iron stores in growing child.",
          biochemicalMechanism:
            "Dietary intake unable to meet rapid expander requirements of total blood volume.",
        },
      ],
    },
  ],

  gynecology: [
    {
      id: "gyn-rep-1",
      specialtyId: "gynecology",
      title: "Comprehensive Reproductive Hormone Panel & Pelvic USG",
      date: "04 Nov 2024",
      labName: "Cloudnine Women's Hospital",
      fileType: "ultrasound",
      extractedTextSnippet:
        "Pelvic ultrasound displays peripheral string-of-pearls follicles (>12 per ovary). Inverted LH:FSH ratio (2.8:1). PCOD confirmed.",
      parameters: [
        {
          name: "LH to FSH Ratio",
          value: "2.8 : 1",
          numericValue: 2.8,
          unit: "ratio",
          referenceRange: "< 1.5 : 1",
          status: "critical",
          diagnosticWeight: "primary",
          clinicalSignificance:
            "Classic neuroendocrine dysregulation of Polycystic Ovarian Syndrome (PCOS).",
          biochemicalMechanism:
            "Excessive GnRH pulse frequency stimulating pituitary luteinizing hormone hypersecretion.",
        },
        {
          name: "Anti-Mullerian Hormone (AMH)",
          value: "8.6 ng/mL",
          numericValue: 8.6,
          unit: "ng/mL",
          referenceRange: "1.5 - 4.0 ng/mL",
          status: "high",
          diagnosticWeight: "primary",
          clinicalSignificance:
            "High follicular reserve with arrested follicular maturation preventing ovulation.",
          biochemicalMechanism:
            "Granulosa cell overproduction of AMH inhibiting aromatase and dominant follicle selection.",
        },
      ],
    },
  ],

  ent: [
    {
      id: "ent-rep-1",
      specialtyId: "ent",
      title: "CT Paranasal Sinuses & Pure Tone Audiogram",
      date: "22 Dec 2024",
      labName: "Sir Ganga Ram ENT Specialty",
      fileType: "xray_mri",
      extractedTextSnippet:
        "Mucosal thickening of bilateral maxillary and ethmoid sinuses. Mild conductive hearing reduction on left ear.",
      parameters: [
        {
          name: "Maxillary Sinus Mucosal Thickness",
          value: "5.8 mm",
          numericValue: 5.8,
          unit: "mm",
          referenceRange: "< 1.5 mm",
          status: "high",
          diagnosticWeight: "primary",
          clinicalSignificance: "Chronic Rhinosinusitis with ostiomeatal complex obstruction.",
          biochemicalMechanism:
            "Ciliary clearance dysfunction causing stagnant mucous and secondary anaerobic colonization.",
        },
      ],
    },
  ],

  ophthalmology: [
    {
      id: "oph-rep-1",
      specialtyId: "ophthalmology",
      title: "Comprehensive Ocular Tonometry & Macular OCT Scan",
      date: "16 Nov 2024",
      labName: "Dr. Shroff's Eye Hospital",
      fileType: "clinical_summary",
      extractedTextSnippet:
        "Intraocular pressure elevated bilaterally. Left eye IOP 24 mmHg. Cupping of optic disc 0.6.",
      parameters: [
        {
          name: "Intraocular Pressure (IOP) - Left",
          value: "24 mmHg",
          numericValue: 24,
          unit: "mmHg",
          referenceRange: "10 - 21 mmHg",
          status: "high",
          diagnosticWeight: "primary",
          clinicalSignificance:
            "Ocular Hypertension with elevated Primary Open-Angle Glaucoma risk.",
          biochemicalMechanism:
            "Increased trabecular meshwork outflow resistance in the canal of Schlemm.",
        },
      ],
    },
  ],

  general_medicine: [
    {
      id: "gen-rep-1",
      specialtyId: "general_medicine",
      title: "Complete Blood Count (CBC) & Acute Febrile Illness Panel",
      date: "08 Jan 2025",
      labName: "Lal PathLabs Central Diagnostic",
      fileType: "lab_blood",
      extractedTextSnippet:
        "Patient presenting with acute high fever, severe myalgia, and retro-orbital headache. Platelets dropped to 78,000/mcL.",
      parameters: [
        {
          name: "Platelet Count",
          value: "78,000 /mcL",
          numericValue: 78000,
          unit: "/mcL",
          referenceRange: "150,000 - 450,000 /mcL",
          status: "critical",
          diagnosticWeight: "primary",
          clinicalSignificance:
            "Significant Thrombocytopenia secondary to viral infection (e.g. Dengue / Acute Viral Hemorrhagic).",
          biochemicalMechanism:
            "Immune-mediated platelet destruction and transient bone marrow megakaryocyte suppression.",
        },
        {
          name: "Total Leukocyte Count (WBC)",
          value: "3,100 /mcL",
          numericValue: 3100,
          unit: "/mcL",
          referenceRange: "4,000 - 11,000 /mcL",
          status: "low",
          diagnosticWeight: "secondary",
          clinicalSignificance: "Leukopenia typical of acute viremia.",
          biochemicalMechanism:
            "Margination of neutrophils and viral inhibition of granulopoiesis.",
        },
      ],
    },
  ],

  mental_wellness: [
    {
      id: "ment-rep-1",
      specialtyId: "mental_wellness",
      title: "Clinical Neuro-Psychiatric Inventory (PHQ-9 & GAD-7)",
      date: "05 Dec 2024",
      labName: "NIMHANS Psychological Assessment",
      fileType: "clinical_summary",
      extractedTextSnippet:
        "PHQ-9 score 16 indicates moderately severe depressive symptoms. GAD-7 score 13 indicates moderate generalized anxiety.",
      parameters: [
        {
          name: "Patient Health Questionnaire (PHQ-9)",
          value: "16 / 27",
          numericValue: 16,
          unit: "/27",
          referenceRange: "< 5 (Minimal)",
          status: "high",
          diagnosticWeight: "primary",
          clinicalSignificance:
            "Moderately Severe Depressive Disorder with sleep fragmentation and anhedonia.",
          biochemicalMechanism:
            "Dysregulated monoaminergic neurotransmission (serotonin, norepinephrine) and elevated HPA axis tone.",
        },
        {
          name: "Generalized Anxiety Disorder (GAD-7)",
          value: "13 / 21",
          numericValue: 13,
          unit: "/21",
          referenceRange: "< 5 (Minimal)",
          status: "high",
          diagnosticWeight: "primary",
          clinicalSignificance:
            "Moderate Generalized Anxiety Disorder with somatic muscular tension.",
          biochemicalMechanism:
            "Hyperexcitability of amygdala circuits and reduced GABAergic inhibitory modulation.",
        },
      ],
    },
  ],
};

// ==========================================
// 4. EXPLAINABLE AI (XAI) KNOWLEDGE BASE
// ==========================================

export function runSpecialtyExplainableAIAnalysis(
  specialtyId: SpecialtyCategoryId,
  reports: SpecialtyReportItem[],
): SpecialtyXAIAnalysisResult {
  const currentSpecialty =
    SPECIALTY_CATEGORIES.find((s) => s.id === specialtyId) || SPECIALTY_CATEGORIES[0]!;

  // Map doctors from mock data
  const doctorsForSpecialty = DOCTORS.filter(
    (d) =>
      d.speciality
        .toLowerCase()
        .includes(currentSpecialty.name.toLowerCase().split(" ")[0] || "") ||
      d.speciality.toLowerCase().includes("physician") ||
      d.speciality.toLowerCase().includes("specialist"),
  ).slice(0, 3);

  if (specialtyId === "cardiology") {
    return analyzeCardiologyReports(reports, doctorsForSpecialty);
  } else if (specialtyId === "dermatology") {
    return analyzeDermatologyReports(reports, doctorsForSpecialty);
  } else if (specialtyId === "orthopedics") {
    return analyzeOrthopedicReports(reports, doctorsForSpecialty);
  } else if (specialtyId === "endocrinology") {
    return analyzeEndocrinologyReports(reports, doctorsForSpecialty);
  } else if (specialtyId === "gastroenterology") {
    return analyzeGastroenterologyReports(reports, doctorsForSpecialty);
  } else if (specialtyId === "pulmonology") {
    return analyzePulmonologyReports(reports, doctorsForSpecialty);
  } else if (specialtyId === "neurology") {
    return analyzeNeurologyReports(reports, doctorsForSpecialty);
  } else if (specialtyId === "urology") {
    return analyzeUrologyReports(reports, doctorsForSpecialty);
  } else if (specialtyId === "pediatrics") {
    return analyzePediatricReports(reports, doctorsForSpecialty);
  } else if (specialtyId === "gynecology") {
    return analyzeGynecologyReports(reports, doctorsForSpecialty);
  } else if (specialtyId === "ent") {
    return analyzeEntReports(reports, doctorsForSpecialty);
  } else if (specialtyId === "ophthalmology") {
    return analyzeOphthalmologyReports(reports, doctorsForSpecialty);
  } else if (specialtyId === "mental_wellness") {
    return analyzeMentalWellnessReports(reports, doctorsForSpecialty);
  } else {
    return analyzeGeneralMedicineReports(reports, doctorsForSpecialty);
  }
}

// ----------------------------------------------------------------------
// SPECIALTY 1: CARDIOLOGY EXPLAINABLE AI ANALYSIS
// ----------------------------------------------------------------------
function analyzeCardiologyReports(
  reports: SpecialtyReportItem[],
  doctors: Doctor[],
): SpecialtyXAIAnalysisResult {
  const ldlParam = reports.flatMap((r) => r.parameters).find((p) => p.name.includes("LDL"));
  const ldlValue = ldlParam?.numericValue || 172;

  const longitudinalTrends: LongitudinalTrendPoint[] = [
    {
      date: "12 Oct 2024",
      parameterName: "LDL-C Cholesterol",
      value: 172,
      unit: "mg/dL",
      status: "deteriorating",
      changePercentage: 0,
      interpretation: "Baseline atherogenic plaque deposition risk established.",
    },
    {
      date: "15 Jan 2025",
      parameterName: "LDL-C Cholesterol",
      value: 154,
      unit: "mg/dL",
      status: "improving",
      changePercentage: -10.5,
      interpretation:
        "10.5% reduction observed, still 54% above ideal cardioprotective target of < 100 mg/dL.",
    },
    {
      date: "15 Jan 2025",
      parameterName: "Systolic Blood Pressure",
      value: 142,
      unit: "mmHg",
      status: "deteriorating",
      changePercentage: +8.4,
      interpretation:
        "Elevated left ventricular afterload exacerbating subendocardial wall stress.",
    },
  ];

  return {
    specialtyId: "cardiology",
    analysisDate: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    reportCountAnalyzed: reports.length,
    primaryConditionTitle: "Atherogenic Dyslipidemia & Stage-1 Arterial Hypertension",
    hindiConditionTitle: "उच्च कोलेस्ट्रॉल, धमनी सूजन एवं प्रारंभिक उच्च रक्तचाप",
    severity: "high",
    overallConfidenceScore: 94,
    summaryParagraph:
      "Integrated multi-report analysis indicates significant circulating atherogenic ApoB/LDL particles combined with elevated resting systolic blood pressure (142 mmHg) and low-grade vascular inflammation (hs-CRP 3.2 mg/L). Lateral precordial ECG shows mild subendocardial ischemic strain during elevated demand.",

    pathophysiologyExplanation:
      "Kyun ho raha hai (Why is this happening): Circulating LDL particles penetrate through the vascular endothelial junction when blood pressure is elevated. Trapped inside the arterial tunica intima, these lipoproteins undergo oxidative modification (Ox-LDL), triggering circulating monocytes to transform into macrophages that engulf cholesterol and become inflammatory foam cells. Over time, this forms fibrous atherosclerotic plaque that narrows coronary arteries, reducing oxygen delivery to heart muscles and causing exertional breathlessness or chest tightness.",

    biomarkerEvidenceChain: [
      {
        biomarker: "Low-Density Lipoprotein (LDL-C)",
        observedValue: `${ldlValue} mg/dL`,
        standardBaseline: "< 100 mg/dL (< 70 mg/dL for high risk)",
        diagnosticContributionPercentage: 42,
        explanation:
          "Direct primary driver of coronary plaque volume accumulation and foam cell genesis.",
      },
      {
        biomarker: "Systolic Blood Pressure",
        observedValue: "142 mmHg",
        standardBaseline: "< 120 mmHg",
        diagnosticContributionPercentage: 28,
        explanation:
          "Generates turbulent shear stress against endothelial lining, accelerating lipoprotein penetration.",
      },
      {
        biomarker: "High-Sensitivity CRP (hs-CRP)",
        observedValue: "3.2 mg/L",
        standardBaseline: "< 1.0 mg/L",
        diagnosticContributionPercentage: 18,
        explanation: "Confirms systemic vascular inflammation and unstable plaque vulnerability.",
      },
      {
        biomarker: "High-Density Lipoprotein (HDL-C)",
        observedValue: "36 mg/dL",
        standardBaseline: "> 45 mg/dL",
        diagnosticContributionPercentage: 12,
        explanation:
          "Insufficient ApoA-1 reverse cholesterol clearing capacity from vascular tissue back to liver.",
      },
    ],

    clinicalGuideline: {
      authorityName: "American College of Cardiology (ACC) / AHA",
      guidelineTitle: "2024 Guideline on the Primary Prevention of Cardiovascular Disease",
      editionYear: 2024,
      recommendationLevel: "Class I, Level of Evidence A",
      summaryOfStandard:
        "Patients with LDL-C >= 160 mg/dL and Stage-1 Hypertension require aggressive therapeutic lifestyle modification combined with statin therapy considerations to reduce 10-year ASCVD risk below 7.5%.",
    },

    ruleOutDifferentialDiagnosis: [
      {
        condition: "Acute Coronary Syndrome (Myocardial Infarction)",
        whyRuledOut:
          "Cardiac Troponin-I and T markers remain baseline negative; no ST-elevation or pathological Q-waves observed.",
      },
      {
        condition: "Hypertrophic Cardiomyopathy",
        whyRuledOut:
          "Echocardiogram indicates normal left ventricular wall thickness (< 11mm) and preserved ejection fraction.",
      },
    ],

    deficienciesAndAnomalies: [
      {
        category: "Elevated Marker",
        name: "Serum LDL-C (Bad Cholesterol)",
        observed: `${ldlValue} mg/dL`,
        optimal: "< 100 mg/dL",
        impactOnHealth:
          "High risk of coronary artery plaque buildup and reduced vascular elasticity.",
        urgency: "soon",
      },
      {
        category: "Elevated Marker",
        name: "Resting Blood Pressure",
        observed: "142/92 mmHg",
        optimal: "120/80 mmHg",
        impactOnHealth:
          "Increases myocardial oxygen demand and strains cerebral/renal microvasculature.",
        urgency: "soon",
      },
      {
        category: "Deficiency",
        name: "HDL-C (Cardioprotective Good Cholesterol)",
        observed: "36 mg/dL",
        optimal: "> 45 mg/dL",
        impactOnHealth: "Impaired natural clearance of fatty deposits from blood vessels.",
        urgency: "routine",
      },
      {
        category: "Elevated Marker",
        name: "hs-CRP (Inflammation)",
        observed: "3.2 mg/L",
        optimal: "< 1.0 mg/L",
        impactOnHealth: "Indicates active vascular endothelial irritation.",
        urgency: "soon",
      },
    ],

    precautions: [
      {
        title: "Emergency Chest Pain Protocol (Red Flag)",
        instruction:
          "If you experience crushing central chest tightness radiating to the left arm, jaw, or neck accompanied by cold sweats or nausea, chew 300mg Soluble Aspirin immediately and call 112/108.",
        urgency: "critical_red_flag",
        reason: "Indicates acute plaque rupture requiring emergency catheterization.",
      },
      {
        title: "Avoid Sudden Isometric Strain",
        instruction:
          "Do not perform heavy deadlifts, maximum bench presses, or push stalled vehicles.",
        urgency: "high_priority",
        reason:
          "Valsalva maneuver triggers sudden acute intra-arterial blood pressure spikes above 200 mmHg.",
      },
      {
        title: "Home Blood Pressure Tracking",
        instruction:
          "Record blood pressure twice daily (morning upon waking and evening at 7 PM) sitting quietly for 5 minutes.",
        urgency: "general_caution",
        reason: "Validates true basal pressure away from white-coat clinic spikes.",
      },
    ],

    whatToAvoid: [
      {
        item: "Trans-Fatty Acids & Vanaspati / Palm Ghee",
        category: "food",
        whyAvoid:
          "Inhibits hepatic LDL-receptor recycling and accelerates systemic arterial inflammation.",
        consequenceIfIgnored: "Accelerates plaque buildup inside coronary arteries by 300%.",
      },
      {
        item: "High-Sodium Packaged Namkeen & Pickles (> 2g Sodium/day)",
        category: "food",
        whyAvoid:
          "Osmotically draws excess fluid into intravascular space, spiking blood pressure.",
        consequenceIfIgnored:
          "Sustains arterial hypertension and accelerates left ventricular remodeling.",
      },
      {
        item: "Tobacco Smoke & Vaping (Active or Passive)",
        category: "lifestyle",
        whyAvoid:
          "Nicotine causes immediate sympathetic vasoconstriction and carbon monoxide damages endothelial lining.",
        consequenceIfIgnored: "Doubles the risk of acute coronary thrombosis.",
      },
      {
        item: "Over-The-Counter NSAID Painkillers (Ibuprofen, Diclofenac)",
        category: "medication",
        whyAvoid:
          "Inhibits renal prostaglandins, worsening fluid retention and elevating blood pressure by 5-10 mmHg.",
        consequenceIfIgnored: "Counteracts blood pressure management and burdens kidneys.",
      },
    ],

    whatToEat: [
      {
        food: "Steel-Cut Oats & Barley (Beta-Glucan Soluble Fiber)",
        category: "superfood",
        portion: "45g daily (cooked porridge)",
        benefits: "Lowers circulating LDL cholesterol by 7-10% in 6 weeks.",
        biochemicalMechanism:
          "Forms a viscous gel in the jejunum that binds bile acids, forcing the liver to convert blood cholesterol into new bile acids.",
      },
      {
        food: "Raw Walnuts & Flaxseed Powder (Alpha-Linolenic Acid / Omega-3)",
        category: "daily_staple",
        portion: "28g (approx 6-7 walnuts) + 1 tbsp ground flaxseeds",
        benefits: "Improves endothelial nitric oxide synthesis and lowers vascular hs-CRP.",
        biochemicalMechanism:
          "EPA/DHA precursors substitute arachidonic acid in cell membranes, synthesizing anti-inflammatory resolvins.",
      },
      {
        food: "Crushed Raw Garlic (Allicin)",
        category: "therapeutic_spice",
        portion: "1-2 cloves lightly crushed, consumed after 5 min air exposure",
        benefits: "Mild natural ACE inhibition and HMG-CoA reductase modulation.",
        biochemicalMechanism:
          "Allicin compounds interact with vascular hydrogen sulfide pathways to induce peripheral vasodilation.",
      },
      {
        food: "Potassium-Rich Steamed Greens (Spinach, Methi, Bottle Gourd)",
        category: "daily_staple",
        portion: "1.5 cups with lunch and dinner",
        benefits: "Counterbalances dietary sodium and promotes arterial smooth muscle relaxation.",
        biochemicalMechanism:
          "Activates sodium-potassium ATPase pumps, reducing vascular smooth muscle cytosolic calcium.",
      },
    ],

    whatToDo: [
      {
        action: "Zone-2 Aerobic Cardiovascular Exercise",
        category: "exercise",
        frequency: "40 minutes, 5 days per week",
        instruction:
          "Brisk walking at 5.5-6.0 km/h or stationary cycling where you can still talk in full sentences without gasping.",
        expectedOutcome:
          "Expands coronary collateral circulation, upregulates endothelial nitric oxide synthase, and raises HDL.",
      },
      {
        action: "Twice-Daily Digital BP & Pulse Log",
        category: "monitoring",
        frequency: "Every morning (8 AM) and evening (8 PM)",
        instruction:
          "Sit with arm supported at heart level, feet flat on the floor, no speaking during cuff inflation.",
        expectedOutcome:
          "Provides precision data for the cardiologist to optimize medication titration.",
      },
      {
        action: "Diaphragmatic Breathing / Box Breathing (4-4-4-4)",
        category: "routine",
        frequency: "10 minutes before sleep",
        instruction:
          "Inhale 4s, hold 4s, exhale 4s, pause 4s. Activates parasympathetic vagal brake.",
        expectedOutcome:
          "Lowers nocturnal sympathetic tone and reduces nocturnal blood pressure surges.",
      },
    ],

    longitudinalTrends,
    recommendedDoctorQuery: "Cardiologist",
    suggestedDoctors: doctors,
    recommendedNextTests: [
      "Fasting Lipid Profile Re-test (in 8 weeks)",
      "2D Echocardiogram with Doppler (to evaluate ejection fraction & wall motion)",
      "Treadmill Stress Test (TMT) or CT Coronary Angiogram (if exertional symptoms persist)",
    ],
  };
}

// ----------------------------------------------------------------------
// SPECIALTY 2: DERMATOLOGY EXPLAINABLE AI ANALYSIS
// ----------------------------------------------------------------------
function analyzeDermatologyReports(
  reports: SpecialtyReportItem[],
  doctors: Doctor[],
): SpecialtyXAIAnalysisResult {
  return {
    specialtyId: "dermatology",
    analysisDate: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    reportCountAnalyzed: reports.length,
    primaryConditionTitle: "Atopic Dermatitis (Eczema) with Epidermal Barrier Disruption",
    hindiConditionTitle: "एटोपिक डर्मेटाइटिस (एक्जिमा), त्वचा सूखापन एवं एलर्जी",
    severity: "moderate",
    overallConfidenceScore: 92,
    summaryParagraph:
      "Skin biomarker evaluation indicates elevated serum IgE (410 IU/mL), depleted 25-OH Vitamin D3 (14.2 ng/mL), and borderline ferritin. This biochemical profile confirms an underlying Th2-hyperreactive atopic state causing chronic skin barrier breakdown, intense pruritus (itching), and transepidermal water loss.",

    pathophysiologyExplanation:
      "Kyun ho raha hai (Why is this happening): Genetic filaggrin deficiency and low Vitamin D impair stratum corneum lipid matrix formation. Environmental allergens and irritants penetrate deep into subepidermal layers, activating dendritic Langerhans cells. This stimulates T-helper 2 (Th2) lymphocytes to release IL-4, IL-13, and IL-31 (the 'itch cytokine'), which triggers severe scratching, further rupturing the skin barrier in a vicious itch-scratch cycle.",

    biomarkerEvidenceChain: [
      {
        biomarker: "Serum Total IgE",
        observedValue: "410 IU/mL",
        standardBaseline: "< 100 IU/mL",
        diagnosticContributionPercentage: 45,
        explanation: "Confirms systemic atopic hypersensitivity predisposing to skin flare-ups.",
      },
      {
        biomarker: "25-Hydroxy Vitamin D3",
        observedValue: "14.2 ng/mL",
        standardBaseline: "30 - 100 ng/mL",
        diagnosticContributionPercentage: 35,
        explanation:
          "Low Vitamin D impairs synthesis of LL-37 cathelicidin antimicrobial peptides in epidermis.",
      },
      {
        biomarker: "Serum Ferritin",
        observedValue: "18 ng/mL",
        standardBaseline: "> 30 ng/mL for skin repair",
        diagnosticContributionPercentage: 20,
        explanation:
          "Inadequate iron stores impair keratinocyte matrix turnover and slow wound re-epithelialization.",
      },
    ],

    clinicalGuideline: {
      authorityName: "American Academy of Dermatology (AAD) / IADVL",
      guidelineTitle: "Clinical Guidelines for the Management of Atopic Dermatitis",
      editionYear: 2024,
      recommendationLevel: "Class I, Level A",
      summaryOfStandard:
        "Standard of care mandates frequent ceramide-dominant barrier emollient therapy within 3 minutes of bathing, avoidance of alkaline soaps, and correction of systemic Vitamin D / iron deficiencies.",
    },

    ruleOutDifferentialDiagnosis: [
      {
        condition: "Plaque Psoriasis",
        whyRuledOut:
          "Absence of Auspitz sign, well-demarcated silvery micaceous plaques, and extensor distribution.",
      },
      {
        condition: "Tinea Corporis (Fungal Ringworm)",
        whyRuledOut: "Skin scraping KOH mount is negative for fungal hyphae and spores.",
      },
    ],

    deficienciesAndAnomalies: [
      {
        category: "Deficiency",
        name: "25-OH Vitamin D3 Deficiency",
        observed: "14.2 ng/mL",
        optimal: "> 30.0 ng/mL",
        impactOnHealth:
          "Impaired natural defense against skin infections (Staph aureus colonization).",
        urgency: "soon",
      },
      {
        category: "Elevated Marker",
        name: "Serum IgE (Allergy Antibody)",
        observed: "410 IU/mL",
        optimal: "< 100 IU/mL",
        impactOnHealth: "Triggers hyper-reactive histamine and cytokine release.",
        urgency: "soon",
      },
      {
        category: "Deficiency",
        name: "Serum Ferritin (Cellular Iron Reserve)",
        observed: "18 ng/mL",
        optimal: "50 - 100 ng/mL",
        impactOnHealth: "Weakens hair follicle anchorage and slows skin regeneration.",
        urgency: "routine",
      },
    ],

    precautions: [
      {
        title: "The 3-Minute Post-Bath Moisture Lock Rule",
        instruction:
          "Apply thick ceramide/petrolatum moisturizer within 180 seconds of stepping out of the shower while skin is still damp.",
        urgency: "high_priority",
        reason:
          "Locks in ambient water before transepidermal evaporation dehydrates the stratum corneum.",
      },
      {
        title: "Avoid Scratching with Fingernails (Infection Alert)",
        instruction:
          "Trim fingernails short and wear soft cotton gloves at night; apply ice compress wrapped in cloth to numb itch.",
        urgency: "high_priority",
        reason: "Prevents secondary Staphylococcus aureus impetiginization and weeping crusts.",
      },
    ],

    whatToAvoid: [
      {
        item: "Hot Showers & Alkaline Detergent Soaps",
        category: "lifestyle",
        whyAvoid: "Hot water and SLS soaps dissolve natural intercellular lipid ceramides.",
        consequenceIfIgnored: "Increases skin dryness and flare-up severity by 200%.",
      },
      {
        item: "Synthetic Polyester & Woolen Fabrics Directly on Skin",
        category: "lifestyle",
        whyAvoid: "Coarse fibers mechanically irritate cutaneous C-nerve fibers.",
        consequenceIfIgnored: "Triggers immediate pruritic flares and erythema.",
      },
      {
        item: "Ultra-Processed Foods with Artificial Preservatives (Tartrazine/Sulfites)",
        category: "food",
        whyAvoid: "Stimulates mast cell degranulation, raising circulating histamine levels.",
        consequenceIfIgnored: "Causes widespread hives and exacerbates eczema lesions.",
      },
    ],

    whatToEat: [
      {
        food: "Wild Fatty Fish / Chia Seeds (Omega-3 Fatty Acids)",
        category: "superfood",
        portion: "2 servings weekly or 2 tbsp soaked chia seeds daily",
        benefits: "Suppresses leukotriene B4 synthesis and calms skin redness.",
        biochemicalMechanism:
          "Replaces arachidonic acid in membrane phospholipids with anti-inflammatory resolvin precursors.",
      },
      {
        food: "Vitamin C-Rich Citrus & Amla (Gooseberry)",
        category: "daily_staple",
        portion: "1 fresh amla or 1 orange daily",
        benefits: "Accelerates procollagen lysyl-hydroxylation and enhances iron absorption.",
        biochemicalMechanism:
          "Essential cofactor for prolyl 4-hydroxylase in dermal fibroblast collagen synthesis.",
      },
      {
        food: "Fermented Probiotic Curd / Kefir",
        category: "daily_staple",
        portion: "1 bowl with lunch",
        benefits: "Supports gut-skin axis equilibrium and reduces Th2 inflammatory bias.",
        biochemicalMechanism:
          "Lactobacillus strains stimulate regulatory T-cell (Treg) production in mesenteric lymph nodes.",
      },
    ],

    whatToDo: [
      {
        action: "Switch to Soap-Free Syndet Cleanser (pH 5.5)",
        category: "routine",
        frequency: "Daily during baths",
        instruction: "Use lukewarm water (under 37°C) for no more than 5-7 minutes.",
        expectedOutcome: "Preserves natural acidic acid mantle (pH 4.5-5.5) of healthy skin.",
      },
      {
        action: "Oral Vitamin D3 Supplementation (as advised by doctor)",
        category: "therapy",
        frequency: "60,000 IU weekly for 8 weeks (clinical standard)",
        instruction:
          "Take with a fat-containing meal (milk/nuts) for optimal intestinal absorption.",
        expectedOutcome:
          "Restores normal cutaneous cathelicidin peptide defenses and calms eczema.",
      },
    ],

    recommendedDoctorQuery: "Dermatologist",
    suggestedDoctors: doctors,
    recommendedNextTests: [
      "Skin Barrier Hydration & Transepidermal Water Loss (TEWL) Assessment",
      "Food & Environmental Allergen Specific IgE Panel (30 Allergens)",
      "Repeat 25-OH Vitamin D3 & Serum Ferritin in 10 weeks",
    ],
  };
}

// ----------------------------------------------------------------------
// SPECIALTY 3: ORTHOPEDICS EXPLAINABLE AI ANALYSIS
// ----------------------------------------------------------------------
function analyzeOrthopedicReports(
  reports: SpecialtyReportItem[],
  doctors: Doctor[],
): SpecialtyXAIAnalysisResult {
  return {
    specialtyId: "orthopedics",
    analysisDate: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    reportCountAnalyzed: reports.length,
    primaryConditionTitle: "Medial Compartment Knee Osteoarthritis & Mild Hyperuricemia",
    hindiConditionTitle: "घुटनों का घिसना (ऑस्टियोआर्थराइटिस) एवं यूरिक एसिड वृद्धि",
    severity: "moderate",
    overallConfidenceScore: 91,
    summaryParagraph:
      "Radiological findings confirm Grade 2 Kellgren-Lawrence medial joint space narrowing (2.1 mm) with subchondral sclerosis. Metabolic markers show elevated serum uric acid (7.6 mg/dL) and elevated inflammatory CRP (4.8 mg/L), indicating accelerated cartilage wear compounded by micro-crystal synovial irritation.",

    pathophysiologyExplanation:
      "Kyun ho raha hai (Why is this happening): The protective articular hyaline cartilage covering the medial femoral condyle and tibial plateau has experienced mechanical degradation. Chondrocytes undergo catabolic shift, releasing matrix metalloproteinases (MMP-13) and aggrecanases that chew through the proteoglycan mesh. Concurrently, borderline elevated uric acid can precipitate micro-crystals in synovial fluid, causing synovial membrane inflammation and joint stiffness upon waking.",

    biomarkerEvidenceChain: [
      {
        biomarker: "Medial Joint Space Width (X-Ray)",
        observedValue: "2.1 mm",
        standardBaseline: "> 4.0 mm",
        diagnosticContributionPercentage: 50,
        explanation:
          "Direct structural proof of focal cartilage thinning in weight-bearing knee compartment.",
      },
      {
        biomarker: "Serum Uric Acid",
        observedValue: "7.6 mg/dL",
        standardBaseline: "< 7.0 mg/dL (Male), < 6.0 mg/dL (Female)",
        diagnosticContributionPercentage: 28,
        explanation:
          "Elevated systemic purine byproduct, exacerbating synovial joint inflammation.",
      },
      {
        biomarker: "High-Sensitivity CRP",
        observedValue: "4.8 mg/L",
        standardBaseline: "< 1.0 mg/L",
        diagnosticContributionPercentage: 22,
        explanation: "Indicates active intra-articular inflammatory synovitis.",
      },
    ],

    clinicalGuideline: {
      authorityName: "American College of Rheumatology (ACR) / AAOS",
      guidelineTitle: "2024 Guideline for the Management of Osteoarthritis of the Knee",
      editionYear: 2024,
      recommendationLevel: "Strong Recommendation",
      summaryOfStandard:
        "Strongly recommends quadriceps strengthening, low-impact aerobic exercise, weight reduction (if BMI > 25), and topical NSAIDs over oral narcotics. Uric acid must be kept < 6.0 mg/dL.",
    },

    ruleOutDifferentialDiagnosis: [
      {
        condition: "Rheumatoid Arthritis (RA)",
        whyRuledOut:
          "Anti-CCP antibody and Rheumatoid Factor (RF) tests are negative; absence of symmetrical small hand joint involvement.",
      },
      {
        condition: "Acute Septic Arthritis",
        whyRuledOut: "No acute joint erythema, high fever, or systemic purulent synovial effusion.",
      },
    ],

    deficienciesAndAnomalies: [
      {
        category: "Structural Anomaly",
        name: "Medial Knee Cartilage Thinning",
        observed: "2.1 mm space",
        optimal: "> 4.0 mm",
        impactOnHealth: "Bone-on-bone friction causing crepitus and pain while climbing stairs.",
        urgency: "soon",
      },
      {
        category: "Elevated Marker",
        name: "Serum Uric Acid",
        observed: "7.6 mg/dL",
        optimal: "< 6.0 mg/dL",
        impactOnHealth: "Predisposes to gouty crystal flares and accelerated joint stiffness.",
        urgency: "soon",
      },
    ],

    precautions: [
      {
        title: "Avoid Deep Squatting & Cross-Legged Sitting (Palthi)",
        instruction:
          "Use a chair or raised seat for all daily activities; do not squat down fully on the floor.",
        urgency: "high_priority",
        reason:
          "Deep flexion multiplies patellofemoral and tibiofemoral joint contact pressures by 7x body weight.",
      },
      {
        title: "Footwear Shock Absorption",
        instruction:
          "Wear well-cushioned orthopedic walking shoes with arch support; avoid hard, flat leather soles or heels.",
        urgency: "general_caution",
        reason:
          "Dampens ground-reaction impact forces transmitted up the tibial shaft to the knee joint.",
      },
    ],

    whatToAvoid: [
      {
        item: "High-Purine Foods (Red Meat, Organ Meats, Dried Fish, Beer)",
        category: "food",
        whyAvoid:
          "Purines metabolize directly into uric acid, surpassing renal clearance thresholds.",
        consequenceIfIgnored: "Triggers agonizing gout attacks and synovial crystal synovitis.",
      },
      {
        item: "High-Impact Running on Hard Concrete",
        category: "activity",
        whyAvoid:
          "Repeated mechanical shockwaves accelerate microfractures in fragile articular cartilage.",
        consequenceIfIgnored:
          "Accelerates transition to Grade 3-4 Osteoarthritis requiring knee replacement.",
      },
      {
        item: "High-Fructose Corn Syrup & Sugary Sodas",
        category: "food",
        whyAvoid:
          "Hepatic phosphorylation of fructose depletes ATP and drives rapid purine nucleotide breakdown into uric acid.",
        consequenceIfIgnored: "Increases serum uric acid by 1.5-2.0 mg/dL within days.",
      },
    ],

    whatToEat: [
      {
        food: "Wild Cherries / Tart Cherry Extract",
        category: "superfood",
        portion: "1 cup fresh cherries or 200ml tart cherry juice",
        benefits: "Lowers serum uric acid and blocks COX-2 inflammatory enzymes naturally.",
        biochemicalMechanism:
          "Anthocyanins inhibit xanthine oxidase activity and promote renal urate clearance.",
      },
      {
        food: "Turmeric with Black Pepper (Curcumin + Piperine)",
        category: "therapeutic_spice",
        portion: "1/2 tsp organic turmeric with pinch of black pepper in warm golden milk",
        benefits: "Suppresses NF-kB inflammatory cascade in chondrocytes.",
        biochemicalMechanism:
          "Curcumin downregulates IL-1beta-induced MMP-3 and MMP-13 gene transcription.",
      },
      {
        food: "Hydrolyzed Collagen Peptides with Vitamin C",
        category: "superfood",
        portion: "10g daily with water",
        benefits: "Supplies hydroxyproline and glycine building blocks for cartilage matrix.",
        biochemicalMechanism:
          "Stimulates chondrocyte synthesis of extracellular proteoglycans and Type II collagen.",
      },
    ],

    whatToDo: [
      {
        action: "Isometric Quadriceps & Straight Leg Raise Exercises",
        category: "exercise",
        frequency: "3 sets of 15 repetitions, twice daily",
        instruction:
          "Lie on back, tighten thigh muscle, lift leg 12 inches keeping knee locked straight, hold 5 seconds.",
        expectedOutcome:
          "Builds muscular knee stability, offloading 30-40% of joint compressive forces during walking.",
      },
      {
        action: "Low-Impact Cycling or Swimming",
        category: "exercise",
        frequency: "30 minutes, 4 days weekly",
        instruction:
          "Use stationary exercise bike with seat height adjusted so knee is only slightly bent at bottom pedal.",
        expectedOutcome:
          "Circulates synovial fluid to nourish avascular cartilage without compressive impact.",
      },
    ],

    recommendedDoctorQuery: "Orthopedic",
    suggestedDoctors: doctors,
    recommendedNextTests: [
      "Standing Bilateral Knee Weight-Bearing X-Ray (AP and Lateral view)",
      "Serum Uric Acid & Renal Function Test follow-up in 6 weeks",
      "DEXA Bone Mineral Density Scan (if age > 50 to rule out osteoporosis)",
    ],
  };
}

// ----------------------------------------------------------------------
// SPECIALTY 4: ENDOCRINOLOGY & DIABETES EXPLAINABLE AI ANALYSIS
// ----------------------------------------------------------------------
function analyzeEndocrinologyReports(
  reports: SpecialtyReportItem[],
  doctors: Doctor[],
): SpecialtyXAIAnalysisResult {
  const hba1c =
    reports.flatMap((r) => r.parameters).find((p) => p.name.includes("HbA1c"))?.value || "8.2 %";

  return {
    specialtyId: "endocrinology",
    analysisDate: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    reportCountAnalyzed: reports.length,
    primaryConditionTitle: "Type 2 Diabetes Mellitus with Subclinical Hypothyroidism",
    hindiConditionTitle: "टाइप 2 मधुमेह (शुगर) एवं थायरॉयड हार्मोन असंतुलन",
    severity: "critical",
    overallConfidenceScore: 96,
    summaryParagraph: `Comprehensive metabolic analysis shows HbA1c at ${hba1c} (target < 6.5%), fasting blood glucose of 154 mg/dL, and elevated TSH (6.8 uIU/mL). This dual endocrinopathy reflects cellular insulin resistance compounded by lowered basal metabolic rate, accelerating glycation of vascular proteins.`,

    pathophysiologyExplanation:
      "Kyun ho raha hai (Why is this happening): Skeletal muscle and adipose tissue have developed blunted insulin receptor substrate (IRS-1) signaling. Pancreatic beta-cells cannot produce sufficient compensatory insulin, leaving glucose in the bloodstream. Chronic hyperglycemia leads to non-enzymatic glycation of tissue proteins forming Advanced Glycation End-products (AGEs). Simultaneously, subclinical hypothyroidism slows hepatic LDL clearance and cellular glucose utilization.",

    biomarkerEvidenceChain: [
      {
        biomarker: "HbA1c (Glycated Hemoglobin)",
        observedValue: hba1c,
        standardBaseline: "< 5.7% (Normal), < 6.5% (Diabetic Goal)",
        diagnosticContributionPercentage: 55,
        explanation:
          "Reflects mean 90-day plasma glucose; confirms chronic sustained glycemic toxicity.",
      },
      {
        biomarker: "Fasting Plasma Glucose",
        observedValue: "154 mg/dL",
        standardBaseline: "70 - 99 mg/dL",
        diagnosticContributionPercentage: 25,
        explanation:
          "Demonstrates elevated overnight hepatic gluconeogenesis unsuppressed by basal insulin.",
      },
      {
        biomarker: "Thyroid Stimulating Hormone (TSH)",
        observedValue: "6.8 uIU/mL",
        standardBaseline: "0.4 - 4.5 uIU/mL",
        diagnosticContributionPercentage: 20,
        explanation:
          "Indicates low thyroid hormone reserve, worsening dyslipidemia and sluggish metabolic rate.",
      },
    ],

    clinicalGuideline: {
      authorityName: "American Diabetes Association (ADA)",
      guidelineTitle: "Standards of Care in Diabetes — 2025",
      editionYear: 2025,
      recommendationLevel: "Grade A",
      summaryOfStandard:
        "Patients with HbA1c > 8.0% require prompt dual pharmacotherapy (Metformin + SGLT2i / GLP-1 RA) alongside medical nutrition therapy to achieve target HbA1c < 7.0% and prevent diabetic retinopathy and nephropathy.",
    },

    ruleOutDifferentialDiagnosis: [
      {
        condition: "Type 1 Autoimmune Diabetes",
        whyRuledOut:
          "Preserved C-Peptide levels and adult onset without rapid diabetic ketoacidosis.",
      },
      {
        condition: "Cushing's Syndrome",
        whyRuledOut:
          "Absence of purple abdominal striae, buffalo hump, and normal morning cortisol.",
      },
    ],

    deficienciesAndAnomalies: [
      {
        category: "Elevated Marker",
        name: "HbA1c (3-Month Sugar Average)",
        observed: hba1c,
        optimal: "< 6.5 %",
        impactOnHealth:
          "High risk of diabetic peripheral neuropathy, kidney microalbuminuria, and cataract.",
        urgency: "immediate",
      },
      {
        category: "Elevated Marker",
        name: "Fasting Blood Sugar",
        observed: "154 mg/dL",
        optimal: "< 100 mg/dL",
        impactOnHealth: "Sustained arterial endothelial stress and thirst/fatigue.",
        urgency: "soon",
      },
      {
        category: "Elevated Marker",
        name: "TSH (Thyroid Stimulating Hormone)",
        observed: "6.8 uIU/mL",
        optimal: "0.4 - 4.0 uIU/mL",
        impactOnHealth:
          "Causes unexplained lethargy, weight gain resistance, and cold intolerance.",
        urgency: "soon",
      },
    ],

    precautions: [
      {
        title: "Daily Diabetic Foot Inspection (Neuropathy Warning)",
        instruction:
          "Inspect soles of feet and between toes every night under good lighting for unnoticed cuts, blisters, or redness.",
        urgency: "critical_red_flag",
        reason:
          "Elevated blood sugars blunt sensory nerve fibers; minor cuts can quickly develop into painless diabetic ulcers.",
      },
      {
        title: "Hypoglycemia (Low Sugar) Safety Kit",
        instruction:
          "Always carry 3 glucose tablets or 15g of sugar / fruit juice in your pocket or bag when travelling.",
        urgency: "high_priority",
        reason:
          "If blood sugar drops below 70 mg/dL causing dizziness, sweating, or shakiness, the 'Rule of 15' saves lives.",
      },
    ],

    whatToAvoid: [
      {
        item: "Refined White Flour (Maida), White Sugar & Bakery Goods",
        category: "food",
        whyAvoid:
          "High glycemic index (> 85) causes immediate explosive postprandial glucose spikes.",
        consequenceIfIgnored: "Overwhelms remaining pancreatic beta-cells and spikes HbA1c.",
      },
      {
        item: "Fruit Juices & Packed Beverages (Even 'No Added Sugar')",
        category: "food",
        whyAvoid:
          "Stripped of fiber, liquid fructose rapidly enters portal circulation causing severe insulin spikes.",
        consequenceIfIgnored: "Worsens hepatic fatty infiltration and insulin resistance.",
      },
      {
        item: "Cruciferous Raw Vegetables in Excess (Raw Cabbage, Cauliflower)",
        category: "food",
        whyAvoid:
          "Raw goitrogens can compete with iodine uptake in thyroid gland with borderline high TSH.",
        consequenceIfIgnored: "Worsens subclinical hypothyroidism (cook thoroughly to deactivate).",
      },
    ],

    whatToEat: [
      {
        food: "Methi Seeds (Fenugreek) Water",
        category: "therapeutic_spice",
        portion: "1 tbsp soaked overnight in water, drink water and chew seeds on empty stomach",
        benefits: "Significantly lowers fasting blood sugar and improves glucose tolerance.",
        biochemicalMechanism:
          "Contains 4-hydroxyisoleucine which stimulates glucose-dependent insulin secretion.",
      },
      {
        food: "Cinnamon Powder (Ceylon Dalchini)",
        category: "therapeutic_spice",
        portion: "1/2 tsp sprinkled over morning breakfast",
        benefits: "Enhances insulin sensitivity at cellular GLUT-4 transporter level.",
        biochemicalMechanism:
          "Cinnamtannin B1 mimics insulin action by activating insulin receptor kinase.",
      },
      {
        food: "High-Fiber Lentils & Millets (Ragi, Jowar, Moong Dal)",
        category: "daily_staple",
        portion: "Replace 100% white rice with multigrain/millets",
        benefits: "Slow, steady glucose release over 4-5 hours avoiding spikes.",
        biochemicalMechanism:
          "Complex amylose starches require prolonged enzymatic breakdown by alpha-glucosidase.",
      },
    ],

    whatToDo: [
      {
        action: "15-Minute Post-Meal Walking (Glucose Muscle Sponge)",
        category: "exercise",
        frequency: "After lunch and after dinner every day",
        instruction: "Walk at moderate pace for 15 minutes within 30 minutes of finishing meals.",
        expectedOutcome:
          "Activates non-insulin dependent GLUT-4 translocation in leg muscles, soaking up blood glucose directly.",
      },
      {
        action: "Self-Monitoring of Blood Glucose (SMBG Log)",
        category: "monitoring",
        frequency: "Fasting twice weekly + 2 hours post-meal twice weekly",
        instruction: "Log readings with date and meal details in your Medyora health log.",
        expectedOutcome:
          "Provides precision glycemic trends for diabetologist treatment titration.",
      },
    ],

    recommendedDoctorQuery: "Diabetologist",
    suggestedDoctors: doctors,
    recommendedNextTests: [
      "Urine Microalbumin-to-Creatinine Ratio (UACR) (to check kidney filtration health)",
      "Dilated Fundus Eye Examination (to screen for early diabetic retinopathy)",
      "Repeat HbA1c & Free T3/T4 Thyroid Panel in 90 days",
    ],
  };
}

// ----------------------------------------------------------------------
// SPECIALTY 5: GASTROENTEROLOGY EXPLAINABLE AI ANALYSIS
// ----------------------------------------------------------------------
function analyzeGastroenterologyReports(
  reports: SpecialtyReportItem[],
  doctors: Doctor[],
): SpecialtyXAIAnalysisResult {
  return {
    specialtyId: "gastroenterology",
    analysisDate: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    reportCountAnalyzed: reports.length,
    primaryConditionTitle:
      "Metabolic Dysfunction-Associated Steatotic Liver Disease (MASLD / Grade-2 Fatty Liver)",
    hindiConditionTitle: "ग्रेड-2 फैटी लिवर एवं लिवर एंजाइम (SGPT/SGOT) में वृद्धि",
    severity: "moderate",
    overallConfidenceScore: 93,
    summaryParagraph:
      "Hepatic biomarker analysis confirms elevated Alanine Aminotransferase (ALT/SGPT: 68 U/L) and Aspartate Aminotransferase (AST: 54 U/L) correlated with ultrasound-confirmed Grade 2 Hepatic Steatosis. This demonstrates significant intra-parenchymal lipid droplet accumulation and early inflammatory steatohepatitis.",

    pathophysiologyExplanation:
      "Kyun ho raha hai (Why is this happening): When caloric intake, refined carbohydrates, and saturated fats exceed hepatic metabolic capacity, the liver synthesizes triglycerides faster than it can export them via VLDL particles. Excess intra-hepatocyte free fatty acids undergo mitochondrial beta-oxidation overload, producing reactive oxygen species (ROS) that injure hepatocyte membranes and cause ALT/AST enzymes to leak into systemic circulation.",

    biomarkerEvidenceChain: [
      {
        biomarker: "Serum ALT / SGPT",
        observedValue: "68 U/L",
        standardBaseline: "< 45 U/L (Ideal < 30 U/L)",
        diagnosticContributionPercentage: 45,
        explanation:
          "Liver-specific enzyme whose elevation directly indicates active hepatocyte cytosolic injury.",
      },
      {
        biomarker: "Ultrasound Liver Echogenicity",
        observedValue: "Grade 2 Hepatic Steatosis",
        standardBaseline: "Normal Homogeneous Echotexture",
        diagnosticContributionPercentage: 40,
        explanation:
          "Visual confirmation of increased acoustic attenuation and bright liver texture.",
      },
      {
        biomarker: "Serum AST / SGOT",
        observedValue: "54 U/L",
        standardBaseline: "< 40 U/L",
        diagnosticContributionPercentage: 15,
        explanation: "Secondary marker corroborating liver cellular inflammation.",
      },
    ],

    clinicalGuideline: {
      authorityName: "American Association for the Study of Liver Diseases (AASLD)",
      guidelineTitle: "2024 Practice Guidance for the Evaluation and Management of MASLD",
      editionYear: 2024,
      recommendationLevel: "Class I, Level A",
      summaryOfStandard:
        "7-10% total body weight reduction is the cornerstone of reversing hepatic steatosis and steatohepatitis. Strict elimination of fructose-sweetened drinks and adoption of Mediterranean dietary patterns is mandatory.",
    },

    ruleOutDifferentialDiagnosis: [
      {
        condition: "Viral Hepatitis B / C",
        whyRuledOut: "HBsAg and Anti-HCV screening serologies are non-reactive.",
      },
      {
        condition: "Alcoholic Liver Disease",
        whyRuledOut: "AST:ALT ratio is < 1.0 (typical alcoholic injury exhibits AST:ALT > 2.0).",
      },
    ],

    deficienciesAndAnomalies: [
      {
        category: "Elevated Marker",
        name: "ALT / SGPT (Liver Damage Enzyme)",
        observed: "68 U/L",
        optimal: "< 35 U/L",
        impactOnHealth: "Active inflammatory stress on hepatic parenchymal cells.",
        urgency: "soon",
      },
      {
        category: "Structural Anomaly",
        name: "Ultrasound Fatty Infiltration",
        observed: "Grade 2 Steatosis",
        optimal: "Grade 0 (Normal)",
        impactOnHealth:
          "Reduces liver detoxification efficiency and promotes metabolic sluggishness.",
        urgency: "soon",
      },
    ],

    precautions: [
      {
        title: "Absolute Alcohol Abstinence (Zero Tolerance)",
        instruction:
          "Refrain from all forms of alcoholic beverages (beer, wine, spirits) for a minimum of 6 months.",
        urgency: "high_priority",
        reason:
          "Alcohol shares common CYP2E1 metabolic pathways, multiplying oxidative hepatic damage exponentially.",
      },
      {
        title: "Avoid Unsupervised Paracetamol / Analgesic Overuse",
        instruction:
          "Do not take more than 2g Paracetamol per 24 hours without explicit physician guidance.",
        urgency: "high_priority",
        reason:
          "Depleted hepatic glutathione reserves in fatty liver impair toxic NAPQI metabolite clearance.",
      },
    ],

    whatToAvoid: [
      {
        item: "High-Fructose Corn Syrup, Soda & Packaged Juices",
        category: "food",
        whyAvoid:
          "Fructose is metabolized exclusively in the liver into glycerol-3-phosphate, fueling direct fat synthesis.",
        consequenceIfIgnored: "Accelerates fatty liver progression toward fibrotic NASH.",
      },
      {
        item: "Deep-Fried Street Foods (Pakoras, Samosas, Re-heated Vegetable Oils)",
        category: "food",
        whyAvoid:
          "Reheated oxidized cooking oils contain toxic lipid peroxides that damage liver cell membranes.",
        consequenceIfIgnored: "Spikes AST/ALT transaminases and worsens liver inflammation.",
      },
    ],

    whatToEat: [
      {
        food: "Black Coffee (2-3 Cups Daily, Unsweetened)",
        category: "superfood",
        portion: "2-3 cups freshly brewed black coffee",
        benefits: "Clinically proven to reduce liver fibrosis and lower hepatic enzymes.",
        biochemicalMechanism:
          "Coffee polyphenols stimulate hepatic autophagy and downregulate TGF-beta collagen deposition.",
      },
      {
        food: "Cruciferous Vegetables (Broccoli, Radish, Mustard Greens)",
        category: "daily_staple",
        portion: "1 generous serving daily",
        benefits: "Enhances Phase-II liver detoxification enzyme pathways.",
        biochemicalMechanism:
          "Glucoraphanin converts into Sulforaphane, activating Nrf2 anti-oxidant defense pathways.",
      },
      {
        food: "Cold-Pressed Extra Virgin Olive Oil",
        category: "daily_staple",
        portion: "1-2 tbsp raw as salad dressing or post-cooking drizzle",
        benefits: "Improves hepatic insulin sensitivity and decreases hepatic lipid content.",
        biochemicalMechanism:
          "High oleic acid content reduces hepatic SREBP-1c lipogenic gene expression.",
      },
    ],

    whatToDo: [
      {
        action: "Target 5-7% Body Weight Loss over 12 Weeks",
        category: "routine",
        frequency: "Continuous lifestyle tracking",
        instruction:
          "Create a 500 kcal daily deficit through portion control and eliminating empty carbs.",
        expectedOutcome:
          "Reduces intrahepatic fat volume by up to 50% and normalizes ALT/AST within 3 months.",
      },
      {
        action: "Moderate Aerobic Exercise + Resistance Training",
        category: "exercise",
        frequency: "45 minutes, 4 days weekly",
        instruction: "Combine 30 min brisk walking with 15 min bodyweight squats/pushups.",
        expectedOutcome: "Burns peripheral visceral fat and restores insulin sensitivity.",
      },
    ],

    recommendedDoctorQuery: "Gastroenterologist",
    suggestedDoctors: doctors,
    recommendedNextTests: [
      "Liver FibroScan (Transient Elastography) to assess liver stiffness & fibrosis score",
      "Fasting Lipid Profile & Serum Ferritin",
      "Repeat Complete LFT Panel in 8 weeks",
    ],
  };
}

// ----------------------------------------------------------------------
// FALLBACK GENERATORS FOR REMAINING SPECIALTIES
// ----------------------------------------------------------------------
function analyzePulmonologyReports(
  reports: SpecialtyReportItem[],
  doctors: Doctor[],
): SpecialtyXAIAnalysisResult {
  return createSpecialtyTemplate(
    "pulmonology",
    "Bronchial Asthma with Eosinophilic Airway Hyper-reactivity",
    "अस्थमा, सांस की तकलीफ एवं फेफड़ों में सूजन",
    "high",
    91,
    "Spirometry confirms an obstructive ventilatory defect (FEV1/FVC: 0.64) with significant bronchodilator reversibility (14%). Elevated absolute eosinophil count (580 cells/mcL) demonstrates active atopic airway inflammation.",
    "Airway smooth muscles exhibit hyper-responsiveness triggered by allergen-induced release of major basic protein and leukotrienes from activated eosinophils, causing bronchoconstriction, mucosal edema, and mucus plugging.",
    [
      {
        biomarker: "FEV1 / FVC Ratio",
        observedValue: "0.64",
        standardBaseline: "> 0.75",
        diagnosticContributionPercentage: 55,
        explanation: "Standard diagnostic criterion for airway obstruction.",
      },
      {
        biomarker: "Absolute Eosinophils (AEC)",
        observedValue: "580 cells/mcL",
        standardBaseline: "< 400 cells/mcL",
        diagnosticContributionPercentage: 45,
        explanation: "Evidence of Th2-driven eosinophilic allergic airway inflammation.",
      },
    ],
    doctors,
  );
}

function analyzeNeurologyReports(
  reports: SpecialtyReportItem[],
  doctors: Doctor[],
): SpecialtyXAIAnalysisResult {
  return createSpecialtyTemplate(
    "neurology",
    "Chronic Migraine with Hyperhomocysteinemia & Neurovascular Sensitization",
    "माइग्रेन सिरदर्द, नसों की कमजोरी एवं विटामिन B12 कमी",
    "moderate",
    89,
    "Neuro-metabolic markers identify severe Vitamin B12 deficiency (112 pg/mL) accompanied by elevated homocysteine (22.4 mcmol/L). This causes neurovascular endothelial irritation predisposing to cortical spreading depression and episodic throbbing unilateral migraines.",
    "B12 deficiency halts homocysteine remethylation, causing neurovascular oxidative stress and sensitization of the trigeminovascular system, releasing calcitonin gene-related peptide (CGRP) and dilating meningeal vessels.",
    [
      {
        biomarker: "Serum Vitamin B12",
        observedValue: "112 pg/mL",
        standardBaseline: "200 - 900 pg/mL",
        diagnosticContributionPercentage: 50,
        explanation: "Causes demyelinating peripheral nerve strain and cerebral metabolic fatigue.",
      },
      {
        biomarker: "Serum Homocysteine",
        observedValue: "22.4 mcmol/L",
        standardBaseline: "< 12.0 mcmol/L",
        diagnosticContributionPercentage: 50,
        explanation: "Neurovascular inflammatory irritant accelerating migraine triggers.",
      },
    ],
    doctors,
  );
}

function analyzeUrologyReports(
  reports: SpecialtyReportItem[],
  doctors: Doctor[],
): SpecialtyXAIAnalysisResult {
  return createSpecialtyTemplate(
    "urology",
    "Nephrolithiasis (Kidney Stone) with Stage-3a Chronic Renal Strain",
    "गुर्दे की पथरी (किडनी स्टोन) एवं क्रिएटिनिन में वृद्धि",
    "high",
    94,
    "Renal assessment reveals elevated serum creatinine (1.52 mg/dL) with reduced eGFR (52 mL/min). Ultrasound confirms a 4.2 mm calculus in right lower pole calyx requiring hydration therapy and litholytic monitoring.",
    "Supersaturation of calcium oxalate in the renal collecting system leads to crystal aggregation and calculus formation, while reduced functional nephron mass elevates serum retention of muscular creatinine.",
    [
      {
        biomarker: "Serum Creatinine",
        observedValue: "1.52 mg/dL",
        standardBaseline: "0.7 - 1.2 mg/dL",
        diagnosticContributionPercentage: 50,
        explanation: "Direct indicator of reduced glomerular filtration efficiency.",
      },
      {
        biomarker: "Estimated GFR",
        observedValue: "52 mL/min",
        standardBaseline: "> 90 mL/min",
        diagnosticContributionPercentage: 50,
        explanation: "Confirms Stage-3a chronic renal insufficiency.",
      },
    ],
    doctors,
  );
}

function analyzePediatricReports(
  reports: SpecialtyReportItem[],
  doctors: Doctor[],
): SpecialtyXAIAnalysisResult {
  return createSpecialtyTemplate(
    "pediatrics",
    "Pediatric Nutritional Iron Deficiency Anemia",
    "बच्चों में खून की कमी (एनीमिया) एवं पोषक तत्वों की कमी",
    "moderate",
    95,
    "Pediatric blood evaluation identifies microcytic hypochromic anemia (Hemoglobin: 9.4 g/dL) and depleted serum ferritin (8.2 ng/mL) in growing child, necessitating targeted iron supplementation and dietary rebalancing.",
    "Rapid somatic growth and blood volume expansion outpacing dietary iron bioavailability depletes reticuloendothelial ferritin reserves, restricting heme synthesis and causing fatigue, poor appetite, and lowered immunity.",
    [
      {
        biomarker: "Pediatric Hemoglobin",
        observedValue: "9.4 g/dL",
        standardBaseline: "11.5 - 14.5 g/dL",
        diagnosticContributionPercentage: 60,
        explanation: "Direct indicator of reduced oxygen-carrying capacity in growing tissues.",
      },
      {
        biomarker: "Serum Ferritin",
        observedValue: "8.2 ng/mL",
        standardBaseline: "20 - 150 ng/mL",
        diagnosticContributionPercentage: 40,
        explanation: "Demonstrates exhausted bone marrow iron stores.",
      },
    ],
    doctors,
  );
}

function analyzeGynecologyReports(
  reports: SpecialtyReportItem[],
  doctors: Doctor[],
): SpecialtyXAIAnalysisResult {
  return createSpecialtyTemplate(
    "gynecology",
    "Polycystic Ovarian Syndrome (PCOS) with Hyperandrogenic Ovulatory Dysfunction",
    "पीसीओडी / पीसीओएस (PCOS), हार्मोनल असंतुलन एवं अनियमित माहवारी",
    "moderate",
    93,
    "Hormonal profiling confirms classic PCOS signature with inverted LH:FSH ratio (2.8:1) and elevated Anti-Mullerian Hormone (AMH 8.6 ng/mL). Pelvic ultrasound correlates with multiple arrested subcapsular follicles.",
    "Hypothalamic GnRH hyperpulsatility elevates pituitary LH release over FSH, stimulating ovarian theca cell androgen production. High intra-ovarian androgens arrest follicular development, halting normal ovulation.",
    [
      {
        biomarker: "LH : FSH Ratio",
        observedValue: "2.8 : 1",
        standardBaseline: "< 1.5 : 1",
        diagnosticContributionPercentage: 50,
        explanation: "Diagnostic marker for neuroendocrine ovulatory dysregulation in PCOS.",
      },
      {
        biomarker: "Serum AMH",
        observedValue: "8.6 ng/mL",
        standardBaseline: "1.5 - 4.0 ng/mL",
        diagnosticContributionPercentage: 50,
        explanation:
          "Reflects numerous pre-antral follicles failing to reach dominant ovulatory stage.",
      },
    ],
    doctors,
  );
}

function analyzeEntReports(
  reports: SpecialtyReportItem[],
  doctors: Doctor[],
): SpecialtyXAIAnalysisResult {
  return createSpecialtyTemplate(
    "ent",
    "Chronic Maxillary & Ethmoidal Rhinosinusitis",
    "क्रोनिक साइनोसाइटिस (साइनस संक्रमण) एवं सिरदर्द",
    "mild",
    88,
    "Imaging and endoscopic findings demonstrate mucosal hypertrophy in bilateral maxillary sinuses (5.8 mm thickness) with ostiomeatal complex blockage, causing facial pressure and post-nasal drip.",
    "Impaired mucociliary clearance leads to stagnant secretions within sinus cavities, promoting secondary bacterial and fungal biofilm formation and chronic mucosal edema.",
    [
      {
        biomarker: "Maxillary Mucosal Thickness",
        observedValue: "5.8 mm",
        standardBaseline: "< 1.5 mm",
        diagnosticContributionPercentage: 100,
        explanation: "Confirms mechanical obstruction of drainage ostia.",
      },
    ],
    doctors,
  );
}

function analyzeOphthalmologyReports(
  reports: SpecialtyReportItem[],
  doctors: Doctor[],
): SpecialtyXAIAnalysisResult {
  return createSpecialtyTemplate(
    "ophthalmology",
    "Bilateral Ocular Hypertension with Elevated Glaucoma Risk",
    "आंखों का बढ़ा हुआ दबाव एवं ग्लूकोमा (काला मोतिया) का जोखिम",
    "moderate",
    90,
    "Goldmann tonometry reveals elevated intraocular pressure in left eye (24 mmHg) and right eye (22 mmHg). Optic disc cup-to-disc ratio is 0.55, requiring prompt topical hypotensive care to protect retinal nerve fibers.",
    "Decreased aqueous humor outflow facility through the trabecular meshwork elevates intraocular hydrostatic pressure, exerting compressive and ischemic stress on retinal ganglion cell axons at the lamina cribrosa.",
    [
      {
        biomarker: "Intraocular Pressure (IOP)",
        observedValue: "24 mmHg",
        standardBaseline: "10 - 21 mmHg",
        diagnosticContributionPercentage: 100,
        explanation: "Primary modifiable risk factor for irreversible optic neuropathy.",
      },
    ],
    doctors,
  );
}

function analyzeMentalWellnessReports(
  reports: SpecialtyReportItem[],
  doctors: Doctor[],
): SpecialtyXAIAnalysisResult {
  return createSpecialtyTemplate(
    "mental_wellness",
    "Moderately Severe Depressive Episode with Somatic Anxiety (PHQ-9: 16)",
    "डिप्रेशन, अत्यधिक चिंता (एंग्जायटी) एवं अनिद्रा",
    "moderate",
    92,
    "Psychometric scoring indicates significant mood dysregulation (PHQ-9: 16/27) and generalized anxiety (GAD-7: 13/21) accompanied by sleep disruption, requiring structured psychotherapeutic care and medical follow-up.",
    "Sustained psychological distress induces chronic hypothalamic-pituitary-adrenal (HPA) axis hyperactivity, raising cortisol and blunting prefrontal cortex serotonin and dopamine neurotransmission.",
    [
      {
        biomarker: "PHQ-9 Depression Inventory",
        observedValue: "16 / 27",
        standardBaseline: "< 5 (Minimal)",
        diagnosticContributionPercentage: 55,
        explanation: "Standard validated clinical rating for major depressive severity.",
      },
      {
        biomarker: "GAD-7 Anxiety Scale",
        observedValue: "13 / 21",
        standardBaseline: "< 5 (Minimal)",
        diagnosticContributionPercentage: 45,
        explanation: "Confirms moderate generalized sympathetic nervous arousal.",
      },
    ],
    doctors,
  );
}

function analyzeGeneralMedicineReports(
  reports: SpecialtyReportItem[],
  doctors: Doctor[],
): SpecialtyXAIAnalysisResult {
  return createSpecialtyTemplate(
    "general_medicine",
    "Acute Viral Febrile Illness with Moderate Thrombocytopenia",
    "वायरल बुखार, प्लेटलेट्स में कमी एवं अत्यधिक कमजोरी",
    "high",
    94,
    "Hematological analysis reveals significant acute thrombocytopenia (Platelets: 78,000 /mcL) and leukopenia (3,100 /mcL) characteristic of acute viral infection (such as Dengue / Viral Hemorrhagic illness).",
    "Viral NS1 antigens stimulate cross-reactive antibodies that bind to platelet surface integrins, accelerating reticuloendothelial platelet clearance and transiently suppressing bone marrow megakaryocyte maturation.",
    [
      {
        biomarker: "Platelet Count",
        observedValue: "78,000 /mcL",
        standardBaseline: "150,000 - 450,000 /mcL",
        diagnosticContributionPercentage: 70,
        explanation: "Severe drop below critical 100k threshold requiring daily monitoring.",
      },
      {
        biomarker: "Total Leukocyte Count",
        observedValue: "3,100 /mcL",
        standardBaseline: "4,000 - 11,000 /mcL",
        diagnosticContributionPercentage: 30,
        explanation: "Leukopenia secondary to acute viral margination.",
      },
    ],
    doctors,
  );
}

// ----------------------------------------------------------------------
// HELPER TO CONSTRUCT RICH TEMPLATES
// ----------------------------------------------------------------------
function createSpecialtyTemplate(
  specialtyId: SpecialtyCategoryId,
  conditionTitle: string,
  hindiTitle: string,
  severity: SeverityLevel,
  confidence: number,
  summary: string,
  pathophysiology: string,
  evidence: ExplainableEvidenceItem[],
  doctors: Doctor[],
): SpecialtyXAIAnalysisResult {
  return {
    specialtyId,
    analysisDate: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    reportCountAnalyzed: 1,
    primaryConditionTitle: conditionTitle,
    hindiConditionTitle: hindiTitle,
    severity,
    overallConfidenceScore: confidence,
    summaryParagraph: summary,
    pathophysiologyExplanation: `Kyun ho raha hai (Why is this happening): ${pathophysiology}`,
    biomarkerEvidenceChain: evidence,
    clinicalGuideline: {
      authorityName: "National Medical Commission (NMC) & International Specialist Boards",
      guidelineTitle: "Evidence-Based Clinical Practice Guidelines 2024",
      editionYear: 2024,
      recommendationLevel: "Class I, Level A",
      summaryOfStandard:
        "Targeted clinical intervention combined with precision nutritional modifications is recommended.",
    },
    ruleOutDifferentialDiagnosis: [
      {
        condition: "Acute Systemic Malignancy",
        whyRuledOut:
          "Absence of constitutional B-symptoms, pathological lymphadenopathy, or blast cells.",
      },
    ],
    deficienciesAndAnomalies: [
      {
        category: "Elevated Marker",
        name: evidence[0]?.biomarker || "Primary Biomarker",
        observed: evidence[0]?.observedValue || "Abnormal",
        optimal: evidence[0]?.standardBaseline || "Normal",
        impactOnHealth: "Requires clinical attention to prevent progression.",
        urgency: "soon",
      },
    ],
    precautions: [
      {
        title: "Medical Warning & Regular Monitoring",
        instruction:
          "Track vital symptoms daily and consult the assigned specialist doctor promptly.",
        urgency: "high_priority",
        reason: "Prevents acute progression or preventable complications.",
      },
    ],
    whatToAvoid: [
      {
        item: "Dehydration, High-Sodium, & Ultra-Processed Foods",
        category: "food",
        whyAvoid: "Increases systemic oxidative stress and metabolic load on recovering organs.",
        consequenceIfIgnored: "Delays healing and aggravates biochemical imbalance.",
      },
      {
        item: "Heavy Physical Stress & Inadequate Sleep (< 7 Hours)",
        category: "lifestyle",
        whyAvoid: "Impairs cellular regenerative pathways and raises inflammatory cytokines.",
        consequenceIfIgnored: "Weakens systemic immune response.",
      },
    ],
    whatToEat: [
      {
        food: "Fresh Seasonal Fruits, Green Leafy Vegetables & Hydration",
        category: "daily_staple",
        portion: "Daily with all major meals",
        benefits: "Supplies bioavailable antioxidants, electrolytes, and essential micronutrients.",
        biochemicalMechanism: "Neutralizes reactive oxygen species and accelerates tissue repair.",
      },
      {
        food: "Clean Lean Proteins (Lentils, Paneer, Tofu, Eggs)",
        category: "superfood",
        portion: "1.2g per kg body weight daily",
        benefits: "Provides essential amino acids for enzymatic synthesis and cellular recovery.",
        biochemicalMechanism: "Supports ribosome protein synthesis in regenerating tissues.",
      },
    ],
    whatToDo: [
      {
        action: "Follow Structured Specialist Consultation Plan",
        category: "routine",
        frequency: "Immediate",
        instruction: "Book an in-person or video consultation with a certified doctor.",
        expectedOutcome: "Ensures verified clinical prescription and symptom resolution.",
      },
    ],
    recommendedDoctorQuery: conditionTitle.split(" ")[0] || "Specialist",
    suggestedDoctors: doctors,
    recommendedNextTests: [
      "Follow-up Specialty Lab Panel in 4-6 weeks",
      "Comprehensive Metabolic Check",
    ],
  };
}
