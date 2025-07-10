import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from './Header';
import userEvent from '@testing-library/user-event';

function ShowLocation() {
  const location = useLocation();
  return <div data-testid="location-display">{location.search}</div>;
}

function renderWithRouter(initialEntries = ['/']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route
          path="*"
          element={
            <>
              <Header />
              <ShowLocation />
            </>
          }
        />
      </Routes>
    </MemoryRouter>,
  );
}

describe('Header', () => {
  it('render header', () => {
    renderWithRouter();

    expect(screen.getByText('TODO LIST')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(3);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('allow typing in the search input', () => {
    renderWithRouter();

    const input = screen.getByRole('textbox') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');
  });

  it('update URL searchParams when search is submitted', async () => {
    renderWithRouter();

    const search = screen.getByRole('button', { name: 'search' });
    const input = screen.getByRole('textbox') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');

    await userEvent.click(search);
    expect(screen.getByTestId('location-display').textContent).toContain(
      'title=test',
    );
  });

  it('delete title from URL searchParams when clean button clicked', async () => {
    renderWithRouter();

    const search = screen.getByRole('button', { name: 'search' });
    const clean = screen.getByRole('button', { name: 'clean' });
    const input = screen.getByRole('textbox') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');

    await userEvent.click(search);
    expect(screen.getByTestId('location-display').textContent).toContain(
      'title=test',
    );

    await userEvent.click(clean);
    expect(screen.getByTestId('location-display').textContent).not.toContain(
      'title=test',
    );
  });

  it('update dropdown value on selection', () => {
    renderWithRouter();

    const dropdown = screen.getByRole('combobox');
    fireEvent.change(dropdown, { target: { value: 'Completed' } });

    expect(dropdown).toHaveValue('Completed');
  });

  it('update URL searchParams when change dropdown value', () => {
    renderWithRouter();

    const dropdown = screen.getByRole('combobox');
    fireEvent.change(dropdown, { target: { value: 'Completed' } });

    expect(dropdown).toHaveValue('Completed');
    expect(screen.getByTestId('location-display').textContent).toContain(
      'status=Completed',
    );

    fireEvent.change(dropdown, { target: { value: 'Active' } });

    expect(dropdown).toHaveValue('Active');
    expect(screen.getByTestId('location-display').textContent).toContain(
      'status=Active',
    );
  });
});
