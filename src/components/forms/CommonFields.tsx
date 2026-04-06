"use client";

import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { InputField, SelectField, TextareaField, HoursField } from "@/components/ui/form-fields";

interface CommonFieldsProps {
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  errors?: any;
}

export function CommonFields({ register, watch, errors }: CommonFieldsProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Details</h3>

      <InputField
        label="Business Name"
        name="name"
        placeholder="e.g., Joe's Italian Restaurant"
        register={register}
        error={errors?.name?.message}
        helpText="The official name of your business"
        required
      />

      <TextareaField
        label="Description"
        name="description"
        placeholder="A brief description of your business..."
        register={register}
        error={errors?.description?.message}
        helpText="A short description that will appear in search results (up to 500 characters)"
        rows={3}
      />

      <InputField
        label="Website URL"
        name="url"
        type="url"
        placeholder="https://www.example.com"
        register={register}
        error={errors?.url?.message}
      />

      <InputField
        label="Phone Number"
        name="telephone"
        type="tel"
        placeholder="+1 (555) 123-4567"
        register={register}
        error={errors?.telephone?.message}
      />

      <InputField
        label="Email"
        name="email"
        type="email"
        placeholder="info@example.com"
        register={register}
        error={errors?.email?.message}
      />

      <InputField
        label="Image URL"
        name="image"
        type="url"
        placeholder="https://example.com/logo.jpg"
        register={register}
        error={errors?.image?.message}
        helpText="URL to your business logo or main image"
      />

      <SelectField
        label="Price Range"
        name="priceRange"
        options={[
          { value: "", label: "Select..." },
          { value: "$", label: "$ (Budget)" },
          { value: "$$", label: "$$ (Moderate)" },
          { value: "$$$", label: "$$$ (Upscale)" },
          { value: "$$$$", label: "$$$$ (Luxury)" },
        ]}
        register={register}
        error={errors?.priceRange?.message}
      />

      <div className="border-t border-gray-200 my-6" />

      <h3 className="text-lg font-semibold text-gray-900 mb-4">Address</h3>

      <InputField
        label="Street Address"
        name="address.streetAddress"
        placeholder="123 Main Street"
        register={register}
        error={errors?.address?.streetAddress?.message}
      />

      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="City"
          name="address.addressLocality"
          placeholder="New York"
          register={register}
          error={errors?.address?.addressLocality?.message}
        />
        <InputField
          label="State / Region"
          name="address.addressRegion"
          placeholder="NY"
          register={register}
          error={errors?.address?.addressRegion?.message}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="Postal Code"
          name="address.postalCode"
          placeholder="10001"
          register={register}
          error={errors?.address?.postalCode?.message}
        />
        <InputField
          label="Country Code"
          name="address.addressCountry"
          placeholder="US"
          register={register}
          error={errors?.address?.addressCountry?.message}
          helpText="ISO 3166-1 alpha-2 code"
        />
      </div>

      <div className="border-t border-gray-200 my-6" />

      <HoursField register={register} watch={watch} />
    </div>
  );
}
