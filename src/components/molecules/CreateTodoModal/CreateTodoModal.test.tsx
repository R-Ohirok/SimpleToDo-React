import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import CreateTodoModal from './CreateTodoModal';
import { postTodoHandler } from '../../../test/handlers';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('CreateTodoModal', () => {
  const setup = () => {
    const onClose = vi.fn();
    const onCreateToDo = postTodoHandler;

    render(<CreateTodoModal onClose={onClose} onCreateToDo={onCreateToDo} />);
    return { onClose, onCreateToDo };
  };

  it('render modal input and buttons', () => {
    setup();

    expect(screen.getByPlaceholderText(/input your note/i)).toBeInTheDocument();
    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
    expect(screen.getByText(/apply/i)).toBeInTheDocument();
  });

  it('call onClose without creating todo if input is empty', async () => {
    const { onClose, onCreateToDo } = setup();

    await userEvent.click(screen.getByText(/apply/i));

    expect(onCreateToDo).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('call onCreateToDo and closes modal', async () => {
    const { onClose, onCreateToDo } = setup();

    const input = screen.getByPlaceholderText(/input your note/i);
    await userEvent.type(input, '  My new todo  ');

    await userEvent.click(screen.getByText(/apply/i));

    expect(onCreateToDo).toHaveBeenCalled();

    expect(onClose).toHaveBeenCalled();
  });

  it('close modal on Cancel button click', async () => {
    const { onClose } = setup();

    await userEvent.click(screen.getByText(/cancel/i));

    expect(onClose).toHaveBeenCalled();
  });
});
