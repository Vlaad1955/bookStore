import classNames from "classnames";
import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { useController as useFormController } from "react-hook-form";

import styles from "./styles.module.scss";
import { JSX } from "react";
import { InputType } from "@/shared/enums/users/input-type.enum";

type Properties<T extends FieldValues> = {
  control?: Control<T, null>;
  errors: FieldErrors<T>;
  label?: string;
  placeholder?: string;
  name: FieldPath<T>;
  type?: InputType;
  inputClassName?: string;
  labelClassName?: string;
  isDisabled?: boolean;
  eyeHidden?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  maxLength?: number;
  minLength?: number;
  max?: number | string;
};

const Input = <T extends FieldValues>({
  control,
  errors,
  label,
  name,
  placeholder = "",
  type,
  inputClassName = "",
  labelClassName = "",
  isDisabled = false,
  // onChange,
  maxLength,
  minLength,
  max,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const error = errors[name]?.message;
  const hasError = Boolean(error);

  const labelClasses = classNames(styles.label, labelClassName);
  const inputClasses = classNames(
    styles.input,
    styles[isDisabled ? "disabled" : ""],
    inputClassName
  );

  const inputClassesWithError = classNames(inputClasses, styles.hasError);
  const isFileInput = type === InputType.FILE;

  return (
    <label className={labelClasses}>
      <span className={styles.inputLabel}>{label}</span>
      {/* {onChange && ( */}
      {isFileInput ? (
        <input
          type="file"
          name={name}
          placeholder={placeholder}
          disabled={isDisabled}
          className={`${hasError ? inputClassesWithError : inputClasses}`}
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            field.onChange?.(file);
          }}
        />
      ) : (
        <input
          {...field}
          type={type || InputType.TEXT}
          placeholder={placeholder}
          disabled={isDisabled}
          className={`${hasError ? inputClassesWithError : inputClasses}`}
          // onChange={onChange}
          maxLength={maxLength}
          minLength={minLength}
          max={max}
        />
      )}

      {/* )} */}
      {/* {!onChange && (
        <input
          {...field}
          type={type || InputType.TEXT}
          placeholder={placeholder}
          disabled={isDisabled}
          className={`${hasError ? inputClassesWithError : inputClasses}`}
        />
      )} */}

      {hasError && <span className={styles.inputError}>{error as string}</span>}
    </label>
  );
};

export { Input };
