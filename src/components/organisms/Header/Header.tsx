import { FILTER_STATUSES } from '../../../constants/constants';
import type React from 'react';
import Dropdown from '../../atoms/Dropdown/Dropdown';
import styles from './Header.module.scss';
import cn from 'classnames';
import { memo, useState, useId, useCallback } from 'react';
import { normalizeValue } from '../../../utils/normalizeValue';
import type { DropdownOptionType, FilterStatusType } from '../../../types';
import useTheme from '../../../state/hooks/useTheme';
import { useSearchParams } from 'react-router-dom';
import { getNewSearchParams } from '../../../utils/getNewSearchParams';

const Header: React.FC = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('title') || '';
  const activeFilterStatus = searchParams.get('status') || 'All';
  const [searchValue, setSearchValue] = useState(query);
  const [theme, toggleTheme] = useTheme();

  const filterOptions: DropdownOptionType[] = FILTER_STATUSES.map(status => {
    return { id: useId(), label: status };
  });

  const handleFilterStatusChange = useCallback((newStatus: FilterStatusType) => {
    if (newStatus === 'All') {
      const newParamsString = getNewSearchParams(searchParams, {
        status: null,
        page: null,
      });

      setSearchParams(newParamsString);
    } else {
      const newParamsString = getNewSearchParams(searchParams, {
        status: newStatus,
        page: null,
      });

      setSearchParams(newParamsString);
    }
  }, [searchParams]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleCancel = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newParamsString = getNewSearchParams(searchParams, {
      title: null,
      page: null,
    });

    setSearchParams(newParamsString);

    setSearchValue('');
  }, [searchParams]);

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const value = normalizeValue(searchValue);
    const newParamsString = getNewSearchParams(searchParams, {
      title: value || null,
      page: null,
    });

    setSearchParams(newParamsString);
    setSearchValue(value);
  },[searchParams, searchValue]);

  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>TODO LIST</h1>

      <div className={styles.topBar}>
        <form
          className={styles.searchWrapper}
          onSubmit={handleSubmit}
          onReset={handleCancel}
        >
          <input
            name="searchInput"
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={handleChange}
            className={styles.searchInput}
          />
          <button className={styles.searchBtnSearch} type="submit" />
          <button className={styles.searchBtnCancel} type="reset" />
        </form>

        <Dropdown
          options={filterOptions}
          value={activeFilterStatus}
          onChange={handleFilterStatusChange}
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
});

export default Header;
