"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "@/components/PropertyFilters";
import type { Property } from "@/lib/types";

interface ListingsContentProps {
  properties: Property[];
  errorMsg: string;
  filtersApplied: boolean;
}

export default function ListingsContent({ properties, errorMsg, filtersApplied }: ListingsContentProps) {
  const { lang } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t("listings.title", lang)}</h1>
        <p className="text-gray-500 mt-1">
          {errorMsg
            ? t("listings.notConfigured", lang)
            : properties.length === 1
              ? t("listings.found", lang, String(properties.length))
              : t("listings.found.plural", lang, String(properties.length))}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-72 flex-shrink-0">
          <PropertyFilters />
        </aside>

        <div className="flex-1 min-w-0">
          {errorMsg ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl">
              <p className="text-gray-500">{errorMsg}</p>
            </div>
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-2xl">
              <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-600 mb-2">{t("listings.empty.title", lang)}</h3>
              <p className="text-gray-400">{t("listings.empty.desc", lang)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
