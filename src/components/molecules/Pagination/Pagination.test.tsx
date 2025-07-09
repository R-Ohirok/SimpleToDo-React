import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';
import { vi } from 'vitest';

describe('Pagination component', () => {
  const onChangePage = vi.fn();

  beforeEach(() => {
    onChangePage.mockClear();
  });

  it('render correct number of page buttons', () => {
    render(
      <Pagination pagesCount={5} activePage={1} onChangePage={onChangePage} />,
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(5);
  });

  it('call onChangePage with correct page number when button clicked', async () => {
    render(
      <Pagination pagesCount={3} activePage={1} onChangePage={onChangePage} />,
    );

    const page3Button = screen.getByRole('button', { name: '3' });
    await userEvent.click(page3Button);

    expect(onChangePage).toHaveBeenCalledWith(3);
  });
});
