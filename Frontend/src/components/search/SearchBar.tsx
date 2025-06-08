import React from "react";
import styles from "./styles.module.scss";
import { Button } from "@/components/ui/button/Button";
import SearchIcon from "@/shared/assets/icons/searchIcon";
import { InputType } from "@/shared/enums/users/input-type.enum";
import { SearchBarProps } from "@/shared/types/searchTypes/searchTypes";
import { ButtonType } from "@/shared/enums/button/button-type.enum";
import Form from "next/form";

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch }) => {
  return (
    <Form className={styles.searchBar} onSubmit={onSearch} action={""}>
      <SearchIcon />
      <input
        type={InputType.TEXT}
        placeholder="Знайти книгу"
        className={styles.searchInput}
        value={value}
        onChange={onChange}
        name="search"
      />
      <Button className={styles.searchButton} type={ButtonType.SUBMIT}>
        Пошук
      </Button>
    </Form>
  );
};

export default SearchBar;
