export interface FoodNutrientItem {
  name: string;
  compound: string;
  image: string;
  description: string;
  benefits: string[];
  bestTime: string;
  dosage: string;
  indianAlternatives: string;
}

export interface FoodAlternative {
  expensiveFood: string;
  indianSubstitute: string;
  keyBenefit: string;
  costComparison: string;
}

export interface ArticleFaq {
  question: string;
  answer: string;
}

export interface ArticleSection {
  heading?: string | undefined;
  paragraph: string;
  bullets?: string[] | undefined;
  tip?: string | undefined;
  image?: string | undefined;
}

export type ArticleCategory = 
  | "Heart Health" 
  | "Nutrition" 
  | "Diabetes" 
  | "Mental Health" 
  | "Sleep & Fitness" 
  | "Pediatrics"
  | "Women's Health"
  | "Skin & Dermatology"
  | "Gut & Digestion"
  | "Joints & Orthopedics"
  | "General Wellness";

export interface HealthArticle {
  id: string;
  title: string;
  summary: string;
  category: ArticleCategory;
  readTime: string;
  publishedDate: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    doctorId?: string | undefined;
    verified?: boolean | undefined;
    experience?: string | undefined;
    hospital?: string | undefined;
  };
  keyTakeaways: string[];
  sections: ArticleSection[];
  featuredItems?: FoodNutrientItem[] | undefined;
  foodAlternatives?: FoodAlternative[] | undefined;
  faqs?: ArticleFaq[] | undefined;
  dailyProtocol?: { time: string; action: string; benefit: string }[] | undefined;
  tags: string[];
  likes: number;
}

export const DAILY_HEALTH_TIPS = [
  {
    title: "Start Your Morning with 500ml Lukewarm Water",
    category: "Hydration & Digestion",
    tip: "Drinking lukewarm water immediately upon waking stimulates the gastrointestinal tract, flushes renal toxins, and kickstarts cellular metabolism after 7-8 hours of nighttime dehydration.",
    actionItem: "Keep a water bottle on your bedside table tonight.",
    doctor: "Dr. Anand Deshmukh, General Physician",
  },
  {
    title: "The 20-20-20 Rule for Digital Eye Strain",
    category: "Eye Wellness",
    tip: "Every 20 minutes spent looking at a screen, shift your eyes to look at an object at least 20 feet away for 20 seconds. This relaxes the ciliary muscles of the lens and prevents chronic headaches.",
    actionItem: "Set a subtle hourly timer on your workstation.",
    doctor: "Dr. Anjali Mehta, Consultant",
  },
  {
    title: "15-Minute Post-Meal Walking to Regulate Insulin",
    category: "Blood Sugar Control",
    tip: "A brisk 10 to 15-minute walk within 30 minutes after lunch or dinner pulls glucose directly into skeletal muscle tissue without requiring excessive insulin spikes, preventing fat storage and post-meal energy crashes.",
    actionItem: "Take a stroll around your building after lunch today.",
    doctor: "Dr. Rajesh Sharma, Senior Cardiologist",
  },
  {
    title: "Magnesium & Deep Breathing Before Bedtime",
    category: "Sleep & Recovery",
    tip: "Consuming magnesium-rich foods like soaked almonds or pumpkin seeds paired with 4-7-8 rhythmic breathing activates the parasympathetic nervous system, cutting cortisol levels by up to 30%.",
    actionItem: "Try 5 cycles of 4-7-8 breathing before sleeping tonight.",
    doctor: "Dr. Sneha Desai, Wellness Specialist",
  },
];

export function getDailyTip() {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  return DAILY_HEALTH_TIPS[dayOfYear % DAILY_HEALTH_TIPS.length]!;
}

