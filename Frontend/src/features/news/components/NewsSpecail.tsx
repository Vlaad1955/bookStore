import { newsApi } from "@/features/news/api/news";
import React from "react";
import NewsSpecailList from "./NewsSpecailList";

export default async function NewsSpecail() {
  try {
    const response = await newsApi.getNewsList({});
    console.log(response.data);
    const news = response.data.entities || [];

    return <NewsSpecailList news={news} />;
  } catch (error) {
    throw error;
  }
}
