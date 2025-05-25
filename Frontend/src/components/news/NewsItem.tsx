"use client";

import React from "react";
import Image from "next/image";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: "general" | "promotion" | "event";
  image: string;
}

interface NewsItemProps {
  news: NewsItem;
}

const NewsItem: React.FC<NewsItemProps> = ({ news }) => {
  return (
    <>
      <div>HI One News</div>
      <div>{news.title}</div>

      <Image src={news.image} alt={news.title} width={500} height={500} />
      <div>{news.content}</div>
    </>
  );
};

export default NewsItem;
