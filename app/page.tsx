import { HomePage } from "@/components/home-page";
import { isSectionId } from "@/lib/catalog";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[]; section?: string | string[] }>;
}) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";
  const sectionValue = typeof params.section === "string" ? params.section : undefined;

  return (
    <HomePage
      initialQuery={query}
      initialSection={isSectionId(sectionValue) ? sectionValue : "home"}
    />
  );
}
