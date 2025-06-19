import type React from 'react';
import styles from './PagginationBtn.module.scss';
import cn from 'classnames';

interface Props {
  isActive: boolean;
  label: string | number;
  onClick: () => void;
}

const PagginationBtn: React.FC<Props> = ({
  isActive = true,
  label,
  onClick,
}) => {
  return (
    <button
      className={cn(styles.btn, {
        [styles.btnSelected]: isActive,
      })}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default PagginationBtn;
