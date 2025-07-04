import { atom, useAtom } from "jotai";

type IsAutorizedType = 'false' | 'true'; 

const initialState: IsAutorizedType =
  (localStorage.getItem('isAutorized') as IsAutorizedType) || 'false';

const autorizeAtom = atom<IsAutorizedType>(initialState);

const useIsAutorized = (): [boolean, () => void] => {
  const [isAuth, setIsAuth] = useAtom(autorizeAtom);

  const isAutorized = isAuth === 'false' ? false : true;

  const setIsAutorized = () => {
    const newAutorize = isAuth === 'false' ? 'true' : 'false';
    localStorage.setItem('isAutorized', newAutorize);

    setIsAuth(newAutorize);
  };

  return [isAutorized, setIsAutorized];
};

export default useIsAutorized;
