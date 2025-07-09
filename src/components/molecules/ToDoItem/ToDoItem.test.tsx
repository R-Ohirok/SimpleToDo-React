import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToDoItem from './ToDoItem';
import { vi } from 'vitest';
import { updateTodo } from '../../../api/todos';
import type { ToDoType } from '../../../types/index';

vi.mock('../../../api/todos', () => ({
  updateTodo: vi.fn(),
}));

vi.mock('../../../utils/normalizeValue', () => ({
  normalizeValue: (value: string) => value.trim(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

const mockTodo: ToDoType = {
  id: '1',
  title: 'Test todo',
  isCompleted: false,
};

const onDeleteToDo = vi.fn();

describe('ToDoItem', () => {
  it('render todo', () => {
    render(<ToDoItem todo={mockTodo} onDeleteToDo={onDeleteToDo} />);

    expect(screen.getByText('Test todo')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('toggle todo status via checkbox', async () => {
    (updateTodo as any).mockResolvedValue(undefined);

    render(<ToDoItem todo={mockTodo} onDeleteToDo={onDeleteToDo} />);

    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);

    expect(updateTodo).toHaveBeenCalledWith({
      ...mockTodo,
      isCompleted: true,
    });
  });

  it('enter edit mode on "Edit" button click', async () => {
    render(<ToDoItem todo={mockTodo} onDeleteToDo={onDeleteToDo} />);

    const editButton = screen.getByLabelText(/editTodo/i);
    await userEvent.click(editButton);

    expect(screen.getByDisplayValue('Test todo')).toBeInTheDocument();
  });

  it('does not update todo if title is not changed', async () => {
    (updateTodo as any).mockResolvedValue(undefined);

    render(<ToDoItem todo={mockTodo} onDeleteToDo={onDeleteToDo} />);

    const editButton = screen.getByLabelText(/editTodo/i);
    await userEvent.click(editButton);

    const input = screen.getByDisplayValue('Test todo');
    await userEvent.clear(input);
    await userEvent.type(input, 'Test todo');
    await userEvent.keyboard('{Enter}');

    expect(updateTodo).not.toHaveBeenCalled();
  });

  it('update todo title', async () => {
    (updateTodo as any).mockResolvedValue(undefined);

    render(<ToDoItem todo={mockTodo} onDeleteToDo={onDeleteToDo} />);

    const editButton = screen.getByLabelText(/editTodo/i);
    await userEvent.click(editButton);

    const input = screen.getByDisplayValue('Test todo');
    await userEvent.clear(input);
    await userEvent.type(input, 'Updated todo');
    await userEvent.keyboard('{Enter}');

    expect(updateTodo).toHaveBeenCalledWith({
      ...mockTodo,
      title: 'Updated todo',
    });
  });

  it('cancel editing on Escape key press and keeps old title', async () => {
    render(<ToDoItem todo={mockTodo} onDeleteToDo={onDeleteToDo} />);

    const editButton = screen.getByLabelText(/editTodo/i);
    await userEvent.click(editButton);

    const input = screen.getByDisplayValue('Test todo');
    await userEvent.clear(input);
    await userEvent.type(input, 'New text');
    await userEvent.keyboard('{Escape}');

    expect(screen.queryByDisplayValue('New text')).not.toBeInTheDocument();

    expect(screen.getByText('Test todo')).toBeInTheDocument();
  });

  it('delete todo if title is cleared on edit', async () => {
    (updateTodo as any).mockResolvedValue(undefined);

    render(<ToDoItem todo={mockTodo} onDeleteToDo={onDeleteToDo} />);

    const editButton = screen.getByLabelText(/editTodo/i);
    await userEvent.click(editButton);

    const input = screen.getByDisplayValue('Test todo');
    await userEvent.clear(input);
    await userEvent.keyboard('{Enter}');

    expect(onDeleteToDo).toHaveBeenCalledWith(mockTodo.id);
  });

  it('delete todo on "Delete" button click', async () => {
    render(<ToDoItem todo={mockTodo} onDeleteToDo={onDeleteToDo} />);

    const deleteButton = screen.getByLabelText(/deleteTodo/i);
    await userEvent.click(deleteButton);

    expect(onDeleteToDo).toHaveBeenCalledWith(mockTodo.id);
  });
});
