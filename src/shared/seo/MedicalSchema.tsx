/**
 * World-Class Medical Schema.org JSON-LD Component for Top-Tier Google Search Visibility & Rich Snippets
 */

interface MedicalSchemaProps {
  type?: "MedicalOrganization" | "Physician" | "MedicalWebPage";
  doctorName?: string;
  specialty?: string;
  rating?: number;
  reviewCount?: number;
  city?: string;
}

export function MedicalSchema({
  doctorName,
  specialty,
  rating = 4.9,
  reviewCount = 12500,
  city = "Bengaluru",
}: MedicalSchemaProps) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: "Medyora",
    legalName: "Medyora Healthcare Platform",
    alternateName: "Medyora by Binarize Technologies",
    url: "https://medyora.com",
    logo: "https://medyora.com/Logo.webp",
    image: "https://medyora.com/medyora-logo.webp",
    description:
      "Medyora is an enterprise healthcare super-app developed and maintained by Binarize Technologies for instant doctor discovery, verified appointments, live queue tracking, and digital prescriptions.",
    telephone: "+91-800-MEDYORA",
    email: "support@medyora.com",
    parentOrganization: {
      "@type": "Organization",
      name: "Binarize Technologies",
      url: "https://binarizetechnologies.com",
    },
    founder: {
      "@type": "Organization",
      name: "Binarize Technologies",
    },
    medicalSpecialty: [
      "Cardiology",
      "Dermatology",
      "Paediatrics",
      "Dentistry",
      "General Medicine",
      "Orthopaedics",
      "Neurology",
      "Gynaecology",
      "ENT Specialist",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: reviewCount.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: city,
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    sameAs: [
      "https://twitter.com/medyora",
      "https://linkedin.com/company/binarize-technologies",
      "https://github.com/RitikkumarAI/medyora",
    ],
  };

  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Medyora Health",
    operatingSystem: "All, iOS, Android, Web",
    applicationCategory: "MedicalApplication",
    applicationSubCategory: "Healthcare Booking & Queue Management",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    author: {
      "@type": "Organization",
      name: "Binarize Technologies",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "12840",
      bestRating: "5",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How can I book an instant verified doctor appointment on Medyora?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Search for your required speciality or doctor name, pick an available in-clinic or video consultation time slot, and confirm instantly with zero booking fees.",
        },
      },
      {
        "@type": "Question",
        name: "How does Medyora Live Clinic Queue tracking work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Medyora connects directly to clinic token management systems in real-time, allowing you to track your live queue position and estimated doctor consultation time from your mobile device.",
        },
      },
      {
        "@type": "Question",
        name: "Who developed and maintains the Medyora Healthcare platform?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Medyora is developed, engineered, and maintained by Binarize Technologies as a next-generation healthcare platform.",
        },
      },
    ],
  };

  const doctorSchema = doctorName
    ? {
        "@context": "https://schema.org",
        "@type": "Physician",
        name: doctorName,
        medicalSpecialty: specialty,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: rating.toString(),
          reviewCount: reviewCount.toString(),
        },
      }
    : null;

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Medyora",
    url: "https://medyora.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://medyora.com/doctors?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {doctorSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(doctorSchema) }}
        />
      )}
    </>
  );
}
