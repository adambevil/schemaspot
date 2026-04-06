"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { BUSINESS_TYPES, getBusinessType, DAYS } from "@/lib/business-types";
import { generateJsonLd, JsonLdOptions } from "@/lib/jsonld-generator";
import { validateJsonLd, ValidationResult } from "@/lib/schema-validator";
import { BusinessTypeSelector } from "@/components/BusinessTypeSelector";
import { CommonFields } from "@/components/forms/CommonFields";
import { SpecificFields } from "@/components/forms/SpecificFields";
import { SchemaOutput } from "@/components/SchemaOutput";

type FormData = Record<string, any>;

const defaultHours = Object.fromEntries(
  DAYS.map((day) => [
    day.value,
    { opens: "09:00", closes: "17:00", closed: day.value === "Saturday" || day.value === "Sunday" },
  ])
);

export default function SchemaGenerator() {
  const [selectedType, setSelectedType] = useState<string>("restaurant");
  const [generatedSchema, setGeneratedSchema] = useState<Record<string, unknown> | null>(null);
  const [validation, setValidation] = useState<ValidationResult | null>(null);

  const businessType = getBusinessType(selectedType);

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: "",
      description: "",
      url: "",
      telephone: "",
      email: "",
      image: "",
      priceRange: "",
      address: {
        streetAddress: "",
        addressLocality: "",
        addressRegion: "",
        postalCode: "",
        addressCountry: "US",
      },
      openingHours: defaultHours,
    },
  });

  const currentOpeningHours = watch("openingHours");

  const handleTypeSelect = (id: string) => {
    setSelectedType(id);
    setGeneratedSchema(null);
    setValidation(null);
  };

  const handleGenerate = (data: FormData) => {
    const openingHours = DAYS.map((day) => ({
      day: day.value,
      opens: currentOpeningHours?.[day.value]?.opens || "09:00",
      closes: currentOpeningHours?.[day.value]?.closes || "17:00",
      closed: !!currentOpeningHours?.[day.value]?.closed,
    }));

    const specificData: Record<string, string> = {};
    if (businessType) {
      [...businessType.specificFields].forEach((field) => {
        specificData[field.name] = String(data[field.name] || "");
      });
    }

    const options: JsonLdOptions = {
      name: data.name || "",
      description: data.description || "",
      url: data.url || "",
      telephone: data.telephone || "",
      email: data.email || "",
      image: data.image || "",
      priceRange: data.priceRange || "",
      address: data.address || {},
      openingHours,
      specificData,
      schemaType: businessType?.schemaType || "LocalBusiness",
    };

    const schema = generateJsonLd(options);
    const result = validateJsonLd(schema);

    setGeneratedSchema(schema);
    setValidation(result);
  };

  const handleReset = () => {
    reset({
      name: "",
      description: "",
      url: "",
      telephone: "",
      email: "",
      image: "",
      priceRange: "",
      address: {
        streetAddress: "",
        addressLocality: "",
        addressRegion: "",
        postalCode: "",
        addressCountry: "US",
      },
      openingHours: defaultHours,
    });
    setGeneratedSchema(null);
    setValidation(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            <span className="text-blue-600">Schema</span>Spot
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Generate valid JSON-LD schema markup for your business. Select your business type, fill in the details, and get structured data that helps search engines understand your business.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <BusinessTypeSelector selected={selectedType} onSelect={handleTypeSelect} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit(handleGenerate)} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <CommonFields register={register} watch={watch} errors={errors} />

              {businessType && businessType.specificFields.length > 0 && (
                <>
                  <div className="border-t border-gray-200 my-6" />
                  <SpecificFields
                    businessTypeId={selectedType}
                    register={register}
                    errors={errors}
                  />
                </>
              )}

              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition duration-200 text-sm"
                >
                  Generate Schema
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition duration-200 text-sm"
                >
                  Clear Form
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Schema</h3>
              {generatedSchema ? (
                <SchemaOutput jsonLd={generatedSchema} validation={validation} />
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  <p className="text-sm">Fill in the form and click &quot;Generate Schema&quot; to see your JSON-LD markup here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
