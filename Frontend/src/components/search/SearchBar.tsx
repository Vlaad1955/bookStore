import React from "react";
import styles from "./styles.module.scss";
import { Button } from "@/components/ui/button/Button";
import SearchIcon from "@/assets/icons/searchIcon";
import { InputType } from "@/components/ui/input/input-type/input-type.enum";
import { SearchBarProps } from "@/shared/types/searchTypes/searchTypes";
import { ButtonType } from "@/components/ui/button/button-type/button-type.enum";
import Form from "next/form";

const SearchBar = ({ value, onChange, onSearch }: SearchBarProps) => {
  return (
    <Form className={styles.search_bar} onSubmit={onSearch} action={""}>
      <SearchIcon />
      <input
        type={InputType.TEXT}
        placeholder="Знайти книгу"
        className={styles.search_input}
        value={value}
        onChange={onChange}
        name="search"
      />
      <Button className={styles.search_button} type={ButtonType.SUBMIT}>
        Пошук
      </Button>
    </Form>
  );
};

export default SearchBar;
