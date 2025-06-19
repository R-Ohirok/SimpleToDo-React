import type React from 'react';
import type { FilterStatus } from '../../../types/FilterStatus';
import { Dropdown } from '../../atoms/Dropdown';
import styles from './Header.module.scss';
import { useState } from 'react';

interface Props {
  activeStatus: string;
  changeStatus: (newStatus: string) => void;
};

const filterStatuses: FilterStatus[] = ['All', 'Active', 'Completed'];

export const Header: React.FC<Props> = ({activeStatus, changeStatus}) => {
  const [query, setQuery] = useState('');
  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>TODO LIST</h1>

      <div className={styles.topBar}>
        <div className={styles.searchWrapper}>
          <input
            id="search-input"
            type="text"
            placeholder="Search..."
            value={query}
            onChange={event => setQuery(event.target.value)}
            className={styles.searchInput}
          />
          <button className={styles.searchBtn} />
        </div>

        <Dropdown
          values={filterStatuses}
          activeValue={activeStatus}
          onChange={changeStatus}
        />

        <button className={styles.themeToggle} />
      </div>
    </header>
  );
};
