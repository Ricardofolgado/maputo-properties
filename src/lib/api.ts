import { supabase } from "./supabase";
import type { Property, PropertyFilters, PropertyFormData } from "./types";

export function requireSupabase() {
  if (!supabase) {
    throw new Error("Supabase não configurado. Configure as variáveis de ambiente.");
  }
  return supabase;
}

export async function getApprovedProperties(filters?: PropertyFilters) {
  const db = requireSupabase();
  let query = db
    .from("properties")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (filters?.province) {
    query = query.eq("province", filters.province);
  }
  if (filters?.city) {
    query = query.ilike("city", `%${filters.city}%`);
  }
  if (filters?.type) {
    query = query.eq("type", filters.type);
  }
  if (filters?.listing_type) {
    query = query.eq("listing_type", filters.listing_type);
  }
  if (filters?.min_price) {
    query = query.gte("price", filters.min_price);
  }
  if (filters?.max_price) {
    query = query.lte("price", filters.max_price);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as Property[];
}

export async function getPropertyById(id: string) {
  const db = requireSupabase();
  const { data, error } = await db
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data as Property;
}

export async function getFeaturedProperties(limit = 6) {
  const db = requireSupabase();
  const { data, error } = await db
    .from("properties")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data as Property[];
}

export async function createProperty(formData: PropertyFormData) {
  const db = requireSupabase();
  const { data, error } = await db
    .from("properties")
    .insert([{ ...formData, status: "pending" }])
    .select()
    .single();
  if (error) throw error;
  return data as Property;
}

export async function uploadPhoto(file: File, propertyId: string, index: number) {
  const db = requireSupabase();
  const fileExt = file.name.split(".").pop();
  const fileName = `${propertyId}/${index}.${fileExt}`;
  const { error } = await db.storage
    .from("property-photos")
    .upload(fileName, file);
  if (error) throw error;
  const { data: urlData } = db.storage
    .from("property-photos")
    .getPublicUrl(fileName);
  return urlData.publicUrl;
}
