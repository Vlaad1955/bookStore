export function objectToCleanURLSearchParams(
    obj: { [key: string]: any },
    excludeKeys: string[] = ["limit", "sort", "order", "published"]
): URLSearchParams {
    const params = new URLSearchParams();

    Object.entries(obj).forEach(([key, value]) => {
        if (
            value !== undefined &&
            value !== null &&
            value !== "" &&
            !excludeKeys.includes(key)
        ) {
            params.set(key, String(value));
        }
    });

    return params;
}
