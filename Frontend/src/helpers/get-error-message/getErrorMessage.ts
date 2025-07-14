import { AxiosError } from "axios";

export const getErrorMessage = (err: unknown): string => {
  if (err && typeof err === "object" && "isAxiosError" in err) {
    const axiosError = err as AxiosError<{ message?: string }>;
    return (
      axiosError.response?.data?.message ||
      axiosError.message ||
      "Сталася помилка"
    );
  }

  return err instanceof Error ? err.message : "Невідома помилка";
};
