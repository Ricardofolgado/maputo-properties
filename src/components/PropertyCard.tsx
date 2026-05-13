import Link from "next/link";
import type { Property } from "@/lib/types";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const photo = property.photos?.[0] || "/placeholder.svg";
  const formattedPrice = new Intl.NumberFormat("pt-MZ", {
    style: "currency",
    currency: "MZN",
    minimumFractionDigits: 0,
  }).format(property.price);

  const whatsappMsg = encodeURIComponent(
    `Olá, tenho interesse no imóvel: ${property.title}`
  );

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <Link href={`/imovel/${property.id}`}>
        <div className="relative h-52 bg-gray-100 overflow-hidden">
          <img
            src={photo}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
              {property.type}
            </span>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full shadow-lg text-white ${
              property.listing_type === "venda" ? "bg-accent-teal" : "bg-accent-gold"
            }`}>
              {property.listing_type === "venda" ? "Venda" : "Arrendamento"}
            </span>
          </div>
          {property.furnished && (
            <div className="absolute top-3 right-3 bg-white/90 text-xs font-medium px-2 py-1 rounded-full text-gray-700 shadow-lg backdrop-blur-sm">
              Mobiliado
            </div>
          )}
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>
            {property.city}
            {property.neighborhood && `, ${property.neighborhood}`}
          </span>
        </div>

        <Link href={`/imovel/${property.id}`}>
          <h3 className="font-semibold text-gray-900 mb-1.5 line-clamp-1 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
        </Link>

        <p className="text-primary font-bold text-xl mb-4">{formattedPrice}</p>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 pb-4 border-b border-gray-50">
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              {property.bedrooms}
            </span>
          )}
          {property.bathrooms > 0 && (
            <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {property.bathrooms}
            </span>
          )}
          {property.size > 0 && (
            <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-lg">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              {property.size}m²
            </span>
          )}
        </div>

        <a
          href={`https://wa.me/${property.agent_whatsapp}?text=${whatsappMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-green-500 text-white py-2.5 rounded-xl font-medium hover:bg-green-600 transition-all hover:shadow-lg hover:shadow-green-500/25 active:scale-[0.98] text-sm"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WhatsApp
        </a>
      </div>
    </div>
  );
}
