export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
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
  city?: string;
  type?: string;
  listing_type?: string;
  min_price?: number;
  max_price?: number;
}
