import React from "react";
import { Button } from "@/components/ui/button/Button";

type NewsHeaderProps = {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onCreateClick: () => void;
};

const NewsHeader: React.FC<NewsHeaderProps> = ({
  selectedCategory,
  onCategoryChange,
  onCreateClick,
}) => {
  return (
    <div className={styles.headerWrapper}>
      <Button variant="primary" onClick={onCreateClick}>
        Створити новину
      </Button>
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className={styles.categorySelect}
      >
        <option value="general">General</option>
        <option value="promotion">Promotion</option>
        <option value="event">Event</option>
      </select>
    </div>
  );
};

export default NewsHeader;
