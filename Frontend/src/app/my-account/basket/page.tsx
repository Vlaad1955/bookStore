import BasketClient from "@/components/basket/BasketClient";
import ProtectedRoute from "@/shared/protected-route/protected-route";

export default function BasketPage() {
  return (
    <ProtectedRoute>
      <BasketClient />
    </ProtectedRoute>
  );
}
