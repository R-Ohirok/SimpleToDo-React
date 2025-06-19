import type React from 'react';
import styles from './Dropdown.module.scss';

interface Props {
  values: string[] | number[];
  activeValue: string | number;
  onChange: (value: string) => void;
}

export const Dropdown: React.FC<Props> = ({
  values,
  activeValue,
  onChange,
}) => {
  return (
    <select
      value={activeValue}
      className={styles.dropdown}
      onChange={item => onChange(item.target.value)}
      name={activeValue.toString()}
    >
      {values.map(currVlue => {
        return (
          <option key={currVlue} value={currVlue} className={styles.dropdownOption}>
            {currVlue}
          </option>
        );
      })}
    </select>
  );
};
