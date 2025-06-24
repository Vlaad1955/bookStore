import classNames from "classnames";
import React from "react";

import {
  ButtonSize,
  type ButtonType,
  ButtonVariant,
} from "@/components/ui/button/button-type/button.enum";

import styles from "./styles.module.scss";

type Properties = {
  children: React.ReactNode;
  name?: string;
  type?: ButtonType;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  unstyled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = React.forwardRef<HTMLButtonElement, Properties>(
  (
    {
      children,
      type,
      className,
      variant = ButtonVariant.PRIMARY,
      size = ButtonSize.MEDIUM,
      disabled = false,
      unstyled = false,
      onClick,
      name = "",
    },
    ref
  ) => {
    const buttonClasses = !unstyled
      ? classNames(
          styles.button,
          variant === "round" ? styles.equalRounded : styles[size],
          variant === "primary" && size === "small" ? styles.primarySmall : "",
          variant === "primary" && size === "medium"
            ? styles.primaryMedium
            : "",
          variant === "delete" && size === "small" ? styles.deleteSmall : "",
          variant === "transparent" ? styles.transparent : "",
          styles[variant + (disabled ? "Disabled" : "")],
          className
        )
      : className;

    return (
      <button
        ref={ref}
        name={name}
        type={type}
        className={buttonClasses}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
