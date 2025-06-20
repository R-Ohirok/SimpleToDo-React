import type React from 'react';
import styles from './Dropdown.module.scss';
import type { DropdownOptionType, FilterStatusType } from '../../../types';

interface Props {
  options: DropdownOptionType[];
  value: string;
  onChange: (value: FilterStatusType) => void;
}

const Dropdown: React.FC<Props> = ({ options, value, onChange }) => {
  const handleValueChange = (
    newValue: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    onChange(newValue.target.value as FilterStatusType);
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
