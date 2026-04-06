"use client";

import { BUSINESS_TYPES, BusinessType } from "@/lib/business-types";

interface BusinessTypeSelectorProps {
  selected: string;
  onSelect: (id: string) => void;
}

export function BusinessTypeSelector({ selected, onSelect }: BusinessTypeSelectorProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Select Business Type</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {BUSINESS_TYPES.map((bt) => (
          <button
            key={bt.id}
            onClick={() => onSelect(bt.id)}
            className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 text-center
              ${selected === bt.id
                ? "border-blue-500 bg-blue-50 shadow-sm ring-1 ring-blue-200"
                : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
              }`}
            title={bt.description}
          >
            <span className="text-xl mb-1 flex-shrink-0">{bt.icon}</span>
            <span className={`text-[10px] font-medium leading-tight ${selected === bt.id ? "text-blue-700" : "text-gray-700"}`}>
              {bt.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
