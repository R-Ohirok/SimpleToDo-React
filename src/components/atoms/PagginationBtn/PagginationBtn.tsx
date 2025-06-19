import type React from 'react';
import styles from './PagginationBtn.module.scss';
import cn from 'classnames';

interface Props {
  isSelected: boolean;
  label: string | number;
  onClick: () => void;
}

const PagginationBtn: React.FC<Props> = ({
  isSelected = true,
  label,
  onClick,
}) => {
  return (
    <button
      className={cn(styles.btn, {
        [styles.btnSelected]: isSelected,
      })}
      onClick={onClick}
      disabled={isSelected}
    >
      {label}
    </button>
  );
};

export default PagginationBtn;