"use client";

import { useEffect, useState } from "react";
import { useFavoriteBooksStore } from "../store/favorite";
import { useUserStore } from "@/features/user/store/UseUserStore";

export const FavoriteInit = () => {
  const [mounted, setMounted] = useState(false);
  const fetchFavorites = useFavoriteBooksStore((s) => s.fetchFavorites);
  const user = useUserStore((s) => s.user);

  useEffect(() => {
    setMounted(true);
    if (user) {
      fetchFavorites();
    }
  }, [fetchFavorites, user]);

  if (!mounted) return null;

  return null;
};
