import React from "react";
import styles from "./styles.module.scss";
import { Button } from "@/components/ui/button/Button";
import SearchIcon from "@/shared/assets/icons/searchIcon";
import { InputType } from "@/shared/enums/users/input-type.enum";
import { SearchBarProps } from "@/shared/types/searchTypes/searchTypes";

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch }) => {
    return (
        <form
            className={styles.searchBar}
            onSubmit={onSearch}
        >
            <SearchIcon />
            <input
                type={InputType.TEXT}
                placeholder="Знайти книгу"
                className={styles.searchInput}
                value={value}
                onChange={onChange}
                name="search"
            />
            <Button className={styles.searchButton} type="submit">
                Пошук
            </Button>
        </form>
    );
};

export default SearchBar;
