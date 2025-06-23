import { FILTER_STATUSES } from '../../../constants/constants';
import type React from 'react';
import Dropdown from '../../atoms/Dropdown/Dropdown';
import styles from './Header.module.scss';
import cn from 'classnames';
import { memo, useState, useId } from 'react';
import { normalizeValue } from '../../../utils/normalizeValue';
import type { DropdownOptionType, FilterStatusType } from '../../../types';
import useTheme from '../../../state/hooks/useTheme';

interface Props {
  activeFilterStatus: string;
  onFilterStatusChange: (newStatus: FilterStatusType) => void;
  onSearchSubmit: (title: string) => void;
}

const Header: React.FC<Props> = memo(
  ({ activeFilterStatus, onFilterStatusChange, onSearchSubmit }) => {
    const [searchValue, setSearchValue] = useState('');

    const { theme, toggleTheme } = useTheme();

    const filterOptions: DropdownOptionType[] = FILTER_STATUSES.map(status => {
      return { id: useId(), label: status };
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    };

    const handleCancel = () => {
      setSearchValue('');
      onSearchSubmit('');
    };

    const handleSubmit = () => {
      const value = normalizeValue(searchValue);

      setSearchValue(value);
      onSearchSubmit(value);
    };

    return (
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>TODO LIST</h1>

        <div className={styles.topBar}>
          <div className={styles.searchWrapper}>
            <input
              name="searchInput"
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={handleChange}
              className={styles.searchInput}
            />
            <button className={styles.searchBtnSearch} onClick={handleSubmit} />
            <button className={styles.searchBtnCancel} onClick={handleCancel} />
          </div>

          <Dropdown
            options={filterOptions}
            value={activeFilterStatus}
            onChange={onFilterStatusChange}
          />

          <button
            className={cn(styles.themeToggle, {
              [styles.themeToggleDark]: theme === 'dark',
            })}
            onClick={toggleTheme}
          />
        </div>
      </header>
    );
  },
);

export default Header;
