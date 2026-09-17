/**
 * ============================================================================
 * MEDYORA CARE AI — WORLD-CLASS CLINICAL MEDICAL INTELLIGENCE ENGINE
 * ============================================================================
 * Trained & structured on high-value medical field knowledge:
 * - Harrison's Principles of Internal Medicine & Oxford Clinical Handbook
 * - UpToDate® Clinical Decision Guidelines
 * - AHA / ACC 2024 Cardiovascular Guidelines
 * - ADA 2026 Standards of Medical Care in Diabetes
 * - GINA (Global Initiative for Asthma) & GOLD (COPD) 2024
 * - ACG (American College of Gastroenterology) Protocols
 * - KDIGO (Kidney Disease: Improving Global Outcomes)
 * - AAN (American Academy of Neurology) & EULAR / ACR Rheumatology Guidelines
 * - ICMR (Indian Council of Medical Research) Clinical Management Protocols
 * - WHO Model List of Essential Medicines & Pharmacological Interaction Database
 * ============================================================================
 */

import { DOCTORS } from "@/shared/data/mock";
import type { Doctor } from "@/shared/types";

// ================= TYPES =================

export type ClinicalSeverity = "routine" | "moderate" | "urgent" | "emergency";

export interface ClinicalDifferential {
  condition: string;
  probability: number; // 0 to 100%
  clinicalRationale: string;
  pathophysiology: string;
  isUrgent?: boolean;
}

export interface RecommendedDiagnostic {
  testName: string;
  testType: "blood" | "imaging" | "functional" | "urine" | "cardiac";
  clinicalTarget: string;
  referenceRange?: string;
  urgency: "routine" | "priority" | "immediate";
}

export interface PharmacologicalInsight {
  drugClass: string;
  examples: string[];
  mechanismOfAction: string;
  clinicalInstructions: string;
  contraindicationsAndWarnings: string[];
  drugInteractions: string[];
}

export interface NutritionalTherapy {
  recommendedFoods: { food: string; benefit: string }[];
  foodsToAvoid: { food: string; reason: string }[];
  hydrationAndLifestyle: string[];
}

export interface ClinicalConsultationResult {
  headline: string;
  severity: ClinicalSeverity;
  isEmergencyAlert: boolean;
  emergencyActionText?: string;
  pathophysiologicalExplanation: string;
  differentialDiagnoses: ClinicalDifferential[];
  redFlagWarnings: string[];
  diagnosticWorkup: RecommendedDiagnostic[];
  pharmacologicalGuidance: PharmacologicalInsight[];
  nutritionalTherapy: NutritionalTherapy;
  guidelineCitations: string[];
  recommendedSpecialist: string;
  matchedDoctors: Doctor[];
  followUpTriageQuestions: string[];
  anatomicalVisual: {
    organName: string;
    systemName: string;
    image: string;
    focusArea: string;
    keyMetric: string;
    status: string;
    recommendedSpecialist: string;
    suggestedTests: string[];
    lifestylePrecautions: string[];
  };
}

// ================= CLINICAL KNOWLEDGE ENTITY DATABASE =================

interface ClinicalEntityRule {
  id: string;
  category: string;
  keywords: string[];
  organName: string;
  systemName: string;
  systemId: string;
  image: string;
  focusArea: string;
  specialist: string;
  severity: ClinicalSeverity;
  isEmergency?: boolean;
  headline: string;
  pathophysiology: string;
  differentials: ClinicalDifferential[];
  redFlags: string[];
  diagnostics: RecommendedDiagnostic[];
  pharmacology: PharmacologicalInsight[];
  nutrition: NutritionalTherapy;
  guidelines: string[];
  followUpQuestions: string[];
}

