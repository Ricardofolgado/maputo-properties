import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import { getFeaturedProperties } from "@/lib/api";

export default async function HomePage() {
  let featured: Awaited<ReturnType<typeof getFeaturedProperties>> = [];
  try {
    featured = await getFeaturedProperties(6);
  } catch {
    // Database not connected yet
  }

  return (
    <>
      <section className="relative bg-gradient-to-br from-primary/90 to-primary-dark min-h-[500px] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 pb-28">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Encontre o Imóvel Ideal em Moçambique
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Apartamentos, casas, terrenos e imóveis comerciais em Maputo,
              Matola, Beira e Nampula
            </p>
          </div>
          <SearchBar />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Imóveis em Destaque
            </h2>
            <p className="text-gray-500 mt-1">
              Os melhores imóveis selecionados para si
            </p>
          </div>
          <a
            href="/listings"
            className="hidden sm:inline-flex items-center gap-1 text-primary font-medium hover:underline"
          >
            Ver todos
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>

        {featured.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-xl">
            <svg
              className="w-16 h-16 mx-auto text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              Nenhum imóvel disponível
            </h3>
            <p className="text-gray-400 mb-4">
              Configure a base de dados Supabase para começar a publicar
              imóveis.
            </p>
            <a
              href="/cadastrar"
              className="inline-flex bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark"
            >
              Listar Imóvel
            </a>
          </div>
        )}

        <div className="text-center mt-8 sm:hidden">
          <a
            href="/listings"
            className="inline-flex items-center gap-1 text-primary font-medium"
          >
            Ver todos os imóveis
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900">
              Porquê a Maputo Properties?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Pesquisa Fácil
              </h3>
              <p className="text-gray-500 text-sm">
                Encontre rapidamente o imóvel ideal com os nossos filtros
                inteligentes.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Contacto Direto
              </h3>
              <p className="text-gray-500 text-sm">
                Fale diretamente com o agente pelo WhatsApp sem intermediários.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Anúncios Verificados
              </h3>
              <p className="text-gray-500 text-sm">
                Todos os imóveis passam por uma verificação antes de serem
                publicados.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
