import { FILTER_STATUSES } from '../../../constants/FilterStatuses';
import type React from 'react';
import Dropdown from '../../atoms/Dropdown/Dropdown';
import styles from './Header.module.scss';
import { memo, useId } from 'react';
import type { DropdownOptionType } from '../../../types/DropdownOptionType';

interface Props {
  activeFilterStatus: string;
  onFilterStatusChange: (newStatus: string) => void;
}

const Header: React.FC<Props> = memo(
  ({ activeFilterStatus, onFilterStatusChange }) => {
    const filterOptions: DropdownOptionType[] = FILTER_STATUSES.map(status => {
      return { id: useId(), label: status };
    });

    return (
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>TODO LIST</h1>

        <div className={styles.topBar}>
          <div className={styles.searchWrapper}>
            <input
              id="search-input"
              type="text"
              placeholder="Search..."
              className={styles.searchInput}
            />
            <button className={styles.searchBtn} />
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
