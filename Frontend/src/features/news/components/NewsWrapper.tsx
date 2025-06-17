"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button/Button";
import { NewsDataProps } from "../types/news";
import styles from "./styles.module.scss";

export default function NewsWrapper({ newsData }: { newsData: NewsDataProps }) {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/my-account/news/${id}`);
  };

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
