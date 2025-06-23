import { useAtom } from 'jotai';
import styles from './EmptyList.module.scss';
import cn from 'classnames';
import { themeAtom } from '../../../state/jotai';

const EmptyList = () => {
  const [activeTheme] = useAtom(themeAtom);

  return (
    <div className={styles.empty}>
      <div
        className={cn(styles.emptyImg, {
          [styles.emptyImgDark]: activeTheme === 'dark',
        })}
      ></div>
      <span>Empty...</span>
    </div>
  );
};

export default EmptyList;