export const BASE_HEALTH_ARTICLES: HealthArticle[] = [
  {
    id: "10-superfoods-for-heart-health",
    title: "10 Superfoods for Better Heart Health & Lowering Bad Cholesterol",
    summary:
      "Evidence-based cardiology guide on dietary antioxidants, plant sterols, omega-3 fatty acids, and soluble fiber that actively protect heart valves, lower triglycerides, and reduce arterial plaque.",
    category: "Heart Health",
    readTime: "6 min",
    publishedDate: "27 Aug 2026",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=1000&q=80",
    author: {
      name: "Dr. Rajesh Sharma",
      role: "Senior Interventional Cardiologist",
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80",
      doctorId: "dr-rajesh-sharma",
      verified: true,
      experience: "18+ Years Experience",
      hospital: "Apollo & Medyora Heart Institute",
    },
    keyTakeaways: [
      "Small dense LDL cholesterol particles and oxidized lipids are the primary culprit behind coronary plaque.",
      "Consuming raw walnuts and freshly crushed flaxseeds provides potent alpha-linolenic acid (ALA) omega-3.",
      "Garlic allicin and dark leafy greens support vascular nitric oxide synthesis, naturally dilating constricted vessels.",
      "Soluble beta-glucan in whole oats binds directly to digestive bile acids, forcing the liver to clear circulating LDL.",
    ],
    sections: [
      {
        heading: "The Clinical Physiology of Arterial Plaque & LDL Oxidation",
        paragraph:
          "Cardiovascular disease often develops silently over decades. Coronary arteries are lined by a delicate single-cell membrane called the vascular endothelium. When exposed to chronic oxidative stress, elevated triglycerides, and insulin resistance, this endothelial barrier weakens. Circulating low-density lipoproteins (LDL) penetrate the sub-endothelial space, undergo lipid peroxidation, and trigger macrophage inflammation — forming the calcified fatty plaques responsible for angina and myocardial infarction.",
        tip: "A standard lipid profile test should always be accompanied by an hs-CRP (high-sensitivity C-reactive protein) and Apolipoprotein B (ApoB) test to measure accurate cardiovascular risk.",
      },
      {
        heading: "Dietary Strategy: The Mediterranean-Indian Heart Protocol",
        paragraph:
          "Rather than restrictive starvation diets, clinical cardiology emphasizes nutrient-dense cardioprotective whole foods rich in polyphenols, monounsaturated fats (MUFA), plant sterols, and bioavailable dietary nitrates. The following 10 superfoods have demonstrated statistically significant lipid-lowering and endothelial-protective outcomes in peer-reviewed clinical trials.",
      },
    ],
    featuredItems: [
      {
        name: "1. Raw Walnuts (Akhrot)",
        compound: "Alpha-Linolenic Acid (ALA Omega-3) & Polyphenols",
        image: "https://images.unsplash.com/photo-1594951478519-72c4001d73e8?auto=format&fit=crop&w=600&q=80",
        description: "Walnuts contain the highest concentration of plant-based omega-3 of any tree nut. They actively reduce vascular cell adhesion molecules (VCAM-1) and protect myocardial tissue.",
        benefits: ["Lowers total cholesterol by 5-8%", "Reduces resting blood pressure", "Improves arterial wall elasticity"],
        bestTime: "Morning on empty stomach (soaked overnight)",
        dosage: "4-5 kernel halves daily (approx. 28g)",
        indianAlternatives: "Roasted Flaxseeds (Alsi) or Soaked Chia Seeds",
      },
      {
        name: "2. Steamed Spinach & Fenugreek (Methi / Palak)",
        compound: "Inorganic Dietary Nitrates & Potassium",
        image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80",
        description: "Dark leafy greens deliver natural nitrates which convert into Nitric Oxide (NO) in the bloodstream, relaxing smooth muscle cells in arterial walls.",
        benefits: ["Dilates blood vessels (vasodilation)", "Naturally reduces systolic BP by 4-7 mmHg", "High folate lowers homocysteine"],
        bestTime: "Lunch or dinner with light olive oil/ghee",
        dosage: "1 cup cooked greens 4 times per week",
        indianAlternatives: "Moringa leaves (Sahjan) or Amaranth (Chaulai)",
      },
      {
        name: "3. Fresh Crushed Raw Garlic (Lahsun)",
        compound: "Allicin & S-Allyl Cysteine (SAC)",
        image: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=600&q=80",
        description: "When crushed and rested for 10 minutes, garlic enzyme alliinase produces allicin, which inhibits HMG-CoA reductase (the liver enzyme that produces cholesterol).",
        benefits: ["Inhibits platelet aggregation (natural blood thinner)", "Reduces arterial calcification", "Fights systemic arterial inflammation"],
        bestTime: "Early morning crushed with warm water",
        dosage: "1-2 raw cloves crushed daily",
        indianAlternatives: "Ginger-Garlic fresh home paste (no preservatives)",
      },
      {
        name: "4. Steel-Cut Oats & Isabgol (Psyllium)",
        compound: "Soluble Beta-Glucan Fiber",
        image: "https://images.unsplash.com/photo-1586439702132-34a810688a29?auto=format&fit=crop&w=600&q=80",
        description: "Beta-glucan forms a viscous gel inside the small intestine that binds directly to bile cholesterol and carries it out of the body through bowel excretion.",
        benefits: ["Reduces LDL cholesterol by up to 10%", "Prevents post-meal insulin spikes", "Feeds heart-healthy gut microbiome"],
        bestTime: "Breakfast with cinnamon and almond milk",
        dosage: "40g steel cut oats or 1 tsp isabgol at night",
        indianAlternatives: "Barley (Jau) porridge or Roasted Chana Sattu",
      },
      {
        name: "5. Fresh Pomegranate (Anaar)",
        compound: "Punicalagins & Punicic Acid",
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
        description: "Pomegranate punicalagins possess three times the antioxidant activity of green tea, protecting circulating LDL from undergoing oxidation into dangerous foam cells.",
        benefits: ["Reverses carotid artery wall thickening", "Enhances blood flow to cardiac muscle", "Prevents oxidative lipid breakdown"],
        bestTime: "Mid-morning snack (11:00 AM)",
        dosage: "1 medium fresh fruit or 150ml fresh unsweetened juice",
        indianAlternatives: "Indian Gooseberry (Amla) or Guava",
      },
      {
        name: "6. Extra Virgin Cold-Pressed Olive Oil",
        compound: "Oleocanthal & High-Oleic MUFA",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
        description: "Oleocanthal acts as a natural COX inhibitor similar to low-dose aspirin, calming systemic vascular inflammation and keeping blood platelets smooth.",
        benefits: ["Raises protective HDL cholesterol", "Reduces blood clot formation risk", "Maintains endothelial cell integrity"],
        bestTime: "Raw salad dressing or drizzled over cooked vegetables",
        dosage: "1-2 tablespoons (15-30 ml) daily",
        indianAlternatives: "Cold-pressed Kachi Ghani Mustard Oil or Wood-pressed Sesame Oil",
      },
      {
        name: "7. Dark Berries & Indian Amla",
        compound: "Anthocyanins & Bioflavonoid Vitamin C",
        image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=600&q=80",
        description: "Anthocyanins give berries their deep blue-purple hue and protect blood vessels from high-glucose damage and stiffening.",
        benefits: ["Protects microvascular capillary beds", "Enhances vascular nitric oxide synthase", "Strengthens collagen around arteries"],
        bestTime: "Post-workout or evening healthy snack",
        dosage: "1/2 cup fresh berries or 1 fresh Amla juice",
        indianAlternatives: "Fresh Indian Jamun, Black Grapes, or Amla Murabba",
      },
      {
        name: "8. Avocados & Potassium-Rich Fruits",
        compound: "Monounsaturated Fatty Acids & Potassium",
        image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80",
        description: "High potassium balances intracellular sodium concentrations, prompting the kidneys to excrete excess fluid and reducing pressure on arterial walls.",
        benefits: ["Lowers vascular resistance and blood pressure", "Provides heart-healthy satiety fats", "High in magnesium and vitamin E"],
        bestTime: "Breakfast with whole grain toast",
        dosage: "1/2 medium avocado 3 times weekly",
        indianAlternatives: "Ripe Bananas, Tender Coconut Water, or White Pumpkin (Petha)",
      },
      {
        name: "9. Dark Chocolate (70%+ Cacao)",
        compound: "Epicatechin Flavanols & Resveratrol",
        image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80",
        description: "Rich cacao flavanols improve flow-mediated dilation (FMD) of the brachial artery, allowing the heart to pump against less systemic resistance.",
        benefits: ["Improves blood flow to the brain and heart", "Decreases LDL oxidizability", "Reduces stress cortisol hormones"],
        bestTime: "Post-lunch small treat",
        dosage: "1-2 small squares (20g) of pure 70-85% dark chocolate",
        indianAlternatives: "Raw Cacao Powder in warm turmeric almond milk",
      },
      {
        name: "10. Loose-Leaf Green Tea",
        compound: "Epigallocatechin Gallate (EGCG)",
        image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=600&q=80",
        description: "EGCG polyphenols inhibit cholesterol absorption in the intestines and enhance the liver's LDL receptor activity, speeding clearance of bad lipids.",
        benefits: ["Reduces triglyceride concentrations", "Protects against cardiac arrhythmia", "Enhances basal metabolic oxidation"],
        bestTime: "Mid-afternoon (never on an empty stomach)",
        dosage: "2 freshly brewed cups daily",
        indianAlternatives: "Tulsi-Ginger Herbal Decoction or Kahwa",
      },
    ],
    foodAlternatives: [
      {
        expensiveFood: "Extra Virgin Olive Oil (₹1,200/L)",
        indianSubstitute: "Cold-Pressed Kachi Ghani Mustard Oil (₹180/L)",
        keyBenefit: "Mustard oil has ideal 1:2 Omega-3 to Omega-6 ratio and high monounsaturated fats (MUFA).",
        costComparison: "Save 85% with identical cardiac benefits",
      },
      {
        expensiveFood: "Imported Atlantic Salmon (₹1,800/kg)",
        indianSubstitute: "Fresh Indian Rohu / Katla or Roasted Flaxseeds (Alsi)",
        keyBenefit: "Fresh river fish or 2 spoons of flaxseed powder provide rich omega-3 fatty acids.",
        costComparison: "Save 90% with zero heavy metal mercury risk",
      },
      {
        expensiveFood: "Imported Blueberries (₹450/box)",
        indianSubstitute: "Fresh Desi Amla & Seasonal Jamun (₹40/box)",
        keyBenefit: "Amla has 20x higher Vitamin C and antioxidant capacity than imported blueberries.",
        costComparison: "Save 92% with vastly superior clinical potency",
      },
      {
        expensiveFood: "Avocados (₹200/piece)",
        indianSubstitute: "Fresh Guavas, Bananas & Tender Coconut",
        keyBenefit: "Guavas provide superior dietary pectin fiber and potassium for blood pressure regulation.",
        costComparison: "Save 80% while eating farm-fresh local produce",
      },
    ],
    dailyProtocol: [
      {
        time: "07:00 AM (Waking)",
        action: "500ml lukewarm water with 1 crushed raw garlic clove & 4 soaked walnuts",
        benefit: "Activates allicin synthesis and stimulates hepatic bile flow to clear overnight LDL.",
      },
      {
        time: "08:30 AM (Breakfast)",
        action: "Warm steel-cut oats or vegetable dalia with flaxseeds & cinnamon",
        benefit: "Beta-glucan fiber forms intestinal barrier against dietary cholesterol absorption.",
      },
      {
        time: "01:30 PM (Lunch)",
        action: "Steamed methi/palak with ragi or multigrain roti, dal, and fresh green salad",
        benefit: "High inorganic nitrates dilate coronary vessels and prevent post-meal sugar spikes.",
      },
      {
        time: "05:00 PM (Evening)",
        action: "1 cup freshly brewed green tea with roasted chana / makhana",
        benefit: "EGCG catechins block lipid oxidation during peak cortisol hours.",
      },
      {
        time: "08:30 PM (Dinner)",
        action: "Light bottle gourd (lauki) soup, grilled paneer/tofu, and 1 tsp Isabgol before bed",
        benefit: "Maintains uninterrupted overnight digestion and restful blood pressure dip.",
      },
    ],
    faqs: [
      {
        question: "Is Desi Ghee bad for cholesterol and heart patients?",
        answer: "Pure A2 Desi Cow Ghee in moderation (1-2 teaspoons daily) contains short-chain fatty acids (butyric acid) that aid gut integrity. However, avoid deep frying and reheating oils, which creates harmful trans fats and oxidized lipid peroxides.",
      },
      {
        question: "How long does it take for diet changes to lower LDL cholesterol?",
        answer: "With disciplined adherence to high-fiber, antioxidant-rich whole foods, circulating LDL cholesterol and serum triglycerides typically show a measurable 15-25% reduction in repeat blood tests within 6 to 8 weeks.",
      },
      {
        question: "Can these foods replace prescription statin medications?",
        answer: "No. While lifestyle and nutrition form the foundational pillar of cardiac health, never stop or alter prescribed statin or anti-hypertensive medications without consulting your cardiologist.",
      },
    ],
    tags: ["Cardiology", "Heart Health", "10 Superfoods", "Cholesterol", "Blood Pressure", "Diet Protocol"],
    likes: 624,
  },
  {
    id: "10-essential-micronutrients-vitamins-immunity",
    title: "10 Essential Micronutrients & Vitamins for Daily Immunity & Energy",
    summary:
      "A clinical physician's breakdown of Vitamin D3, B12, Zinc, Magnesium, and vital trace minerals essential for optimal cellular immunity, stamina, cognitive focus, and metabolic vitality.",
    category: "Nutrition",
    readTime: "7 min",
    publishedDate: "26 Aug 2026",
    image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=1000&q=80",
    author: {
      name: "Dr. Anand Deshmukh",
      role: "Consultant Physician & Clinical Diabetologist",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=200&q=80",
      doctorId: "dr-anand-deshmukh",
      verified: true,
      experience: "15+ Years Experience",
      hospital: "Medyora Multispeciality Center",
    },
    keyTakeaways: [
      "Over 75% of urban Indians suffer from subclinical Vitamin D3 and Vitamin B12 deficiencies.",
      "Vitamin D acts as a master steroid hormone controlling over 200 immune genes and bone calcium deposition.",
      "Elemental Zinc paired with Vitamin C activates T-lymphocytes and shortens respiratory viral duration by 40%.",
      "Magnesium glycinate is necessary for ATP energy production and peaceful deep REM sleep cycles.",
    ],
    sections: [
      {
        heading: "The Silent Epidemic of Hidden Cellular Starvation",
        paragraph:
          "Modern diets often provide adequate caloric macronutrients (carbohydrates and fats) but leave the human body severely starved of critical micronutrients — the coenzymes, minerals, and vitamins required for every enzymatic reaction in our mitochondria. Chronic unexplained lethargy, hair thinning, brain fog, recurrent respiratory infections, and muscular cramps are frequently the earliest signs of subclinical micronutrient depletion.",
        tip: "Annual preventive blood panels should always include Serum Vitamin D (25-OH), Vitamin B12 (Cobalamin), Serum Ferritin, and Complete Hemogram.",
      },
    ],
    featuredItems: [
      {
        name: "1. Vitamin D3 (Cholecalciferol)",
        compound: "Steroid Hormone Precursor (25-OH Vitamin D)",
        image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80",
        description: "Synthesized in skin under direct UVB sunlight. Regulates calcium absorption in gut and commands innate macrophage pathogen-killing response.",
        benefits: ["Strengthens bone mineral density", "Prevents chronic depression & low mood", "Boosts viral infection resistance"],
        bestTime: "Morning with a healthy fat-containing meal (egg, milk, or nuts)",
        dosage: "60,000 IU weekly (under medical advice) or 1,000-2,000 IU daily",
        indianAlternatives: "20 mins direct 11:00 AM sun exposure, Fortified Milk, Mushrooms",
      },
      {
        name: "2. Vitamin B12 (Methylcobalamin)",
        compound: "Cobalamin & Red Blood Cell Co-factor",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
        description: "Essential for nerve myelin sheath synthesis and DNA replication. Strictly produced by micro-organisms, making strict vegetarians vulnerable to deficiency.",
        benefits: ["Eliminates tingling sensation in hands and feet", "Prevents megaloblastic anemia", "Maintains sharp memory and concentration"],
        bestTime: "Morning after breakfast",
        dosage: "1,000-1,500 mcg sublingual or dietary sources",
        indianAlternatives: "Curd (Dahi), Paneer, Fortified Nutritional Yeast, Sprouted Moong",
      },
      {
        name: "3. Elemental Zinc & Copper Balance",
        compound: "Zinc Bisglycinate / Gluconate",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
        description: "Crucial trace mineral for natural killer cell differentiation, wound healing, testosterone regulation, and thyroid conversion.",
        benefits: ["Accelerates recovery from viral cough & fever", "Prevents skin breakouts and hair loss", "Supports insulin receptor sensitivity"],
        bestTime: "After lunch with water (avoid taking on an empty stomach)",
        dosage: "12-15 mg elemental zinc daily",
        indianAlternatives: "Pumpkin Seeds (Kaddu Ke Beej), Chickpeas (Kabuli Chana), Cashews",
      },
      {
        name: "4. Magnesium (Glycinate / Citrate)",
        compound: "Chelated Magnesium Ion",
        image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80",
        description: "Participates in over 300 biochemical reactions including cellular ATP energy creation and neuromuscular relaxation.",
        benefits: ["Relieves nocturnal calf muscle cramps", "Calms anxiety and lowers blood pressure", "Deepens restorative slow-wave sleep"],
        bestTime: "30-45 minutes before sleeping at night",
        dosage: "250-350 mg elemental magnesium",
        indianAlternatives: "Soaked Almonds, Roasted Sunflower Seeds, Dark Green Saag",
      },
      {
        name: "5. Bioavailable Iron & Vitamin C Duo",
        compound: "Ferrous Bisglycinate + Ascorbic Acid",
        image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=600&q=80",
        description: "Iron builds hemoglobin to transport oxygen to every organ. Pairing plant non-heme iron with Vitamin C increases intestinal absorption by over 300%.",
        benefits: ["Eliminates fatigue, dizziness, and pallor", "Restores healthy hair growth and nail strength", "Increases physical stamina"],
        bestTime: "Mid-day with citrus juice (avoid tea/coffee within 2 hours)",
        dosage: "18-27 mg elemental iron (based on Ferritin levels)",
        indianAlternatives: "Beetroot-Carrot Salad with Fresh Lemon, Jaggery (Gur) & Roasted Chana",
      },
      {
        name: "6. Omega-3 EPA & DHA Fatty Acids",
        compound: "Eicosapentaenoic & Docosahexaenoic Acid",
        image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
        description: "Structural fats embedded in brain cell membranes and retinal receptors that suppress pro-inflammatory leukotrienes and cytokines.",
        benefits: ["Lowers joint inflammation and stiffness", "Reduces dry eyes from digital screens", "Protects against age-related cognitive decline"],
        bestTime: "With the largest meal of the day",
        dosage: "1,000 mg combined EPA + DHA",
        indianAlternatives: "Flaxseeds (Alsi), Chia Seeds, Mustard Oil, Walnuts",
      },
    ],
    foodAlternatives: [
      {
        expensiveFood: "Imported Multivitamin Gummies (₹1,500/month)",
        indianSubstitute: "Daily Handful of Soaked Seeds & Sprouts (₹150/month)",
        keyBenefit: "Sprouted moong, soaked almonds, pumpkin seeds and amla provide organic bioavailable vitamins without artificial sugar.",
        costComparison: "Save 90% with zero synthetic food dyes or corn syrup",
      },
      {
        expensiveFood: "Commercial Vitamin C Effervescent Tabs (₹400/tube)",
        indianSubstitute: "Fresh Desi Amla / Lemon-Mint Infusion (₹20/week)",
        keyBenefit: "Natural Vitamin C in Amla contains bioflavonoids that prevent vitamin breakdown in heat.",
        costComparison: "Save 95% with superior clinical absorption",
      },
    ],
    dailyProtocol: [
      {
        time: "07:30 AM",
        action: "1 glass lukewarm water with soaked almond-pumpkin seed mix & 15 mins sunlight",
        benefit: "Kickstarts Vitamin D synthesis and magnesium-zinc mineral absorption.",
      },
      {
        time: "01:00 PM",
        action: "Sprouted legume salad with fresh lemon squeeze and homemade curd (dahi)",
        benefit: "Maximizes Vitamin B12 gut flora production and iron bioavailability.",
      },
      {
        time: "09:30 PM",
        action: "Warm turmeric milk with pinch of black pepper & nutmeg",
        benefit: "Aids deep cellular muscle recovery and restful nervous system down-regulation.",
      },
    ],
    faqs: [
      {
        question: "Can I take all vitamins together in the morning?",
        answer: "No. Fat-soluble vitamins (A, D, E, K) need dietary fats to absorb, while water-soluble vitamins (B-complex, C) absorb best with water. Calcium and Iron should never be taken together as they compete for identical intestinal receptors.",
      },
      {
        question: "How do I know if I need a Vitamin B12 supplement?",
        answer: "If you experience frequent mouth ulcers, tingling sensations (pins and needles) in your feet, brain fog, or follow a vegetarian diet, ask your doctor for a Serum Vitamin B12 test.",
      },
    ],
    tags: ["Nutrition", "Micronutrients", "Immunity", "Vitamin D3", "Vitamin B12", "Energy"],
    likes: 489,
  },
  {
    id: "reversing-early-prediabetes-nutrition-plan",
    title: "Reversing Early Pre-Diabetes: Doctor-Approved 30-Day Nutrition Plan",
    summary:
      "A structured clinical metabolic protocol to lower HbA1c, restore insulin sensitivity, eliminate visceral belly fat, and prevent progression to Type-2 Diabetes.",
    category: "Diabetes",
    readTime: "8 min",
    publishedDate: "25 Aug 2026",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1000&q=80",
    author: {
      name: "Dr. Anand Deshmukh",
      role: "Consultant Physician & Diabetologist",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=200&q=80",
      doctorId: "dr-anand-deshmukh",
      verified: true,
      experience: "15+ Years Experience",
      hospital: "Medyora Multispeciality Center",
    },
    keyTakeaways: [
      "Pre-diabetes (HbA1c 5.7% - 6.4%) is 100% reversible with structured dietary sequencing.",
      "Always eat fiber and vegetables first, proteins and fats second, and carbohydrates last to flatten glucose spikes.",
      "15 minutes of post-meal walking stimulates non-insulin mediated GLUT-4 glucose uptake in muscles.",
      "Replace polished white rice and maida with complex whole millets (Ragi, Jowar, Bajra).",
    ],
    sections: [
      {
        heading: "Understanding the Science of Insulin Resistance",
        paragraph:
          "When you eat rapidly absorbing refined carbohydrates, the pancreas pumps out high amounts of insulin to push glucose into muscle and liver cells. Over years of frequent spikes, cells become desensitized and close their gates — a state called insulin resistance. The pancreas is forced to produce double the insulin, leading to visceral abdominal fat gain, fatty liver, and rising blood sugars.",
        tip: "Check your Fasting Blood Glucose and Fasting Insulin to calculate your HOMA-IR (Homeostatic Model Assessment of Insulin Resistance).",
      },
    ],
    featuredItems: [
      {
        name: "1. Soaked Fenugreek Seeds (Methi Dana)",
        compound: "4-Hydroxyisoleucine & Soluble Galactomannan",
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
        description: "Methi seeds delay gastric emptying and directly stimulate pancreatic beta cells to release insulin smoothly without reactive hypoglycemia.",
        benefits: ["Reduces fasting blood sugar by 10-15 mg/dL", "Reduces insulin resistance score", "Improves liver enzymes"],
        bestTime: "First thing in the morning with warm water",
        dosage: "1 teaspoon soaked overnight in a glass of water",
        indianAlternatives: "Cinnamon (Dalchini) boiled water",
      },
      {
        name: "2. Ancient Whole Millets (Jowar, Bajra, Ragi)",
        compound: "Complex Resistant Starch & Magnesium",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
        description: "Millets have a significantly lower glycemic index than refined white wheat or polished white rice, releasing glucose slowly over 3-4 hours.",
        benefits: ["Prevents post-prandial glucose surges", "High in magnesium that activates insulin receptors", "Keeps you full for hours"],
        bestTime: "Lunch or early dinner",
        dosage: "1-2 small rotis paired with high dal/veggie ratio",
        indianAlternatives: "Barley (Jau) Roti, Foxtail Millet Khichdi",
      },
    ],
    foodAlternatives: [
      {
        expensiveFood: "Imported Quinoa (₹600/kg)",
        indianSubstitute: "Desi Foxtail / Barnyard Millet (Kangan / Samak) (₹90/kg)",
        keyBenefit: "Native Indian millets have identical protein content, higher prebiotic fiber, and lower carbon footprint.",
        costComparison: "Save 85% with traditional farmer produce",
      },
      {
        expensiveFood: "Commercial Diabetic Whey Shakes (₹2,400/jar)",
        indianSubstitute: "Roasted Chana Sattu Drink with Cumin & Mint (₹80/kg)",
        keyBenefit: "Sattu provides 20g natural plant protein, low glycemic load, and instant natural cooling satiety.",
        costComparison: "Save 95% with zero artificial sweeteners",
      },
    ],
    dailyProtocol: [
      {
        time: "07:00 AM",
        action: "Soaked methi water with 5 soaked almonds and 2 walnuts",
        benefit: "Primes insulin receptor sensitivity before the first meal.",
      },
      {
        time: "01:30 PM",
        action: "Big bowl of cucumber-tomato salad FIRST, then paneer/dal, then 1 Jowar roti",
        benefit: "Food sequencing reduces glucose spike by up to 50%.",
      },
      {
        time: "02:00 PM",
        action: "15-minute brisk indoor or outdoor walk",
        benefit: "Muscles consume glucose directly without requiring insulin.",
      },
    ],
    faqs: [
      {
        question: "Can I completely reverse prediabetes without medicine?",
        answer: "Yes! In over 80% of individuals with prediabetes, disciplined nutrition, 150 minutes of weekly brisk walking, and 5-7% reduction in body weight normalize HbA1c back below 5.7%.",
      },
    ],
    tags: ["Diabetes", "Pre-Diabetes", "Insulin Resistance", "Weight Loss", "HbA1c", "Nutrition Plan"],
    likes: 712,
  },
  {
    id: "5-dietary-habits-for-pcos-thyroid-balance",
    title: "5 Essential Dietary Habits for PCOS & Thyroid Balance",
    summary:
      "A gynecologist and endocrinologist's hormonal nutrition guide to manage irregular cycles, insulin surges, hormonal acne, thyroid sluggishness, and fatigue.",
    category: "Women's Health",
    readTime: "6 min",
    publishedDate: "24 Aug 2026",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80",
    author: {
      name: "Dr. Priya Patel",
      role: "Senior Consultant Obstetrician & Gynecologist",
      avatar: "https://images.unsplash.com/photo-1594824813589-3221e330be1e?auto=format&fit=crop&w=200&q=80",
      doctorId: "dr-priya-patel",
      verified: true,
      experience: "14+ Years Experience",
      hospital: "Cloudnine & Medyora Women Center",
    },
    keyTakeaways: [
      "PCOS is fundamentally a metabolic condition driven by underlying insulin resistance and chronic low-grade inflammation.",
      "Seed cycling (Pumpkin & Flax in follicular phase; Sesame & Sunflower in luteal phase) gently balances estrogen and progesterone.",
      "Ensure adequate Iodine and Selenium to support T4 to active T3 thyroid conversion.",
      "Avoid crash restrictive diets which elevate cortisol and disrupt the hypothalamic-pituitary-ovarian (HPO) axis.",
    ],
    sections: [
      {
        heading: "The Hormonal Symphony: PCOS & Thyroid Interconnection",
        paragraph:
          "Polycystic Ovary Syndrome (PCOS) and Hypothyroidism frequently co-exist because high circulating insulin stimulates the ovaries to overproduce androgens (testosterone), causing cystic follicles, irregular cycles, and facial hair. Meanwhile, sluggish thyroid function slows basal metabolic rate, exacerbating weight gain.",
      },
    ],
    featuredItems: [
      {
        name: "1. Seed Cycling Protocol (Flax, Pumpkin, Sesame, Sunflower)",
        compound: "Lignans, Zinc & Selenium",
        image: "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=600&q=80",
        description: "Flax and pumpkin seeds in Day 1-14 block excess estrogen; Sesame and sunflower seeds in Day 15-28 boost natural progesterone production.",
        benefits: ["Regulates menstrual cycle frequency", "Reduces hormonal acne and hirsutism", "Alleviates PMS mood swings"],
        bestTime: "Sprinkled over morning breakfast or yogurt",
        dosage: "1 tablespoon ground seeds daily",
        indianAlternatives: "Roasted Alsi (Flax) & Til (Sesame) Chikki with Jaggery",
      },
      {
        name: "2. Spearmint Tea (Pudina Infusion)",
        compound: "Spearmint Phenolic Antioxidants",
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
        description: "Clinical trials show 2 cups of spearmint tea daily significantly reduces free circulating testosterone in women with PCOS.",
        benefits: ["Reduces facial hair growth (hirsutism)", "Clears hormonal cystic acne along jawline", "Calms digestive bloating"],
        bestTime: "11:00 AM and 04:30 PM",
        dosage: "2 freshly steeped cups daily",
        indianAlternatives: "Fresh Desi Pudina (Mint) leaf herbal tea",
      },
    ],
    foodAlternatives: [
      {
        expensiveFood: "Imported Inositol Supplements (₹1,800/box)",
        indianSubstitute: "Sprouted Legumes, Citrus Fruits, Rockmelon & Walnuts",
        keyBenefit: "Natural dietary myo-inositol restores ovarian insulin signaling naturally.",
        costComparison: "Save 80% with wholesome whole foods",
      },
    ],
    dailyProtocol: [
      {
        time: "07:30 AM",
        action: "Spearmint tea with 1 tbsp ground flaxseeds & 4 soaked almonds",
        benefit: "Suppresses morning androgen spike and balances estrogen metabolites.",
      },
      {
        time: "01:00 PM",
        action: "High-protein lunch: Sprouted moong dal, sauteed spinach, 1 ragi roti",
        benefit: "Prevents insulin crash and reduces post-lunch fatigue.",
      },
    ],
    faqs: [
      {
        question: "Should women with PCOS completely quit dairy and gluten?",
        answer: "Not necessarily. If you don't have a diagnosed celiac disease or lactose intolerance, you don't need total elimination. However, shifting from processed cow milk to homemade A2 curd or almond milk can reduce inflammatory acne.",
      },
    ],
    tags: ["Women's Health", "PCOS", "Thyroid", "Hormones", "Seed Cycling", "Gynecology"],
    likes: 580,
  },
  {
    id: "child-nutrition-immunity-fever-guide",
    title: "Complete Guide to Child Nutrition, Immunity & Managing Seasonal Fevers",
    summary:
      "A pediatrician's actionable roadmap for parents: essential brain-building nutrients, building strong gut immunity, and evidence-based home care during viral fevers.",
    category: "Pediatrics",
    readTime: "7 min",
    publishedDate: "23 Aug 2026",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80",
    author: {
      name: "Dr. Anjali Mehta",
      role: "Senior Consultant Pediatrician & Neonatologist",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80",
      doctorId: "dr-anjali-mehta",
      verified: true,
      experience: "16+ Years Experience",
      hospital: "Rainbow Children's & Medyora Hospital",
    },
    keyTakeaways: [
      "Fever is a natural physiological defense mechanism, not a disease; never panic or over-medicate.",
      "Prioritize oral hydration (ORS, coconut water, dal water) over solid force-feeding during infections.",
      "Zinc and Vitamin D are the two most critical nutrients that decrease childhood respiratory infection recurrence by 50%.",
      "Avoid giving antibiotics for common viral cold and fevers.",
    ],
    sections: [
      {
        heading: "Demystifying Fevers in Children: What Every Parent Must Know",
        paragraph:
          "A fever is the body's natural thermostat adjusting upwards to create a hostile environment for viruses and bacteria. The goal of fever management is not necessarily to bring the temperature to 98.4°F immediately, but to keep the child comfortable, well-hydrated, and active.",
        tip: "Seek immediate emergency pediatric care if a child under 3 months has a temperature above 100.4°F, or if a child of any age displays continuous lethargy, abnormal breathing, or persistent vomiting.",
      },
    ],
    featuredItems: [
      {
        name: "1. Coconut Water & Homemade Electrolyte Broth",
        compound: "Natural Potassium & Electrolytes",
        image: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?auto=format&fit=crop&w=600&q=80",
        description: "Maintains plasma volume and prevents cellular dehydration during fever sweats and viral illness.",
        benefits: ["Rapidly rehydrates without synthetic additives", "Gentle on sensitive upset stomachs", "Provides natural energy glucose"],
        bestTime: "Sipped frequently throughout fever days",
        dosage: "100-200ml every 2-3 hours",
        indianAlternatives: "Moong Dal Paani, Kanji, or Rice Water with pinch of salt",
      },
      {
        name: "2. Golden Turmeric Milk with Black Pepper (Haldi Doodh)",
        compound: "Curcumin & Piperine",
        image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80",
        description: "Natural antimicrobial and anti-inflammatory that soothes irritated pediatric throat and bronchial passages.",
        benefits: ["Relieves nighttime viral coughing", "Enhances natural killer cell activity", "Promotes peaceful bedtime sleep"],
        bestTime: "Before bed during cold/cough episodes",
        dosage: "1 small warm cup with 1/4 tsp pure turmeric",
        indianAlternatives: "Warm Honey-Ginger Drops (for children above 1 year only)",
      },
    ],
    foodAlternatives: [
      {
        expensiveFood: "Commercial Pediatric Immunity Syrups (₹600/bottle)",
        indianSubstitute: "Homemade Amla Murabba & Soaked Almond Paste (₹80/month)",
        keyBenefit: "Delivers natural vitamin C, vitamin E, and zinc without artificial high-fructose corn syrup.",
        costComparison: "Save 85% with genuine homemade nutrition",
      },
    ],
    dailyProtocol: [
      {
        time: "During Fever",
        action: "Light cotton clothing, room temperature sponge baths, frequent ORS sips",
        benefit: "Keeps child safe, hydrated, and prevents febrile convulsions.",
      },
    ],
    faqs: [
      {
        question: "Can I give honey to a baby with cough?",
        answer: "NEVER give honey to an infant under 12 months due to the risk of Infant Botulism. For children older than 1 year, 1 teaspoon of honey is a proven, safe nighttime cough suppressant.",
      },
    ],
    tags: ["Pediatrics", "Child Health", "Immunity", "Fever Care", "Nutrition", "Parenting"],
    likes: 640,
  },
  {
    id: "dermatologist-guide-acne-hyperpigmentation-skin-barrier",
    title: "Dermatologist's Guide: Curing Adult Acne, Hyperpigmentation & Skin Barrier Repair",
    summary:
      "A clinical dermatologist's protocol on treating stubborn breakouts, fading post-inflammatory hyperpigmentation (PIH), and restoring damaged skin barriers with minimal active ingredients.",
    category: "Skin & Dermatology",
    readTime: "6 min",
    publishedDate: "22 Aug 2026",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80",
    author: {
      name: "Dr. Rohan Kapoor",
      role: "Senior Consultant Dermatologist & Aesthetic Surgeon",
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80",
      doctorId: "dr-rohan-kapoor",
      verified: true,
      experience: "12+ Years Experience",
      hospital: "Kaya & Medyora Skin Clinic",
    },
    keyTakeaways: [
      "Over-exfoliating with multiple strong acids destroys the skin's lipid barrier, worsening breakouts.",
      "Ceramides, Niacinamide (2-5%), and Hyaluronic Acid are the holy trinity for repairing damaged skin barriers.",
      "Sunscreen with Broad Spectrum SPF 50 PA++++ is mandatory to prevent hyperpigmentation spots from darkening.",
      "High glycemic index foods and skim milk trigger IGF-1 hormones, directly spiking sebum production.",
    ],
    sections: [
      {
        heading: "The Root Cause of Adult Acne & Barrier Breakdown",
        paragraph:
          "The stratum corneum consists of skin cells held together by a lipid mortar of ceramides, cholesterol, and free fatty acids. When stripped by harsh scrubbing, excessive retinol, or harsh soaps, moisture escapes (Transepidermal Water Loss) and bacteria penetrate effortlessly, triggering red cystic acne and chronic redness.",
      },
    ],
    featuredItems: [
      {
        name: "1. Ceramides & Centella Asiatica (Cica)",
        compound: "Bio-Identical Lipids & Madecassoside",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
        description: "Rebuilds the intercellular skin lipid matrix and calms acute inflammatory erythema.",
        benefits: ["Repairs stinging and peeling skin within 72 hours", "Restores natural skin moisture balance", "Prevents bacterial breakouts"],
        bestTime: "Morning and Night on damp skin",
        dosage: "Pea-sized amount gently patted in",
        indianAlternatives: "Pure Cold-Pressed Aloe Vera Gel & Cold-Pressed Rosehip Seed Oil",
      },
      {
        name: "2. Niacinamide (Vitamin B3)",
        compound: "Nicotinamide 2-5%",
        image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80",
        description: "Inhibits melanosome transfer from melanocytes to keratinocytes, rapidly fading dark acne spots and regulating oil glands.",
        benefits: ["Fades dark spots and PIH", "Tightens enlarged pores", "Boosts internal ceramide synthesis"],
        bestTime: "Morning before sunscreen",
        dosage: "3-4 drops on clean face",
        indianAlternatives: "Turmeric & Besan (Chickpea Flour) gentle face pack with raw milk",
      },
    ],
    foodAlternatives: [
      {
        expensiveFood: "Imported 10-Step K-Beauty Skincare (₹8,000/kit)",
        indianSubstitute: "3-Step Minimal Routine: Gentle Cleanser + Ceramide Cream + Broad Spectrum SPF (₹800/kit)",
        keyBenefit: "Dermatological science proves a minimal 3-step routine yields vastly superior barrier health without irritation.",
        costComparison: "Save 90% while achieving healthier, glowing skin",
      },
    ],
    dailyProtocol: [
      {
        time: "Morning Routine",
        action: "Gentle hydrating cleanser -> Niacinamide serum -> Ceramide moisturizer -> SPF 50 Sunscreen",
        benefit: "Shields skin from UV radiation and environmental pollution.",
      },
      {
        time: "Night Routine",
        action: "Gentle wash -> Hydrating serum -> Barrier repair cream",
        benefit: "Maximizes cellular skin regeneration during REM sleep.",
      },
    ],
    faqs: [
      {
        question: "Can oily skin skip moisturizer?",
        answer: "Never! When oily skin is deprived of moisturizer, it compensates by producing double the sebum, clogging pores and causing more acne.",
      },
    ],
    tags: ["Dermatology", "Skincare", "Acne Treatment", "Hyperpigmentation", "Skin Barrier", "Sunscreen"],
    likes: 512,
  },
  {
    id: "managing-acidity-gerd-fatty-liver-protocol",
    title: "Managing Acidity, GERD & Fatty Liver: Doctor's Gut Protocol",
    summary:
      "A gastroenterologist's guide to eliminating acid reflux, healing gastric lining ulcers, restoring beneficial gut microbiome, and reversing Grade-1 Fatty Liver.",
    category: "Gut & Digestion",
    readTime: "7 min",
    publishedDate: "21 Aug 2026",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80",
    author: {
      name: "Dr. Suresh Gupta",
      role: "Senior Consultant Gastroenterologist & Hepatologist",
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80",
      doctorId: "dr-suresh-gupta",
      verified: true,
      experience: "20+ Years Experience",
      hospital: "Max Healthcare & Medyora Gastro Care",
    },
    keyTakeaways: [
      "Chronic acidity and GERD are often caused by delayed gastric emptying and weak lower esophageal sphincter tone.",
      "Avoid lying down within 2.5 hours after dinner to prevent acid regurgitation into the esophagus.",
      "Grade-1 Fatty Liver is fully reversible with elimination of sugary drinks and daily 30-minute cardio.",
      "Probiotic curd and prebiotic fibers actively repair mucosal intestinal walls.",
    ],
    sections: [
      {
        heading: "The Physiology of Acid Reflux & Fatty Liver Connection",
        paragraph:
          "The stomach naturally produces hydrochloric acid (pH 1.5 to 2.0) to digest proteins. When we consume excess refined oils, late heavy dinners, or experience chronic stress, gastric pressure rises, forcing acid upwards into the esophagus. Concurrently, excess fructose and refined carbs overload the liver, which converts them into hepatic triglycerides — producing Non-Alcoholic Fatty Liver Disease (NAFLD).",
      },
    ],
    featuredItems: [
      {
        name: "1. Fresh Ash Gourd Juice (Safed Petha Juice)",
        compound: "Highly Alkaline Prebiotic Minerals",
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
        description: "Ash gourd juice has an intensely cooling and alkaline pH that immediately neutralizes excess hydrochloric acid in the stomach.",
        benefits: ["Cures acute heartburn and burning sensation within 15 mins", "Heals peptic gastric lining ulcers", "Flushes accumulated kidney toxins"],
        bestTime: "First thing in the morning on an empty stomach",
        dosage: "200ml fresh strained juice without salt or sugar",
        indianAlternatives: "Tender Coconut Water (Nariyal Paani) or Lauki Juice",
      },
      {
        name: "2. Traditional Fermented Buttermilk (Chaas / Mattha)",
        compound: "Lactobacillus Probiotics & Roasted Cumin",
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
        description: "Spiced with roasted jeera, mint, and ginger, fresh buttermilk accelerates digestion and colonizes the gut with healthy microbiota.",
        benefits: ["Eliminates bloating and post-meal heaviness", "Strengthens gut mucosal barrier", "Suppresses harmful H. Pylori bacteria"],
        bestTime: "Immediately following lunch",
        dosage: "1-2 glasses daily",
        indianAlternatives: "Homemade Fresh Curd (Dahi) or Kanji",
      },
    ],
    foodAlternatives: [
      {
        expensiveFood: "Commercial Probiotic Capsules (₹1,200/strip)",
        indianSubstitute: "Fresh Homemade Set Curd (Dahi) & Fermented Kanji (₹30)",
        keyBenefit: "Fresh curd contains billions of live active lactobacillus cultures adapted to Indian gut biomes.",
        costComparison: "Save 95% with superior live microbial count",
      },
    ],
    dailyProtocol: [
      {
        time: "07:00 AM",
        action: "1 glass Ash Gourd (Safed Petha) juice on empty stomach",
        benefit: "Creates an alkaline soothing coating across gastric lining.",
      },
      {
        time: "02:00 PM",
        action: "1 glass spiced buttermilk with roasted jeera post-lunch",
        benefit: "Aids complete digestive breakdown and prevents afternoon bloating.",
      },
      {
        time: "08:00 PM",
        action: "Finish dinner by 8:00 PM; elevate head of bed by 6 inches",
        benefit: "Prevents nocturnal acid reflux during sleep.",
      },
    ],
    faqs: [
      {
        question: "Is Grade-1 Fatty Liver dangerous?",
        answer: "Grade-1 Fatty Liver is the earliest and completely reversible stage. If left unmanaged, it can progress to NASH (steatohepatitis) and fibrosis. Reversing it requires eliminating sweet beverages, alcohol, and refined flour while exercising regularly.",
      },
    ],
    tags: ["Gastroenterology", "Acidity", "GERD", "Fatty Liver", "Gut Health", "Probiotics"],
    likes: 567,
  },
  {
    id: "knee-joint-pain-exercises-yoga-protocol",
    title: "Safe Exercises & Doctor-Approved Yoga Postures for Knee & Joint Pain",
    summary:
      "An orthopedic surgeon's rehabilitation protocol to strengthen quadriceps, protect synovial knee cartilage, improve mobility, and reduce osteoarthritis stiffness.",
    category: "Joints & Orthopedics",
    readTime: "6 min",
    publishedDate: "20 Aug 2026",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80",
    author: {
      name: "Dr. Amit Roy",
      role: "Senior Consultant Orthopedic & Joint Replacement Surgeon",
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80",
      doctorId: "dr-amit-roy",
      verified: true,
      experience: "17+ Years Experience",
      hospital: "Fortis & Medyora Ortho Hospital",
    },
    keyTakeaways: [
      "Strengthening the quadriceps and hamstrings reduces up to 40% of body weight pressure from the knee cartilage.",
      "Low-impact exercises (swimming, cycling, straight leg raises) promote synovial fluid circulation without joint wear.",
      "Avoid deep squats and cross-legged sitting if experiencing acute Grade-3 osteoarthritis.",
      "Curcumin, Boswellia, and Vitamin D3 naturally reduce joint inflammation.",
    ],
    sections: [
      {
        heading: "Biomechanics of Knee Cartilage & Osteoarthritis",
        paragraph:
          "The knee joint is cushioned by articular cartilage and lubricated by synovial fluid. As we age or carry excess body mass, cartilage wears thin, causing bone-on-bone friction. Strengthening the muscular shock-absorbers around the knee (the vastus medialis and quadriceps) relieves the joint and restores pain-free walking.",
      },
    ],
    featuredItems: [
      {
        name: "1. Straight Leg Raises (SLR) & Quadriceps Sets",
        compound: "Isometric Quadriceps Strengthening",
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
        description: "Lying flat, tighten your thigh muscle and slowly lift the straight leg 12 inches off the bed, hold for 5 seconds, and lower slowly.",
        benefits: ["Builds knee support muscles without joint compression", "Prevents knee buckling and weakness", "Improves stair-climbing confidence"],
        bestTime: "Twice daily (Morning and Evening)",
        dosage: "2 sets of 10 repetitions per leg",
        indianAlternatives: "Seated Chair Leg Extensions with Light Ankle Weight",
      },
      {
        name: "2. Setu Bandhasana (Supported Bridge Pose)",
        compound: "Gluteal & Hamstring Activation",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
        description: "Lying on your back with knees bent, gently lift your hips towards the ceiling to align thighs with torso.",
        benefits: ["Stabilizes pelvic girdle and lumbar spine", "Relieves hamstring stiffness", "Encourages knee joint alignment"],
        bestTime: "Morning yoga session",
        dosage: "Hold for 30 seconds, repeat 3 times",
        indianAlternatives: "Bhujangasana (Gentle Cobra Pose)",
      },
    ],
    foodAlternatives: [
      {
        expensiveFood: "Glucosamine-Chondroitin Commercial Tablets (₹1,500/bottle)",
        indianSubstitute: "Bone Broth / Mushroom Soup + Haldi Milk with Black Pepper (₹60)",
        keyBenefit: "Delivers natural collagen peptides, hyaluronic acid, and anti-inflammatory curcumin.",
        costComparison: "Save 90% with wholesome anti-inflammatory nutrition",
      },
    ],
    dailyProtocol: [
      {
        time: "Morning",
        action: "10 mins warm compress followed by 15 mins gentle Straight Leg Raises and Bridge poses",
        benefit: "Warms up synovial joint fluid and relieves morning stiffness.",
      },
    ],
    faqs: [
      {
        question: "Can knee cartilage regrow naturally?",
        answer: "While lost cartilage cannot regenerate completely, strengthening the surrounding musculature, reducing body weight, and maintaining synovial fluid lubrication can make the knee completely pain-free and prevent surgery.",
      },
    ],
    tags: ["Orthopedics", "Knee Pain", "Joint Health", "Yoga", "Physiotherapy", "Arthritis"],
    likes: 495,
  },
  {
    id: "10-brain-foods-for-memory-focus-anxiety-relief",
    title: "10 Clinical Brain Foods to Boost Memory, Mental Focus & Reduce Anxiety",
    summary:
      "A neurologist's guide to neuroprotective nootropics, phosphatidylserine, omega-3 DHA, and adaptogenic herbs that enhance neuroplasticity, sharpen concentration, and calm nervous burnout.",
    category: "Mental Health",
    readTime: "7 min",
    publishedDate: "25 Aug 2026",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1000&q=80",
    author: {
      name: "Dr. Vikram Mehta",
      role: "Senior Consultant Neurologist & Cognitive Specialist",
      avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=80",
      doctorId: "dr-vikram-mehta",
      verified: true,
      experience: "15+ Years Experience",
      hospital: "National Neuro Institute & Medyora",
    },
    keyTakeaways: [
      "The brain is composed of over 60% fat, primarily docosahexaenoic acid (DHA omega-3).",
      "L-theanine in ceremonial green tea induces alpha brain waves, promoting calm, jitter-free focus.",
      "Curcumin crosses the blood-brain barrier and stimulates Brain-Derived Neurotrophic Factor (BDNF).",
      "Traditional Indian Brahmi (Bacopa) and Ashwagandha support GABA neurotransmitter balance and memory retention.",
    ],
    sections: [
      {
        heading: "Neuroplasticity, Acetylcholine & The Cognitive Brain Diet",
        paragraph:
          "Cognitive performance and emotional resilience rely on continuous synaptic communication between 86 billion neurons. Neurotransmitters like acetylcholine, dopamine, and GABA require dietary amino acids, phospholipids, and B-vitamins for synthesis. Chronic psychological stress elevates cortisol, shrinking hippocampal dendrites and impairing recall. Supplying the central nervous system with targeted neuro-nutrients restores synaptic density and prevents brain fog.",
        tip: "Avoid refined sugar spikes before intense work sessions; glucose crashes starve brain mitochondria of steady energy.",
      },
    ],
    featuredItems: [
      {
        name: "1. Soaked Walnuts & Pumpkin Seeds",
        compound: "Docosahexaenoic Acid (DHA Precursors) & Zinc",
        image: "https://images.unsplash.com/photo-1594951478519-72c4001d73e8?auto=format&fit=crop&w=600&q=80",
        description: "Contains high concentration of ALA and neuroprotective vitamin E, shielding neuronal lipid membranes from oxidative free radical degradation.",
        benefits: ["Sharpens verbal memory and speed of recall", "Reduces neuro-inflammation", "Supports cellular brain structure"],
        bestTime: "Morning with breakfast",
        dosage: "4 soaked walnuts + 1 tbsp raw pumpkin seeds",
        indianAlternatives: "Soaked Desi Almonds (Mamra Badam)",
      },
      {
        name: "2. Brahmi & Shankhpushpi Herbal Infusion",
        compound: "Bacosides A & B",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
        description: "Bacosides enhance nerve impulse transmission and promote repair of damaged synaptic receptors in the cerebral cortex.",
        benefits: ["Significantly improves working memory score", "Lowers exam and work stress anxiety", "Supports calm mental clarity"],
        bestTime: "Late afternoon (04:00 PM)",
        dosage: "1 cup fresh herbal tea or 250mg standardized extract",
        indianAlternatives: "Fresh Brahmi leaves chutney or Saraswatarishta",
      },
      {
        name: "3. Pure Dark Cacao (80%+)",
        compound: "Theobromine & Flavan-3-ols",
        image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80",
        description: "Theobromine provides smooth cerebral vasodilation, increasing blood flow and oxygen delivery to the frontal lobes without caffeine crashes.",
        benefits: ["Elevates endorphin and serotonin synthesis", "Enhances reaction time and sustained focus", "Protects against mental fatigue"],
        bestTime: "Mid-day 30 mins before cognitive tasks",
        dosage: "15-20g dark chocolate",
        indianAlternatives: "Unsweetened Cacao Powder in warm milk",
      },
      {
        name: "4. Wild Blueberries & Black Jamun",
        compound: "Anthocyanidins & Pterostilbene",
        image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=600&q=80",
        description: "Pterostilbene crosses into the central nervous system, enhancing cellular autophagy to clear senescent misfolded proteins.",
        benefits: ["Delays age-related memory decline", "Reduces mental exhaustion", "Protects blood-brain barrier"],
        bestTime: "Post-lunch fruit bowl",
        dosage: "1/2 cup fresh berries or 4-5 fresh Jamun",
        indianAlternatives: "Fresh Indian Jamun or Black Raisins (Munakka)",
      },
      {
        name: "5. Whole Eggs & Soy Lecithin",
        compound: "Phosphatidylcholine & Lutein",
        image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80",
        description: "Choline is the direct biochemical precursor to Acetylcholine — the chief neurotransmitter for learning, memory formation, and REM dreaming.",
        benefits: ["Critical for rapid information processing", "Maintains neuronal cell wall flexibility", "Prevents age-related brain shrinkage"],
        bestTime: "Breakfast boiled or poached",
        dosage: "1-2 whole eggs daily",
        indianAlternatives: "Sprouted Moong, Paneer, or Sunflower Lecithin",
      },
    ],
    foodAlternatives: [
      {
        expensiveFood: "Commercial Nootropic Supplements (₹2,500/bottle)",
        indianSubstitute: "Brahmi-Shankhpushpi Herbal Decoction + Soaked Almonds (₹100)",
        keyBenefit: "Delivers natural bacosides, Vitamin E, and magnesium without synthetic stimulants or jitters.",
        costComparison: "Save 95% with authentic Ayurvedic-clinical synergy",
      },
    ],
    dailyProtocol: [
      {
        time: "07:30 AM",
        action: "5 soaked almonds, 3 soaked walnuts, and 10 mins box breathing (4-4-4-4)",
        benefit: "Primes dopamine and acetylcholine for peak morning cognitive output.",
      },
      {
        time: "04:00 PM",
        action: "1 cup hot green tea with Brahmi & 2 squares dark cacao",
        benefit: "L-theanine + theobromine clears afternoon brain fog without disrupting night sleep.",
      },
    ],
    faqs: [
      {
        question: "How long does it take for brain foods to improve memory?",
        answer: "Clinical trials on bacosides (Brahmi) and DHA omega-3 demonstrate statistically significant improvements in memory retention and cognitive speed within 6 to 12 weeks of daily consumption.",
      },
    ],
    tags: ["Mental Health", "Neurology", "Brain Foods", "Memory", "Focus", "Anxiety", "Nootropics"],
    likes: 712,
  },
  {
    id: "hypertension-dash-diet-blood-pressure-reduction",
    title: "Doctor's DASH Diet Guide: Lower High Blood Pressure in 21 Days Naturally",
    summary:
      "A clinical cardiologist's protocol combining the DASH diet, inorganic nitrates, potassium-sodium rebalancing, and stress regulation to safely reduce systolic blood pressure by 8-14 mmHg.",
    category: "Heart Health",
    readTime: "6 min",
    publishedDate: "24 Aug 2026",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80",
    author: {
      name: "Dr. Rajesh Sharma",
      role: "Senior Cardiologist & Hypertension Specialist",
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80",
      doctorId: "dr-rajesh-sharma",
      verified: true,
      experience: "18+ Years Experience",
      hospital: "Apollo & Medyora Heart Institute",
    },
    keyTakeaways: [
      "The Dietary Approaches to Stop Hypertension (DASH) protocol is proven to lower blood pressure as effectively as first-line medications.",
      "Achieving a 4:1 Dietary Potassium-to-Sodium ratio triggers kidney natriuresis (excreting excess water and sodium).",
      "Beetroot juice inorganic nitrates convert into Nitric Oxide, widening tight arterial walls within 3 hours.",
      "Hibiscus tea anthocyanins act as mild natural Angiotensin-Converting Enzyme (ACE) inhibitors.",
    ],
    sections: [
      {
        heading: "The Physiology of Hypertension & Vascular Resistance",
        paragraph:
          "Blood pressure represents the force exerted by circulating blood against arterial walls. Chronic sympathetic overdrive, arterial stiffness, and excess dietary sodium cause the kidneys to retain fluid and small arterioles to constrict. Over time, high pressure damages the delicate coronary arteries, retina, and renal glomeruli.",
        tip: "Measure blood pressure seated quietly for 5 minutes in the morning before breakfast and before taking any medications.",
      },
    ],
    featuredItems: [
      {
        name: "1. Fresh Raw Beetroot & Carrot Juice",
        compound: "Inorganic Nitrates (NO3-) & Betaine",
        image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=600&q=80",
        description: "Salivary bacteria reduce dietary nitrates to nitrites, which rapidly form nitric oxide in vascular endothelium, causing immediate vasodilation.",
        benefits: ["Reduces systolic BP by 6-10 mmHg within 3 hours", "Improves exercise tolerance in cardiac patients", "Lowers arterial stiffness"],
        bestTime: "Morning 10:00 AM",
        dosage: "150-200ml fresh cold-pressed juice",
        indianAlternatives: "Steamed Beetroot Salad with Lemon & Jeera",
      },
      {
        name: "2. Hibiscus Tea (Gudhal Ki Chai)",
        compound: "Delphinidin-3-Sambubioside & Anthocyanins",
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
        description: "Hibiscus calyces contain organic anthocyanins that naturally inhibit ACE (Angiotensin Converting Enzyme) and act as gentle herbal diuretics.",
        benefits: ["Proven in RCTs to reduce systolic BP by 7.2 mmHg", "Clears excess fluid without electrolyte loss", "Potent lipid-lowering antioxidant"],
        bestTime: "Evening (05:00 PM)",
        dosage: "1-2 cups freshly brewed warm or iced tea",
        indianAlternatives: "Arjuna Bark Decoction (Arjuna Kwath)",
      },
    ],
    foodAlternatives: [
      {
        expensiveFood: "Commercial Potassium Supplements",
        indianSubstitute: "Fresh Tender Coconut Water + Guavas & Bananas (₹50)",
        keyBenefit: "Provides 600mg natural bioavailable potassium and magnesium for instant vascular relaxation.",
        costComparison: "Save 80% with organic fruit nutrition",
      },
    ],
    dailyProtocol: [
      {
        time: "08:00 AM",
        action: "1 glass fresh beetroot-amla juice + 20 mins brisk walking",
        benefit: "Triggers rapid endothelial Nitric Oxide production for all-day BP control.",
      },
      {
        time: "05:00 PM",
        action: "1 cup unsweetened Hibiscus or Arjuna tea",
        benefit: "Calms evening arterial tension and supports renal fluid excretion.",
      },
    ],
    faqs: [
      {
        question: "Should I switch from regular table salt to Himalayan Pink Salt or Rock Salt (Sendha Namak)?",
        answer: "While Sendha Namak contains trace minerals, both table salt and rock salt are primarily Sodium Chloride (98%). Total daily sodium intake should stay strictly under 2,000 mg (less than 1 level teaspoon) regardless of the salt variety.",
      },
    ],
    tags: ["Cardiology", "Hypertension", "Blood Pressure", "DASH Diet", "Heart Care", "Beetroot", "Nitric Oxide"],
    likes: 830,
  },
];

