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

    expect(screen.getByLabelText(/modalContentInput/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cancel/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/create/i)).toBeInTheDocument();
  });

  it('call onClose without creating todo if input is empty', async () => {
    const { onCreateToDo } = setup();

    await userEvent.click(screen.getByLabelText(/create/i));

    expect(onCreateToDo).not.toHaveBeenCalled();
  });

  it('call onCreateToDo and closes modal', async () => {
    const { onClose, onCreateToDo } = setup();

    const input = screen.getByLabelText(/modalContentInput/i);
    await userEvent.type(input, '  My new todo  ');

    await userEvent.click(screen.getByLabelText(/create/i));

    expect(onCreateToDo).toHaveBeenCalled();

    expect(onClose).toHaveBeenCalled();
  });

  it('close modal on Cancel button click', async () => {
    const { onClose } = setup();

    await userEvent.click(screen.getByLabelText(/cancel/i));

    expect(onClose).toHaveBeenCalled();
  });
});
