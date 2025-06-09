"use client";

import styles from "./styles.module.scss";
import { getText } from "@/helpers/get-text-to-path/get-text-to-path";
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
    <div className={styles.auth_container}>
      <div className={styles.auth_wrapper}>
        <div className={styles.auth_header}>
          <h2 className={styles.header_title}>{getText(pathname, "title")}</h2>
          <div className={styles.auth_body}>{screen}</div>
          <div className={styles.header_text}>
            <span>{getText(pathname, "authText")}</span>
            <Link className={styles.header_link} href={authPath}>
              {getText(pathname, "authLink")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
