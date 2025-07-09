import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from './Footer';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { vi } from 'vitest';

function ShowLocation() {
  const location = useLocation();
  return <div data-testid="location-display">{location.search}</div>;
}

describe('Footer component', () => {
  const onCreateToDo = vi.fn();

  function renderWithRouter(initialEntries = ['/']) {
    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route
            path="*"
            element={
              <>
                <Footer
                  pagesCount={3}
                  activePage={1}
                  onCreateToDo={onCreateToDo}
                />
                <ShowLocation />
              </>
            }
          />
        </Routes>
      </MemoryRouter>,
    );
  }

  beforeEach(() => {
    onCreateToDo.mockClear();
  });

  it('render add button and pagination', () => {
    renderWithRouter();

    expect(screen.getByRole('button', { name: '＋' })).toBeInTheDocument();
    expect(screen.getAllByRole('button').length).toBeGreaterThan(1);
  });

  it('does not render pagination if pagesCount is 0', () => {
    render(
      <MemoryRouter>
        <Footer pagesCount={0} activePage={1} onCreateToDo={onCreateToDo} />
      </MemoryRouter>,
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(1);
  });

  it('open modal when add button is clicked', async () => {
    renderWithRouter();

    const addButton = screen.getByRole('button', { name: '＋' });

    expect(screen.getByTestId('location-display').textContent).not.toContain(
      'creationModal=true',
    );

    await userEvent.click(addButton);
    expect(screen.getByTestId('location-display').textContent).toContain(
      'creationModal=true',
    );
  });

  it('update url param "page" when pagination button clicked', async () => {
    renderWithRouter(['/']);

    const page2Button = screen.getByRole('button', { name: '2' });

    await userEvent.click(page2Button);

    expect(screen.getByTestId('location-display').textContent).toContain(
      'page=2',
    );

    const page3Button = screen.getByRole('button', { name: '3' });

    await userEvent.click(page3Button);

    expect(screen.getByTestId('location-display').textContent).toContain(
      'page=3',
    );
  });
});
