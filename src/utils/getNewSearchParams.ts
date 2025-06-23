import type { SearchParams } from '../types';

export const getNewSearchParams = (
  currentParams: URLSearchParams,
  paramsToUpdate: SearchParams,
): string => {
  const newParams = new URLSearchParams(currentParams);

  Object.entries(paramsToUpdate).forEach(([key, value]) => {
    value ? newParams.set(key, value) : newParams.delete(key);
  });

  return newParams.toString();
};
