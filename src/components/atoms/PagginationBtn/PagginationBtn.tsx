import type React from 'react';
import styles from './PagginationBtn.module.scss';
import cn from 'classnames';

interface Props {
  isActive: boolean;
  label: number;
  onChangePage: (newActivePage: number) => void;
}

const PagginationBtn: React.FC<Props> = ({
  isActive = true,
  label,
  onChangePage,
}) => {
  return (
    <button
      className={cn(styles.btn, {
        [styles.btnSelected]: isActive,
      })}
      onClick={() => onChangePage(label)}
    >
      {label}
    </button>
  );
};

export default PagginationBtn;
