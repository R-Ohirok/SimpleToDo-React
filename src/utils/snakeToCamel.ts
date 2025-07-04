import camelcaseKeys from 'camelcase-keys';

export const snakeToCamel = <T>(handler: (data: T) => void) => {
  return (data: unknown) => {
    const camelData = camelcaseKeys(data as Record<string, unknown>, {
      deep: true,
    }) as T;

    handler(camelData);
  };
};
