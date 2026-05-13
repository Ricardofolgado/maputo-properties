export type Lang = "pt" | "en";

export const translations: Record<string, { pt: string; en: string }> = {
  // Navbar
  "nav.imoveis": { pt: "Imóveis", en: "Properties" },
  "nav.listar": { pt: "Listar Imóvel", en: "List Property" },

  // Hero
  "hero.badge": { pt: "Plataforma Imobiliária em Moçambique", en: "Real Estate Platform in Mozambique" },
  "hero.title": { pt: "Encontre o Imóvel {0} em Moçambique", en: "Find Your {0} Property in Mozambique" },
  "hero.title.highlight": { pt: "Ideal", en: "Ideal" },
  "hero.subtitle": { pt: "Apartamentos, casas, terrenos e imóveis comerciais em Maputo, Matola, Beira e Nampula", en: "Apartments, houses, land and commercial properties in Maputo, Matola, Beira and Nampula" },
  "hero.search.city": { pt: "Cidade", en: "City" },
  "hero.search.type": { pt: "Tipo", en: "Type" },
  "hero.search.purpose": { pt: "Finalidade", en: "Purpose" },
  "hero.search.btn": { pt: "Pesquisar", en: "Search" },
  "hero.stats.properties": { pt: "Imóveis", en: "Properties" },
  "hero.stats.cities": { pt: "Cidades", en: "Cities" },
  "hero.stats.types": { pt: "Tipos", en: "Types" },

  // Search / Filters
  "filter.province": { pt: "Província", en: "Province" },
  "filter.allProvinces": { pt: "Todas as Províncias", en: "All Provinces" },
  "filter.city": { pt: "Cidade", en: "City" },
  "filter.allCities": { pt: "Todas as Cidades", en: "All Cities" },
  "filter.selectProvince": { pt: "Selecione província", en: "Select province" },
  "filter.type": { pt: "Tipo de Imóvel", en: "Property Type" },
  "filter.all": { pt: "Todos", en: "All" },
  "filter.purpose": { pt: "Finalidade", en: "Purpose" },
  "filter.minPrice": { pt: "Preço Mínimo (MZN)", en: "Min Price (MZN)" },
  "filter.maxPrice": { pt: "Preço Máximo (MZN)", en: "Max Price (MZN)" },
  "filter.clear": { pt: "Limpar", en: "Clear" },
  "filter.filters": { pt: "Filtros", en: "Filters" },

  // Property Card
  "card.furnished": { pt: "Mobiliado", en: "Furnished" },
  "card.venda": { pt: "Venda", en: "For Sale" },
  "card.arrendamento": { pt: "Arrendamento", en: "For Rent" },

  // Featured Section
  "featured.badge": { pt: "Destaques", en: "Featured" },
  "featured.title": { pt: "Imóveis em Destaque", en: "Featured Properties" },
  "featured.subtitle": { pt: "Os melhores imóveis selecionados cuidadosamente para si", en: "The best properties carefully selected for you" },
  "featured.viewAll": { pt: "Ver todos", en: "View All" },
  "featured.empty.title": { pt: "Nenhum imóvel disponível", en: "No properties available" },
  "featured.empty.desc": { pt: "Configure a base de dados Supabase para começar a publicar imóveis.", en: "Set up the Supabase database to start publishing properties." },
  "featured.empty.cta": { pt: "Listar Imóvel", en: "List Property" },

  // Why Us
  "why.title": { pt: "Porquê a Maputo Properties?", en: "Why Maputo Properties?" },
  "why.subtitle": { pt: "A forma mais inteligente de encontrar o imóvel perfeito em Moçambique", en: "The smartest way to find the perfect property in Mozambique" },
  "why.search.title": { pt: "Pesquisa Inteligente", en: "Smart Search" },
  "why.search.desc": { pt: "Encontre rapidamente o imóvel ideal com os nossos filtros inteligentes por cidade, tipo e preço.", en: "Quickly find the ideal property with our smart filters by city, type and price." },
  "why.contact.title": { pt: "Contacto Direto", en: "Direct Contact" },
  "why.contact.desc": { pt: "Fale diretamente com o agente pelo WhatsApp sem intermediários. Resposta rápida e personalizada.", en: "Speak directly with the agent via WhatsApp. Fast and personalized response." },
  "why.verified.title": { pt: "Anúncios Verificados", en: "Verified Listings" },
  "why.verified.desc": { pt: "Todos os imóveis passam por uma verificação antes de serem publicados. Qualidade e confiança garantidas.", en: "All properties go through verification before being published. Quality and trust guaranteed." },

  // CTA
  "cta.title": { pt: "É Agente Imobiliário?", en: "Are You a Real Estate Agent?" },
  "cta.desc": { pt: "Anuncie os seus imóveis gratuitamente e alcance milhares de potenciais compradores em Moçambique.", en: "List your properties for free and reach thousands of potential buyers in Mozambique." },
  "cta.btn": { pt: "Publicar Imóvel Agora", en: "Publish Property Now" },

  // Listings Page
  "listings.title": { pt: "Imóveis", en: "Properties" },
  "listings.found": { pt: "{0} imóvel encontrado", en: "{0} property found" },
  "listings.found.plural": { pt: "{0} imóveis encontrados", en: "{0} properties found" },
  "listings.empty.title": { pt: "Nenhum imóvel encontrado", en: "No properties found" },
  "listings.empty.desc": { pt: "Tente ajustar os filtros da pesquisa.", en: "Try adjusting the search filters." },
  "listings.notConfigured": { pt: "Configure a base de dados Supabase para ver os imóveis.", en: "Set up Supabase database to view properties." },
  "listings.error": { pt: "Erro ao carregar imóveis", en: "Error loading properties" },

  // Property Detail
  "detail.venda": { pt: "Venda", en: "For Sale" },
  "detail.arrendamento": { pt: "Arrendamento", en: "For Rent" },
  "detail.details": { pt: "Detalhes do Imóvel", en: "Property Details" },
  "detail.area": { pt: "Área", en: "Area" },
  "detail.bedrooms": { pt: "Quartos", en: "Bedrooms" },
  "detail.bathrooms": { pt: "Casas de Banho", en: "Bathrooms" },
  "detail.furnished": { pt: "Mobiliado", en: "Furnished" },
  "detail.yes": { pt: "Sim", en: "Yes" },
  "detail.no": { pt: "Não", en: "No" },
  "detail.description": { pt: "Descrição", en: "Description" },
  "detail.agent": { pt: "Agente", en: "Agent" },
  "detail.agent.role": { pt: "Agente Imobiliário", en: "Real Estate Agent" },
  "detail.whatsapp": { pt: "Falar pelo WhatsApp", en: "Chat on WhatsApp" },
  "detail.whatsapp.hint": { pt: "Mensagem predefinida com interesse no imóvel", en: "Pre-filled message with interest in the property" },
  "detail.noPhotos": { pt: "Sem fotos disponíveis", en: "No photos available" },
  "detail.prev": { pt: "Foto anterior", en: "Previous photo" },
  "detail.next": { pt: "Próxima foto", en: "Next photo" },

  // Submit Form
  "submit.title": { pt: "Listar Imóvel", en: "List Property" },
  "submit.subtitle": { pt: "Preencha os dados do imóvel para publicar o anúncio.", en: "Fill in the property details to publish the listing." },
  "submit.badge": { pt: "Publicar", en: "Publish" },
  "submit.section.property": { pt: "Informação do Imóvel", en: "Property Information" },
  "submit.section.agent": { pt: "Informação do Agente", en: "Agent Information" },
  "submit.section.photos": { pt: "Fotos", en: "Photos" },
  "submit.field.title": { pt: "Título do Anúncio *", en: "Listing Title *" },
  "submit.field.titlePlaceholder": { pt: "Ex: Apartamento T3 no Centro de Maputo", en: "Ex: 3BR Apartment in Downtown Maputo" },
  "submit.field.description": { pt: "Descrição *", en: "Description *" },
  "submit.field.descriptionPlaceholder": { pt: "Descreva o imóvel em detalhe...", en: "Describe the property in detail..." },
  "submit.field.price": { pt: "Preço (MZN) *", en: "Price (MZN) *" },
  "submit.field.purpose": { pt: "Finalidade *", en: "Purpose *" },
  "submit.field.province": { pt: "Província *", en: "Province *" },
  "submit.field.city": { pt: "Cidade *", en: "City *" },
  "submit.field.cityPlaceholder": { pt: "Ex: Maputo", en: "Ex: Maputo" },
  "submit.field.neighborhood": { pt: "Bairro", en: "Neighborhood" },
  "submit.field.neighborhoodPlaceholder": { pt: "Ex: Sommerschield", en: "Ex: Sommerschield" },
  "submit.field.type": { pt: "Tipo de Imóvel *", en: "Property Type *" },
  "submit.field.area": { pt: "Área (m²)", en: "Area (m²)" },
  "submit.field.bedrooms": { pt: "Quartos", en: "Bedrooms" },
  "submit.field.bathrooms": { pt: "Casas de Banho", en: "Bathrooms" },
  "submit.field.furnished": { pt: "Mobiliado", en: "Furnished" },
  "submit.select": { pt: "Selecionar", en: "Select" },
  "submit.field.agentName": { pt: "Nome do Agente *", en: "Agent Name *" },
  "submit.field.agentNamePlaceholder": { pt: "Seu nome", en: "Your name" },
  "submit.field.whatsapp": { pt: "WhatsApp *", en: "WhatsApp *" },
  "submit.field.whatsappPlaceholder": { pt: "Ex: 258840000000", en: "Ex: 258840000000" },
  "submit.field.whatsappHint": { pt: "Número com código do país (258 para Moçambique)", en: "Number with country code (258 for Mozambique)" },
  "submit.photos.desc": { pt: "Adicione até 5 fotos do imóvel. Formatos: JPG, PNG.", en: "Add up to 5 photos of the property. Formats: JPG, PNG." },
  "submit.photos.selected": { pt: "{0} foto selecionada", en: "{0} photo selected" },
  "submit.photos.selected.plural": { pt: "{0} fotos selecionadas", en: "{0} photos selected" },
  "submit.btn": { pt: "Enviar Anúncio", en: "Submit Listing" },
  "submit.sending": { pt: "A enviar...", en: "Sending..." },
  "submit.disclaimer": { pt: "O anúncio será analisado pela nossa equipa e publicado após aprovação.", en: "The listing will be reviewed by our team and published after approval." },
  "submit.success.title": { pt: "Anúncio Enviado!", en: "Listing Submitted!" },
  "submit.success.desc": { pt: "O seu imóvel será publicado após aprovação da nossa equipa. Redirecionando...", en: "Your property will be published after our team's approval. Redirecting..." },
  "submit.error": { pt: "Erro ao enviar o anúncio", en: "Error submitting the listing" },

  // Admin
  "admin.title": { pt: "Administração", en: "Administration" },
  "admin.subtitle": { pt: "Introduza a palavra-passe para aceder", en: "Enter the password to access" },
  "admin.password": { pt: "Palavra-passe", en: "Password" },
  "admin.login": { pt: "Entrar", en: "Login" },
  "admin.wrongPassword": { pt: "Palavra-passe incorreta", en: "Incorrect password" },
  "admin.pending": { pt: "Imóveis Pendentes", en: "Pending Properties" },
  "admin.badge": { pt: "Admin", en: "Admin" },
  "admin.refresh": { pt: "Atualizar", en: "Refresh" },
  "admin.pendingBadge": { pt: "Pendente", en: "Pending" },
  "admin.approve": { pt: "Aprovar", en: "Approve" },
  "admin.delete": { pt: "Eliminar", en: "Delete" },
  "admin.empty.title": { pt: "Nenhum imóvel pendente de aprovação.", en: "No properties pending approval." },
  "admin.empty.desc": { pt: "Todos os anúncios foram processados.", en: "All listings have been processed." },
  "admin.loading": { pt: "A carregar...", en: "Loading..." },
  "admin.approved": { pt: "Imóvel aprovado com sucesso!", en: "Property approved successfully!" },
  "admin.deleted": { pt: "Imóvel eliminado!", en: "Property deleted!" },
  "admin.approveError": { pt: "Erro ao aprovar imóvel", en: "Error approving property" },
  "admin.deleteError": { pt: "Erro ao eliminar imóvel", en: "Error deleting property" },
  "admin.loadError": { pt: "Erro ao carregar", en: "Error loading" },
  "admin.confirmDelete": { pt: "Tem certeza que deseja eliminar este imóvel?", en: "Are you sure you want to delete this property?" },
  "admin.sentAt": { pt: "Enviado em", en: "Sent on" },
  "admin.agent": { pt: "Agente", en: "Agent" },

  // Footer
  "footer.desc": { pt: "A sua plataforma de confiança para comprar, vender ou arrendar imóveis em Moçambique.", en: "Your trusted platform to buy, sell or rent properties in Mozambique." },
  "footer.quickLinks": { pt: "Links Rápidos", en: "Quick Links" },
  "footer.allProperties": { pt: "Todos os Imóveis", en: "All Properties" },
  "footer.listProperty": { pt: "Listar Imóvel", en: "List Property" },
  "footer.propertiesIn": { pt: "Imóveis em {0}", en: "Properties in {0}" },
  "footer.propertyTypes": { pt: "Tipos de Imóvel", en: "Property Types" },
  "footer.contact": { pt: "Contacto", en: "Contact" },
  "footer.madeWith": { pt: "Feito com", en: "Made with" },
  "footer.inMozambique": { pt: "em Moçambique", en: "in Mozambique" },
  "footer.rights": { pt: "Todos os direitos reservados.", en: "All rights reserved." },

  // Venda / Arrendamento (used in multiple places)
  "venda": { pt: "Venda", en: "For Sale" },
  "arrendamento": { pt: "Arrendamento", en: "For Rent" },

  // Types
  "type.Apartamento": { pt: "Apartamento", en: "Apartment" },
  "type.Casa": { pt: "Casa", en: "House" },
  "type.Terreno": { pt: "Terreno", en: "Land" },
  "type.Comercial": { pt: "Comercial", en: "Commercial" },

  // Cities
  "city.all": { pt: "Todas as Cidades", en: "All Cities" },

  // Not configured
  "db.notConfigured": { pt: "Supabase não configurado. Configure as variáveis de ambiente.", en: "Supabase not configured. Set up the environment variables." },
  "db.notConfiguredAdmin": { pt: "Supabase admin não configurado. Verifique as variáveis de ambiente.", en: "Supabase admin not configured. Check environment variables." },

  // Language
  "lang.switch": { pt: "EN", en: "PT" },
  "lang.switchTitle": { pt: "Mudar para Inglês", en: "Switch to Portuguese" },
};

export function t(key: string, lang: Lang, ...args: (string | number)[]): string {
  const entry = translations[key];
  if (!entry) return key;
  let text = entry[lang];
  args.forEach((arg, i) => {
    text = text.replace(`{${i}}`, String(arg));
  });
  return text;
}
