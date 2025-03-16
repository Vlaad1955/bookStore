"use client";

import Link from "next/link";
import styles from "./Header.module.css";
import { useAuthInit, useAuthStore } from "@/shared/store/authStore";

const Header = () => {
  const isMounted = useAuthInit(); 
  const { isAuthenticated, logout, token } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  if (!isMounted) return null;

  return (
    <header className={styles.header}>
      {isAuthenticated ? (
        <>
          <span>Привіт, {token?.replace("mock_token_", "")}!</span>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Вийти
          </button>
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
      <Link href={"/auth/sign-up"}>Sign-up</Link>
    </header>
  );
};
export default Header;
