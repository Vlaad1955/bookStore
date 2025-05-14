"use client";
import ProtectedRoute from "@/shared/protected-route/protected-route";
import { useUserStore } from "@/shared/user/store/UseUserStore";
import { Params } from "react-router-dom";

const ExpectedGoodsPage = ({ params }: { params: Params }) => {
  const user = useUserStore((state) => state.user);

  console.log({ params });

  return (
    <>
      <ProtectedRoute>
        <div>hi {user?.firstName}</div>
        <div>My account page Goods </div>
      </ProtectedRoute>
    </>
  );
};

export default ExpectedGoodsPage;
