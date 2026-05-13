import { getPropertyById } from "@/lib/api";
import { notFound } from "next/navigation";
import PropertyContent from "@/components/PropertyContent";

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;
  let property: Awaited<ReturnType<typeof getPropertyById>> | null = null;
  try {
    property = await getPropertyById(id);
  } catch {
    // not found
  }

  if (!property) notFound();

  return <PropertyContent property={property} />;
}
