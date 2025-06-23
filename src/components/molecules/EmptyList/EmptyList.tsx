import styles from './EmptyList.module.scss';
import cn from 'classnames';
import useTheme from '../../../state/hooks/useTheme';

const EmptyList = () => {
  const [activeTheme] = useTheme();

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
