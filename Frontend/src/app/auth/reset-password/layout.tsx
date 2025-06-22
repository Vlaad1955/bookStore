import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Скидання паролю",
  description: "Сторінка для скидання паролю",
};
type Props = { children: React.ReactNode };
const ResetPasswordLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default ResetPasswordLayout;
