import { FILTER_STATUSES } from '../../../constants/constants';
import type React from 'react';
import Dropdown from '../../atoms/Dropdown/Dropdown';
import styles from './Header.module.scss';
import { memo, useState, useId } from 'react';
import type { DropdownOptionType } from '../../../types/DropdownOptionType';
import { normalizeValue } from '../../../utils/normalizeValue';

interface Props {
  activeFilterStatus: string;
  onFilterStatusChange: (newStatus: string) => void;
  onFind: (title: string) => void;
}

const Header: React.FC<Props> = memo(
  ({ activeFilterStatus, onFilterStatusChange, onFind }) => {
    console.log('render header');
    const [searchValue, setSearchValue] = useState('');

    const filterOptions: DropdownOptionType[] = FILTER_STATUSES.map(status => {
      return { id: useId(), label: status };
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    };

    const handleFind = () => {
      const clearValue = normalizeValue(searchValue);

      setSearchValue(clearValue);
      onFind(clearValue);
    };

    return (
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>TODO LIST</h1>

        <div className={styles.topBar}>
          <div className={styles.searchWrapper}>
            <input
              id="search-input"
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={handleChange}
              className={styles.searchInput}
            />
            <button className={styles.searchBtn} onClick={handleFind} />
          </div>

          <Dropdown
            options={filterOptions}
            value={activeFilterStatus}
            onValueChange={onFilterStatusChange}
          />

          <button className={styles.themeToggle} />
        </div>
      </header>
    );
  },
);

export default Header;
