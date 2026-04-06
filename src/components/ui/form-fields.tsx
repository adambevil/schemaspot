import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: any;
  error?: string;
  helpText?: string;
  required?: boolean;
}

export function InputField({ label, name, type = "text", placeholder, register, error, helpText, required }: InputFieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition
          ${error ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"}`}
      />
      {helpText && !error && <p className="mt-1 text-xs text-gray-500">{helpText}</p>}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  register: any;
  error?: string;
  helpText?: string;
  required?: boolean;
}

export function SelectField({ label, name, options, register, error, helpText, required }: SelectFieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        {...register(name)}
        className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white
          ${error ? "border-red-400 bg-red-50" : "border-gray-300"}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {helpText && !error && <p className="mt-1 text-xs text-gray-500">{helpText}</p>}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

interface TextareaFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  register: any;
  error?: string;
  helpText?: string;
  rows?: number;
}

export function TextareaField({ label, name, placeholder, register, error, helpText, rows = 4 }: TextareaFieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        id={name}
        placeholder={placeholder}
        rows={rows}
        {...register(name)}
        className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition font-mono
          ${error ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"}`}
      />
      {helpText && !error && <p className="mt-1 text-xs text-gray-500">{helpText}</p>}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

interface HoursFieldProps {
  register: any;
  watch: any;
}

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function HoursField({ register, watch }: HoursFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">Opening Hours</label>
      <div className="space-y-2">
        {DAYS.map((day) => {
          const closedField = `openingHours.${day}.closed`;
          const isClosed = watch(closedField);
          return (
            <div key={day} className="flex items-center gap-2">
              <span className="w-24 text-sm text-gray-600">{day}</span>
              <label className="flex items-center gap-1 text-xs text-gray-500">
                <input type="checkbox" {...register(closedField)} className="rounded" />
                Closed
              </label>
              {!isClosed && (
                <>
                  <input
                    type="time"
                    {...register(`openingHours.${day}.opens`)}
                    defaultValue="09:00"
                    className="w-28 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <span className="text-gray-400">to</span>
                  <input
                    type="time"
                    {...register(`openingHours.${day}.closes`)}
                    defaultValue="17:00"
                    className="w-28 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
