"use server";

import { supabaseAdmin } from "./supabase-admin";
import type { Property } from "./types";

export async function approveProperty(id: string) {
  const { error } = await supabaseAdmin
    .from("properties")
    .update({ status: "approved" })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteProperty(id: string) {
  const { data: property } = await supabaseAdmin
    .from("properties")
    .select("photos")
    .eq("id", id)
    .single();

  if (property?.photos?.length) {
    const files = (property.photos as string[]).map((url) => {
      const path = url.split("/").slice(-2).join("/");
      return path;
    });
    await supabaseAdmin.storage.from("property-photos").remove(files);
  }

  const { error } = await supabaseAdmin
    .from("properties")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function getPendingProperties() {
  const { data, error } = await supabaseAdmin
    .from("properties")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data as Property[];
}
