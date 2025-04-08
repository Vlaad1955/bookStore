import ProtectedRoute from "@/shared/protected-route/protected-route";
import { Params } from "react-router-dom";

const ordersPage = async ({ params }: { params: Params }) => {
  console.log(params);

  return (
    <>
      <ProtectedRoute>
        <div>My account page orders </div>
      </ProtectedRoute>
    </>
  );
};

export default ordersPage;
