import type React from 'react';
import type { ReactNode } from 'react';
import styles from './PagginationBtn.module.scss';
import cn from 'classnames';

interface Props {
  isSelected: boolean;
  children: ReactNode | ReactNode[];
  click: () => void;
}

const PagginationBtn: React.FC<Props> = ({
  isSelected = true,
  children,
  click,
}) => {
  return (
    <button
      className={cn(styles.btn, {
        [styles.btnSelected]: isSelected,
      })}
      onClick={click}
      disabled={isSelected}
    >
      {children}
    </button>
  );
};

export default PagginationBtn;