import type React from 'react';
import styles from './Dropdown.module.scss';
import type { DropdownOptionType } from '../../../types/DropdownOptionType';

interface Props {
  options: DropdownOptionType[];
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
      name={value}
    >
      {options.map(currValue => {
        return (
          <option
            key={currValue.id}
            value={currValue.label}
            className={styles.dropdownOption}
          >
            {currValue.label}
          </option>
        );
      })}
    </select>
  );
};

export default Dropdown;
