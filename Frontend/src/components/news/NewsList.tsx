"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button/Button";

import styles from "./styles.module.scss";
import Link from "next/link";

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

  console.log("newsData", newsData);

  return (
    <>
      <div className={styles.news_list_title}>Новини та нові надходження</div>
      <div className={styles.news_list_container}>
        {newsData.entities.map((item) => (
          <div className={styles.news_list_item_container} key={item.id}>
            {item.image && (
              <Link href={`/my-account/news/${item.id}`}>
                <Image
                  src={item.image}
                  alt="Зображення новини"
                  width={160}
                  height={240}
                  className={styles.news_list_item_image}
                />
              </Link>
            )}
            <div className={styles.news_list_item_content_wrapper}>
              <div>
                <Link href={`/my-account/news/${item.id}`}>
                  <div className={styles.news_list_item_title}>
                    {item.title}
                  </div>
                </Link>
                <div className={styles.news_list_item_content}>
                  {item.content}
                </div>
                <div className={styles.news_list_item_category}>
                  Категорія: {item.category}
                </div>
              </div>
              <Button
                className={styles.news_list_item_button}
                onClick={() => handleClick(item.id)}
              >
                Перейти до новини
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
