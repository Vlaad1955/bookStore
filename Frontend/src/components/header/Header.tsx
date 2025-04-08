"use client";

import Link from "next/link";
import styles from "./Header.module.css";
import { useAuthStore } from "@/shared/auth/auth-store/use-auth-store";
// import { useUserStore } from "@/shared/store/useUserStore";
import { useState } from "react";
import { AppRoute } from "@/shared/enums/app-route.enums";
import mockUser from "@/shared/mock/mock-user";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout, token } = useAuthStore();
  // const { user } = useUserStore();

  // console.log(user);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className={styles.header}>
      {/* {isAuthenticated ? (
        <>
          <div>
            <span>Привіт, {token?.replace("mock_token_", "")}!</span>
            <div>
              <button className={styles.logoutButton} onClick={handleLogout}>
                Вийти
              </button>
            </div>
          </div>
        </>
      ) : (
        <button
          className={styles.loginButton}
          // onClick={() => setIsModalOpen(true)}
        >
          Увійти
        </button>
      )}
      <Link href={"/auth/sign-in"}>Sign-in</Link>
      <Link href={"/auth/sign-up"}>Sign-up</Link> */}

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <div>
          ||
          <span>Книгарні нема чи є</span>
        </div>
        <div>Каталог книг</div>
        <div>Пошук книг</div>
        <div>Про магазин</div>
        <div>Повідомлення від магазину</div>
        <div>Кошик</div>
        {isAuthenticated ? (
          <>
            <button onClick={() => setIsOpen(!isOpen)}>
              {mockUser?.firstName} {mockUser?.lastName} хахахаха
            </button>
            {isOpen && (
              <aside>
                {" "}
                <p>
                  {mockUser?.firstName} {mockUser?.lastName}
                </p>
                <button onClick={() => setIsOpen(false)}>Закрити</button>
                <button onClick={handleLogout}>Вийти</button>
                <Link href={AppRoute.EXPECTEDGOODS}>Expected Goods</Link>
                <Link href={AppRoute.FAVORITE}>My Favorite</Link>
                <Link href={AppRoute.ORDERS}>Orders</Link>
              </aside>
            )}
          </>
        ) : (
          <Link href={AppRoute.SIGN_IN}>Увійти</Link>
        )}
      </div>
    </header>
  );
};
export default Header;
