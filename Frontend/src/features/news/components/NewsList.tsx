"use client";
import Image from "next/image";
import Link from "next/link";

import { News } from "@/features/news/types/news";
import styles from "./styles.module.scss";

type NewsListProps = {
  news: News;
};

const NewsList = ({ news }: NewsListProps) => {
  return (
    <div className={styles.news_item}>
      <div className={styles.news_card}>
        <Link
          className={styles.news_card_item}
          href={`/my-account/news/${news.id}`}
        >
          <div>
            <Image
              src={news.image}
              alt={news.title}
              width={500}
              height={500}
              className={styles.imggg}
            />
          </div>
        </Link>
      </div>

      <div className={styles.news__list_content}>
        <Link
          className={styles.news_card_name}
          href={`/my-account/news/${news.id}`}
        >
          <span className={styles.new_list_title}>{news.title}</span>
        </Link>

        <div className={styles.news_category}>
          <span>Категорія: {news.category}</span>
        </div>

        <div className={styles.news_list_description}>{news.content}</div>
      </div>
    </div>
  );
};

export default NewsList;
