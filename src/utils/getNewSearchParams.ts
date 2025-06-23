import type { SearchParams } from '../types';

export const getNewSearchParams = (
  currentParams: URLSearchParams,
  paramsToUpdate: SearchParams,
): string => {
  const newParams = new URLSearchParams(currentParams);

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    if (value === null) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
  });

  return newParams.toString();
}