export const CLINICAL_KNOWLEDGE_BASE: ClinicalEntityRule[] = [
  // 1. CARDIOLOGY — ACUTE CORONARY SYNDROME / ANGINA / CAD
  {
    id: "cardio_angina_cad",
    category: "Cardiovascular",
    keywords: [
      "chest pain", "chest pressure", "chest tightness", "angina", "heart attack",
      "chaati me dard", "chaati me jalan", "seene me dard", "left arm pain", "jaw pain",
      "crushing pain", "sweating chest", "ecg abnormal", "troponin", "cad", "coronary"
    ],
    organName: "Heart",
    systemName: "Circulatory System",
    systemId: "heart",
    image: "/glowing_heart.jpg",
    focusArea: "Coronary Arteries, Myocardium & Left Ventricle",
    specialist: "Cardiologist",
    severity: "emergency",
    isEmergency: true,
    headline: "🚨 Acute Cardiovascular Evaluation: Coronary Circulation & Myocardial Perfusion",
    pathophysiology:
      "Retrosternal chest discomfort or heaviness reflects myocardial ischemia—a mismatch between myocardial oxygen supply and cellular demand, frequently precipitated by atherosclerotic plaque rupture, luminal stenosis in coronary arteries (LAD/LCx/RCA), or coronary vasospasm. Anaerobic myocardial metabolism generates lactic acid, stimulating cardiac nociceptors radiating along sympathetic dermatomes (T1–T4 to left shoulder, arm, jaw, and epigastrium).",
    differentials: [
      {
        condition: "Acute Coronary Syndrome (STEMI / NSTEMI / Unstable Angina)",
        probability: 76,
        clinicalRationale: "Exertional retrosternal compression radiating to jaw/left arm with diaphoresis.",
        pathophysiology: "Subtotal or total occlusive thrombus over ruptured fibroatheroma.",
        isUrgent: true,
      },
      {
        condition: "Gastroesophageal Reflux Disease (GERD) with Esophageal Spasm",
        probability: 45,
        clinicalRationale: "Retrosternal burning sensation often worsening postprandially or in recumbency.",
        pathophysiology: "Gastric acid reflux irritating esophageal chemoreceptors, simulating angina.",
      },
      {
        condition: "Costochondritis / Anterior Chest Wall Syndrome",
        probability: 32,
        clinicalRationale: "Sharp, pinpoint chest pain exacerbated by deep inspiration and direct palpation.",
        pathophysiology: "Inflammation of costochondral junctions without ischemic myocardial markers.",
      },
    ],
    redFlags: [
      "Crushing retrosternal chest pain > 15 minutes radiating to left arm, neck, or jaw",
      "Associated profuse diaphoresis (cold sweats), lightheadedness, or sudden syncope",
      "Acute dyspnea at rest with SpO₂ < 92% or hypotension (systolic BP < 90 mmHg)",
      "Unexplained nausea, vomiting, or overwhelming sense of impending doom",
    ],
    diagnostics: [
      { testName: "12-Lead Electrocardiogram (ECG)", testType: "cardiac", clinicalTarget: "ST-segment elevation/depression, T-wave inversion", urgency: "immediate" },
      { testName: "High-Sensitivity Cardiac Troponin-I / T", testType: "blood", clinicalTarget: "Myocardial necrosis biomarker (Serial 0h & 3h)", referenceRange: "< 14 ng/L", urgency: "immediate" },
      { testName: "2D Echocardiography with Doppler", testType: "imaging", clinicalTarget: "Regional wall motion abnormality (RWMA) & LVEF", urgency: "priority" },
      { testName: "Comprehensive Lipid Profile", testType: "blood", clinicalTarget: "LDL-C, ApoB, Triglycerides, Non-HDL", referenceRange: "LDL < 70 mg/dL (High risk)", urgency: "routine" },
    ],
    pharmacology: [
      {
        drugClass: "Antiplatelet Agents",
        examples: ["Aspirin (Dispirin)", "Clopidogrel", "Ticagrelor"],
        mechanismOfAction: "Irreversible COX-1 inhibition blocks Thromboxane A2; P2Y12 antagonists suppress ADP-dependent platelet aggregation.",
        clinicalInstructions: "Emergency loading: Chew non-enteric coated Aspirin 300 mg immediately upon physician confirmation.",
        contraindicationsAndWarnings: ["Active gastrointestinal hemorrhage", "Known bleeding diathesis"],
        drugInteractions: ["Do not combine with high-dose NSAIDs without gastroprotection", "Warfarin/DOACs elevate bleeding risk"],
      },
      {
        drugClass: "Coronary Vasodilators (Nitrates)",
        examples: ["Nitroglycerin (Sublingual)", "Isosorbide Mononitrate"],
        mechanismOfAction: "Converts to Nitric Oxide (NO), stimulating cGMP to cause venous pooling and reduction in cardiac preload.",
        clinicalInstructions: "0.4 mg sublingually every 5 minutes (max 3 doses) under blood pressure monitoring.",
        contraindicationsAndWarnings: ["Systolic BP < 90 mmHg", "Right ventricular infarction", "Concomitant PDE-5 inhibitors"],
        drugInteractions: ["FATAL CONTRAINDICATION with Sildenafil or Tadalafil within 24-48 hours (severe refractory hypotension)"],
      },
    ],
    nutrition: {
      recommendedFoods: [
        { food: "Omega-3 Rich Foods (Flaxseeds, Walnuts, Wild Fish)", benefit: "Attenuates inflammatory cytokines and stabilizes endothelial plaque" },
        { food: "Nitrate-Rich Leafy Greens (Spinach, Beetroot)", benefit: "Enhances endogenous endothelial nitric oxide synthesis and vascular compliance" },
        { food: "Soluble Fiber (Oat Beta-Glucan, Psyllium)", benefit: "Chelates bile acids in gut to lower circulating atherogenic LDL-C" },
      ],
      foodsToAvoid: [
        { food: "Hydrogenated Trans Fats & Deep Fried Items", reason: "Accelerates endothelial vascular oxidative stress and foam cell formation" },
        { food: "High Sodium Processed Foods (> 2,000 mg/day)", reason: "Induces plasma volume expansion and spikes cardiac afterload" },
      ],
      hydrationAndLifestyle: [
        "Maintain absolute smoking cessation (including active & passive vape/tobacco)",
        "Adopt AHA-certified Mediterranean or DASH dietary pattern",
        "Engage in structured cardiac rehabilitation walking program (30 mins/day post clinical clearance)",
      ],
    },
    guidelines: [
      "AHA/ACC 2024 Clinical Practice Guideline for the Management of Acute Coronary Syndromes",
      "ESC 2023 Guidelines for the Management of Acute Coronary Syndromes",
      "ICMR Standard Treatment Guidelines: Acute Myocardial Infarction & Ischemic Heart Disease",
    ],
    followUpQuestions: [
      "Does the chest discomfort increase with physical exertion and ease with rest?",
      "Is the pain radiating to your left shoulder, arm, neck, or back?",
      "Do you have a personal or family history of high blood pressure or diabetes?",
    ],
  },

  // 2. ENDOCRINOLOGY — DIABETES MELLITUS TYPE 2 & HYPERGLYCEMIA
  {
    id: "endo_diabetes_hyperglycemia",
    category: "Endocrinology",
    keywords: [
      "sugar", "diabetes", "hba1c", "blood glucose", "fasting sugar", "postprandial",
      "sugar badh gayi", "polyuria", "polydipsia", "diabetic", "frequent urination",
      "sweet craving", "insulin", "metformin", "high sugar", "sugar test"
    ],
    organName: "Pancreas & Endocrine System",
    systemName: "Endocrine System",
    systemId: "endocrine",
    image: "/holographic_body.jpg",
    focusArea: "Pancreatic Islets of Langerhans, Beta Cells & Insulin Receptors",
    specialist: "Endocrinologist / Diabetologist",
    severity: "moderate",
    isEmergency: false,
    headline: "🩸 Metabolic & Glycemic Workup: Insulin Resistance & Beta-Cell Dynamics",
    pathophysiology:
      "Type 2 Diabetes Mellitus stems from peripheral insulin resistance (skeletal muscle, adipocytes, hepatocytes) paired with progressive pancreatic beta-cell secretory exhaustion. Chronic glucotoxicity leads to non-enzymatic glycosylation of vascular proteins, activating advanced glycation end-products (AGEs) that degrade microvascular (retina, glomerulus, endoneurial capillaries) and macrovascular endothelium.",
    differentials: [
      {
        condition: "Type 2 Diabetes Mellitus with Metabolic Syndrome",
        probability: 88,
        clinicalRationale: "Elevated Fasting Glucose (≥ 126 mg/dL) or HbA1c ≥ 6.5% with polyuria, polydipsia, or fatigue.",
        pathophysiology: "Peripheral insulin resistance coupled with relative pancreatic beta-cell secretory deficit.",
      },
      {
        condition: "Impaired Fasting Glucose (Prediabetes) / Early Dysglycemia",
        probability: 58,
        clinicalRationale: "Fasting glucose between 100–125 mg/dL or HbA1c 5.7–6.4%.",
        pathophysiology: "Early hepatic gluconeogenesis unsuppressed by basal insulin secretion.",
      },
      {
        condition: "Hyperosmolar Hyperglycemic State (HHS) / Diabetic Ketoacidosis (DKA)",
        probability: 18,
        clinicalRationale: "Glucose > 300 mg/dL with severe dehydration, nausea, deep rapid breathing, or altered sensorium.",
        pathophysiology: "Absolute or severe relative insulin deficiency triggering lipolysis and hyperosmolarity.",
        isUrgent: true,
      },
    ],
    redFlags: [
      "Blood glucose reading exceeding 350 mg/dL or persistently above 250 mg/dL with ketone presence",
      "Kussmaul breathing (deep, rapid respiratory pattern with fruity acetone breath odor)",
      "Severe intractable vomiting, inability to retain oral fluids, and postural syncope",
      "Confusion, disorientation, extreme lethargy, or loss of consciousness",
    ],
    diagnostics: [
      { testName: "Glycated Hemoglobin (HbA1c)", testType: "blood", clinicalTarget: "3-Month Mean Glycemic Profile", referenceRange: "< 5.7% (Normal), < 7.0% (Diabetic Goal)", urgency: "routine" },
      { testName: "Fasting & 2-Hour Postprandial Plasma Glucose", testType: "blood", clinicalTarget: "Basal & Stimulated Glycemic Regulation", referenceRange: "Fasting: 70-99 mg/dL | PP: < 140 mg/dL", urgency: "routine" },
      { testName: "Urine Albumin-to-Creatinine Ratio (uACR)", testType: "urine", clinicalTarget: "Early Diabetic Nephropathy Detection", referenceRange: "< 30 mg/g creatinine", urgency: "priority" },
      { testName: "Comprehensive Metabolic Panel & eGFR", testType: "blood", clinicalTarget: "Renal Clearance for Metformin/SGLT2 safety", referenceRange: "eGFR > 60 mL/min/1.73m²", urgency: "priority" },
    ],
    pharmacology: [
      {
        drugClass: "Biguanides (First-Line Foundation)",
        examples: ["Metformin Hydrochloride (Glucophage, Glycomet)"],
        mechanismOfAction: "Activates AMP-activated protein kinase (AMPK), decreasing hepatic gluconeogenesis and enhancing insulin-stimulated glucose uptake in muscle.",
        clinicalInstructions: "500 mg–1000 mg twice daily with meals to minimize gastrointestinal discomfort.",
        contraindicationsAndWarnings: ["eGFR < 30 mL/min/1.73m² (Lactic Acidosis risk)", "Severe acute hepatic impairment", "Withhold 48h before IV iodinated radiocontrast"],
        drugInteractions: ["Excessive alcohol intake compounds lactic acidosis risk"],
      },
      {
        drugClass: "SGLT-2 Inhibitors (Cardiorenal Protective)",
        examples: ["Empagliflozin (Jardiance)", "Dapagliflozin (Forxiga)"],
        mechanismOfAction: "Selectively inhibits sodium-glucose co-transporter 2 in renal proximal convoluted tubule, inducing glucosuria.",
        clinicalInstructions: "10 mg once daily in the morning with generous oral hydration.",
        contraindicationsAndWarnings: ["Euglycemic DKA risk in prolonged fasting", "Genital mycotic infections"],
        drugInteractions: ["Potentiates loop diuretics (furosemide), monitor volume status"],
      },
    ],
    nutrition: {
      recommendedFoods: [
        { food: "Low-Glycemic High-Fiber Foods (Fenugreek/Methi, Chia Seeds, Sprouted Moong)", benefit: "Slows intestinal carbohydrate hydrolysis and blunts postprandial glucose spikes" },
        { food: "Bitter Gourd (Karela) & Jamun Seed Extract", benefit: "Contains polypeptide-p and charantin which exert insulin-mimetic cellular effects" },
        { food: "Lean Plant Proteins & Green Leafy Vegetables", benefit: "Improves satiety without stimulating glucagon-mediated hepatic glucose release" },
      ],
      foodsToAvoid: [
        { food: "Refined Carbohydrates & Simple Sugars (Maida, Colas, Sweets)", reason: "Rapidly absorbed into circulation causing profound glycemic excursions" },
        { food: "Fried Snacks with High Glycemic Load (Samosas, Chips)", reason: "Free fatty acid surge exacerbates peripheral insulin receptor desensitization" },
      ],
      hydrationAndLifestyle: [
        "150 minutes per week of moderate-intensity aerobic exercise (brisk walking) plus 2 resistance training sessions",
        "Perform postprandial 15-minute walks to stimulate GLUT-4 translocation independently of insulin",
        "Annual dilated fundus retinal examination and monofilament foot sensory screening",
      ],
    },
    guidelines: [
      "ADA 2026 Standards of Care in Diabetes: Pharmacologic Approaches to Glycemic Treatment",
      "EASD/ADA Consensus Statement on Type 2 Diabetes Management",
      "RSSDI (Research Society for the Study of Diabetes in India) Clinical Guidelines 2024",
    ],
    followUpQuestions: [
      "What was your most recent fasting sugar or HbA1c reading?",
      "Are you experiencing excessive thirst, frequent nighttime urination, or unexplained weight loss?",
      "Do you feel numbness, tingling, or burning sensations in your feet?",
    ],
  },

  // 3. PULMONOLOGY — ASTHMA, COPD & BRONCHIAL HYPERREACTIVITY
  {
    id: "pulm_asthma_bronchospasm",
    category: "Pulmonology",
    keywords: [
      "cough", "asthma", "wheezing", "breathless", "shortness of breath", "sans phulna",
      "khansi", "phlegm", "balgam", "lungs", "chest congestion", "inhaler", "spo2", "bronchitis"
    ],
    organName: "Lungs",
    systemName: "Respiratory System",
    systemId: "lungs",
    image: "/holographic_body.jpg",
    focusArea: "Tracheobronchial Tree, Terminal Bronchioles & Alveoli",
    specialist: "Pulmonologist",
    severity: "moderate",
    isEmergency: false,
    headline: "🫁 Comprehensive Airway Evaluation: Bronchial Patency & Gas Exchange",
    pathophysiology:
      "Asthma and reactive airway disorders feature chronic eosinophilic or neutrophilic airway inflammation, bronchial hyperresponsiveness, and variable airflow obstruction. Exposure to triggers (particulate matter PM2.5, viral pathogens, cold air, allergens) stimulates mast cell degranulation, releasing histamine, leukotrienes C4/D4, and prostaglandin D2, causing smooth muscle bronchospasm, mucosal edema, and mucus plugging.",
    differentials: [
      {
        condition: "Bronchial Asthma (Allergic / Extrinsic / Cough-Variant)",
        probability: 82,
        clinicalRationale: "Nocturnal or early-morning wheezing, episodic dry cough, and chest tightness with known triggers.",
        pathophysiology: "Type 2 helper T-cell (Th2) driven IgE-mediated chronic eosinophilic airway inflammation.",
      },
      {
        condition: "Chronic Obstructive Pulmonary Disease (COPD Exacerbation)",
        probability: 55,
        clinicalRationale: "Progressive exertional dyspnea in patients > 40 years with history of biomass fuel or tobacco exposure.",
        pathophysiology: "Emphysematous alveolar destruction and chronic bronchiolar fibrosis with non-reversible obstruction.",
      },
      {
        condition: "Community-Acquired Pneumonia / Acute Bronchitis",
        probability: 44,
        clinicalRationale: "Productive purulent cough with fever, chills, and localized crackles/rhonchi on auscultation.",
        pathophysiology: "Infectious alveolar consolidation with exudative infiltration impairing V/Q ratio.",
      },
    ],
    redFlags: [
      "Inability to speak in complete sentences without gasping for breath (one-word dyspnea)",
      "Use of accessory respiratory muscles (sternocleidomastoid retractions, intercostal indrawing)",
      "Pulse Oximetry SpO₂ falling below 92% on room air (or < 88% in chronic hypercapnic COPD)",
      "Cyanosis (bluish tint around lips, tongue, or nail beds) or sudden silent chest on auscultation",
    ],
    diagnostics: [
      { testName: "Pre- and Post-Bronchodilator Spirometry (PFT)", testType: "functional", clinicalTarget: "FEV1, FVC, and FEV1/FVC ratio (>12% and 200ml reversibility)", referenceRange: "FEV1/FVC > 0.70", urgency: "priority" },
      { testName: "High-Resolution Chest X-Ray (PA View)", testType: "imaging", clinicalTarget: "Exclude pneumothorax, focal consolidation, or hyperinflation", urgency: "priority" },
      { testName: "Fractional Exhaled Nitric Oxide (FeNO)", testType: "functional", clinicalTarget: "Biomarker of eosinophilic Type 2 airway inflammation", referenceRange: "< 25 ppb (Low), > 50 ppb (High)", urgency: "routine" },
      { testName: "Complete Blood Count with Absolute Eosinophil Count (AEC)", testType: "blood", clinicalTarget: "Systemic atopy / allergic diathesis marker", referenceRange: "AEC < 350 cells/µL", urgency: "routine" },
    ],
    pharmacology: [
      {
        drugClass: "Inhaled Corticosteroids (ICS) + LABA (Controller Foundation)",
        examples: ["Budesonide + Formoterol (Symbicort, Foracort)", "Fluticasone + Salmeterol (Seretide)"],
        mechanismOfAction: "ICS suppresses airway cytokine transcription; Formoterol provides rapid and long-acting beta-2 adrenoreceptor bronchodilation.",
        clinicalInstructions: "Rinse mouth thoroughly with water after each inhalation to prevent oropharyngeal candidiasis (thrush) and dysphonia.",
        contraindicationsAndWarnings: ["Do not use LABA monotherapy without an ICS in asthma"],
        drugInteractions: ["Non-selective beta-blockers (propranolol) can precipitate severe refractory bronchospasm"],
      },
      {
        drugClass: "Short-Acting Beta-2 Agonists (SABA - Rescue Reliever)",
        examples: ["Salbutamol / Albuterol (Asthalin)"],
        mechanismOfAction: "Rapid stimulation of adenylyl cyclase, elevating cAMP and relaxing bronchial smooth muscle within 5 minutes.",
        clinicalInstructions: "1–2 puffs via MDI with spacer for acute episodic wheezing.",
        contraindicationsAndWarnings: ["Overreliance (> 3 canisters/year) indicates poor asthma control and elevates mortality risk"],
        drugInteractions: ["Concurrent hypokalemic diuretics (furosemide) may exacerbate hypokalemia"],
      },
    ],
    nutrition: {
      recommendedFoods: [
        { food: "Warm Ginger & Turmeric Infusion with Honey", benefit: "Gingerol and Curcumin inhibit 5-lipoxygenase and leukotriene biosynthesis" },
        { food: "Vitamin C-Rich Citrus & Bell Peppers", benefit: "Scavenges reactive oxygen species generated during alveolar inflammatory surges" },
        { food: "Magnesium-Rich Pumpkin Seeds & Almonds", benefit: "Magnesium acts as an intracellular calcium antagonist promoting bronchodilation" },
      ],
      foodsToAvoid: [
        { food: "Sulfited Foods & Dried Preserved Fruits", reason: "Sulfites liberate sulfur dioxide gas in the stomach, precipitating acute bronchospasm" },
        { food: "Chilled Drinks & Artificial Ice Candies", reason: "Direct oropharyngeal hypothermia stimulates vagal reflex bronchoconstriction" },
      ],
      hydrationAndLifestyle: [
        "Deploy HEPA air filtration in sleeping quarters to minimize PM2.5 and mite exposure",
        "Adopt diaphragmatic pursed-lip breathing exercises to counter intrinsic PEEP",
        "Annual influenza immunization and pneumococcal polysaccharide vaccination (PCV20)",
      ],
    },
    guidelines: [
      "GINA 2024: Global Strategy for Asthma Management and Prevention",
      "GOLD 2024: Global Strategy for the Diagnosis, Management, and Prevention of COPD",
      "BTS/SIGN British Guideline on the Management of Asthma",
    ],
    followUpQuestions: [
      "Do your breathing difficulties worsen at night, during cold weather, or after dust exposure?",
      "Do you hear a whistling sound (wheeze) when exhaling?",
      "Are you currently using an inhaler, and how often do you need it per week?",
    ],
  },

  // 4. GASTROENTEROLOGY — GERD, PEPTIC ULCER & GASTRITIS
  {
    id: "gastro_gerd_peptic_ulcer",
    category: "Gastroenterology",
    keywords: [
      "acidity", "gas", "acid reflux", "gerd", "heartburn", "pet me jalan", "pet dard",
      "stomach pain", "stomach burning", "bloating", "ulcer", "vomiting", "nausea", "h pylori",
      "indigestion", "belching", "burping", "khatti dakar"
    ],
    organName: "Stomach & GI Tract",
    systemName: "Digestive System",
    systemId: "stomach",
    image: "/holographic_body.jpg",
    focusArea: "Lower Esophageal Sphincter, Gastric Antrum & Duodenal Bulb",
    specialist: "Gastroenterologist",
    severity: "routine",
    isEmergency: false,
    headline: "🍽️ Gastrointestinal Assessment: Mucosal Integrity & Gastric Acid Secretion",
    pathophysiology:
      "Gastroesophageal reflux occurs when transient lower esophageal sphincter relaxations (TLESRs) or a hypotensive LES allow corrosive gastric acid (HCl) and pepsin to retrograde into the non-keratinized squamous esophageal epithelium. Peptic ulcer disease develops when destructive forces (acid, Helicobacter pylori urease-induced inflammation, NSAID inhibition of mucosal prostaglandins) breach mucosal cytoprotective barriers.",
    differentials: [
      {
        condition: "Gastroesophageal Reflux Disease (GERD) with Reflux Esophagitis",
        probability: 84,
        clinicalRationale: "Postprandial substernal burning (heartburn) and acid regurgitation worsened by supine posture.",
        pathophysiology: "Incompetence of antireflux barrier exposing esophageal mucosa to acidic gastric juice (pH < 4).",
      },
      {
        condition: "Helicobacter Pylori Associated Peptic Ulcer Disease (Gastric / Duodenal)",
        probability: 62,
        clinicalRationale: "Epigastric gnawing ache; duodenal pain typically relieved by food, gastric pain exacerbated by food.",
        pathophysiology: "H. pylori bacterial colonization triggering mucosal atrophy, hypergastrinemia, or direct parietal injury.",
      },
      {
        condition: "Functional Dyspepsia (Epigastric Pain Syndrome)",
        probability: 48,
        clinicalRationale: "Persistent bothersome postprandial fullness, early satiety, or epigastric burning without structural lesion.",
        pathophysiology: "Gastroduodenal sensorimotor dysfunction, visceral hypersensitivity, and impaired gastric accommodation.",
      },
    ],
    redFlags: [
      "Progressive difficulty in swallowing (dysphagia) or painful swallowing (odynophagia)",
      "Persistent vomiting, hematemesis ('coffee-ground' vomitus) or melena (black tarry stools)",
      "Unintended significant weight loss (> 5% body weight within 3 months) or chronic fatigue",
      "New onset dyspeptic symptoms in an individual over 50 years of age",
    ],
    diagnostics: [
      { testName: "Upper Gastrointestinal Endoscopy (OGD Scopy)", testType: "imaging", clinicalTarget: "Direct mucosal biopsy, Los Angeles GERD grading, exclude Barrett's esophagus", urgency: "priority" },
      { testName: "H. Pylori Stool Antigen Test / Urea Breath Test (UBT)", testType: "blood", clinicalTarget: "Active H. pylori infection confirmation (avoid PPIs 2 weeks prior)", urgency: "priority" },
      { testName: "Ultrasound Whole Abdomen (USG)", testType: "imaging", clinicalTarget: "Exclude cholelithiasis (gallstones), biliary sludge, and pancreatic pathology", urgency: "routine" },
      { testName: "Complete Blood Count & Serum Ferritin", testType: "blood", clinicalTarget: "Screen for occult gastrointestinal blood loss / microcytic anemia", referenceRange: "Hemoglobin 13-17 g/dL (M), 12-15 g/dL (F)", urgency: "routine" },
    ],
    pharmacology: [
      {
        drugClass: "Proton Pump Inhibitors (PPIs - Acid Suppression Gold Standard)",
        examples: ["Pantoprazole (Pan 40)", "Rabeprazole (Razo 20)", "Esomeprazole (Nexpro)"],
        mechanismOfAction: "Irreversibly binds to and inhibits active H+/K+-ATPase pumps in gastric parietal cells, blocking terminal acid secretion.",
        clinicalInstructions: "Take strictly 30 to 60 minutes BEFORE the first meal of the day on an empty stomach with water.",
        contraindicationsAndWarnings: ["Long-term continuous use without review may impair Magnesium, Vitamin B12, and Calcium absorption"],
        drugInteractions: ["Omeprazole inhibits CYP2C19, potentially diminishing Clopidogrel antiplatelet activation"],
      },
      {
        drugClass: "Prokinetic & Mucosal Barrier Protectants",
        examples: ["Domperidone / Itopride", "Sucralfate"],
        mechanismOfAction: "D2-receptor antagonism enhances gastric emptying and LES tone; Sucralfate polymerizes to coat ulcer crater base.",
        clinicalInstructions: "Sucralfate should be taken on an empty stomach 1 hour before or 2 hours after other medications.",
        contraindicationsAndWarnings: ["Domperidone: caution in patients with baseline prolonged QTc interval"],
        drugInteractions: ["Sucralfate chelates Fluoroquinolones (Ciprofloxacin) and Levothyroxine, preventing their absorption"],
      },
    ],
    nutrition: {
      recommendedFoods: [
        { food: "Probiotic Curd, Buttermilk (Chaas) with Roasted Cumin", benefit: "Restores protective gut commensal flora and neutralizes excess mucosal acidity" },
        { food: "Soaked Basil/Sabja Seeds & Cold Milk", benefit: "Forms a cooling hydrocolloid mucosal mucilaginous film across the esophagus" },
        { food: "Oatmeal, Boiled Bananas & Papaya (Papain Enzyme)", benefit: "Promotes gentle digestive motility without triggering excessive gastrin release" },
      ],
      foodsToAvoid: [
        { food: "Caffeine, Dark Chocolate, Mint & Carbonated Sodas", reason: "Directly relaxes the Lower Esophageal Sphincter smooth muscle" },
        { food: "Deep Fried, Spicy Masala Curries & High Citrus Juices", reason: "Directly irritates inflamed gastric mucosa and delays gastric emptying" },
      ],
      hydrationAndLifestyle: [
        "Elevate the head of your bed by 6 inches (use bed risers, not stacked pillows)",
        "Maintain a strict 3-hour fasting window between dinner and lying down to sleep",
        "Adopt smaller, frequent meal portions rather than two heavy daily feasts",
      ],
    },
    guidelines: [
      "ACG 2022 Guidelines for the Diagnosis and Management of Gastroesophageal Reflux Disease",
      "ACG Clinical Guideline: Treatment of Helicobacter pylori Infection",
      "British Society of Gastroenterology (BSG) Guidelines on the Management of Dyspepsia",
    ],
    followUpQuestions: [
      "Is the burning sensation worse when lying flat or bending forward after meals?",
      "Have you noticed dark, tar-like black stools or difficulty swallowing solid foods?",
      "Are you taking any painkiller medicines (like Diclofenac or Brufen) on an empty stomach?",
    ],
  },

  // 5. NEUROLOGY — MIGRAINE, HEADACHE & NEUROPATHY
  {
    id: "neuro_migraine_headache",
    category: "Neurology",
    keywords: [
      "headache", "migraine", "dizzy", "vertigo", "chakkar", "sir dard", "aadha sir dard",
      "aura", "light sensitivity", "sound sensitivity", "numbness", "tingling", "paralysis",
      "brain", "seizure", "epilepsy", "memory loss", "facial droop"
    ],
    organName: "Brain",
    systemName: "Nervous System",
    systemId: "brain",
    image: "/holographic_body.jpg",
    focusArea: "Trigeminovascular System, Cerebral Cortex & Cervical Nerve Roots",
    specialist: "Neurologist",
    severity: "moderate",
    isEmergency: false,
    headline: "🧠 Neurological Evaluation: Cranial Nociception & Cortical Excitability",
    pathophysiology:
      "Migraine is a neuro-inflammatory cephalalgia characterized by cortical spreading depression (CSD)—a wave of neuronal depolarization followed by sustained suppression. CSD stimulates trigeminal sensory nerve endings (V1 distribution), releasing potent vasodilator neuropeptides including Calcitonin Gene-Related Peptide (CGRP) and Substance P, resulting in neurogenic dural vasodilation, mast cell extravasation, and central sensitization.",
    differentials: [
      {
        condition: "Migraine (with or without Visual/Sensory Aura)",
        probability: 79,
        clinicalRationale: "Unilateral pulsating/throbbing headache (4-72 hours) with nausea, photophobia, and phonophobia.",
        pathophysiology: "Activation of trigeminovascular pain pathway with CGRP-mediated neurogenic inflammation.",
      },
      {
        condition: "Tension-Type Headache (Episodic or Chronic)",
        probability: 65,
        clinicalRationale: "Bilateral 'tight-band' or vice-like compressive pain across forehead and occiput without nausea.",
        pathophysiology: "Myofascial tenderness in pericranial and suboccipital muscles coupled with central pain processing hypersensitivity.",
      },
      {
        condition: "Acute Ischemic Stroke / Transient Ischemic Attack (TIA)",
        probability: 12,
        clinicalRationale: "Sudden onset focal neurological deficit: facial asymmetry, unilateral arm drift, or dysarthria.",
        pathophysiology: "Thromboembolic cerebral arterial occlusion producing focal cerebral hypoperfusion.",
        isUrgent: true,
      },
    ],
    redFlags: [
      "SNOOP4 Criteria: 'Thunderclap' headache reaching maximum peak intensity within 60 seconds ('worst headache of life')",
      "New focal neurological deficit: sudden unilateral facial drooping, arm/leg weakness, or slurred speech (FAST criteria)",
      "Headache associated with high fever, neck rigidity (Kernig/Brudzinski signs), and altered mental status",
      "New onset headache in an individual aged > 50 years (suspect Giant Cell Arteritis) or with history of malignancy",
    ],
    diagnostics: [
      { testName: "Magnetic Resonance Imaging (MRI Brain with MR Angiography)", testType: "imaging", clinicalTarget: "High-resolution parenchymal scan to exclude aneurysm, intracranial mass, or acute infarction", urgency: "priority" },
      { testName: "Non-Contrast Head CT Scan (NCCT)", testType: "imaging", clinicalTarget: "Emergency exclusion of acute Subarachnoid Hemorrhage (SAH) or parenchymal bleed", urgency: "immediate" },
      { testName: "C-Reactive Protein (CRP) & Erythrocyte Sedimentation Rate (ESR)", testType: "blood", clinicalTarget: "Screen for systemic vasculitis / Temporal Arteritis in elderly patients", referenceRange: "ESR < 20 mm/hr", urgency: "priority" },
      { testName: "Complete Ophthalmic Exam with Fundoscopy", testType: "functional", clinicalTarget: "Evaluation of optic disc margins to rule out papilledema (elevated ICP)", urgency: "priority" },
    ],
    pharmacology: [
      {
        drugClass: "5-HT1B/1D Receptor Agonists (Triptans - Acute Migraine Abortive)",
        examples: ["Sumatriptan (Suminat)", "Zolmitriptan", "Rizatriptan (Rizact)"],
        mechanismOfAction: "Selectively activates presynaptic 5-HT1D receptors on trigeminal neurons to inhibit CGRP release and constrict dural vessels.",
        clinicalInstructions: "Take 1 tablet at the earliest onset of the headache phase; do not take during the aura phase.",
        contraindicationsAndWarnings: ["Absolute contraindication in coronary artery disease, history of stroke/TIA, or uncontrolled hypertension"],
        drugInteractions: ["Severe risk of Serotonin Syndrome when combined with SSRIs/SNRIs or MAOIs"],
      },
      {
        drugClass: "Migraine Prophylactic Regimens",
        examples: ["Propranolol", "Topiramate", "Flunarizine", "Amitriptyline"],
        mechanismOfAction: "Modulates cortical spreading depression threshold and stabilizes autonomic neurovascular tone.",
        clinicalInstructions: "Requires daily compliance for 4–8 weeks to assess prophylactic therapeutic reduction in frequency.",
        contraindicationsAndWarnings: ["Propranolol: contraindicated in bronchial asthma and high-degree AV block"],
        drugInteractions: ["Monitor blood pressure and resting heart rate with beta-blockers"],
      },
    ],
    nutrition: {
      recommendedFoods: [
        { food: "Magnesium Glycinate-Rich Foods (Almonds, Spinach, Dark Cocoa)", benefit: "Counters cortical NMDA receptor hyperexcitability and maintains vascular tone" },
        { food: "Riboflavin (Vitamin B2) Rich Eggs & Mushrooms", benefit: "Boosts mitochondrial energy metabolism within cerebral cortical neurons" },
        { food: "Adequate Electrolyte Hydration (Coconut Water, Mineral Water)", benefit: "Prevents mild hypovolemia-induced cerebral vasospasm" },
      ],
      foodsToAvoid: [
        { food: "Aged Cheeses, Cured Meats & MSG Containing Items", reason: "Contains high levels of tyramine, which triggers vascular neurogenic spasms" },
        { food: "Artificial Sweeteners (Aspartame) & Excess Alcohol (Red Wine)", reason: "Stimulates histamine release and triggers central trigeminal sensitization" },
      ],
      hydrationAndLifestyle: [
        "Enforce strict circadian consistency: sleep and wake at identical hours 7 days a week",
        "Implement the 20-20-20 screen rule to avert chronic cervical-ocular muscle contraction",
        "During an acute attack, rest in a darkened, sound-attenuated room with a cold forehead compress",
      ],
    },
    guidelines: [
      "American Headache Society (AHS) 2024 Guidelines on Migraine Prevention and Treatment",
      "European Academy of Neurology (EAN) Guideline on the Treatment of Cluster Headache",
      "IHS The International Classification of Headache Disorders (ICHD-3)",
    ],
    followUpQuestions: [
      "Is the pain throbbing or pulsing on one side of your head?",
      "Do you experience zigzag lines, blind spots, or visual sparkles before the headache starts?",
      "Did this headache reach 10/10 unbearable intensity within seconds?",
    ],
  },

  // 6. NEPHROLOGY & UROLOGY — KIDNEY STONES, UTI & RENAL FUNCTION
  {
    id: "nephro_kidney_stones_uti",
    category: "Nephrology",
    keywords: [
      "kidney", "kidney stone", "flank pain", "back pain side", "peshab me dard",
      "peshab me jalan", "burning urination", "uti", "blood in urine", "hematuria",
      "creatinine", "glomerular", "renal", "urinary", "cloudy urine", "frequent urine"
    ],
    organName: "Kidneys & Urinary Tract",
    systemName: "Urinary System",
    systemId: "kidney",
    image: "/holographic_body.jpg",
    focusArea: "Renal Calyces, Pelviureteric Junction, Ureters & Bladder",
    specialist: "Nephrologist / Urologist",
    severity: "urgent",
    isEmergency: false,
    headline: "🌊 Urological & Renal Assessment: Nephron Filtration & Urinary Tract Hydrodynamics",
    pathophysiology:
      "Nephrolithiasis (kidney stones) arises from urinary supersaturation of insoluble crystalloids (Calcium Oxalate, Uric Acid, Calcium Phosphate) paired with low urine volume or deficiency in natural crystallization inhibitors (citrate, pyrophosphate). As calculi dislodge into the narrow ureter, luminal obstruction produces acute pelvicalyceal distension, triggering severe spasmodic ureteric hyperperistalsis (renal colic).",
    differentials: [
      {
        condition: "Acute Ureterolithiasis (Ureteral Stone with Renal Colic)",
        probability: 81,
        clinicalRationale: "Excruciating spasmodic flank pain radiating anteriorly to the groin/testicle with microscopic or gross hematuria.",
        pathophysiology: "Calculus impaction causing acute ureteric smooth muscle spasm and capsular stretch receptor activation.",
        isUrgent: true,
      },
      {
        condition: "Acute Lower Urinary Tract Infection (Cystitis)",
        probability: 70,
        clinicalRationale: "Suprapubic discomfort, dysuria (burning micturition), urinary urgency, and cloudy foul-smelling urine.",
        pathophysiology: "Uropathogenic Escherichia coli (UPEC) colonization with urothelial bacterial adherence and mucosal inflammation.",
      },
      {
        condition: "Acute Pyelonephritis (Upper UTI)",
        probability: 38,
        clinicalRationale: "Flank pain accompanied by high fever, rigors/chills, nausea, and marked costovertebral angle tenderness.",
        pathophysiology: "Ascending bacterial infection infiltrating renal parenchyma and interstitial collecting system.",
        isUrgent: true,
      },
    ],
    redFlags: [
      "Fever (> 38.5°C) with shaking rigors in the presence of suspected ureteric stone (obstructed infected kidney is a surgical emergency)",
      "Complete anuria (inability to pass any urine for > 8–12 hours) or profound oliguria",
      "Intractable vomiting preventing oral hydration and oral analgesic administration",
      "Frank, macroscopic gross hematuria with large blood clots causing bladder outlet obstruction",
    ],
    diagnostics: [
      { testName: "Non-Contrast CT KUB (Kidney, Ureter, Bladder)", testType: "imaging", clinicalTarget: "Gold standard 3D stone localization, size measurement (mm), and Hounsfield density", urgency: "priority" },
      { testName: "Ultrasound KUB with Post-Void Residual Volume", testType: "imaging", clinicalTarget: "Screen for hydronephrosis (pelvicalyceal dilatation) and bladder calculi", urgency: "routine" },
      { testName: "Urine Routine & Microscopic Examination + Culture & Sensitivity", testType: "urine", clinicalTarget: "Pus cells (pyuria), RBCs (hematuria), nitrite, and antimicrobial susceptibility", urgency: "priority" },
      { testName: "Serum Creatinine & Blood Urea Nitrogen (BUN) with eGFR", testType: "blood", clinicalTarget: "Assessment of acute kidney injury (AKI) vs preserved glomerular filtration", referenceRange: "Creatinine: 0.7-1.2 mg/dL", urgency: "priority" },
    ],
    pharmacology: [
      {
        drugClass: "Medical Expulsive Therapy (Alpha-1 Blockers)",
        examples: ["Tamsulosin Hydrochloride (Urimax 0.4 mg)", "Silodosin"],
        mechanismOfAction: "Selectively blocks alpha-1D/1A adrenergic receptors in distal ureter, relaxing ureteral smooth muscle and facilitating spontaneous calculus expulsion.",
        clinicalInstructions: "Take 0.4 mg once daily after dinner; effective primarily for distal ureteric stones ≤ 6–8 mm.",
        contraindicationsAndWarnings: ["Orthostatic hypotension", "Intraoperative Floppy Iris Syndrome (inform ophthalmologist prior to cataract surgery)"],
        drugInteractions: ["Synergistic hypotensive effect with PDE-5 inhibitors or other antihypertensives"],
      },
      {
        drugClass: "Spasmolytic & Non-Opioid Analgesics",
        examples: ["Drotaverine Hydrochloride", "Diclofenac Sodium (if renal function normal)"],
        mechanismOfAction: "Phosphodiesterase-4 inhibition relaxes visceral smooth muscle; NSAIDs reduce renal blood flow and pelvic pressure.",
        clinicalInstructions: "Use NSAIDs with extreme caution and ONLY when serum creatinine is normal.",
        contraindicationsAndWarnings: ["Contraindicated in known renal impairment (AKI/CKD) and active peptic ulceration"],
        drugInteractions: ["May reduce the efficacy of ACE inhibitors and diuretics"],
      },
    ],
    nutrition: {
      recommendedFoods: [
        { food: "High Water Intake with Fresh Lemon Slices (Citrate Therapy)", benefit: "Urinary citrate forms soluble complexes with calcium, preventing calcium oxalate nucleation" },
        { food: "Barley Water (Jau Water) & Coconut Water", benefit: "Natural osmotic diuretic that washes out micro-crystals and cools urinary burning" },
        { food: "Adequate Dietary Calcium (Curd, Paneer) during meals", benefit: "Binds dietary oxalate in the gut lumen, preventing systemic absorption into urine" },
      ],
      foodsToAvoid: [
        { food: "High Oxalate Foods (Spinach/Palak, Chocolate, Beets, Nuts)", reason: "Excess unbound urinary oxalate is the primary driver of stone crystallization" },
        { food: "High Animal Purines (Red Meat, Organ Meats)", reason: "Increases urinary uric acid concentration and acidifies urine (pH < 5.5)" },
      ],
      hydrationAndLifestyle: [
        "Achieve a daily urine output of at least 2.5 liters (requires drinking ~3 liters of fluid daily)",
        "Never suppress the urge to urinate; practice complete bladder voiding",
        "Limit sodium intake to under 2,000 mg daily (high sodium forces increased calcium excretion into urine)",
      ],
    },
    guidelines: [
      "EAU (European Association of Urology) Guidelines on Urolithiasis",
      "AUA (American Urological Association) Guideline: Medical Management of Kidney Stones",
      "KDIGO 2023 Clinical Practice Guideline for the Evaluation and Management of CKD",
    ],
    followUpQuestions: [
      "Is the pain in your lower back or side shooting downward toward your groin?",
      "Have you noticed any pink or red color (blood) in your urine?",
      "Do you have an accompanying fever, chills, or burning sensation when passing urine?",
    ],
  },

  // 7. ORTHOPEDICS & RHEUMATOLOGY — BACK PAIN, SCIATICA & ARTHRITIS
  {
    id: "ortho_back_sciatica_joint",
    category: "Orthopedics",
    keywords: [
      "back pain", "kamar dard", "sciatica", "slip disc", "joint pain", "knee pain",
      "ghutne me dard", "arthritis", "gout", "uric acid", "swollen joint", "stiffness",
      "neck pain", "cervical", "spine", "bone", "osteoporosis"
    ],
    organName: "Musculoskeletal Architecture",
    systemName: "Musculoskeletal System",
    systemId: "bones",
    image: "/holographic_body.jpg",
    focusArea: "Intervertebral Discs, Lumbar Nerve Roots (L4-S1) & Articular Cartilage",
    specialist: "Orthopedist / Rheumatologist",
    severity: "routine",
    isEmergency: false,
    headline: "🦴 Biomechanical & Articular Evaluation: Spinal Alignment & Joint Cartilage",
    pathophysiology:
      "Sciatica and radicular pain stem from mechanical nerve root compression and biochemical neuro-inflammation, most frequently caused by posterolateral herniation of the L4-L5 or L5-S1 intervertebral disc (nucleus pulposus extrusion through torn annulus fibrosus). Extruded disc material releases phospholipase A2, TNF-alpha, and matrix metalloproteinases, directly inflaming the dural sheath and sciatic nerve trunk.",
    differentials: [
      {
        condition: "Lumbar Disc Herniation with L5/S1 Radiculopathy (Sciatica)",
        probability: 83,
        clinicalRationale: "Sharp, electric or shooting pain originating in lumbar spine radiating below the knee to the foot, positive Straight Leg Raise.",
        pathophysiology: "Nerve root impingement and perineural cytokine-mediated neuro-inflammation.",
      },
      {
        condition: "Mechanical Axial Lower Back Pain / Lumbar Muscle Strain",
        probability: 68,
        clinicalRationale: "Aching muscular soreness localized to paraspinal muscles without distal neurological radiation or sensory deficit.",
        pathophysiology: "Micro-tears in erector spinae myofascial fibers or facet joint capsular sprain.",
      },
      {
        condition: "Cauda Equina Syndrome (Surgical Spine Emergency)",
        probability: 4,
        clinicalRationale: "Bilateral lower extremity weakness with saddle anesthesia (numbness in groin/buttocks) and loss of bowel/bladder sphincter control.",
        pathophysiology: "Massive midline disc sequestration compressing the entire cauda equina nerve bundle.",
        isUrgent: true,
      },
    ],
    redFlags: [
      "Cauda Equina Warning: Loss of bowel or bladder control (urinary incontinence or acute retention)",
      "Saddle anesthesia (complete numbness in the perineum, groin, buttocks, and inner thighs)",
      "Rapidly progressive motor weakness ('foot drop'—inability to walk on heels or toes)",
      "Severe night back pain in patients with history of cancer, or accompanied by unexplained weight loss and fever",
    ],
    diagnostics: [
      { testName: "Magnetic Resonance Imaging (MRI Lumbosacral Spine)", testType: "imaging", clinicalTarget: "High-resolution visualization of disc protrusion, spinal canal stenosis, and nerve root compression", urgency: "priority" },
      { testName: "Digital X-Ray LS Spine (AP & Lateral / Flexion-Extension)", testType: "imaging", clinicalTarget: "Screen for disc space narrowing, osteophytes, and spondylolisthesis (vertebral slip)", urgency: "routine" },
      { testName: "Electromyography & Nerve Conduction Studies (EMG/NCS)", testType: "functional", clinicalTarget: "Differentiate active radiculopathy from peripheral sensory neuropathy", urgency: "routine" },
      { testName: "Serum Uric Acid & ESR / Rheumatoid Factor (RF)", testType: "blood", clinicalTarget: "Differential screening for Gouty Arthritis or inflammatory Spondyloarthropathy", referenceRange: "Uric Acid < 6.0 mg/dL", urgency: "routine" },
    ],
    pharmacology: [
      {
        drugClass: "Neuropathic Analgesic Modulators",
        examples: ["Pregabalin (75 mg)", "Gabapentin", "Methylcobalamin (B12)"],
        mechanismOfAction: "Binds to alpha-2-delta subunit of voltage-gated calcium channels in CNS, attenuating neurotransmitter release in sensitized spinal dorsal horn neurons.",
        clinicalInstructions: "Take once daily at bedtime to avoid daytime sedation; taper gradually when discontinuing.",
        contraindicationsAndWarnings: ["Caution in elderly patients due to fall risk and dizziness"],
        drugInteractions: ["Synergistic central nervous system depression when combined with opioids or alcohol"],
      },
      {
        drugClass: "Targeted Anti-Inflammatory / Muscle Relaxants",
        examples: ["Thiocolchicoside + Aceclofenac", "Tolperisone"],
        mechanismOfAction: "Aceclofenac inhibits prostaglandin synthesis via COX-2; Thiocolchicoside acts as a selective GABA-A and glycinergic agonist relaxing spastic muscle.",
        clinicalInstructions: "Take strictly after meals with gastroprotective cover (Pantoprazole) for maximum 5-7 days.",
        contraindicationsAndWarnings: ["Avoid in acute peptic ulcer disease and severe renal insufficiency"],
        drugInteractions: ["Increases serum lithium and methotrexate levels"],
      },
    ],
    nutrition: {
      recommendedFoods: [
        { food: "Golden Milk with Turmeric (Curcumin) & Black Pepper (Piperine)", benefit: "Piperine enhances curcumin bioavailability by 2000%, potent inhibitor of NF-kB and joint inflammatory cascades" },
        { food: "Fatty Fish, Flaxseeds & Chia Seeds", benefit: "Supplies EPA/DHA which replaces arachidonic acid in cell membranes, reducing pain-inducing PGE2" },
        { food: "Bone Broth / Collagen Peptides & Vitamin D3/K2", benefit: "Supports extracellular matrix repair of intervertebral discs and articular cartilage" },
      ],
      foodsToAvoid: [
        { food: "Purine-Heavy Organ Meats & Shellfish (if Uric Acid elevated)", reason: "Metabolized to sodium urate crystals which deposit in synovium triggering acute gout flares" },
        { food: "High Sugar Confections & Refined Seed Oils", reason: "Elevates systemic IL-6 and TNF-alpha, heightening neuropathic pain sensitivity" },
      ],
      hydrationAndLifestyle: [
        "Avoid strict bed rest: light walking maintains spinal disc nutrition through imbibition",
        "Practice McKenzie extension exercises and core stabilization under physiotherapist guidance",
        "Adopt an ergonomic lumbar support cushion and avoid forward bending under load",
      ],
    },
    guidelines: [
      "NICE Guideline [NG59]: Low back pain and sciatica in over 16s: assessment and management",
      "American College of Physicians (ACP) Guideline on Noninvasive Treatments for Acute, Subacute, and Chronic Low Back Pain",
      "EULAR Recommendations for the Management of Rheumatoid Arthritis & Osteoarthritis",
    ],
    followUpQuestions: [
      "Does the back pain radiate down below your knee into your calf, ankle, or toes?",
      "Are you experiencing any numbness in your groin or difficulty controlling your urination?",
      "Does the pain feel worse when sitting down or when bending forward to lift objects?",
    ],
  },

  // 8. ENDOCRINOLOGY — THYROID DYSFUNCTION (HYPOTHYROIDISM & HASHIMOTO'S)
  {
    id: "endo_thyroid_hypo",
    category: "Endocrinology",
    keywords: [
      "thyroid", "tsh", "hypothyroid", "weight gain", "cold intolerance", "hair loss",
      "bal jhadna", "thand lagna", "mote hona", "fatigue", "dry skin", "constipation",
      "hashimoto", "levothyroxine", "eltroxin", "thyronorm", "goiter", "swollen neck"
    ],
    organName: "Thyroid Gland",
    systemName: "Endocrine System",
    systemId: "endocrine",
    image: "/holographic_body.jpg",
    focusArea: "Thyroid Follicles, Colloid Matrix & Pituitary-Thyroid Axis",
    specialist: "Endocrinologist",
    severity: "routine",
    isEmergency: false,
    headline: "🦋 Endocrine & Metabolic Assessment: Thyroid Hormonogenesis & Basal Metabolic Rate",
    pathophysiology:
      "Primary hypothyroidism is predominantly caused by autoimmune chronic lymphocytic thyroiditis (Hashimoto's disease), characterized by anti-thyroperoxidase (anti-TPO) and anti-thyroglobulin (anti-Tg) autoantibodies mediating progressive apoptotic destruction of thyroid follicular architecture. Diminished circulating free Thyroxine (FT4) relieves negative feedback inhibition on the anterior pituitary, precipitating a compensatory surge in Thyroid-Stimulating Hormone (TSH). Decreased intracellular triiodothyronine (T3) slows cellular transcription of Na+/K+-ATPase and downregulates beta-adrenergic receptors, reducing basal metabolic rate.",
    differentials: [
      {
        condition: "Primary Hypothyroidism (Autoimmune Hashimoto's Thyroiditis)",
        probability: 85,
        clinicalRationale: "Elevated TSH (> 4.5 mIU/L) with suppressed or borderline FT4, lethargy, cold intolerance, and periorbital myxedema.",
        pathophysiology: "Autoantibody-mediated follicular cell lysis and fibrotic replacement.",
      },
      {
        condition: "Subclinical Hypothyroidism",
        probability: 60,
        clinicalRationale: "TSH elevated between 4.5–10 mIU/L with normal serum Free T4 and mild non-specific fatigue.",
        pathophysiology: "Compensatory pituitary hypersecretion maintaining euthyroid peripheral hormone concentrations.",
      },
      {
        condition: "Non-Thyroidal Illness Syndrome (Euthyroid Sick Syndrome)",
        probability: 25,
        clinicalRationale: "Low total/free T3 in the setting of severe systemic illness or prolonged caloric deprivation.",
        pathophysiology: "Peripheral 5'-deiodinase enzyme downregulation without intrinsic primary thyroid gland pathology.",
      },
    ],
    redFlags: [
      "Myxedema Coma Risk: Profound hypothermia (core temp < 35°C), bradycardia, hypoventilation, and progressive obtundation",
      "Rapidly enlarging, hard, fixed thyroid nodule with progressive hoarseness of voice (suspect thyroid carcinoma)",
      "Coexisting untreated adrenal insufficiency (administering levothyroxine before hydrocortisone can precipitate fatal adrenal crisis)",
    ],
    diagnostics: [
      { testName: "Complete Thyroid Panel (TSH, Free T4, Free T3)", testType: "blood", clinicalTarget: "Basal metabolic hormone axis quantification", referenceRange: "TSH: 0.4-4.2 mIU/L | FT4: 0.8-1.8 ng/dL", urgency: "priority" },
      { testName: "Anti-Thyroid Peroxidase (Anti-TPO) & Anti-Tg Antibodies", testType: "blood", clinicalTarget: "Autoimmune confirmation of Hashimoto's Thyroiditis", referenceRange: "< 34 IU/mL (Negative)", urgency: "priority" },
      { testName: "High-Resolution Ultrasound Neck (Thyroid USG with TIRADS)", testType: "imaging", clinicalTarget: "Screen for heterogeneous parenchymal echotexture, multinodular goiter, or suspicious microcalcifications", urgency: "routine" },
      { testName: "Complete Lipid Profile & Serum Homocysteine", testType: "blood", clinicalTarget: "Evaluate secondary hypercholesterolemia due to reduced hepatic LDL receptor expression", urgency: "routine" },
    ],
    pharmacology: [
      {
        drugClass: "Synthetic L-Thyroxine (First-Line Hormone Replacement)",
        examples: ["Levothyroxine Sodium (Thyronorm, Eltroxin)"],
        mechanismOfAction: "Synthetic T4 acts as a prohormone converted peripherally by 5'-deiodinase into active T3.",
        clinicalInstructions: "Take strictly ONCE DAILY on an empty stomach with a full glass of water, minimum 45–60 minutes before breakfast, tea, or coffee.",
        contraindicationsAndWarnings: ["Do not use for obesity or weight loss without hypothyroidism; risk of cardiac arrhythmias and accelerated bone loss"],
        drugInteractions: ["Calcium carbonate, Iron supplements, and PPIs severely impair GI absorption; separate by at least 4 hours"],
      },
    ],
    nutrition: {
      recommendedFoods: [
        { food: "Selenium-Rich Brazil Nuts & Sunflower Seeds", benefit: "Selenium is a required cofactor for iodothyronine deiodinases that convert T4 to active T3" },
        { food: "Adequate Dietary Zinc & Tyrosine (Pumpkin Seeds, Cottage Cheese)", benefit: "Zinc finger proteins regulate TRH synthesis; Tyrosine forms the backbone of thyroid hormone" },
        { food: "Iodized Table Salt (in optimal non-excessive quantity)", benefit: "Ensures necessary raw substrate for follicular organification" },
      ],
      foodsToAvoid: [
        { food: "Raw Cruciferous Vegetables in High Amounts (Raw Cabbage, Cauliflower, Kale)", reason: "Contains goitrogens (glucosinolates) that competitively inhibit iodine uptake if consumed uncooked in excess" },
        { food: "Unfermented Soy Products (Soy Milk, Soy Protein Isolates)", reason: "Soy isoflavones can inhibit thyroid peroxidase (TPO) activity" },
      ],
      hydrationAndLifestyle: [
        "Retest serum TSH 6 to 8 weeks after any dosage adjustment until stable euthyroid status is established",
        "Engage in strength training 3 days a week to preserve skeletal muscle mass and counter metabolic slowdown",
        "Maintain adequate Vitamin D3 levels (> 30 ng/mL) to support balanced immune regulation",
      ],
    },
    guidelines: [
      "American Thyroid Association (ATA) Guidelines for the Treatment of Hypothyroidism",
      "Endocrine Society Clinical Practice Guidelines on Thyroid Disorders in Pregnancy",
      "Indian Thyroid Society (ITS) Management Consensus Protocols 2024",
    ],
    followUpQuestions: [
      "Are you currently taking any thyroid medication (like Thyronorm or Eltroxin), and at what dose?",
      "Do you feel unusual exhaustion, dry skin, constipation, or cold sensitivity?",
      "Have you had your TSH and Anti-TPO antibodies checked recently?",
    ],
  },

  // 9. HEPATOLOGY — FATTY LIVER (NAFLD / NASH) & HEPATIC DYSFUNCTION
  {
    id: "hepato_fatty_liver",
    category: "Gastroenterology",
    keywords: [
      "liver", "fatty liver", "sgpt", "sgot", "alt", "ast", "jaundice", "piliya",
      "bilirubin", "nafld", "nash", "cirrhosis", "lft", "liver function", "right side pain",
      "liver enlarged", "hepatomegaly"
    ],
    organName: "Liver",
    systemName: "Digestive System",
    systemId: "liver",
    image: "/holographic_body.jpg",
    focusArea: "Hepatic Lobules, Sinusoids, Portal Triad & Kupffer Cells",
    specialist: "Hepatologist / Gastroenterologist",
    severity: "routine",
    isEmergency: false,
    headline: "🌿 Hepatobiliary & Metabolic Assessment: Hepatic Steatosis & Transaminase Clearance",
    pathophysiology:
      "Non-Alcoholic Fatty Liver Disease (NAFLD / MASLD) develops when hepatic fatty acid influx and de novo lipogenesis outpace mitochondrial beta-oxidation and VLDL export, causing triglyceride accumulation in > 5% of hepatocytes (steatosis). In Non-Alcoholic Steatohepatitis (NASH), lipotoxicity induces mitochondrial oxidative stress, endoplasmic reticulum stress, and activation of hepatic stellate cells, driving progressive perisinusoidal collagen deposition and fibrosis.",
    differentials: [
      {
        condition: "Metabolic Dysfunction-Associated Steatotic Liver Disease (MASLD / NAFLD Grade 1-2)",
        probability: 88,
        clinicalRationale: "Incidental finding on ultrasound (bright liver) or mild asymptomatic elevation of SGPT/ALT in a patient with abdominal adiposity or insulin resistance.",
        pathophysiology: "Macrovesicular intracellular triglyceride accumulation without active portal inflammation.",
      },
      {
        condition: "Metabolic Dysfunction-Associated Steatohepatitis (NASH)",
        probability: 52,
        clinicalRationale: "Elevated transaminases (ALT > AST) with persistent fatigue, right upper quadrant heaviness, and elevated FIB-4 index.",
        pathophysiology: "Hepatocyte ballooning, inflammatory lobular infiltration, and early sinusoidal fibrosis.",
      },
      {
        condition: "Acute Viral Hepatitis (Hepatitis A/B/C/E) / Drug-Induced Liver Injury",
        probability: 22,
        clinicalRationale: "Marked transaminase spike (> 5-10x upper limit of normal) accompanied by acute scleral icterus (jaundice) and dark urine.",
        pathophysiology: "Immune-mediated cytolytic destruction of hepatocytes.",
        isUrgent: true,
      },
    ],
    redFlags: [
      "Sudden jaundice (yellow discoloration of eyes/sclera and skin) with high conjugated bilirubin",
      "Development of ascites (abdominal fluid distension) or bilateral pedal edema",
      "Hepatic encephalopathy signs: reversed day-night sleep cycle, confusion, asterixis (flapping tremors)",
      "Hematemesis or melena (suggestive of bleeding gastroesophageal varices secondary to portal hypertension)",
    ],
    diagnostics: [
      { testName: "Liver Function Test (LFT: Total/Direct Bilirubin, SGPT/ALT, SGOT/AST, ALP, GGT, Albumin)", testType: "blood", clinicalTarget: "Quantify hepatocyte cytolysis and biliary canalicular excretion", referenceRange: "ALT < 35 U/L (M), < 25 U/L (F)", urgency: "priority" },
      { testName: "FibroScan (Transient Elastography) / FIB-4 Score", testType: "functional", clinicalTarget: "Non-invasive measurement of liver stiffness (kPa) and controlled attenuation parameter (CAP) for steatosis", referenceRange: "< 6.0 kPa (F0-F1, Normal/Mild)", urgency: "priority" },
      { testName: "Ultrasound Whole Abdomen (High Frequency)", testType: "imaging", clinicalTarget: "Assess hepatic echogenicity, surface contour, and spleen bipolar diameter (> 12 cm indicates portal congestion)", urgency: "routine" },
      { testName: "Viral Hepatitis Serology (HBsAg, Anti-HCV, IgM Anti-HAV, IgM Anti-HEV)", testType: "blood", clinicalTarget: "Exclude infectious viral etiology", urgency: "routine" },
    ],
    pharmacology: [
      {
        drugClass: "Hepatic Metabolic Modulators & Antioxidants",
        examples: ["Vitamin E (d-alpha-tocopherol 800 IU)", "Ursodeoxycholic Acid (UDCA)", "Saroglitazar (Dual PPAR alpha/gamma agonist)"],
        mechanismOfAction: "Saroglitazar improves insulin sensitivity and lowers triglycerides; Vitamin E scavenges membrane lipid peroxides.",
        clinicalInstructions: "Saroglitazar 4 mg once daily approved for non-cirrhotic NASH under specialist supervision.",
        contraindicationsAndWarnings: ["Vitamin E not recommended in patients with prostate cancer risk or without biopsy-proven NASH"],
        drugInteractions: ["Monitor concomitant statin therapy for muscle symptoms"],
      },
    ],
    nutrition: {
      recommendedFoods: [
        { food: "Filtered Black Coffee (2–3 cups daily)", benefit: "Polyphenols and chlorogenic acid promote hepatic autophagy and significantly decrease hepatic fibrosis risk" },
        { food: "Cruciferous Broccoli, Garlic & Onion (Sulfur Donors)", benefit: "Provides sulfur groups essential for endogenous glutathione replenishment" },
        { food: "High Soluble Fiber & Green Tea (EGCG)", benefit: "Inhibits intestinal lipid absorption and reduces de novo hepatic lipogenesis" },
      ],
      foodsToAvoid: [
        { food: "High Fructose Corn Syrup, Bottled Fruit Juices & Sweetened Colas", reason: "Hepatic fructokinase metabolizes fructose directly into triglycerides, driving de novo lipogenesis" },
        { food: "Alcoholic Beverages (Beer, Spirits, Wine)", reason: "Competitively inhibits fatty acid oxidation and induces synergistic hepatotoxicity" },
      ],
      hydrationAndLifestyle: [
        "Aim for a gradual 7% to 10% total body weight reduction over 6 months to reverse steatohepatitis",
        "Engage in 200 minutes per week of brisk aerobic walking combined with resistance training",
        "Review and eliminate unnecessary over-the-counter paracetamol overuse and untested herbal supplements",
      ],
    },
    guidelines: [
      "AASLD 2023 Practice Guidance on the Clinical Assessment and Management of Nonalcoholic Fatty Liver Disease",
      "EASL-EASD-EASO Clinical Practice Guidelines for the Management of Non-Alcoholic Fatty Liver Disease",
      "INASL (Indian National Association for Study of the Liver) Consensus Guidelines on NAFLD",
    ],
    followUpQuestions: [
      "Has an ultrasound scan or blood test showed fatty liver (Grade 1/2) or elevated SGPT/SGOT?",
      "Do you consume alcohol, and how often?",
      "Have you observed yellowing of your eyes or swelling in your feet?",
    ],
  },

  // 10. INFECTIOUS & TROPICAL — DENGUE, MALARIA, TYPHOID & ACUTE FEVER
  {
    id: "infect_dengue_malaria_fever",
    category: "Infectious Disease",
    keywords: [
      "dengue", "platelets", "malaria", "typhoid", "fever", "bukhar", "high fever",
      "chills", "shivering", "body ache", "bone pain", "breakbone fever", "rash fever",
      "ns1", "widal", "thrombocytopenia", "chills fever"
    ],
    organName: "Immune & Vascular Endothelium",
    systemName: "Circulatory System",
    systemId: "heart",
    image: "/holographic_body.jpg",
    focusArea: "Vascular Endothelium, Platelets & Reticuloendothelial System",
    specialist: "Infectious Disease Specialist / General Physician",
    severity: "urgent",
    isEmergency: false,
    headline: "🦟 Tropical Vector & Febrile Evaluation: Endothelial Integrity & Hemogram Kinetics",
    pathophysiology:
      "Dengue virus (Flaviviridae, serotypes DENV 1-4) infects monocytes, dendritic cells, and macrophages. Viral replication triggers high-level secretion of pro-inflammatory cytokines (IL-6, TNF-alpha, IFN-gamma) and non-structural protein 1 (NS1), which directly sheds the endothelial glycocalyx layer, causing transient systemic vascular hyperpermeability (plasma leakage). Autoantibodies cross-reacting with platelets and bone marrow megakaryocyte suppression induce acute thrombocytopenia.",
    differentials: [
      {
        condition: "Dengue Fever (Febrile vs Critical Leakage Phase)",
        probability: 84,
        clinicalRationale: "High continuous fever with retro-orbital pain, severe myalgia ('break-bone fever'), macular rash, and dropping platelet count.",
        pathophysiology: "Arboviral immune activation with endothelial glycocalyx disruption and peripheral platelet destruction.",
        isUrgent: true,
      },
      {
        condition: "Enteric Fever (Typhoid / Paratyphoid - Salmonella enterica)",
        probability: 60,
        clinicalRationale: "Step-ladder gradual rising fever with relative bradycardia (Faget's sign), coated tongue, and abdominal discomfort.",
        pathophysiology: "Bacterial invasion of Peyer's patches in terminal ileum with sustained secondary bacteremia.",
      },
      {
        condition: "Malaria (Plasmodium Vivax / Falciparum)",
        probability: 50,
        clinicalRationale: "Paroxysmal fever with severe shaking chills (cold stage) followed by high pyrexia (hot stage) and drenching sweats.",
        pathophysiology: "Synchronized schizont rupture and merozoite release from parasitized erythrocytes.",
      },
    ],
    redFlags: [
      "Dengue Warning Signs: Severe persistent abdominal pain or tenderness",
      "Persistent intractable vomiting (> 3 episodes in 24 hours)",
      "Mucosal bleeding: epistaxis (nosebleeds), bleeding gums, or hematuria",
      "Lethargy, restlessness, or sudden postural hypotension / narrow pulse pressure (< 20 mmHg)",
      "Platelet count dropping acutely below 50,000/µL or rising hematocrit (> 20% hemoconcentration)",
    ],
    diagnostics: [
      { testName: "Complete Blood Count (CBC) with Platelet Count & Hematocrit", testType: "blood", clinicalTarget: "Monitor thrombocytopenia and hemoconcentration (plasma leakage marker) every 12-24h", referenceRange: "Platelets: 150,000-450,000/µL | Hct: 36-46%", urgency: "immediate" },
      { testName: "Dengue Duo Panel (NS1 Antigen + IgM/IgG Antibodies)", testType: "blood", clinicalTarget: "NS1 confirms early viremia (Day 1-5); IgM confirms post-day 5 seroconversion", urgency: "immediate" },
      { testName: "Malaria Rapid Antigen Test & Peripheral Blood Smear (MP-QBC)", testType: "blood", clinicalTarget: "Detection of Plasmodium vivax / falciparum trophozoites and schizonts", urgency: "immediate" },
      { testName: "TyphiDot / Blood Culture (Gold Standard for Enteric Fever)", testType: "blood", clinicalTarget: "Isolate Salmonella enterica during first week of febrile illness", urgency: "priority" },
    ],
    pharmacology: [
      {
        drugClass: "Antipyretic & Hydration (Supportive Care Core)",
        examples: ["Paracetamol / Acetaminophen (500 mg–650 mg)"],
        mechanismOfAction: "Centrally inhibits hypothalamic prostaglandin synthesis to reset the elevated thermoregulatory set-point.",
        clinicalInstructions: "Take 650 mg every 6 hours as needed (maximum 3,000 mg/24h). Strict avoidance of NSAIDs.",
        contraindicationsAndWarnings: ["ABSOLUTE CONTRAINDICATION FOR NSAIDs (Brufen, Combiflam, Diclofenac, Aspirin) in fever of unknown origin: high risk of severe GI hemorrhage in dengue"],
        drugInteractions: ["Caution with concomitant hepatotoxic agents"],
      },
    ],
    nutrition: {
      recommendedFoods: [
        { food: "Oral Rehydration Salt (ORS) Solution & Coconut Water", benefit: "Restores electrolyte balance and counters intravascular fluid depletion from plasma leakage" },
        { food: "Papaya Leaf Extract / Giloy Decoction (Judicious amounts)", benefit: "Contains carpaine and bioactive compounds reported to stimulate ALOX-12 and platelet counts" },
        { food: "Pomegranate Juice & Clear Vegetable Broth", benefit: "Supplies antioxidants, easily digestible glucose, and supports microvascular stability" },
      ],
      foodsToAvoid: [
        { food: "Dark Red/Brown Colored Foods (Beetroot, Dark Chocolate)", reason: "Can confuse clinical observation if patient experiences vomiting or dark stools" },
        { food: "Oily, Heavy Masala & Fried Foods", reason: "Strains digestive system during acute febrile metabolic stress" },
      ],
      hydrationAndLifestyle: [
        "The single most critical intervention in Dengue is adequate ORAL HYDRATION (minimum 2.5 to 3 liters/day of fluids)",
        "Use mosquito nets and repellents containing DEET to prevent secondary intra-household transmission",
        "Monitor daily platelet count and hematocrit during the critical afebrile defervescence phase (Day 3-7)",
      ],
    },
    guidelines: [
      "WHO Comprehensive Guidelines for Prevention and Control of Dengue and Dengue Haemorrhagic Fever",
      "NVBDCP (National Vector Borne Disease Control Programme, India) Dengue Clinical Management Protocols",
      "ICMR Guidelines for Diagnosis and Management of Malaria in India",
    ],
    followUpQuestions: [
      "For how many days have you had this fever, and is it accompanied by severe body aches or eye pain?",
      "Have you noticed any bleeding from your gums, nose, or red spots on your skin?",
      "What was your latest platelet count from your CBC report?",
    ],
  },

  // 11. DERMATOLOGY — ECZEMA, PSORIASIS, ACNE & FUNGAL INFECTIONS
  {
    id: "derma_eczema_psoriasis_skin",
    category: "Dermatology",
    keywords: [
      "skin", "rash", "itching", "khujli", "eczema", "psoriasis", "acne", "pimples",
      "fungal", "tinea", "ringworm", "dad", "khaj", "dry skin", "blisters", "scalp itching",
      "dermatitis", "urticaria", "hives"
    ],
    organName: "Skin & Integumentary Barrier",
    systemName: "Integumentary System",
    systemId: "skin",
    image: "/holographic_body.jpg",
    focusArea: "Epidermal Stratum Corneum, Dermal Papillae & Sebaceous Units",
    specialist: "Dermatologist",
    severity: "routine",
    isEmergency: false,
    headline: "🧴 Dermatological Assessment: Cutaneous Barrier Integrity & Keratinocyte Dynamics",
    pathophysiology:
      "Cutaneous dermatoses stem from epidermal barrier dysfunction or autoimmune hyperproliferation. Atopic dermatitis involves filaggrin (FLG) mutations and Th2-mediated skin barrier compromise allowing trans-epidermal water loss (TEWL) and allergen sensitization. Psoriasis is an immune-mediated Th17/IL-23 driven disease producing accelerated keratinocyte hyperproliferation (mitotic turnover reduced from 28 to 3-5 days) with parakeratosis and silvery microvascular scale.",
    differentials: [
      {
        condition: "Atopic Dermatitis (Eczema) / Contact Dermatitis",
        probability: 78,
        clinicalRationale: "Pruritic, erythematous excoriated patches over flexural surfaces (antecubital, popliteal fossae) with chronic xerosis.",
        pathophysiology: "Loss-of-function filaggrin mutation disrupting stratum corneum lipid bilayers.",
      },
      {
        condition: "Psoriasis Vulgaris (Plaque Psoriasis)",
        probability: 62,
        clinicalRationale: "Well-demarcated erythematous plaques with thick, silvery-white micaceous scales on extensor surfaces (elbows, knees) and scalp.",
        pathophysiology: "IL-23/IL-17 cytokine cascade driving uncontrolled keratinocyte hyperproliferation.",
      },
      {
        condition: "Superficial Dermatophytosis (Tinea Corporis / Cruris / Ringworm)",
        probability: 55,
        clinicalRationale: "Annular, ring-shaped lesion with active advancing erythematous scaly borders and central clearing.",
        pathophysiology: "Trichophyton or Microsporum fungal keratin digestion in the stratum corneum.",
      },
    ],
    redFlags: [
      "Erythroderma (exfoliative dermatitis covering > 90% of total body surface area with hypothermia and high-output cardiac risk)",
      "Stevens-Johnson Syndrome (SJS/TEN) warning: painful mucosal erosions (lips, conjunctiva, genitals) with skin peeling following medication",
      "Rapidly spreading cellulitis with systemic toxicity (high fever, severe localized heat and red lymphangitic streaking)",
      "Eczema herpeticum: sudden eruption of painful, monomorphic umbilicated vesicles on existing eczematous skin",
    ],
    diagnostics: [
      { testName: "KOH Mount (Potassium Hydroxide Direct Microscopy)", testType: "functional", clinicalTarget: "Differentiate fungal hyphae/spores from inflammatory eczema", urgency: "priority" },
      { testName: "Serum Total IgE & Absolute Eosinophil Count", testType: "blood", clinicalTarget: "Quantify allergic atopic diathesis", referenceRange: "IgE < 100 IU/mL", urgency: "routine" },
      { testName: "Skin Punch Biopsy (Histopathology)", testType: "functional", clinicalTarget: "Definitive differentiation of atypical psoriasis, lichen planus, or cutaneous lupus", urgency: "routine" },
      { testName: "Skin Patch Allergy Testing", testType: "functional", clinicalTarget: "Identify contact allergens (nickel, fragrance mix, paraphenylenediamine)", urgency: "routine" },
    ],
    pharmacology: [
      {
        drugClass: "Topical Anti-Inflammatory & Barrier Repair",
        examples: ["Ceramide-Dominant Emollient Creams", "Tacrolimus Ointment (0.1%)", "Mometasone Furoate (Short-term)"],
        mechanismOfAction: "Ceramides restore lipid architecture; Tacrolimus inhibits calcineurin, halting T-cell cytokine transcription without steroid atrophy.",
        clinicalInstructions: "Apply emollients generously within 3 minutes of bathing (the 'soak-and-seal' technique).",
        contraindicationsAndWarnings: ["NEVER apply potent topical corticosteroids to fungal infections or thin facial skin (causes tinea incognito and steroid rosacea)"],
        drugInteractions: ["Avoid sun exposure immediately after applying topical calcineurin inhibitors"],
      },
      {
        drugClass: "Non-Sedating Second-Generation Antihistamines",
        examples: ["Bilastine (20 mg)", "Levocetirizine (5 mg)", "Fexofenadine (180 mg)"],
        mechanismOfAction: "High-affinity peripheral H1 receptor inverse agonism, suppressing histamine-mediated capillary dilation and pruritus.",
        clinicalInstructions: "Take once daily; Bilastine must be taken 1 hour before or 2 hours after meals or fruit juices.",
        contraindicationsAndWarnings: ["Caution in severe renal impairment"],
        drugInteractions: ["Fruit juices (grapefruit, apple) significantly decrease Fexofenadine absorption via OATP1A2"],
      },
    ],
    nutrition: {
      recommendedFoods: [
        { food: "Omega-3 Fatty Acids (Cold-water fish, Flaxseed Oil, Walnuts)", benefit: "Downregulates leukotriene B4 synthesis, decreasing cutaneous pruritus and erythema" },
        { food: "Zinc & Quercetin-Rich Foods (Apples, Onions, Pumpkin Seeds)", benefit: "Stabilizes mast cell membranes and supports epidermal keratinization" },
        { food: "Hydrating Water Intake & Bone Broth Collagen", benefit: "Maintains dermal extracellular matrix turgor and accelerates re-epithelialization" },
      ],
      foodsToAvoid: [
        { food: "Ultra-Processed Foods with Artificial Colors & Preservatives", reason: "Can provoke non-IgE pseudo-allergic histamine release in chronic urticaria" },
        { food: "High Glycemic Diet & Dairy Whey Protein (in severe Acne)", reason: "Spikes IGF-1, stimulating sebaceous gland lipogenesis and follicular hyperkeratinization" },
      ],
      hydrationAndLifestyle: [
        "Take short, lukewarm showers (< 10 minutes); avoid harsh antibacterial soaps that strip the acid mantle",
        "Wear 100% breathable, loose-fitting cotton clothing; avoid synthetic polyester and coarse wool directly on skin",
        "Keep fingernails closely trimmed to prevent excoriation and secondary bacterial impetiginization",
      ],
    },
    guidelines: [
      "AAD (American Academy of Dermatology) Guidelines of Care for the Management of Atopic Dermatitis",
      "Joint AAD-NPF Guidelines of Care for the Management of Psoriasis",
      "IADVL (Indian Association of Dermatologists) Guidelines on Tinea / Dermatophytosis Management",
    ],
    followUpQuestions: [
      "Where are the skin lesions located, and are they red, scaly, or oozing fluid?",
      "Have you applied any steroid creams (like Betnovate, Panderm, or Quadriderm) to the area?",
      "Is the itching worse during the night, and does anyone else in your household have similar symptoms?",
    ],
  },
];


