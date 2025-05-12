export function cleanParams<T extends Record<string, unknown>>(
  params: T
): Partial<T> {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) =>
      Array.isArray(value) ? value.length > 0 : value !== ""
    )
  ) as Partial<T>;
}
