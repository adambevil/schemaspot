export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  severity: "error" | "warning";
}

const SCHEMA_TYPES = [
  "Restaurant", "MedicalClinic", "LegalService", "HomeAndConstructionBusiness",
  "Store", "AutoRepair", "BeautySalon", "HairSalon", "NailSalon", "DaySpa",
  "SportsActivityLocation", "Gym", "YogaStudio", "MartialArtsSchool",
  "SwimmingPool", "TennisComplex", "ProfessionalService", "AccountingService",
  "BusinessConsultant", "RealEstateAgent", "FinancialService", "InsuranceAgency",
  "Hotel", "ClothingStore", "ElectronicsStore", "GroceryStore", "FurnitureStore",
  "SportingGoodsStore", "HardwareStore", "AutoPartsStore", "Plumber",
  "Electrician", "RoofingContractor", "HVACBusiness", "GeneralContractor",
  "Painter", "Landscaping",
];

export function validateJsonLd(schema: Record<string, unknown>): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  if (!schema["@context"]) {
    errors.push({ field: "@context", message: "Missing @context. Must be 'https://schema.org'", severity: "error" });
  } else if (schema["@context"] !== "https://schema.org") {
    errors.push({ field: "@context", message: "@context must be 'https://schema.org'", severity: "error" });
  }

  if (!schema["@type"]) {
    errors.push({ field: "@type", message: "Missing @type. Must be a valid schema.org type", severity: "error" });
  } else if (!SCHEMA_TYPES.includes(schema["@type"] as string)) {
    warnings.push({ field: "@type", message: `Type '${schema["@type"]}' may not be a standard schema.org type`, severity: "warning" });
  }

  if (!schema.name) {
    warnings.push({ field: "name", message: "Missing business name. Add a name for better search visibility", severity: "warning" });
  }

  if (schema.url) {
    try {
      new URL(schema.url as string);
    } catch {
      errors.push({ field: "url", message: "URL is not valid", severity: "error" });
    }
  } else {
    warnings.push({ field: "url", message: "Missing business URL", severity: "warning" });
  }

  if (schema.telephone) {
    const phone = schema.telephone as string;
    if (!/^[\+]?[\d\s\-\(\)]{7,20}$/.test(phone)) {
      warnings.push({ field: "telephone", message: "Phone number format may be invalid", severity: "warning" });
    }
  } else {
    warnings.push({ field: "telephone", message: "Missing phone number", severity: "warning" });
  }

  if (schema.address) {
    const addr = schema.address as Record<string, unknown>;
    if (addr["@type"] !== "PostalAddress") {
      errors.push({ field: "address", message: "Address should have @type 'PostalAddress'", severity: "error" });
    }
  } else {
    warnings.push({ field: "address", message: "Missing address. Local businesses should have an address for local SEO", severity: "warning" });
  }

  const typesNeedingPriceRange = ["Restaurant", "BeautySalon", "HairSalon", "NailSalon", "DaySpa", "Hotel"];
  if (typesNeedingPriceRange.includes(schema["@type"] as string) && !schema.priceRange) {
    warnings.push({ field: "priceRange", message: "Missing price range. Useful for search results display", severity: "warning" });
  }

  if (schema.openingHoursSpecification) {
    const hours = schema.openingHoursSpecification as unknown[];
    if (!Array.isArray(hours) || hours.length === 0) {
      warnings.push({ field: "openingHoursSpecification", message: "Opening hours should be a non-empty array", severity: "warning" });
    }
  }

  if (schema["@type"] === "Restaurant" && !schema.servesCuisine) {
    warnings.push({ field: "servesCuisine", message: "Missing cuisine type", severity: "warning" });
  }

  if (schema["@type"] === "Hotel" && !schema.starRating) {
    warnings.push({ field: "starRating", message: "Missing star rating", severity: "warning" });
  }

  return { isValid: errors.length === 0, errors, warnings };
}
