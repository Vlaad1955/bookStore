export function getParam(
  value: string | string[] | undefined,
  defaultValue = ""
) {
  if (Array.isArray(value)) return value.join(",");
  return value ?? defaultValue;
}

export function getBooleanParam(
  value: string | string[] | boolean | undefined,
  defaultValue: boolean = true
): boolean {
  if (typeof value === "boolean") return value;
  if (Array.isArray(value)) return value[0] === "true";
  if (typeof value === "string") return value === "true";
  return defaultValue;
}
