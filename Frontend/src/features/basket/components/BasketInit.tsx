"use client";

import { useEffect } from "react";
import { useUserStore } from "@/features/user/store/UseUserStore";
import { useBasketStore } from "../store/basket";

export const BasketInit = () => {
  const fetchBasket = useBasketStore((s) => s.fetchBasket);
  const user = useUserStore((s) => s.user);

  useEffect(() => {
    if (user) {
      fetchBasket();
    }
  }, [fetchBasket, user]);

  return null;
};
