import type React from 'react';
import styles from './Dropdown.module.scss';

interface Props {
  options: string[] | number[];
  value: string | number;
  onSelect?: (value: string) => void;
}

const Dropdown: React.FC<Props> = ({
  options,
  value,
  onSelect = value => {
    console.log(value);
  },
}) => {
  return (
    <select
      value={value}
      className={styles.dropdown}
      onChange={item => onSelect(item.target.value)}
      name={value.toString()}
    >
      {options.map(currValue => {
        return (
          <option
            key={currValue}
            value={currValue}
            className={styles.dropdownOption}
          >
            {currValue}
          </option>
        );
      })}
    </select>
  );
};

export default Dropdown;
