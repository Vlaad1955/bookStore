import React from "react";
import styles from "./styles.module.scss";
import { Button } from "@/components/ui/button/Button";
import SearchIcon from "@/shared/assets/icons/searchIcon";
import { InputType } from "@/shared/enums/users/input-type.enum"; // Переконайся, що типи правильно імпортовані
import { SearchBarProps } from "@/shared/types/searchTypes/searchTypes";

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch }) => {
  return (
    <div className={styles.searchBar}>
      <SearchIcon />
      <input
        type={InputType.TEXT}
        placeholder="Знайти книгу"
        className={styles.searchInput}
        value={value}
        onChange={onChange}
        name="text"
      />
      <Button className={styles.searchButton} onClick={onSearch}>
        Пошук
      </Button>
    </div>
  );
};

export default SearchBar;
