import { getPropertyById } from "@/lib/api";
import PhotoGallery from "@/components/PhotoGallery";
import { notFound } from "next/navigation";

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;
  let property: Awaited<ReturnType<typeof getPropertyById>> | null = null;
  try {
    property = await getPropertyById(id);
  } catch {
    // not found
  }

  if (!property) {
    notFound();
  }

  const formattedPrice = new Intl.NumberFormat("pt-MZ", {
    style: "currency",
    currency: "MZN",
    minimumFractionDigits: 0,
  }).format(property.price);

  const whatsappMsg = encodeURIComponent(
    `Olá, tenho interesse no imóvel: ${property.title}`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <PhotoGallery photos={property.photos} title={property.title} />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded">
                {property.type}
              </span>
              <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded">
                {property.listing_type === "venda" ? "Venda" : "Arrendamento"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {property.title}
            </h1>
            <p className="text-gray-500 mb-4">
              {property.city}
              {property.neighborhood && `, ${property.neighborhood}`}
            </p>
            <p className="text-primary text-3xl font-bold mb-6">
              {formattedPrice}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Detalhes do Imóvel
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {property.size}
                </p>
                <p className="text-sm text-gray-500">m²</p>
              </div>
              {property.bedrooms > 0 && (
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {property.bedrooms}
                  </p>
                  <p className="text-sm text-gray-500">Quartos</p>
                </div>
              )}
              {property.bathrooms > 0 && (
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {property.bathrooms}
                  </p>
                  <p className="text-sm text-gray-500">Casas de Banho</p>
                </div>
              )}
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {property.furnished ? "Sim" : "Não"}
                </p>
                <p className="text-sm text-gray-500">Mobiliado</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Descrição
            </h2>
            <p className="text-gray-600 whitespace-pre-line">
              {property.description}
            </p>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h3 className="font-semibold text-gray-900 mb-4">Agente</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-lg">
                  {property.agent_name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {property.agent_name}
                </p>
                <p className="text-sm text-gray-500">Agente Imobiliário</p>
              </div>
            </div>

            <a
              href={`https://wa.me/${property.agent_whatsapp}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Falar pelo WhatsApp
            </a>
            <p className="text-xs text-gray-400 text-center mt-2">
              Mensagem predefinida: interesse no imóvel
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
