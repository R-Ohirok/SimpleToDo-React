import { atom, useAtom } from 'jotai';

type IsAuthorizedType = 'false' | 'true';

const initialState: IsAuthorizedType =
  (localStorage.getItem('isAuthorized') as IsAuthorizedType) || 'false';

const AuthorizeAtom = atom<boolean>(initialState ==='true');

const useIsAuthorized = (): [boolean, () => void] => {
  const [isAuth, setIsAuth] = useAtom(AuthorizeAtom);

  const setIsAuthorized = () => {
    const newAuthorize = isAuth ? 'false' : 'true';
    localStorage.setItem('isAuthorized', newAuthorize);

    setIsAuth(!isAuth);
  };

  return [isAuth, setIsAuthorized];
};

export default useIsAuthorized;
