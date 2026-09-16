export interface ArticlePreview {
  id: string;
  title: string;
  summary: string;
  category: string;
  readTime: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

export const FEATURED_ARTICLE_PREVIEWS: ArticlePreview[] = [
  {
    id: "10-superfoods-for-heart-health",
    title: "10 Superfoods for Better Heart Health & Lowering Bad Cholesterol",
    summary:
      "Evidence-based cardiology guide on dietary antioxidants, plant sterols, omega-3 fatty acids, and soluble fiber that actively protect heart valves.",
    category: "Heart Health",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=600&q=80",
    author: {
      name: "Dr. Rajesh Sharma",
      role: "Senior Interventional Cardiologist",
      avatar:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: "10-essential-micronutrients-vitamins-immunity",
    title: "10 Essential Micronutrients & Vitamins for Daily Immunity & Energy",
    summary:
      "A clinical physician's breakdown of Vitamin D3, B12, Zinc, Magnesium, and vital trace minerals essential for optimal cellular immunity and stamina.",
    category: "Nutrition",
    readTime: "7 min",
    image:
      "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=600&q=80",
    author: {
      name: "Dr. Anand Deshmukh",
      role: "Consultant Physician & Diabetologist",
      avatar:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: "reversing-early-prediabetes-nutrition-plan",
    title: "Reversing Early Pre-Diabetes: Doctor-Approved 30-Day Nutrition Plan",
    summary:
      "A structured clinical metabolic protocol to lower HbA1c, restore insulin sensitivity, and prevent progression to Type-2 Diabetes.",
    category: "Diabetes",
    readTime: "8 min",
    image:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&q=80",
    author: {
      name: "Dr. Anand Deshmukh",
      role: "Consultant Physician & Diabetologist",
      avatar:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: "5-dietary-habits-for-pcos-thyroid-balance",
    title: "5 Essential Dietary Habits for PCOS & Thyroid Balance",
    summary:
      "A gynecologist and endocrinologist's hormonal nutrition guide to manage irregular cycles, insulin surges, and fatigue.",
    category: "Women's Health",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80",
    author: {
      name: "Dr. Priya Patel",
      role: "Senior Consultant Obstetrician & Gynecologist",
      avatar:
        "https://images.unsplash.com/photo-1594824813589-3221e330be1e?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: "child-nutrition-immunity-fever-guide",
    title: "Complete Guide to Child Nutrition, Immunity & Managing Seasonal Fevers",
    summary:
      "A pediatrician's actionable roadmap for parents: essential brain-building nutrients and building strong gut immunity.",
    category: "Pediatrics",
    readTime: "7 min",
    image:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
    author: {
      name: "Dr. Anjali Mehta",
      role: "Senior Consultant Pediatrician",
      avatar:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80",
    },
  },
];
