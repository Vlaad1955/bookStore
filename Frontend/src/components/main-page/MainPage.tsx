import React from "react";

import SpecialProducts from "../special-products/SpecialProducts";
import NewsSpecail from "../../features/news/components/NewsSpecail";
import styles from "./styles.module.scss";

const MainPage = () => {
  return (
    <section className={styles.main_container}>
      <div className={styles.main_side_bar}>
        <div className={styles.main_title}>Знайди себе між рядків</div>
      </div>

      <NewsSpecail />
      <SpecialProducts categoryName="Дитяча література" />
      <SpecialProducts categoryName="Книги-іграшки" />
    </section>
  );
};

export default MainPage;
