import React from "react";

import NewsSpecailList from "./NewsSpecailList";
import { newsApi } from "@/features/news/api/news";

export default async function NewsSpecail() {
  try {
    const response = await newsApi.getNewsList({});
    const news = response.data.entities || [];

    return <NewsSpecailList news={news} />;
  } catch (error) {
    throw error;
  }
}
