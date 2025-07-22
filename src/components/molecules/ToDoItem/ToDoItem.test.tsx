import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToDoItem from './ToDoItem';
import { MockedProvider } from '@apollo/client/testing';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { DELETE_TODO } from '../../../graphql/mutations';
import type { ToDoType } from '../../../types/index';

const mockTodo: ToDoType = {
  id: '1',
  title: 'test todo',
  isCompleted: false,
};

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: () => Promise.resolve() },
  }),
}));

const onDeleteToDo = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
});

const deleteTodoMock = (id: string) => ({
  request: {
    query: DELETE_TODO,
    variables: { id },
  },
  result: {
    data: {
      deleteTodo: { id },
    },
  },
});

describe('ToDoItem', () => {
  const renderComponent = (mocks: any[]) =>
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ToDoItem todo={mockTodo} onDeleteToDo={onDeleteToDo} />
      </MockedProvider>,
    );

  it('renders todo', () => {
    renderComponent([]);

    expect(screen.getByText('test todo')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('enter edit mode on "Edit" button click', async () => {
    renderComponent([]);

    await userEvent.click(screen.getByLabelText(/editTodoBtn/i));

    expect(screen.getByLabelText(/editTodoInput/i)).toBeInTheDocument();
  });

  it('cancel editing on Escape key press and keeps old title', async () => {
    renderComponent([]);

    await userEvent.click(screen.getByLabelText(/editTodoBtn/i));

    const input = screen.getByLabelText(/editTodoInput/i);
    await userEvent.clear(input);
    await userEvent.type(input, 'new text');
    await userEvent.keyboard('{Escape}');

    expect(screen.queryByDisplayValue('new text')).not.toBeInTheDocument();
    expect(screen.getByText('test todo')).toBeInTheDocument();
  });

  it('delete todo if title is cleared on edit', async () => {
    renderComponent([deleteTodoMock(mockTodo.id)]);

    await userEvent.click(screen.getByLabelText(/editTodoBtn/i));

    const input = screen.getByLabelText(/editTodoInput/i);
    await userEvent.clear(input);
    await userEvent.keyboard('{Enter}');

    await waitFor(() => {
      expect(onDeleteToDo).toHaveBeenCalledWith(mockTodo.id);
    });
  });

  it('delete todo on "Delete" button click', async () => {
    renderComponent([deleteTodoMock(mockTodo.id)]);

    await userEvent.click(screen.getByLabelText(/deleteTodo/i));

    await waitFor(() => {
      expect(onDeleteToDo).toHaveBeenCalledWith(mockTodo.id);
    });
  });
});
