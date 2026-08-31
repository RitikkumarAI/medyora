/**
 * Medical Schema.org JSON-LD Component for SEO & Rich Search Snippets
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
  type = "MedicalOrganization",
  doctorName,
  specialty,
  rating = 4.9,
  reviewCount = 12450,
  city = "Bengaluru",
}: MedicalSchemaProps) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: "Medyora",
    url: "https://medyora.com",
    logo: "https://medyora.com/Logo.webp",
    description:
      "Enterprise healthcare platform for instant doctor discovery, verified booking, and real-time clinic queue management.",
    telephone: "+91-800-MEDYORA",
    medicalSpecialty: [
      "Cardiology",
      "Dermatology",
      "Paediatrics",
      "Dentistry",
      "General Medicine",
      "Orthopaedics",
      "Neurology",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "12500",
      bestRating: "5",
      worstRating: "1",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: city,
      addressCountry: "IN",
    },
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
