import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import AuthForm from './AuthForm';

describe('AuthForm', () => {
  const defaultProps = {
    title: 'Test Title',
    field: 'email' as 'email',
    errorMessage: '',
    submitBtnText: 'Submit',
    onSubmit: vi.fn(),
    onBack: vi.fn(),
  };

  it('renders title, input and buttons', () => {
    render(<AuthForm {...defaultProps} />);

    expect(screen.getByRole('heading', { name: /test title/i })).toBeInTheDocument();

    const input = screen.getByPlaceholderText(/enter email/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('name', 'emailInput');

    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('renders error message when provided', () => {
    render(<AuthForm {...defaultProps} errorMessage="Error text" />);

    expect(screen.getByText(/error text/i)).toBeInTheDocument();
  });

  it('renders showEmail text when provided', () => {
    render(<AuthForm {...defaultProps} showEmail="You entered email@example.com" />);

    expect(screen.getByText(/you entered email@example.com/i)).toBeInTheDocument();
  });

  it('calls onSubmit when form is submitted', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<AuthForm {...defaultProps} onSubmit={onSubmit} />);

    const input = screen.getByPlaceholderText(/enter email/i);

    await user.type(input, 'test@example.com');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(onSubmit).toHaveBeenCalled();
  });

  it('calls onBack when Back button is clicked', async () => {
    const user = userEvent.setup();
    const onBack = vi.fn();
    render(<AuthForm {...defaultProps} onBack={onBack} />);

    const backBtn = screen.getByRole('button', { name: /back/i });
    await user.click(backBtn);

    expect(onBack).toHaveBeenCalled();
  });
});