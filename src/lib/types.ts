export const PROVINCES = [
  "Maputo Cidade",
  "Maputo Província",
  "Gaza",
  "Inhambane",
  "Sofala",
  "Manica",
  "Tete",
  "Zambézia",
  "Nampula",
  "Cabo Delgado",
  "Niassa",
] as const;

export const CITIES_BY_PROVINCE: Record<string, string[]> = {
  "Maputo Cidade": ["Maputo"],
  "Maputo Província": ["Matola", "Boane", "Moamba", "Namaacha", "Manhiça", "Marracuene", "Magude"],
  Gaza: ["Xai-Xai", "Chókwè", "Chibuto", "Macia", "Manjacaze", "Praia do Bilene"],
  Inhambane: ["Inhambane", "Maxixe", "Vilanculos", "Mambone", "Panda", "Morrumbene"],
  Sofala: ["Beira", "Dondo", "Nhamatanda", "Gorongosa", "Caia", "Marromeu"],
  Manica: ["Chimoio", "Manica", "Gondola", "Sussundenga", "Barué", "Catandica"],
  Tete: ["Tete", "Moatize", "Changara", "Zumbo", "Angónia", "Cahora-Bassa"],
  Zambézia: ["Quelimane", "Gurúè", "Mocuba", "Nicoadala", "Milange", "Mopeia"],
  Nampula: ["Nampula", "Nacala", "Angoche", "Ilha de Moçambique", "Memba", "Monapo"],
  "Cabo Delgado": ["Pemba", "Montepuez", "Mocímboa da Praia", "Balama", "Chiúre", "Mueda"],
  Niassa: ["Lichinga", "Cuamba", "Mandimba", "Marrupa", "Mecanhelas", "Metangula"],
};

export const NEIGHBORHOODS: Record<string, string[]> = {
  "Maputo": ["Sommerschield", "Polana", "Alto Maé", "Central", "Baixa", "Coop", "Malhangalene", "Triunfo", "Aeroporto", "Costa do Sol"],
  "Matola": ["Matola A", "Matola B", "Matola C", "Fomento", "T3", "Tsalala", "Machava", "Infulene"],
  "Beira": ["Ponta-Gêa", "Matacuane", "Estoril", "Chiveve", "Macuti", "Manga", "Munhava", "Nhangona"],
  "Nampula": ["Namicopo", "Carrupeia", "Muhala", "Natala", "Napipine", "Muatala"],
  "Xai-Xai": ["Praia", "Chilunguine", "Patrice Lumumba", "Cimento"],
  "Chimoio": ["Vila Nova", "Trangrossa", "Chimanguo", "Mandarinnen"],
  "Tete": ["Matundo", "Chingodzi", "Moatize", "Impire"],
  "Quelimane": ["Pedreira", "Sambalangue", "Madiane", "Lhau"],
  "Pemba": ["Cimento", "Marringanha", "Paquite", "Muxara"],
  "Vilanculos": ["Aeroporto", "Vila Nova", "Macovane", "Mahangue"],
  "Maxixe": ["Chambone", "Muele", "Luis Almeida"],
  "Nacala": ["Porto", "Sede", "Matadouro", "Muanona"],
  "Lichinga": ["Cimento", "Massangulo", "Sanjala", "Unidade"],
  "Dondo": ["Sofala", "Mascarenhas", "Luis do Rosário"],
  "Gurúè": ["Mualadje", "Mucunha", "Mocuba"],
  "Mocuba": ["Murrimo", "Mugeba", "Sambalangue"],
};

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  province: string;
  city: string;
  neighborhood: string;
  type: "Apartamento" | "Casa" | "Terreno" | "Comercial";
  listing_type: "venda" | "arrendamento";
  bedrooms: number;
  bathrooms: number;
  size: number;
  furnished: boolean;
  agent_name: string;
  agent_whatsapp: string;
  photos: string[];
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

export type PropertyFormData = Omit<Property, "id" | "status" | "created_at">;

export interface PropertyFilters {
  province?: string;
  city?: string;
  type?: string;
  listing_type?: string;
  min_price?: number;
  max_price?: number;
}
