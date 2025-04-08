import ProtectedRoute from "@/shared/protected-route/protected-route";
import { Params } from "react-router-dom";

const libraryPage = async ({ params }: { params: Params }) => {
  console.log(params);

  return (
    <>
      <ProtectedRoute>
        <div>My account page library </div>
      </ProtectedRoute>
    </>
  );
};

export default libraryPage;
