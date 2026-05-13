import { getApprovedProperties } from "@/lib/api";
import type { PropertyFilters as Filters } from "@/lib/types";
import ListingsContent from "@/components/ListingsContent";

interface ListingsPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function ListingsPage({ searchParams }: ListingsPageProps) {
  const params = await searchParams;
  const filters: Filters = {
    province: params.province,
    city: params.city,
    type: params.type,
    listing_type: params.listing_type,
    min_price: params.min_price ? Number(params.min_price) : undefined,
    max_price: params.max_price ? Number(params.max_price) : undefined,
  };

  let properties: Awaited<ReturnType<typeof getApprovedProperties>> = [];
  let errorMsg = "";
  try {
    properties = await getApprovedProperties(
      Object.values(filters).some((v) => v !== undefined) ? filters : undefined
    );
  } catch (e) {
    errorMsg = e instanceof Error ? e.message : "Erro ao carregar imóveis";
  }

  return (
    <ListingsContent
      properties={properties}
      errorMsg={errorMsg}
      filtersApplied={Object.values(filters).some((v) => v !== undefined)}
    />
  );
}
