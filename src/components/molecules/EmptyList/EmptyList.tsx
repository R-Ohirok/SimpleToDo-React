import styles from './EmptyList.module.scss';
import cn from 'classnames';
import useTheme from '../../../state/hooks/useTheme';

const EmptyList = () => {
  const {theme} = useTheme();

  return (
    <div className={styles.empty}>
      <div
        className={cn(styles.emptyImg, {
          [styles.emptyImgDark]: theme === 'dark',
        })}
      ></div>
      <span>Empty...</span>
    </div>
  );
};

export default EmptyList;
