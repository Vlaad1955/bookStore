import LikesClient from "@/features/books/components/LikesClient";

export default async function LikesPage({ searchParams }: { searchParams: any }) {
  const awaitedParams = await searchParams; // ✅ потрібно для Next.js
  const cleanParams = JSON.parse(JSON.stringify(awaitedParams)); // ✅ тепер без proxy/symbols

  return <LikesClient searchParams={cleanParams} />;
}
