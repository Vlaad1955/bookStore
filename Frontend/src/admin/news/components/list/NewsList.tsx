import React from "react";
import styles from "@/admin/users/components/list/styles.module.scss";
import NewsCard from "@/admin/news/components/card/NewsCard";
import { News } from "@/features/news/types/news";

const NewsList = ({ news }: { news: News[] }) => {
  return (
    <div className={styles.menu}>
      <ul key={`news`} className={styles.list}>
        {news.map((item) => (
          <li key={item.id}>
            <div className={styles.listItem}>
              <NewsCard news={item} key={item.id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsList;
