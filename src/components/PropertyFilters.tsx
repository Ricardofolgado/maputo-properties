"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function PropertyFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentFilters = {
    city: searchParams.get("city") || "",
    type: searchParams.get("type") || "",
    listing_type: searchParams.get("listing_type") || "",
    min_price: searchParams.get("min_price") || "",
    max_price: searchParams.get("max_price") || "",
  };

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/listings?${params.toString()}`);
  }

  function clearFilters() {
    router.push("/listings");
  }

  const hasFilters = Object.values(currentFilters).some((v) => v);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Filtros</h3>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary hover:underline"
          >
            Limpar tudo
          </button>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cidade
        </label>
        <select
          value={currentFilters.city}
          onChange={(e) => updateFilter("city", e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">Todas</option>
          <option value="Maputo">Maputo</option>
          <option value="Matola">Matola</option>
          <option value="Beira">Beira</option>
          <option value="Nampula">Nampula</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tipo de Imóvel
        </label>
        <select
          value={currentFilters.type}
          onChange={(e) => updateFilter("type", e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">Todos</option>
          <option value="Apartamento">Apartamento</option>
          <option value="Casa">Casa</option>
          <option value="Terreno">Terreno</option>
          <option value="Comercial">Comercial</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Finalidade
        </label>
        <select
          value={currentFilters.listing_type}
          onChange={(e) => updateFilter("listing_type", e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">Todos</option>
          <option value="venda">Venda</option>
          <option value="arrendamento">Arrendamento</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preço Mínimo (MZN)
        </label>
        <input
          type="number"
          placeholder="Ex: 1.000.000"
          value={currentFilters.min_price}
          onChange={(e) => updateFilter("min_price", e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preço Máximo (MZN)
        </label>
        <input
          type="number"
          placeholder="Ex: 10.000.000"
          value={currentFilters.max_price}
          onChange={(e) => updateFilter("max_price", e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
    </div>
  );
}
