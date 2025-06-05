"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";
import { News } from "@/shared/types/newsATypes/news";

type NewsProps = {
  news: News;
};

const NewsList = ({ news }: NewsProps) => {
  return (
    <div className={styles.news_item}>
      {/* Link to book details page */}
      <div className={styles.news_card}>
        <Link
          className={styles.news_card_item}
          href={`/dashboard/books/${news.id}`}
        >
          <div>
            <Image
              src={news.image}
              alt={news.title}
              width={100}
              height={100}
              className={styles.imggg}
            />
          </div>
        </Link>
      </div>

      {/* Book details */}
      <div className={styles.news_content}>
        <Link
          className={styles.news_card_name}
          href={`/dashboard/books/${news.id}`}
        >
          <span>{news.title}</span>
        </Link>

        <div className={styles.news_author}>
          <span>Категорія: {news.category}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsList;
