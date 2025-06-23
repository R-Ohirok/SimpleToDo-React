import styles from './EmptyList.module.scss';
import cn from 'classnames';
import useSwitchTheme from '../../../state/hooks/useSwitchTheme';

const EmptyList = () => {
  const { activeTheme } = useSwitchTheme();

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
