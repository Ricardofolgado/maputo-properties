import { getApprovedProperties } from "@/lib/api";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "@/components/PropertyFilters";
import type { PropertyFilters as Filters } from "@/lib/types";

interface ListingsPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function ListingsPage({
  searchParams,
}: ListingsPageProps) {
  const params = await searchParams;
  const filters: Filters = {
    city: params.city,
    type: params.type,
    listing_type: params.listing_type,
    min_price: params.min_price ? Number(params.min_price) : undefined,
    max_price: params.max_price ? Number(params.max_price) : undefined,
  };

  let properties: Awaited<ReturnType<typeof getApprovedProperties>> = [];
  let errorMsg = "";
  try {
    properties = await getApprovedProperties(
      Object.values(filters).some((v) => v !== undefined) ? filters : undefined
    );
  } catch (e) {
    errorMsg = e instanceof Error ? e.message : "Erro ao carregar imóveis";
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-28">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Imóveis</h1>
        <p className="text-gray-500 mt-1">
          {errorMsg
            ? "Configure a base de dados Supabase para ver os imóveis."
            : `${properties.length} imóvel${
                properties.length !== 1 ? "is" : ""
              } encontrado${properties.length !== 1 ? "s" : ""}`}
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
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                Nenhum imóvel encontrado
              </h3>
              <p className="text-gray-400">Tente ajustar os filtros da pesquisa.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
