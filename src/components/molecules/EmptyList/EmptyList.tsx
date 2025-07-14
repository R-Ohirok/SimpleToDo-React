import styles from './EmptyList.module.scss';
import cn from 'classnames';
import useTheme from '../../../state/hooks/useTheme';
import { useTranslation } from 'react-i18next';

const EmptyList = () => {
  const { t } = useTranslation();
  const [activeTheme] = useTheme();

  return (
    <div className={styles.empty}>
      <div
        className={cn(styles.emptyImg, {
          [styles.emptyImgDark]: activeTheme === 'dark',
        })}
      ></div>
      <span>{t('emptyList')}</span>
    </div>
  );
};

export default EmptyList;
