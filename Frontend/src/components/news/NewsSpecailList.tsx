"use client";
import React, { useRef } from "react";
import styles from "./styles.module.scss";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
import { Button } from "../ui/button/Button";
import { News } from "@/shared/types/newsATypes/news";
import NewsList from "./NewsList";

type Props = {
  news: News[];
};

const NewsSpecailList: React.FC<Props> = ({ news }) => {
  // const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);

  // const handleClick = (id: string) => {
  //   router.push(`/dashboard/news/${id}`);
  // };

  const handleScrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const handleScrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className={styles.news_container}>
      <div className={styles.news_scroll_wrapper}>
        <Button
          unstyled
          onClick={handleScrollLeft}
          className={styles.scrollButton}
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
          className={styles.scrollButton}
        >
          →
        </Button>
      </div>
    </div>
  );
};

export default NewsSpecailList;

// <div className={styles.specialnews_container}>
//   <div className={styles.specialnews_title}>Новини та нові надходження</div>
//   <div className={styles.specialnews_list}>
//     {news.map((item) => (
//       <div className={styles.specialnews_item} key={item.id}>
//         {item.image && (
//           <Image
//             src={item.image}
//             alt={item.title}
//             width={140}
//             height={200}
//             className={styles.specialnews_image}
//           />
//         )}
//         <div className={styles.specialnews_info}>
//           <h3 className={styles.specialnews_item_title}>{item.title}</h3>
//           <p className={styles.specialnews_item_content}>{item.content}</p>
//           <div className={styles.specialnews_item_category}>
//             Категорія: {item.category}
//           </div>
//           <Button
//             className={styles.specialnews_button}
//             onClick={() => handleClick(item.id)}
//           >
//             Детальніше
//           </Button>
//         </div>
//       </div>
//     ))}
//   </div>
// </div>

// <div className={styles.news_item} key={item.id}>
//   {item.image && (
//     <Image
//       src={item.image}
//       alt={item.title}
//       width={140}
//       height={200}
//       className={styles.news_image}
//     />
//   )}
//   <div className={styles.news_content}>
//     <div className={styles.news_title_text}>{item.title}</div>
//     <div className={styles.news_body}>{item.content}</div>
//     <div className={styles.news_category}>
//       Категорія: {item.category}
//     </div>
//     <Button
//       onClick={() => handleClick(item.id)}
//       className={styles.news_button}
//     >
//       Перейти до новини
//     </Button>
//   </div>
// </div>
