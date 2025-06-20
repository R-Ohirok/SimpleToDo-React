import type React from 'react';
import styles from './Dropdown.module.scss';

interface Props {
  options: string[] | number[];
  value: string;
  onValueChange: (value: string) => void;
}

const Dropdown: React.FC<Props> = ({ options, value, onValueChange }) => {
  const handleValueChange = (
    newValue: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    onValueChange(newValue.target.value);
  };

  return (
    <select
      value={value}
      className={styles.dropdown}
      onChange={handleValueChange}
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
