import ProtectedRoute from "@/shared/protected-route/protected-route";
import { Params } from "react-router-dom";

const favoriteBooksPage = async ({ params }: { params: Params }) => {
  console.log(params);

  return (
    <>
      <ProtectedRoute>
        <div>My account page favorite books </div>
      </ProtectedRoute>
    </>
  );
};

export default favoriteBooksPage;
