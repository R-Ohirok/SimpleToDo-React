import type { FilterStatus } from '../../../types/FilterStatus';
import { Dropdown } from '../../atoms/Dropdown';
import styles from './Header.module.scss';

export const Header = () => {
  const filterStatuses: FilterStatus[] = ['All', 'Active', 'Completed'];
  let active = 'All';
  // const change = newItem => {};

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
          values={filterStatuses}
          activeValue={active}
          // onSelect={change}
        />

        <button className={styles.themeToggle} />
      </div>
    </header>
  );
};
