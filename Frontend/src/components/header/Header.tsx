"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import CategoryList from "../../features/categories/components/CategoryList";
import SearchBar from "../search/SearchBar";
import { Button } from "../ui/button/Button";
import { useAuthStore } from "@/shared/auth/auth-store/useAuthStore";
import { useUserStore } from "@/user/user/store/UseUserStore";
import { useBasketStore } from "@/features/basket/store/basket";
import { useCategoryListStore } from "@/features/categories/store/category";
import { useClickOutside } from "@/features/categories/hooks/useClickOutSide";
import { AppRoute } from "@/shared/auth/enums/app-route.enums";
import MenuIcon from "@/assets/icons/menuIcon";
import UserIcon from "@/assets/icons/userIcon";
import PhoneIcon from "@/assets/icons/phoneIcon";
import CategoriesIcon from "@/assets/icons/categoriesIcon";
import ShoppingCartIcon from "@/assets/icons/shoppingCartIcon";
import { ButtonSize } from "@/components/ui/button/button-type/button-size.enum";
import { ButtonVariant } from "@/components/ui/button/button-type/button-variant.enum";
import styles from "./styles.module.scss";

const Header = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const basket = useBasketStore((state) => state.basket);

  const totalQuantity = basket?.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const user = useUserStore((state) => state.user);
  const loadUser = useUserStore((state) => state.loadUser);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpenUser, setIsOpenUser] = useState(false);
  const { isOpen, toggleList, closeList } = useCategoryListStore();

  const router = useRouter();

  const handleLogout = () => {
    logout();
  };

  const userMenuRef = useRef<HTMLButtonElement>(null);
  const userListRef = useRef<HTMLDivElement>(null);
  const catalogButtonRef = useRef<HTMLButtonElement>(null);
  const catalogListRef = useRef<HTMLDivElement>(null);

  useClickOutside(catalogListRef, () => closeList(), isOpen);
  useClickOutside(userListRef, () => setIsOpenUser(false), isOpenUser);

  useEffect(() => {
    if (isAuthenticated && !user) {
      loadUser();
      // useUserStore.getState().loadUser();
      // setUser(null);
    }
  }, [isAuthenticated, loadUser, user]);

  const handleSearch = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    router.push(`/dashboard/books?search=${searchTerm}`);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <div className={styles.header_logo}>
          <MenuIcon />
          <Link href={AppRoute.ROOT}>BookOutFit</Link>
        </div>
        <Button
          ref={catalogButtonRef}
          className={styles.header_category}
          onClick={toggleList}
        >
          <CategoriesIcon />
          <span>Каталог книг</span>
        </Button>

        <div ref={catalogListRef} className={styles.category_list_container}>
          <CategoryList />
        </div>

        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSearch={handleSearch}
        />

        <div className={styles.header_about}>
          <div className={styles.header_about_phone}>
            <PhoneIcon />
            <Link href="tel:0800800800">0-800-800-800</Link>
          </div>
          <span>Без вихідних, з 9 до 20</span>
        </div>

        <Button
          className={styles.header_cart}
          variant={ButtonVariant.TRANSPARENT}
          size={ButtonSize.SMALL}
          onClick={() => router.push(AppRoute.BASKET)}
        >
          <ShoppingCartIcon />
          <span>Кошик</span>
          {(totalQuantity ?? 0) > 0 && (
            <div className={styles.header_cart_basket_quantity}>
              {totalQuantity ?? 0}
            </div>
          )}
        </Button>

        {isAuthenticated ? (
          <>
            <Button
              ref={userMenuRef}
              onClick={() => setIsOpenUser(!isOpenUser)}
            >
              {user?.firstName[0].toUpperCase()}
              {user?.lastName[0].toUpperCase()}
            </Button>

            {isOpenUser && user && (
              <aside className={styles.header_user} ref={userListRef}>
                {" "}
                <Image
                  src={user.image}
                  alt={user.firstName}
                  className={styles.img}
                  width={300}
                  height={300}
                />
                <p>
                  {user?.firstName} {user?.lastName}
                </p>
                {user?.role === "Admin" && (
                  <Link href={AppRoute.ADMIN}>Адмін панель</Link>
                )}
                <Link href={`/my-account/my-comments/${user?.id}`}>
                  Мої коментарі
                </Link>
                <Link href={AppRoute.NEWS}>Новини</Link>
                <Link href={AppRoute.CHANGE_ACCOUNT}>Редагувати акаунт</Link>
                <Button onClick={() => setIsOpenUser(false)}>Закрити</Button>
                <Button onClick={handleLogout}>Вийти</Button>
              </aside>
            )}
          </>
        ) : (
          <Button
            className={styles.header_login}
            variant={ButtonVariant.TRANSPARENT}
            size={ButtonSize.SMALL}
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
