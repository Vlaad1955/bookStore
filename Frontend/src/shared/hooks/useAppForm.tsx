import { useForm, UseFormProps, UseFormReturn } from "react-hook-form";

export const useAppForm = <T extends object>(
  props?: UseFormProps<T>
): UseFormReturn<T> => {
  return useForm<T>({ mode: "onChange", ...props });
};
