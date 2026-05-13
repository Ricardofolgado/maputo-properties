import { getFeaturedProperties } from "@/lib/api";
import HomePageClient from "@/components/HomePageClient";

export default async function HomePage() {
  let featured: Awaited<ReturnType<typeof getFeaturedProperties>> = [];
  try {
    featured = await getFeaturedProperties(6);
  } catch {
    // Database not connected yet
  }

  return <HomePageClient featured={featured} />;
}
