import { joiResolver } from "@hookform/resolvers/joi";
import {
  DefaultValues,
  UseFormRegister,
  type Control,
  type DeepPartial,
  type FieldErrors,
  type FieldValues,
  type UseFormHandleSubmit,
  type UseFormReset,
  type UseFormSetError,
  type UseFormTrigger,
  type UseFormWatch,
  type ValidationMode,
} from "react-hook-form";
import { useForm } from "react-hook-form";

import { type ValidationSchema } from "@/shared/validation-schemas/validation-schema.type";

type Parameters<T extends FieldValues = FieldValues> = {
  defaultValues: DeepPartial<T>;
  validationSchema?: ValidationSchema;
  mode?: keyof ValidationMode;
};

type ReturnValue<T extends FieldValues = FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  handleSubmit: UseFormHandleSubmit<T>;
  reset?: UseFormReset<T>;
  watch: UseFormWatch<T>;
  setError: UseFormSetError<T>;
  trigger: UseFormTrigger<T>;
  register: UseFormRegister<T>;
};

const useAppForm = <T extends FieldValues = FieldValues>({
  validationSchema,
  defaultValues,
  mode,
}: Parameters<T>): ReturnValue<T> => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setError,
    trigger,
    register,
  } = useForm<T>({
    mode,
    defaultValues: defaultValues as DefaultValues<T>,
    resolver: validationSchema ? joiResolver(validationSchema) : undefined,
  });

  return {
    control,
    errors,
    handleSubmit,
    reset,
    watch,
    setError,
    trigger,
    register,
  };
};

export { useAppForm };
