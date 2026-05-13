"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import PhotoGallery from "@/components/PhotoGallery";
import type { Property } from "@/lib/types";

export default function PropertyContent({ property }: { property: Property }) {
  const { lang } = useLanguage();

  const formattedPrice = new Intl.NumberFormat(lang === "pt" ? "pt-MZ" : "en-US", {
    style: "currency",
    currency: "MZN",
    minimumFractionDigits: 0,
  }).format(property.price);

  const whatsappMsg = encodeURIComponent(
    `Olá, tenho interesse no imóvel: ${property.title}`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="animate-fade-in">
            <PhotoGallery photos={property.photos} title={property.title} />
          </div>

          <div className="animate-slide-up">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                {t(`type.${property.type}`, lang)}
              </span>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                property.listing_type === "venda" ? "bg-accent-teal/10 text-accent-teal" : "bg-accent-gold/10 text-amber-700"
              }`}>
                {t(property.listing_type, lang)}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">{property.title}</h1>
            <div className="flex items-center gap-2 text-gray-500 mb-4">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{property.city}{property.neighborhood && `, ${property.neighborhood}`}</span>
            </div>
            <p className="text-primary text-3xl sm:text-4xl font-bold mb-8">{formattedPrice}</p>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t("detail.details", lang)}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <DetailCard label={t("detail.area", lang)} value={`${property.size}`} unit="m²" />
              {property.bedrooms > 0 && <DetailCard label={t("detail.bedrooms", lang)} value={`${property.bedrooms}`} />}
              {property.bathrooms > 0 && <DetailCard label={t("detail.bathrooms", lang)} value={`${property.bathrooms}`} />}
              <DetailCard label={t("detail.furnished", lang)} value={property.furnished ? t("detail.yes", lang) : t("detail.no", lang)} />
            </div>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {t("detail.description", lang)}
            </h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{property.description}</p>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-28 animate-slide-up" style={{ animationDelay: "0.15s" }}>
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {t("detail.agent", lang)}
            </h3>
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-50">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent-gold rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-white font-bold text-xl">{property.agent_name.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">{property.agent_name}</p>
                <p className="text-sm text-gray-500">{t("detail.agent.role", lang)}</p>
              </div>
            </div>

            <a href={`https://wa.me/${property.agent_whatsapp}?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3.5 rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 transition-all hover:shadow-lg hover:shadow-green-500/25 active:scale-[0.98]">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t("detail.whatsapp", lang)}
            </a>
            <p className="text-xs text-gray-400 text-center mt-3">{t("detail.whatsapp.hint", lang)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailCard({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 text-center border border-gray-50">
      <p className="text-2xl font-bold text-gray-900">{value}{unit && <span className="text-sm font-normal text-gray-400 ml-0.5">{unit}</span>}</p>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
    </div>
  );
}
