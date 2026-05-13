"use client";

import Logo from "./Logo";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

export default function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Logo size="md" />
            <p className="text-sm text-gray-500 mt-4 leading-relaxed max-w-xs">
              {t("footer.desc", lang)}
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t("footer.quickLinks", lang)}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/listings" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full" />
                  {t("footer.allProperties", lang)}
                </a>
              </li>
              <li>
                <a href="/cadastrar" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full" />
                  {t("footer.listProperty", lang)}
                </a>
              </li>
              <li>
                <a href="/listings?city=Maputo" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full" />
                  {t("footer.propertiesIn", lang, "Maputo")}
                </a>
              </li>
              <li>
                <a href="/listings?city=Matola" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full" />
                  {t("footer.propertiesIn", lang, "Matola")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t("footer.propertyTypes", lang)}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/listings?type=Apartamento" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full" />
                  {t("type.Apartamento", lang)}
                </a>
              </li>
              <li>
                <a href="/listings?type=Casa" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full" />
                  {t("type.Casa", lang)}
                </a>
              </li>
              <li>
                <a href="/listings?type=Terreno" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full" />
                  {t("type.Terreno", lang)}
                </a>
              </li>
              <li>
                <a href="/listings?type=Comercial" className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full" />
                  {t("type.Comercial", lang)}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t("footer.contact", lang)}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-gray-400">
                <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@maputoproperties.co.mz
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Maputo, Moçambique
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Maputo Properties. {t("footer.rights", lang)}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-600">{t("footer.madeWith", lang)}</span>
            <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span className="text-xs text-gray-600">{t("footer.inMozambique", lang)}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
