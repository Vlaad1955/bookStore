"use client";
import React, { useRef } from "react";

import { Button } from "../../../components/ui/button/Button";
import { News } from "@/features/news/types/news";
import NewsList from "./NewsList";
import styles from "./styles.module.scss";

type NewsSpecialListProps = {
  news: News[];
};

const NewsSpecailList = ({ news }: NewsSpecialListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const handleScrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className={styles.news_list_container}>
      <div className={styles.news_scroll_wrapper}>
        <Button
          unstyled
          onClick={handleScrollLeft}
          className={styles.scroll_button}
        >
          ←
        </Button>

        <div ref={scrollRef} className={styles.news_list}>
          {news.map((item) => (
            <NewsList key={item.id} news={item} />
          ))}
        </div>

        <Button
          unstyled
          onClick={handleScrollRight}
          className={styles.scroll_button}
        >
          →
        </Button>
      </div>
    </div>
  );
};

export default NewsSpecailList;
