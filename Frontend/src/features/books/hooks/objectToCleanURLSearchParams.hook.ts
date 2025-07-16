export function objectToCleanURLSearchParams(
    obj: { [key: string]: unknown },
    excludeKeys: string[] = ["limit", "sort", "order", "published", "page"]
): URLSearchParams {
  const params = new URLSearchParams();

  Object.entries(obj).forEach(([key, value]) => {
    if (excludeKeys.includes(key)) return;

    if (Array.isArray(value)) {
      const cleanedArray = value.filter(
          (v) => v !== undefined && v !== null && v !== ""
      );

      if (cleanedArray.length > 0) {
        cleanedArray.forEach((v) => {
          params.append(key, String(v));
        });
      }
    } else if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  });

  return params;
}
