"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { getText } from "@/helpers/get-text-to-path/getTextToPath";
import styles from "./styles.module.scss";
import {AppRoute} from "@/shared/auth/enums/app-route.enums";

type AuthWrapperProps = {
  authPath: string;
  screen: React.ReactNode;
};

const AuthWrapper = ({ authPath, screen }: AuthWrapperProps) => {
  const pathname = usePathname();

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
          {pathname === AppRoute.SIGN_IN && (
              <div className={styles.header_text}>
                <span>{getText(pathname, "forgotText")}</span>
                <Link className={styles.header_link} href={AppRoute.RESET}>
                  {getText(pathname, "forgotLink")}
                </Link>
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
