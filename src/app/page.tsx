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
      {/* Hero Section */}
      <section className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-stone-800" />

        {/* Animated decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white/5 animate-pulse" style={{ animationDuration: "4s" }} />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white/5 animate-pulse" style={{ animationDuration: "6s" }} />
          <div className="absolute top-1/3 left-1/4 w-40 h-40 rounded-full bg-white/5 animate-pulse" style={{ animationDuration: "5s" }} />
          <div className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full bg-white/5 animate-pulse" style={{ animationDuration: "7s" }} />

          {/* Grid pattern overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 100 100">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-40 md:pb-48">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-sm px-4 py-1.5 rounded-full backdrop-blur-sm mb-6 border border-white/10 animate-fade-in">
              <span className="w-2 h-2 bg-amber-300 rounded-full animate-pulse" />
              Plataforma Imobiliária em Moçambique
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight animate-slide-up">
              Encontre o Imóvel{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-stone-200">
                Ideal
              </span>{" "}
              em Moçambique
            </h1>
            <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Apartamentos, casas, terrenos e imóveis comerciais em Maputo,
              Matola, Beira e Nampula
            </p>
          </div>

          <SearchBar />

          {/* Stats */}
          <div className="flex justify-center gap-8 sm:gap-16 mt-28 text-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white">{featured.length > 0 ? "+" : ""}{featured.length > 0 ? featured.length : "0"}</p>
              <p className="text-white/60 text-sm mt-1">Imóveis</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white">4</p>
              <p className="text-white/60 text-sm mt-1">Cidades</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-white">4</p>
              <p className="text-white/60 text-sm mt-1">Tipos</p>
            </div>
          </div>
        </div>

        {/* Bottom wave transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Destaques</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Imóveis em Destaque
            </h2>
            <p className="text-gray-500 mt-2 max-w-xl">
              Os melhores imóveis selecionados cuidadosamente para si
            </p>
          </div>
          <a
            href="/listings"
            className="hidden sm:inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all bg-primary-light px-5 py-2.5 rounded-full text-sm"
          >
            Ver todos
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {featured.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featured.map((property, i) => (
              <div key={property.id} className="animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl border border-gray-100">
            <div className="w-20 h-20 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Nenhum imóvel disponível
            </h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Configure a base de dados Supabase para começar a publicar imóveis.
              Corra o script SQL em <span className="font-mono text-primary text-sm">supabase-migration.sql</span> no SQL Editor do Supabase.
            </p>
            <a
              href="/cadastrar"
              className="inline-flex bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-dark transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-95"
            >
              Listar Imóvel
            </a>
          </div>
        )}

        <div className="text-center mt-10 sm:hidden">
          <a
            href="/listings"
            className="inline-flex items-center gap-2 text-primary font-semibold bg-primary-light px-6 py-3 rounded-full"
          >
            Ver todos os imóveis
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Vantagens</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Porquê a Maputo Properties?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              A forma mais inteligente de encontrar o imóvel perfeito em Moçambique
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                ),
                title: "Pesquisa Inteligente",
                desc: "Encontre rapidamente o imóvel ideal com os nossos filtros inteligentes por cidade, tipo e preço.",
                gradient: "from-primary to-accent-gold",
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                ),
                title: "Contacto Direto",
                desc: "Fale diretamente com o agente pelo WhatsApp sem intermediários. Resposta rápida e personalizada.",
                gradient: "from-accent-gold to-stone-400",
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                ),
                title: "Anúncios Verificados",
                desc: "Todos os imóveis passam por uma verificação antes de serem publicados. Qualidade e confiança garantidas.",
                gradient: "from-accent-teal to-primary",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {item.icon}
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
                <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-primary via-primary-dark to-stone-900 rounded-3xl overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/5" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/5" />
            </div>
            <div className="relative px-8 py-16 md:py-20 md:px-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                É Agente Imobiliário?
              </h2>
              <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
                Anuncie os seus imóveis gratuitamente e alcance milhares de potenciais compradores em Moçambique.
              </p>
              <a
                href="/cadastrar"
                className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-3.5 rounded-full hover:bg-gray-50 transition-all hover:shadow-2xl active:scale-95"
              >
                Publicar Imóvel Agora
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
