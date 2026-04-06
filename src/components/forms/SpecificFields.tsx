"use client";

import { UseFormRegister } from "react-hook-form";
import { BusinessField, getBusinessType } from "@/lib/business-types";
import { InputField, SelectField, TextareaField } from "@/components/ui/form-fields";

interface SpecificFieldsProps {
  businessTypeId: string;
  register: UseFormRegister<any>;
  errors?: any;
}

function renderField(field: BusinessField, register: UseFormRegister<any>, error?: string) {
  switch (field.type) {
    case "select":
      return (
        <SelectField
          key={field.name}
          label={field.label}
          name={field.name}
          options={field.options || []}
          register={register}
          error={error}
          helpText={field.helpText}
          required={field.required}
        />
      );
    case "textarea":
      return (
        <TextareaField
          key={field.name}
          label={field.label}
          name={field.name}
          placeholder={field.placeholder}
          register={register}
          error={error}
          helpText={field.helpText}
          rows={field.name === "availableService" || field.name === "amenities" ? 5 : 4}
        />
      );
    default:
      return (
        <InputField
          key={field.name}
          label={field.label}
          name={field.name}
          type={field.type}
          placeholder={field.placeholder}
          register={register}
          error={error}
          helpText={field.helpText}
          required={field.required}
        />
      );
  }
}

export function SpecificFields({ businessTypeId, register, errors }: SpecificFieldsProps) {
  const businessType = getBusinessType(businessTypeId);
  if (!businessType || businessType.specificFields.length === 0) return null;

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{businessType.name} Details</h3>
      {businessType.specificFields.map((field) => {
        const error = errors?.[field.name]?.message;
        return renderField(field, register, error);
      })}
    </div>
  );
}
