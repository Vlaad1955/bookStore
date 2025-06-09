"use client";

import styles from "./styles.module.scss";
import { FaInstagram, FaFacebook, FaTelegram } from "react-icons/fa";
import { AppRoute } from "@/shared/auth/enums/app-route.enums";
import Link from "next/link";
import PhoneIcon from "@/assets/icons/phoneIcon";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.container}>
          <div className={styles.icons}>
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaFacebook />
            </a>
            <a href="#">
              <FaTelegram />
            </a>
          </div>
        </div>

        <div className={styles.column}>
          <h3>Покупцям</h3>
          <ul>
            <li>
              <Link href={AppRoute.SIGN_UP}>Зареєструватись</Link>
            </li>
            <li>
              <Link href={AppRoute.NEWS}>Новини</Link>
            </li>
            <li>
              <Link href={AppRoute.BASKET}>Кошик</Link>
            </li>
          </ul>
          <div className={styles.year}>© 2025</div>
        </div>

        <div className={styles.column}>
          <h3>Контакти</h3>
          <p>
            <PhoneIcon /> 0-800-800-800
          </p>
          <p>wylf1312@gmail.com</p>
        </div>

        <div className={styles.column}>
          <button onClick={scrollToTop} className={styles.scrollButton}>
            Нагору
          </button>
        </div>
      </div>
    </footer>
  );
}
