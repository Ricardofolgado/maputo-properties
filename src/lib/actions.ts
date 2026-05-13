"use server";

import { requireAdmin } from "./supabase-admin";
import type { Property } from "./types";

export async function approveProperty(id: string) {
  const db = requireAdmin();
  const { error } = await db
    .from("properties")
    .update({ status: "approved" })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteProperty(id: string) {
  const db = requireAdmin();
  const { data: property } = await db
    .from("properties")
    .select("photos")
    .eq("id", id)
    .single();

  if (property?.photos?.length) {
    const files = (property.photos as string[]).map((url) => {
      const path = url.split("/").slice(-2).join("/");
      return path;
    });
    await db.storage.from("property-photos").remove(files);
  }

  const { error } = await db
    .from("properties")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function getPendingProperties() {
  const db = requireAdmin();
  const { data, error } = await db
    .from("properties")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data as Property[];
}
