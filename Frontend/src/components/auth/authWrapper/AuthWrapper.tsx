"use client";

import styles from "./styles.module.scss";
import { getText } from "@/shared/helpers/get-text-to-path/get-text-to-path";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AuthWrapperProps {
  authPath: string;
  screen: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ authPath, screen }) => {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <div className={styles.authContainer}>
      <div className={styles.authWrapper}>
        <div className={styles.authHeader}>
          <h2 className={styles.headerTitle}>{getText(pathname, "title")}</h2>
          <div className={styles.authBody}>{screen}</div>
          <div className={styles.headerText}>
            <span>{getText(pathname, "authText")}</span>
            <Link className={styles.headerLink} href={authPath}>
              {getText(pathname, "authLink")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
