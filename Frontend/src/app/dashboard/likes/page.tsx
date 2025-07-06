import LikesClient from "@/features/books/components/LikesClient";

export default async function LikesPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[]>;
}) {
  const awaitedParams = await searchParams;
  const cleanParams = JSON.parse(JSON.stringify(awaitedParams));

  return <LikesClient searchParams={cleanParams} />;
}
