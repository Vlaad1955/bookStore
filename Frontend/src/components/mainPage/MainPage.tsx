import React from "react";
import styles from "./styles.module.scss";
import NewsSpecail from "../news/NewsSpecail";
import SpecialProducts from "../specialProducts/SpecialProducts";

const MainPage = () => {
  return (
    <div className={styles.main_container}>
      <div className={styles.main_side_bar}>
        <div className={styles.main_title}>Знайди себе між рядків</div>
      </div>

      <NewsSpecail />
      <SpecialProducts categoryName="Дитяча література" />
      <SpecialProducts categoryName="Книги-іграшки" />
    </div>
  );
};

export default MainPage;
