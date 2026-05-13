import type { NextRequest } from "next/server";
import { requireAdmin } from "@/lib/supabase-admin";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const db = requireAdmin();
    const { id } = await params;
    const body = await request.json();
    const { error } = await db
      .from("properties")
      .update({ photos: body.photos })
      .eq("id", id);
    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
    return Response.json({ success: true });
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "Erro interno" },
      { status: 500 }
    );
  }
}
