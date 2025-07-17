import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToDoItem from './ToDoItem';
import { vi } from 'vitest';
import type { ToDoType } from '../../../types/index';
import { deleteTodoHandler, patchTodoHandler } from '../../../test/handlers';
import * as todosApi from '../../../api/todos';

beforeEach(() => {
  vi.clearAllMocks();
});

const mockTodo: ToDoType = {
  id: '1',
  title: 'test todo',
  isCompleted: false,
};

const onDeleteToDo = deleteTodoHandler;

describe('ToDoItem', () => {
  it('render todo', () => {
    render(<ToDoItem todo={mockTodo} onDeleteToDo={onDeleteToDo} />);

    expect(screen.getByText('test todo')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('toggle todo status via checkbox', async () => {
    const updateTodo = vi.spyOn(todosApi, 'updateTodo');

    render(<ToDoItem todo={mockTodo} onDeleteToDo={onDeleteToDo} />);

    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);

    expect(patchTodoHandler).toHaveBeenCalledTimes(1);

    expect(updateTodo).toHaveBeenCalledWith({
      ...mockTodo,
      isCompleted: true,
    });
  });

  it('enter edit mode on "Edit" button click', async () => {
    render(<ToDoItem todo={mockTodo} onDeleteToDo={onDeleteToDo} />);

    const editButton = screen.getByLabelText(/editTodoBtn/i);
    await userEvent.click(editButton);

    expect(screen.getByLabelText(/editTodoInput/i)).toBeInTheDocument();
  });

  it('does not update todo if title is not changed', async () => {
    const updateTodo = vi.spyOn(todosApi, 'updateTodo');

    render(<ToDoItem todo={mockTodo} onDeleteToDo={onDeleteToDo} />);

    const editButton = screen.getByLabelText(/editTodoBtn/i);
    await userEvent.click(editButton);

    const input = screen.getByLabelText(/editTodoInput/i);
    await userEvent.clear(input);
    await userEvent.type(input, 'test todo');
    await userEvent.keyboard('{Enter}');

    expect(patchTodoHandler).toHaveBeenCalledTimes(0);
    expect(updateTodo).not.toHaveBeenCalled();
  });

  it('update todo title', async () => {
    const updateTodo = vi.spyOn(todosApi, 'updateTodo');
    render(<ToDoItem todo={mockTodo} onDeleteToDo={onDeleteToDo} />);

    const editButton = screen.getByLabelText(/editTodoBtn/i);
    await userEvent.click(editButton);

    const input = screen.getByLabelText(/editTodoInput/i);
    await userEvent.clear(input);
    await userEvent.type(input, 'updated todo');
    await userEvent.keyboard('{Enter}');

    expect(patchTodoHandler).toHaveBeenCalledTimes(1);
    expect(updateTodo).toHaveBeenCalledWith({
      ...mockTodo,
      title: 'updated todo',
    });
  });

  it('cancel editing on Escape key press and keeps old title', async () => {
    render(<ToDoItem todo={mockTodo} onDeleteToDo={onDeleteToDo} />);

    const editButton = screen.getByLabelText(/editTodoBtn/i);
    await userEvent.click(editButton);

    const input = screen.getByLabelText(/editTodoInput/i);
    await userEvent.clear(input);
    await userEvent.type(input, 'new text');
    await userEvent.keyboard('{Escape}');

    expect(screen.queryByDisplayValue('new text')).not.toBeInTheDocument();
    expect(screen.getByText('test todo')).toBeInTheDocument();
    expect(patchTodoHandler).toHaveBeenCalledTimes(0);
  });

  it('delete todo if title is cleared on edit', async () => {
    render(<ToDoItem todo={mockTodo} onDeleteToDo={onDeleteToDo} />);

    const editButton = screen.getByLabelText(/editTodoBtn/i);
    await userEvent.click(editButton);

    const input = screen.getByLabelText(/editTodoInput/i);
    await userEvent.clear(input);
    await userEvent.keyboard('{Enter}');

    expect(deleteTodoHandler).toHaveBeenCalledTimes(1);
    expect(onDeleteToDo).toHaveBeenCalledWith(mockTodo.id);
  });

  it('delete todo on "Delete" button click', async () => {
    render(<ToDoItem todo={mockTodo} onDeleteToDo={onDeleteToDo} />);

    const deleteButton = screen.getByLabelText(/deleteTodo/i);
    await userEvent.click(deleteButton);

    expect(deleteTodoHandler).toHaveBeenCalledTimes(1);
    expect(onDeleteToDo).toHaveBeenCalledWith(mockTodo.id);
  });
});