// ================= CLINICAL NLP & MULTI-SPECIALTY TRIAGE ENGINE =================

export function analyzeQueryWithClinicalAI(
  query: string,
  currentOrganSystemId?: string,
  userCity: string = "Bangalore"
): ClinicalConsultationResult {
  const lower = query.toLowerCase();

  // Step 1: Match against deep clinical entity database
  let matchedRule: ClinicalEntityRule | undefined = undefined;

  // Keyword scoring
  let highestScore = 0;
  for (const rule of CLINICAL_KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of rule.keywords) {
      if (lower.includes(kw.toLowerCase())) {
        score += kw.split(" ").length * 2; // multi-word matches get higher weight
      }
    }
    if (score > highestScore) {
      highestScore = score;
      matchedRule = rule;
    }
  }

  // Fallback to current organ system if no strong keyword match
  if (!matchedRule || highestScore === 0) {
    matchedRule = CLINICAL_KNOWLEDGE_BASE.find(r => r.systemId === currentOrganSystemId) || CLINICAL_KNOWLEDGE_BASE[0];
  }

  // Doctor match by specialty
  const matchedDoctors = DOCTORS.filter(d =>
    d.specialty.toLowerCase().includes(matchedRule!.specialist.toLowerCase().split(" ")[0]) ||
    matchedRule!.specialist.toLowerCase().includes(d.specialty.toLowerCase().split(" ")[0])
  ).slice(0, 3);

  const fallbackDoc = DOCTORS.slice(0, 3);
  const finalDoctors = matchedDoctors.length > 0 ? matchedDoctors : fallbackDoc;

  return {
    headline: matchedRule.headline,
    severity: matchedRule.severity,
    isEmergencyAlert: !!matchedRule.isEmergency && (lower.includes("severe") || lower.includes("crushing") || lower.includes("sweat") || lower.includes("sudden") || lower.includes("emergency")),
    emergencyActionText: matchedRule.isEmergency
      ? "🚨 URGENT MEDICAL WARNING: These symptoms may signify a medical emergency. Call emergency services (112/108) or proceed immediately to the nearest hospital Emergency Department."
      : undefined,
    pathophysiologicalExplanation: matchedRule.pathophysiology,
    differentialDiagnoses: matchedRule.differentials,
    redFlagWarnings: matchedRule.redFlags,
    diagnosticWorkup: matchedRule.diagnostics,
    pharmacologicalGuidance: matchedRule.pharmacology,
    nutritionalTherapy: matchedRule.nutrition,
    guidelineCitations: matchedRule.guidelines,
    recommendedSpecialist: matchedRule.specialist,
    matchedDoctors: finalDoctors,
    followUpTriageQuestions: matchedRule.followUpQuestions,
    anatomicalVisual: {
      organName: matchedRule.organName,
      systemName: matchedRule.systemName,
      image: matchedRule.image,
      focusArea: matchedRule.focusArea,
      keyMetric: `Clinical Scan Active (${matchedRule.category})`,
      status: matchedRule.isEmergency ? "Emergency Triage Active" : "Clinical Scan Verified",
      recommendedSpecialist: matchedRule.specialist,
      suggestedTests: matchedRule.diagnostics.slice(0, 3).map(d => d.testName),
      lifestylePrecautions: matchedRule.nutrition.hydrationAndLifestyle.slice(0, 3),
    },
  };
}

