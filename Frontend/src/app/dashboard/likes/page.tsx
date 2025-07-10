import LikesClient from "@/features/favorite/components/FavoriteLikesItems";
import ProtectedRoute from "@/shared/protected-route/protectedRoute";

export default async function LikesPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[]>;
}) {
  const awaitedParams = await searchParams;
  const cleanParams = JSON.parse(JSON.stringify(awaitedParams));

  return (
    <ProtectedRoute>
      <LikesClient searchParams={cleanParams} />
    </ProtectedRoute>
  );
}
