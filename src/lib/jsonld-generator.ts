import { HoursOfDay, Address } from "./business-types";

export interface JsonLdOptions {
  name: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  image: string;
  priceRange: string;
  address: Address;
  openingHours: HoursOfDay[];
  specificData: Record<string, string>;
  schemaType: string;
}

function buildAddress(address: Address): Record<string, unknown> | undefined {
  const parts: string[] = [];
  if (address.streetAddress) parts.push(address.streetAddress);
  if (address.addressLocality) parts.push(address.addressLocality);
  if (address.addressRegion) parts.push(address.addressRegion);
  if (address.postalCode) parts.push(address.postalCode);
  if (address.addressCountry) {
    return {
      "@type": "PostalAddress",
      streetAddress: address.streetAddress || undefined,
      addressLocality: address.addressLocality || undefined,
      addressRegion: address.addressRegion || undefined,
      postalCode: address.postalCode || undefined,
      addressCountry: address.addressCountry || undefined,
    };
  } else if (parts.length > 0) {
    return {
      "@type": "PostalAddress",
      addressLocality: address.addressLocality || undefined,
      addressRegion: address.addressRegion || undefined,
      addressCountry: "US",
    };
  }
  return undefined;
}

function buildOpeningHours(openingHours: HoursOfDay[]): string[] {
  return openingHours
    .filter((h) => !h.closed && h.opens && h.closes)
    .map((h) => {
      const dayMap: Record<string, string> = {
        Monday: "Mo",
        Tuesday: "Tu",
        Wednesday: "We",
        Thursday: "Th",
        Friday: "Fr",
        Saturday: "Sa",
        Sunday: "Su",
      };
      const shortDay = dayMap[h.day] || h.day.slice(0, 2);
      const formatTime = (t: string) => t.replace(":", "");
      return `${shortDay} ${formatTime(h.opens)}-${formatTime(h.closes)}`;
    });
}

function parseMenuItems(text: string): { "@type": string; name: string; description: string; offers: { "@type": string; price: string } }[] | undefined {
  if (!text.trim()) return undefined;
  return text
    .split("\n")
    .filter((line) => line.includes("|"))
    .map((line) => {
      const parts = line.split("|").map((p) => p.trim());
      return {
        "@type": "MenuItem",
        name: parts[0] || "",
        description: parts[1] || "",
        offers: {
          "@type": "Offer",
          price: parts[2] || "",
        },
      };
    })
    .filter((item) => item.name);
}

function parseLines(text: string): string[] {
  if (!text.trim()) return [];
  return text.split("\n").map((l) => l.trim()).filter(Boolean);
}

