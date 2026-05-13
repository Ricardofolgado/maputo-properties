export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MP</span>
              </div>
              <span className="text-lg font-bold text-white">
                Maputo Properties
              </span>
            </div>
            <p className="text-sm">
              A sua plataforma de confiança para comprar, vender ou arrendar
              imóveis em Moçambique.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/listings" className="hover:text-white transition-colors">
                  Todos os Imóveis
                </a>
              </li>
              <li>
                <a href="/cadastrar" className="hover:text-white transition-colors">
                  Listar Imóvel
                </a>
              </li>
              <li>
                <a href="/listings?city=Maputo" className="hover:text-white transition-colors">
                  Imóveis em Maputo
                </a>
              </li>
              <li>
                <a href="/listings?city=Matola" className="hover:text-white transition-colors">
                  Imóveis na Matola
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Tipos de Imóvel</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/listings?type=Apartamento" className="hover:text-white transition-colors">
                  Apartamentos
                </a>
              </li>
              <li>
                <a href="/listings?type=Casa" className="hover:text-white transition-colors">
                  Casas
                </a>
              </li>
              <li>
                <a href="/listings?type=Terreno" className="hover:text-white transition-colors">
                  Terrenos
                </a>
              </li>
              <li>
                <a href="/listings?type=Comercial" className="hover:text-white transition-colors">
                  Comercial
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Maputo Properties. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
