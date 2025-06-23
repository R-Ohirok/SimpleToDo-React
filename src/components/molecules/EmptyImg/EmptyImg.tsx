import styles from './EmptyImg.module.scss';

const EmptyImg = () => {
  return (
    <div className={styles.empty}>
      <div className={styles.emptyImg}></div>
      <span>Empty...</span>
    </div>
  );
};

export default EmptyImg;
