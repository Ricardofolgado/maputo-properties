import type { NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { error } = await supabaseAdmin
    .from("properties")
    .update({ photos: body.photos })
    .eq("id", id);
  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
  return Response.json({ success: true });
}
