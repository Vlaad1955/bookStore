"use client";
import Link from "next/link";
import { motion } from "framer-motion";

import { LockClosedIcon } from "@heroicons/react/24/outline";
import styles from "@/admin/other/components/closed-access/styles.module.scss";

export function ClosedAccess() {
  return (
    <div className={styles.container}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className={styles.icon}
          animate={{ rotate: [0, 15, -15, 15, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        >
          <LockClosedIcon />
        </motion.div>

        <h1 className={styles.title}>403</h1>

        <p className={styles.subtitle}>Доступ заборонено</p>
        <p className={styles.description}>
          У вас немає прав для перегляду цієї сторінки.
        </p>

        <Link href="/" className={styles.link}>
          Повернутись на головну
        </Link>
      </motion.div>
    </div>
  );
}
