"use client";

import React from "react";
import Image from "next/image";
import styles from "./styles.module.scss";
import Link from "next/link";

interface NewsItems {
  id: string;
  title: string;
  content: string;
  category: "general" | "promotion" | "event";
  image: string;
}

interface NewsItemProps {
  news: NewsItems;
}

const NewsItem: React.FC<NewsItemProps> = ({ news }) => {
  return (
    <>
      <Link href={`/my-account/news/`}>
        <div className={styles.news_title}>Новини та нові надходження</div>
      </Link>

      <div className={styles.news_container}>
        <Image
          src={news.image}
          alt={news.title}
          width={500}
          height={500}
          className={styles.news_image}
        />
        <div>
          <div className={styles.news_title}>{news.title}</div>
          <div className={styles.news_category}>Категорія: {news.category}</div>
          <div className={styles.news_description}>Короткий опис книги</div>
          <div className={styles.news_content}>{news.content}</div>
        </div>
      </div>
    </>
  );
};

export default NewsItem;
