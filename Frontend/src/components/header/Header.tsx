"use client";

import Link from "next/link";
import styles from "./Header.module.css";
import { useAuthStore } from "@/shared/api/authApi";

const Header = () => {
  const { isAuthenticated, logout, token } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

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
