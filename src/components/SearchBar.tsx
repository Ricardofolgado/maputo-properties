"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PROVINCES } from "@/lib/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

export default function SearchBar() {
  const router = useRouter();
  const { lang } = useLanguage();
  const [search, setSearch] = useState({
    province: "",
    type: "",
    listing_type: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.province) params.set("province", search.province);
    if (search.type) params.set("type", search.type);
    if (search.listing_type) params.set("listing_type", search.listing_type);
    const qs = params.toString();
    router.push(qs ? `/listings?${qs}` : "/listings");
  }

  return (
    <form onSubmit={handleSubmit} className="relative animate-slide-up">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl shadow-black/10 p-3 sm:p-4 max-w-4xl mx-auto -mb-24 relative z-10 border border-white/20">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <select
              value={search.province}
              onChange={(e) => setSearch({ ...search, province: e.target.value })}
              className="w-full pl-10 pr-4 py-3 rounded-xl border-0 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer text-sm"
            >
              <option value="">{t("hero.search.city", lang)}</option>
              {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <select
              value={search.type}
              onChange={(e) => setSearch({ ...search, type: e.target.value })}
              className="w-full pl-10 pr-4 py-3 rounded-xl border-0 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer text-sm"
            >
              <option value="">{t("hero.search.type", lang)}</option>
              <option value="Apartamento">{t("type.Apartamento", lang)}</option>
              <option value="Casa">{t("type.Casa", lang)}</option>
              <option value="Terreno">{t("type.Terreno", lang)}</option>
              <option value="Comercial">{t("type.Comercial", lang)}</option>
            </select>
          </div>

          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <select
              value={search.listing_type}
              onChange={(e) => setSearch({ ...search, listing_type: e.target.value })}
              className="w-full pl-10 pr-4 py-3 rounded-xl border-0 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer text-sm"
            >
              <option value="">{t("hero.search.purpose", lang)}</option>
              <option value="venda">{t("venda", lang)}</option>
              <option value="arrendamento">{t("arrendamento", lang)}</option>
            </select>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-[0.98] text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {t("hero.search.btn", lang)}
          </button>
        </div>
      </div>
    </form>
  );
}
