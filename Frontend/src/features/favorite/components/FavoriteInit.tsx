"use client";

import { useEffect } from "react";
import { useFavoriteBooksStore } from "../store/favorite";
import { useUserStore } from "@/features/user/store/UseUserStore";

export const FavoriteInit = () => {
  const fetchFavorites = useFavoriteBooksStore((s) => s.fetchFavorites);
  const user = useUserStore((s) => s.user);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [fetchFavorites, user]);

  return null;
};
