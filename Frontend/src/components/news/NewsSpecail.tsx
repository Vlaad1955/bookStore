import { newsApi } from "@/shared/api/news/news-api";
import React from "react";
import NewsSpecailList from "./NewsSpecailList";

export default async function NewsSpecail() {
  try {
    const response = await newsApi.getNewsList({});
    const news = response.data.entities || [];

    return <NewsSpecailList news={news} />;
  } catch (error) {
    console.error("Помилка при завантаженні новин:", error);
    return null;
  }
}