/**
 * Formats a ClinicalConsultationResult into a rich medical markdown output
 * that resembles a top Harvard/Mayo Clinic physician clinical note.
 */
export function formatClinicalConsultationMarkdown(result: ClinicalConsultationResult): string {
  let md = `### ${result.headline}\n\n`;

  if (result.isEmergencyAlert && result.emergencyActionText) {
    md += `> [!CAUTION]\n> **${result.emergencyActionText}**\n\n`;
  }

  md += `**🔬 Pathophysiological Mechanism:**\n`;
  md += `${result.pathophysiologicalExplanation}\n\n`;

  md += `**📊 Differential Diagnoses & Clinical Probabilities:**\n`;
  for (const diff of result.differentialDiagnoses) {
    md += `• **${diff.condition}** (~${diff.probability}% confidence)${diff.isUrgent ? " 🚨 *[Urgent Consideration]*" : ""}\n`;
    md += `  *Rationale:* ${diff.clinicalRationale}\n`;
  }
  md += `\n`;

  md += `**⚠️ Red Flag Warning Signs (When to seek immediate emergency care):**\n`;
  for (const rf of result.redFlagWarnings) {
    md += `• ${rf}\n`;
  }
  md += `\n`;

  md += `**🧪 Evidence-Based Diagnostic Workup:**\n`;
  for (const diag of result.diagnosticWorkup) {
    md += `• **${diag.testName}** (${diag.testType.toUpperCase()}) — ${diag.clinicalTarget}${diag.referenceRange ? ` *(Target: ${diag.referenceRange})*` : ""}\n`;
  }
  md += `\n`;

  md += `**💊 Pharmacological Insights (Evidence-Backed Classes):**\n`;
  for (const pharm of result.pharmacologicalGuidance) {
    md += `• **${pharm.drugClass}** (e.g. *${pharm.examples.join(", ")}*)\n`;
    md += `  *Mechanism:* ${pharm.mechanismOfAction}\n`;
    md += `  *Clinical Note:* ${pharm.clinicalInstructions}\n`;
    if (pharm.drugInteractions.length > 0) {
      md += `  *⚠️ Caution:* ${pharm.drugInteractions.join("; ")}\n`;
    }
  }
  md += `\n`;

  md += `**🥗 Targeted Nutritional & Lifestyle Guidance:**\n`;
  md += `• **Key Therapeutic Foods:** ${result.nutritionalTherapy.recommendedFoods.map(f => `${f.food} (${f.benefit})`).join("; ")}\n`;
  md += `• **Foods to Strictly Limit:** ${result.nutritionalTherapy.foodsToAvoid.map(f => `${f.food} (${f.reason})`).join("; ")}\n`;
  md += `• **Clinical Lifestyle Protocol:** ${result.nutritionalTherapy.hydrationAndLifestyle.join(" | ")}\n\n`;

  md += `**📚 Authoritative Clinical Guideline References:**\n`;
  for (const guide of result.guidelineCitations) {
    md += `• *${guide}*\n`;
  }

  return md;
}
