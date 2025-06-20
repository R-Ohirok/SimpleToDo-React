import { FILTER_STATUSES } from '../../../constants/FilterStatuses';
import type React from 'react';
import Dropdown from '../../atoms/Dropdown/Dropdown';
import styles from './Header.module.scss';

interface Props {
  activeStatus: string;
  changeStatus: (newStatus: string) => void;
};

const Header: React.FC<Props> = ({activeStatus, changeStatus}) => {

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
          options={FILTER_STATUSES}
          value={activeStatus}
          onSelect={() => {}}
        />

        <button className={styles.themeToggle} />
      </div>
    </header>
  );
};

export default Header;
