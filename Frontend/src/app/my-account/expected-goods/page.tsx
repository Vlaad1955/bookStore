import ProtectedRoute from "@/shared/protected-route/protected-route";
import { Params } from "react-router-dom";

const expectedGoodsPage = async ({ params }: { params: Params }) => {
  console.log({params});

  return (
    <>
      <ProtectedRoute>
        <div>My account page Goods </div>
      </ProtectedRoute>
    </>
  );
};

export default expectedGoodsPage;
