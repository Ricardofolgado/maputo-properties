"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [search, setSearch] = useState({
    city: "",
    type: "",
    listing_type: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.city) params.set("city", search.city);
    if (search.type) params.set("type", search.type);
    if (search.listing_type) params.set("listing_type", search.listing_type);
    const qs = params.toString();
    router.push(qs ? `/listings?${qs}` : "/listings");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg p-4 sm:p-6 max-w-3xl mx-auto -mb-20 relative z-10"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <select
          value={search.city}
          onChange={(e) => setSearch({ ...search, city: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">Todas as Cidades</option>
          <option value="Maputo">Maputo</option>
          <option value="Matola">Matola</option>
          <option value="Beira">Beira</option>
          <option value="Nampula">Nampula</option>
        </select>

        <select
          value={search.type}
          onChange={(e) => setSearch({ ...search, type: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">Todos os Tipos</option>
          <option value="Apartamento">Apartamento</option>
          <option value="Casa">Casa</option>
          <option value="Terreno">Terreno</option>
          <option value="Comercial">Comercial</option>
        </select>

        <select
          value={search.listing_type}
          onChange={(e) => setSearch({ ...search, listing_type: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">Venda ou Arrendamento</option>
          <option value="venda">Venda</option>
          <option value="arrendamento">Arrendamento</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full mt-3 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
      >
        Pesquisar Imóveis
      </button>
    </form>
  );
}
