"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PROVINCES, CITIES_BY_PROVINCE } from "@/lib/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

const types = ["Apartamento", "Casa", "Terreno", "Comercial"];

export default function PropertyFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { lang } = useLanguage();

  const currentFilters = {
    province: searchParams.get("province") || "",
    city: searchParams.get("city") || "",
    type: searchParams.get("type") || "",
    listing_type: searchParams.get("listing_type") || "",
    min_price: searchParams.get("min_price") || "",
    max_price: searchParams.get("max_price") || "",
  };

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/listings?${params.toString()}`);
  }

  function clearFilters() {
    router.push("/listings");
  }

  const hasFilters = Object.values(currentFilters).some((v) => v);
  const cities = currentFilters.province ? CITIES_BY_PROVINCE[currentFilters.province] || [] : [];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6 sticky top-24">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <h3 className="font-semibold text-gray-900">{t("filter.filters", lang)}</h3>
        </div>
        {hasFilters && (
          <button onClick={clearFilters} className="text-xs text-primary font-medium hover:underline">
            {t("filter.clear", lang)}
          </button>
        )}
      </div>

      <FilterGroup label={t("filter.province", lang)}>
        <select value={currentFilters.province} onChange={(e) => updateFilter("province", e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer">
          <option value="">{t("filter.allProvinces", lang)}</option>
          {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </FilterGroup>

      <FilterGroup label={t("filter.city", lang)}>
        <select value={currentFilters.city} onChange={(e) => updateFilter("city", e.target.value)}
          disabled={!currentFilters.province}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
          <option value="">{currentFilters.province ? t("filter.allCities", lang) : t("filter.selectProvince", lang)}</option>
          {cities.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </FilterGroup>

      <FilterGroup label={t("filter.type", lang)}>
        <select value={currentFilters.type} onChange={(e) => updateFilter("type", e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer">
          <option value="">{t("filter.all", lang)}</option>
          {types.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </FilterGroup>

      <FilterGroup label={t("filter.purpose", lang)}>
        <select value={currentFilters.listing_type} onChange={(e) => updateFilter("listing_type", e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer">
          <option value="">{t("filter.all", lang)}</option>
          <option value="venda">{t("venda", lang)}</option>
          <option value="arrendamento">{t("arrendamento", lang)}</option>
        </select>
      </FilterGroup>

      <FilterGroup label={t("filter.minPrice", lang)}>
        <input type="number" placeholder="Ex: 1.000.000" value={currentFilters.min_price}
          onChange={(e) => updateFilter("min_price", e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
      </FilterGroup>

      <FilterGroup label={t("filter.maxPrice", lang)}>
        <input type="number" placeholder="Ex: 10.000.000" value={currentFilters.max_price}
          onChange={(e) => updateFilter("max_price", e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      {children}
    </div>
  );
}
