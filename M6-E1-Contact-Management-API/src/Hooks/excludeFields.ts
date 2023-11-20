export const excludedFields = <T extends Record<string, any>>(
  data: T,
  keys: (keyof T)[],
): T => {
  return Object.fromEntries(
    Object.entries(data).filter(([key]) => !keys.includes(key as keyof T)),
  ) as T
}