const ARTICLES_STORAGE_KEY = "medyora_stored_articles_v3";

export function getStoredArticles(): HealthArticle[] {
  if (typeof window === "undefined") return BASE_HEALTH_ARTICLES;
  try {
    const raw = localStorage.getItem(ARTICLES_STORAGE_KEY);
    if (!raw) return BASE_HEALTH_ARTICLES;
    const parsed = JSON.parse(raw) as HealthArticle[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : BASE_HEALTH_ARTICLES;
  } catch {
    return BASE_HEALTH_ARTICLES;
  }
}

export function publishNewArticle(
  newArticle: Omit<HealthArticle, "id" | "publishedDate" | "likes"> & {
    id?: string;
    publishedDate?: string;
    likes?: number;
  }
): HealthArticle {
  const fullArticle: HealthArticle = {
    ...newArticle,
    id: newArticle.id || `article-${Date.now()}`,
    publishedDate: newArticle.publishedDate || "Just now",
    likes: newArticle.likes ?? 0,
  };
  if (typeof window !== "undefined") {
    const current = getStoredArticles();
    const updated = [fullArticle, ...current.filter((a) => a.id !== fullArticle.id)];
    localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent("medyora:articles-updated"));
  }
  return fullArticle;
}

export const HEALTH_ARTICLES_DATA = BASE_HEALTH_ARTICLES;
