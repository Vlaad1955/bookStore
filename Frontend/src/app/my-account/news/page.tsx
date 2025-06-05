import React from "react";
import { notFound } from "next/navigation";

import { newsApi } from "@/shared/api/news/news-api";
import NewsList from "@/components/news/NewsWrapper";

type NewsItem = {
  id: string;
  title: string;
  content: string;
  category: "general" | "promotion" | "event";
  image?: string;
};

type NewsData = {
  page: number;
  pages: number;
  countItems: number;
  entities: NewsItem[];
};

export default async function NewsPage({
  searchParams,
}: {
  searchParams: {
    title?: string;
    category?: "general" | "promotion" | "event";
    sort?: string;
    order?: "ASC" | "DESC";
    page?: string;
    limit?: string;
  };
}) {
  try {
    const res = await newsApi.getNewsList({
      title: searchParams.title,
      category: searchParams.category,
      sort: searchParams.sort,
      order: searchParams.order,
      page: Number(searchParams.page) || 1,
      limit: Number(searchParams.limit) || 10,
    });

    const newsData: NewsData = res.data;

    console.log("News data:", newsData);

    return <NewsList newsData={newsData} />;
  } catch (error) {
    console.error("❌ Failed to fetch news:", error);
    return notFound();
  }
}
