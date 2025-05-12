"use client";

import Link from "next/link";
import styles from "./styles.module.css";
import { useAuthStore } from "@/shared/auth/auth-store/use-auth-store";
// import { useUserStore } from "@/shared/store/useUserStore";
import { useState } from "react";
import { AppRoute } from "@/shared/enums/app-route.enums";
import mockUser from "@/shared/mock/mock-user";
import { useCategoryListStore } from "@/shared/store/UseCategoryStore";
import MenuIcon from "@/shared/assets/icons/menuIcon";
import CategoriesIcon from "@/shared/assets/icons/categoriesIcon";
import ShoppingCartIcon from "@/shared/assets/icons/shoppingCartIcon";
import UserIcon from "@/shared/assets/icons/userIcon";
import PhoneIcon from "@/shared/assets/icons/phoneIcon";
import { Button } from "../ui/button/Button";
import { ButtonVariant } from "@/shared/enums/button/button-variant.enum";
import { ButtonSize } from "@/shared/enums/button/button-size.enum";
import SearchBar from "../search/SearchBar";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState("");

  const toggleList = useCategoryListStore((state) => state.toggleList);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__logo}>
          <MenuIcon />
          <Link href={AppRoute.ROOT}>BookOutFit</Link>
        </div>

        <Button className={styles.header__category} onClick={toggleList}>
          <CategoriesIcon />
          <span>Каталог книг</span>
        </Button>

        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSearch={() => {
            console.log("Пошук:", searchTerm);
          }}
        />
        <div className={styles.header__about}>
          <div className={styles.header__about_phone}>
            <PhoneIcon />
            <Link href="tel:0800800800">0-800-800-800</Link>
          </div>
          <span>Без вихідних, з 9 до 20</span>
        </div>
        {/* <div>Повідомлення від магазину</div> якщо користувач увійшов в систему */}
        <Button
          className={styles.header__cart}
          variant={ButtonVariant.TRANSPARENT}
          size={ButtonSize.SMALL}
        >
          <ShoppingCartIcon />
          <span>Кошик</span>
        </Button>
        {isAuthenticated ? (
          <>
            <Button onClick={() => setIsOpen(!isOpen)}>
              {mockUser?.firstName} {mockUser?.lastName} хахахаха
            </Button>
            {isOpen && (
              <aside className={styles.header__user}>
                {" "}
                <p>
                  {mockUser?.firstName} {mockUser?.lastName}
                </p>
                <Button onClick={() => setIsOpen(false)}>Закрити</Button>
                <Button onClick={handleLogout}>Вийти</Button>
                <Link href={AppRoute.EXPECTEDGOODS}>Expected Goods</Link>
                <Link href={AppRoute.FAVORITE}>My Favorite</Link>
                <Link href={AppRoute.ORDERS}>Orders</Link>
              </aside>
            )}
          </>
        ) : (
          <Button
            className={styles.header__login}
            variant={ButtonVariant.TRANSPARENT}
            size={ButtonSize.SMALL}
            // size="custom"
          >
            <UserIcon />
            <Link href={AppRoute.SIGN_IN}>Увійти</Link>
          </Button>
        )}
      </div>
    </header>
  );
};
export default Header;
