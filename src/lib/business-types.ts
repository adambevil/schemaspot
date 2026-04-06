export interface BusinessField {
  name: string;
  label: string;
  type: "text" | "tel" | "url" | "email" | "select" | "textarea" | "time" | "day-hours";
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  helpText?: string;
}

export interface BusinessType {
  id: string;
  name: string;
  schemaType: string;
  icon: string;
  description: string;
  commonFields: BusinessField[];
  specificFields: BusinessField[];
}

export interface HoursOfDay {
  day: string;
  opens: string;
  closes: string;
  closed: boolean;
}

export interface Address {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

export interface BaseFormData {
  name: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  image: string;
  priceRange: string;
  address: Address;
  openingHours: HoursOfDay[];
}

export interface GeoCoordinates {
  latitude: string;
  longitude: string;
}

export interface ServiceItem {
  serviceType: string;
  description: string;
}

export interface MenuItem {
  name: string;
  description: string;
  price: string;
}

export interface ReviewItem {
  author: string;
  reviewBody: string;
  rating: string;
}

export const DAYS = [
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
  { value: "Sunday", label: "Sunday" },
];

export const BUSINESS_TYPES: BusinessType[] = [
  {
    id: "restaurant",
    name: "Restaurant",
    schemaType: "Restaurant",
    icon: "🍽️",
    description: "Full-service or fast-food dining establishments",
    commonFields: [],
    specificFields: [
      {
        name: "servesCuisine",
        label: "Cuisine Type",
        type: "text",
        placeholder: "e.g., Italian, Mexican, Japanese",
        required: true,
        helpText: "Type(s) of cuisine served",
      },
      {
        name: "menu",
        label: "Menu URL",
        type: "url",
        placeholder: "https://example.com/menu",
        helpText: "Link to your online menu",
      },
      {
        name: "acceptsReservations",
        label: "Accepts Reservations",
        type: "select",
        options: [
          { value: "", label: "Select..." },
          { value: "True", label: "Yes" },
          { value: "False", label: "No" },
        ],
      },
      {
        name: "menuItems",
        label: "Popular Menu Items (one per line: name | description | price)",
        type: "textarea",
        placeholder: "Pasta Carbonara | Creamy pasta with bacon and parmesan | $14.99\nMargherita Pizza | Fresh mozzarella, basil, tomato | $12.99",
        helpText: "List your top dishes to showcase in search results",
      },
    ],
  },
  {
    id: "medical-clinic",
    name: "Medical Clinic",
    schemaType: "MedicalClinic",
    icon: "🏥",
    description: "Healthcare facilities, clinics, and medical practices",
    commonFields: [],
    specificFields: [
      {
        name: "medicalSpecialty",
        label: "Medical Specialties",
        type: "text",
        placeholder: "e.g., General Practice, Pediatrics, Dermatology",
        required: true,
        helpText: "Specialties offered (comma-separated)",
      },
      {
        name: "availableService",
        label: "Services Offered",
        type: "textarea",
        placeholder: "Annual Checkups\nVaccinations\nBlood Work",
        helpText: "One service per line",
      },
      {
        name: "isAcceptingNewPatients",
        label: "Accepting New Patients",
        type: "select",
        options: [
          { value: "", label: "Select..." },
          { value: "True", label: "Yes" },
          { value: "False", label: "No" },
        ],
      },
    ],
  },
  {
    id: "legal-service",
    name: "Legal Service",
    schemaType: "LegalService",
    icon: "⚖️",
    description: "Law firms, attorneys, and legal practices",
    commonFields: [],
    specificFields: [
      {
        name: "practiceArea",
        label: "Practice Areas",
        type: "text",
        placeholder: "e.g., Family Law, Criminal Defense, Personal Injury",
        required: true,
        helpText: "Areas of practice (comma-separated)",
      },
      {
        name: "availableService",
        label: "Services Offered",
        type: "textarea",
        placeholder: "Consultations\nContract Review\nLitigation",
        helpText: "One service per line",
      },
      {
        name: "attorneys",
        label: "Attorneys (one per line: name | title)",
        type: "textarea",
        placeholder: "Jane Smith | Senior Partner\nJohn Doe | Associate",
        helpText: "List key attorneys at the firm",
      },
    ],
  },
  {
    id: "home-contractor",
    name: "Home Contractor",
    schemaType: "HomeAndConstructionBusiness",
    icon: "🔨",
    description: "Plumbers, electricians, roofers, and general contractors",
    commonFields: [],
    specificFields: [
      {
        name: "trade",
        label: "Trade / Specialty",
        type: "select",
        required: true,
        options: [
          { value: "", label: "Select trade..." },
          { value: "Plumber", label: "Plumber" },
          { value: "Electrician", label: "Electrician" },
          { value: "RoofingContractor", label: "Roofing Contractor" },
          { value: "HVACBusiness", label: "HVAC Contractor" },
          { value: "GeneralContractor", label: "General Contractor" },
          { value: "Painter", label: "Painter" },
          { value: "Landscaping", label: "Landscaper" },
        ],
      },
      {
        name: "availableService",
        label: "Services Offered",
        type: "textarea",
        placeholder: "Emergency Repairs\nInstallation\nMaintenance",
        helpText: "One service per line",
      },
      {
        name: "serviceArea",
        label: "Service Area",
        type: "text",
        placeholder: "e.g., Los Angeles County, Orange County",
        helpText: "Geographic areas where services are provided",
      },
    ],
  },
  {
    id: "retail-store",
    name: "Retail Store",
    schemaType: "Store",
    icon: "🛍️",
    description: "Physical retail locations and shops",
    commonFields: [],
    specificFields: [
      {
        name: "storeType",
        label: "Store Type",
        type: "select",
        required: true,
        options: [
          { value: "", label: "Select type..." },
          { value: "ClothingStore", label: "Clothing Store" },
          { value: "ElectronicsStore", label: "Electronics Store" },
          { value: "GroceryStore", label: "Grocery Store" },
          { value: "FurnitureStore", label: "Furniture Store" },
          { value: "SportingGoodsStore", label: "Sporting Goods Store" },
          { value: "HardwareStore", label: "Hardware Store" },
          { value: "AutoPartsStore", label: "Auto Parts Store" },
        ],
      },
      {
        name: "currenciesAccepted",
        label: "Currencies Accepted",
        type: "text",
        placeholder: "e.g., USD, EUR",
        helpText: "Currency codes (comma-separated)",
      },
      {
        name: "paymentAccepted",
        label: "Payment Methods",
        type: "text",
        placeholder: "e.g., Cash, Credit Card, Mobile Payment",
        helpText: "Accepted payment methods",
      },
    ],
  },
  {
    id: "auto-repair",
    name: "Auto Repair Shop",
    schemaType: "AutoRepair",
    icon: "🔧",
    description: "Mechanics, auto repair, and car service centers",
    commonFields: [],
    specificFields: [
      {
        name: "availableService",
        label: "Services Offered",
        type: "textarea",
        placeholder: "Oil Change\nBrake Repair\nEngine Diagnostics",
        helpText: "One service per line",
      },
      {
        name: "brands",
        label: "Car Brands Specialized",
        type: "text",
        placeholder: "e.g., Toyota, BMW, Ford (or 'All Makes')",
        helpText: "Brands you specialize in or service",
      },
      {
        name: "servicesOffered",
        label: "Additional Services Notes",
        type: "textarea",
        placeholder: "Free estimates on most repairs\nCertified ASE technicians",
        helpText: "Any additional service notes",
      },
    ],
  },
  {
    id: "beauty-salon",
    name: "Beauty Salon / Spa",
    schemaType: "BeautySalon",
    icon: "💅",
    description: "Hair salons, nail salons, spas, and beauty services",
    commonFields: [],
    specificFields: [
      {
        name: "salonType",
        label: "Salon Type",
        type: "select",
        options: [
          { value: "", label: "Select type..." },
          { value: "HairSalon", label: "Hair Salon" },
          { value: "NailSalon", label: "Nail Salon" },
          { value: "DaySpa", label: "Day Spa" },
          { value: "BeautySalon", label: "Beauty Salon (General)" },
        ],
        required: true,
      },
      {
        name: "availableService",
        label: "Services Offered",
        type: "textarea",
        placeholder: "Haircuts & Styling\nColor & Highlights\nFacials\nManicures",
        helpText: "One service per line",
      },
      {
        name: "priceRange",
        label: "Price Range Indicator",
        type: "select",
        options: [
          { value: "", label: "Select..." },
          { value: "$", label: "$ (Budget)" },
          { value: "$$", label: "$$ (Moderate)" },
          { value: "$$$", label: "$$$ (Upscale)" },
          { value: "$$$$", label: "$$$$ (Luxury)" },
        ],
        helpText: "Helps customers understand your pricing tier",
      },
      {
        name: "bookingUrl",
        label: "Booking URL",
        type: "url",
        placeholder: "https://example.com/book",
        helpText: "Link to your online booking system",
      },
    ],
  },
  {
    id: "fitness-center",
    name: "Fitness Center / Gym",
    schemaType: "SportsActivityLocation",
    icon: "🏋️",
    description: "Gyms, fitness studios, yoga centers, and sports facilities",
    commonFields: [],
    specificFields: [
      {
        name: "activityType",
        label: "Primary Activity Type",
        type: "select",
        options: [
          { value: "", label: "Select type..." },
          { value: "Gym", label: "Gym / Fitness Center" },
          { value: "YogaStudio", label: "Yoga Studio" },
          { value: "MartialArtsSchool", label: "Martial Arts" },
          { value: "SwimmingPool", label: "Swimming Pool" },
          { value: "TennisComplex", label: "Tennis Facility" },
        ],
        required: true,
      },
      {
        name: "availableService",
        label: "Services & Classes",
        type: "textarea",
        placeholder: "Personal Training\nGroup Fitness Classes\nYoga\nCrossFit",
        helpText: "One class or service per line",
      },
      {
        name: "membershipTypes",
        label: "Membership Options",
        type: "text",
        placeholder: "e.g., Monthly, Annual, Day Pass, Drop-In",
        helpText: "Available membership types",
      },
    ],
  },
  {
    id: "professional-service",
    name: "Professional Service",
    schemaType: "ProfessionalService",
    icon: "💼",
    description: "Accounting, consulting, marketing agencies, and other professional offices",
    commonFields: [],
    specificFields: [
      {
        name: "serviceCategory",
        label: "Service Category",
        type: "select",
        required: true,
        options: [
          { value: "", label: "Select category..." },
          { value: "AccountingService", label: "Accounting / Tax" },
          { value: "BusinessConsultant", label: "Business Consultant" },
          { value: "MarketingAgency", label: "Marketing Agency" },
          { value: "RealEstateAgent", label: "Real Estate Agent" },
          { value: "FinancialService", label: "Financial Service" },
          { value: "InsuranceAgency", label: "Insurance Agency" },
          { value: "GeneralService", label: "Other Professional Service" },
        ],
      },
      {
        name: "availableService",
        label: "Services Offered",
        type: "textarea",
        placeholder: "Tax Preparation\nFinancial Planning\nAudit Services",
        helpText: "One service per line",
      },
      {
        name: "certifications",
        label: "Certifications & Credentials",
        type: "text",
        placeholder: "e.g., CPA, CFA, Certified",
        helpText: "Professional credentials (comma-separated)",
      },
    ],
  },
  {
    id: "hotel",
    name: "Hotel / Lodging",
    schemaType: "Hotel",
    icon: "🏨",
    description: "Hotels, motels, bed & breakfasts, and vacation rentals",
    commonFields: [],
    specificFields: [
      {
        name: "starRating",
        label: "Star Rating",
        type: "select",
        required: true,
        options: [
          { value: "", label: "Select..." },
          { value: "1", label: "1 Star" },
          { value: "2", label: "2 Stars" },
          { value: "3", label: "3 Stars" },
          { value: "4", label: "4 Stars" },
          { value: "5", label: "5 Stars" },
        ],
      },
      {
        name: "availableLanguage",
        label: "Languages Spoken",
        type: "text",
        placeholder: "e.g., English, Spanish, French",
        helpText: "Languages available at the property",
      },
      {
        name: "amenities",
        label: "Amenities",
        type: "textarea",
        placeholder: "Free WiFi\nSwimming Pool\nFitness Center\nPet Friendly\nRoom Service",
        helpText: "One amenity per line",
      },
      {
        name: "bookingUrl",
        label: "Booking URL",
        type: "url",
        placeholder: "https://example.com/reservations",
        helpText: "Link to your reservation page",
      },
      {
        name: "numberOfRooms",
        label: "Number of Rooms",
        type: "text",
        placeholder: "e.g., 50",
        helpText: "Total number of rooms",
      },
    ],
  },
];

export function getBusinessType(id: string): BusinessType | undefined {
  return BUSINESS_TYPES.find((bt) => bt.id === id);
}
