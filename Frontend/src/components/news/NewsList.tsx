"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button/Button";

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

export default function NewsList({ newsData }: { newsData: NewsData }) {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/my-account/news/${id}`);
  };

  return (
    <div>
      <h1>Список новин</h1>
      {newsData.entities.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.content}</p>
          {item.image && (
            <Image
              src={item.image}
              alt="Зображення новини"
              width={300}
              height={300}
            />
          )}
          <p>Категорія: {item.category}</p>
          <Button onClick={() => handleClick(item.id)}>
            Перейти до новини
          </Button>
        </div>
      ))}
    </div>
  );
}
