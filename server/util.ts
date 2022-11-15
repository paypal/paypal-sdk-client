import { memoizedValues } from "@krakenjs/belter";
export const constHas = <
  X extends string | boolean | number,
  T extends Record<string, X>
>(
  constant: T,
  value: X
): boolean => {
  return memoizedValues(constant).indexOf(value) !== -1;
};

export function entries<T>(obj: Record<string, T>): ReadonlyArray<[string, T]> {
  const result: ReadonlyArray<[string, T]> = [];

  for (const key of Object.keys(obj)) {
    (<any>result).push([key, obj[key]]);
  }

  return result;
}
