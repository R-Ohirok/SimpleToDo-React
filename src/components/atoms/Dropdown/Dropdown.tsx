import type React from 'react';
import styles from './Dropdown.module.scss';
import type { DropdownOptionType } from '../../../types';

interface Props {
  options: DropdownOptionType[];
  value: string;
  onChange: (value: string) => void;
}

const Dropdown: React.FC<Props> = ({ options, value, onChange }) => {
  const handleValueChange = (
    newValue: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    onChange(newValue.target.value);
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
            value={currValue.value}
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
