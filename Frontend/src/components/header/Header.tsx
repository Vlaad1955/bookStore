"use client";

import Link from "next/link";
import styles from "./styles.module.css";
import { useAuthStore } from "@/shared/auth/auth-store/use-auth-store";
import { useEffect, useState } from "react";
import { AppRoute } from "@/shared/enums/app-route.enums";
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
import { useUserStore } from "@/shared/user/store/UseUserStore";

const Header = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const user = useUserStore((state) => state.user);
  const loadUser = useUserStore((state) => state.loadUser);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  console.log("Header user", user);

  const toggleList = useCategoryListStore((state) => state.toggleList);

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (isAuthenticated && !user) {
      loadUser();
      // useUserStore.getState().loadUser();
      // setUser(null);
    }
  }, [isAuthenticated, user]);

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
              {user?.firstName[0].toUpperCase()}
              {user?.lastName[0].toUpperCase()}
            </Button>
            {isOpen && (
              <aside className={styles.header__user}>
                {" "}
                <p>
                  {user?.firstName} {user?.lastName}
                </p>
                <Button onClick={() => setIsOpen(false)}>Закрити</Button>
                <Button onClick={handleLogout}>Вийти</Button>
                <Link href={AppRoute.EXPECTEDGOODS}>Expected Goods</Link>
                <Link href={AppRoute.NEWS}>NEWS</Link>
                <Link href={AppRoute.ORDERS}>Orders</Link>
                <Link href={AppRoute.CHANGE_ACCOUNT}>Change Account</Link>
                <Link href={AppRoute.BASKET}>Basket</Link>
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