export function generateJsonLd(options: JsonLdOptions): Record<string, unknown> {
  const {
    name,
    description,
    url,
    telephone,
    email,
    image,
    priceRange,
    address,
    openingHours,
    specificData,
    schemaType,
  } = options;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": schemaType,
  };

  // Base fields
  if (name) schema.name = name;
  if (description) schema.description = description;
  if (url) schema.url = url;
  if (telephone) schema.telephone = telephone;
  if (email) schema.email = email;
  if (image) schema.image = image;
  if (priceRange) schema.priceRange = priceRange;

  // Address
  const addressData = buildAddress(address);
  if (addressData) schema.address = addressData;

  // Opening hours
  const hours = buildOpeningHours(openingHours);
  if (hours.length > 0) schema.openingHoursSpecification = hours.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.slice(0, 2),
    opens: h.slice(3, 8),
    closes: h.slice(9),
  }));

  // Type-specific fields
  // Restaurant
  if (schemaType === "Restaurant") {
    if (specificData.servesCuisine) schema.servesCuisine = parseLines(specificData.servesCuisine);
    if (specificData.menu) schema.menu = specificData.menu;
    if (specificData.acceptsReservations) schema.acceptsReservations = specificData.acceptsReservations;
    const menuItems = parseMenuItems(specificData.menuItems || "");
    if (menuItems && menuItems.length > 0) schema.hasMenu = { "@type": "Menu", hasMenuSection: menuItems };
  }

  // Medical Clinic
  if (schemaType === "MedicalClinic") {
    if (specificData.medicalSpecialty) schema.medicalSpecialty = parseLines(specificData.medicalSpecialty);
    if (specificData.availableService) {
      schema.medicalSpecialty = schema.medicalSpecialty || [];
      const services = parseLines(specificData.availableService);
      if (Array.isArray(schema.medicalSpecialty)) {
        (schema.medicalSpecialty as unknown[]).push(...services);
      }
    }
    if (specificData.isAcceptingNewPatients) schema.isAcceptingNewPatients = specificData.isAcceptingNewPatients === "True";
  }

  // Legal Service
  if (schemaType === "LegalService") {
    if (specificData.practiceArea) schema.areaServed = { "@type": "Place", name: specificData.practiceArea };
    if (specificData.availableService) schema.knowsAbout = parseLines(specificData.availableService);
  }

  // Home Contractor
  if (schemaType === "HomeAndConstructionBusiness") {
    if (specificData.trade) schema.additionalProperty = { "@type": "PropertyValue", name: "Trade", value: specificData.trade };
    if (specificData.availableService) schema.availableService = parseLines(specificData.availableService).map((s) => ({ "@type": "Service", serviceType: s }));
    if (specificData.serviceArea) schema.areaServed = { "@type": "Place", name: specificData.serviceArea };
  }

  // Retail Store
  if (schemaType === "Store") {
    if (specificData.storeType) schema["@type"] = specificData.storeType;
    if (specificData.currenciesAccepted) schema.currenciesAccepted = specificData.currenciesAccepted;
    if (specificData.paymentAccepted) schema.paymentAccepted = specificData.paymentAccepted;
  }

  // Auto Repair
  if (schemaType === "AutoRepair") {
    if (specificData.availableService) schema.availableService = parseLines(specificData.availableService).map((s) => ({ "@type": "Service", serviceType: s }));
    if (specificData.brands) schema.brand = parseLines(specificData.brands).map((b) => ({ "@type": "Brand", name: b }));
    if (specificData.servicesOffered) schema.additionalProperty = { "@type": "PropertyValue", name: "Service Notes", value: specificData.servicesOffered };
  }

  // Beauty Salon
  if (schemaType === "BeautySalon") {
    if (specificData.salonType) schema["@type"] = specificData.salonType;
    if (specificData.availableService) schema.availableService = parseLines(specificData.availableService).map((s) => ({ "@type": "Service", serviceType: s }));
    if (specificData.bookingUrl) schema.potentialAction = { "@type": "ReserveAction", target: { "@type": "EntryPoint", urlTemplate: specificData.bookingUrl } };
  }

  // Fitness Center
  if (schemaType === "SportsActivityLocation") {
    if (specificData.activityType) schema["@type"] = specificData.activityType;
    if (specificData.availableService) schema.availableService = parseLines(specificData.availableService).map((s) => ({ "@type": "Service", serviceType: s }));
    if (specificData.membershipTypes) schema.additionalProperty = { "@type": "PropertyValue", name: "Membership Types", value: specificData.membershipTypes };
  }

  // Professional Service
  if (schemaType === "ProfessionalService") {
    if (specificData.serviceCategory) schema.additionalProperty = { "@type": "PropertyValue", name: "Category", value: specificData.serviceCategory };
    if (specificData.availableService) schema.availableService = parseLines(specificData.availableService).map((s) => ({ "@type": "Service", serviceType: s }));
    if (specificData.certifications) schema.hasCredential = parseLines(specificData.certifications).map((c) => ({ "@type": "EducationalOccupationalCredential", credentialCategory: c }));
  }

  // Hotel
  if (schemaType === "Hotel") {
    if (specificData.starRating) {
      schema.starRating = {
        "@type": "Rating",
        ratingValue: specificData.starRating,
        bestRating: "5",
        worstRating: "1",
      };
    }
    if (specificData.availableLanguage) schema.availableLanguage = parseLines(specificData.availableLanguage);
    if (specificData.amenities) schema.amenityFeature = parseLines(specificData.amenities).map((a) => ({ "@type": "LocationFeatureSpecification", name: a }));
    if (specificData.bookingUrl) schema.potentialAction = { "@type": "ReserveAction", target: { "@type": "EntryPoint", urlTemplate: specificData.bookingUrl } };
    if (specificData.numberOfRooms) schema.numberOfRooms = parseInt(specificData.numberOfRooms, 10) || specificData.numberOfRooms;
  }

  return schema;
}
