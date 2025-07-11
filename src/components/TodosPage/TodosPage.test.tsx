import { screen, waitFor } from '@testing-library/react';
import TodosPage from './TodosPage';
import {
  deleteTodoHandler,
  getTodosHandler,
  postTodoHandler,
} from '../../test/handlers';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import renderWithClient from '../../testingUtils/renderWithClient';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('TodosPage', () => {
  it('render TodosPage and makes GET request', async () => {
    renderWithClient(<TodosPage />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('test 1')).toBeInTheDocument();
      expect(screen.getByText('test 2')).toBeInTheDocument();
      expect(screen.getByText('test 3')).toBeInTheDocument();
      expect(screen.getByText('test 4')).toBeInTheDocument();
      expect(screen.getByText('test 5')).toBeInTheDocument();
    });
    expect(getTodosHandler).toHaveBeenCalledTimes(1);
  });

  it('send a GET request when the search input submit', async () => {
    renderWithClient(<TodosPage />);

    const search = await screen.findByRole('button', { name: 'search' });
    const input = (await screen.findByRole('textbox')) as HTMLInputElement;

    await userEvent.type(input, 'test');
    expect(input.value).toBe('test');

    await userEvent.click(search);

    await waitFor(() => {
      expect(screen.getByTestId('location-display').textContent).toContain(
        'title=test',
      );

      expect(getTodosHandler).toHaveBeenCalledTimes(2);
    });
  });

  it('send a GET request when the filter status changes', async () => {
    renderWithClient(<TodosPage />);

    const dropdown = await screen.findByRole('combobox');
    expect(dropdown).toBeInTheDocument();

    await userEvent.selectOptions(dropdown, 'Completed');

    await waitFor(() => {
      expect(screen.getByTestId('location-display').textContent).toContain(
        'status=Completed',
      );

      expect(getTodosHandler).toHaveBeenCalledTimes(2);
    });
  });

  it('send a GET request when the page changes', async () => {
    renderWithClient(<TodosPage />);

    const page2Button = await screen.findByRole('button', { name: '2' });
    await userEvent.click(page2Button);

    await waitFor(() => {
      expect(screen.getByTestId('location-display').textContent).toContain(
        'page=2',
      );

      expect(getTodosHandler).toHaveBeenCalledTimes(2);
    });
  });

  it('sends a POST request when a new todo is added', async () => {
    renderWithClient(<TodosPage />);

    const addButton = await screen.findByRole('button', { name: '＋' });
    await userEvent.click(addButton);

    const input = await screen.findByPlaceholderText(/input your note/i);
    await userEvent.type(input, '  My new todo  ');

    const applyButton = await screen.findByText(/apply/i);
    await userEvent.click(applyButton);

    await waitFor(() => {
      expect(postTodoHandler).toHaveBeenCalledTimes(1);
    });
  });

  it('sends a DELETE request when todo deleted', async () => {
    renderWithClient(<TodosPage />);

    const deleteButtons = await screen.findAllByLabelText(/deleteTodo/i);

    expect(deleteButtons.length).toBeGreaterThan(0);

    await userEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(deleteTodoHandler).toHaveBeenCalledTimes(1);
    });
  });
});
