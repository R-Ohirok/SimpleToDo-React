import type React from 'react';
import styles from './Dropdown.module.scss';

interface Props {
  values: string[] | number[];
  activeValue: string | number;
  onSelect?: (value: string) => void;
}

const Dropdown: React.FC<Props> = ({
  values,
  activeValue,
  onSelect = value => {console.log(value)},
}) => {
  return (
    <select
      value={activeValue}
      className={styles.dropdown}
      onChange={item => onSelect(item.target.value)}
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

export default Dropdown;