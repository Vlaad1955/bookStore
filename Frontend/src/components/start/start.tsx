import React from "react";
import styles from "./styles.module.scss";

const StartBook = () => {
  return (
    <div className={styles.home_grid}>
      <div className={styles.side_bar}>Left side</div>
      <div className={styles.home_main}>Знайди себе між рядків</div>
    </div>
  );
};

export default StartBook;
