import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LogInPage from './LogInPage';
import * as authApi from '../../api/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { postAuthHandlerSuccess } from '../../test/handlers';
import userEvent from '@testing-library/user-event';

vi.mock('../../state/hooks/useIsAuthorized', () => ({
  default: () => false,
}));

const verifyEmailMock = vi.spyOn(authApi, 'verifyEmail');
const logInMock = vi.spyOn(authApi, 'logIn');

const renderWithClient = () => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <LogInPage />
      </MemoryRouter>
    </QueryClientProvider>,
  );
};

describe('LogInPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('render email input form initially', () => {
    renderWithClient();

    expect(screen.getByPlaceholderText(/enter email/i)).toBeInTheDocument();
    expect(
      screen.queryByPlaceholderText(/enter password/i),
    ).not.toBeInTheDocument();
  });

  it('submit email and shows password form on success', async () => {
    renderWithClient();

    await userEvent.type(screen.getByPlaceholderText(/enter email/i), 'test@example.com');

    userEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(postAuthHandlerSuccess).toHaveBeenCalledTimes(1);
      expect(verifyEmailMock).toHaveBeenCalledWith('test@example.com');
      expect(
        screen.getByPlaceholderText(/enter password/i),
      ).toBeInTheDocument();
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
    });
  });

  it('submit password on success', async () => {
    renderWithClient();

    await userEvent.type(screen.getByPlaceholderText(/enter email/i), 'test@example.com');
    userEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(postAuthHandlerSuccess).toHaveBeenCalledTimes(1);
      expect(verifyEmailMock).toHaveBeenCalledWith('test@example.com');
      expect(
        screen.getByPlaceholderText(/enter password/i),
      ).toBeInTheDocument();
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
    });

    await userEvent.type(screen.getByPlaceholderText(/enter password/i), 'testPassword');
    userEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(postAuthHandlerSuccess).toHaveBeenCalledTimes(2);
      expect(logInMock).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'testPassword',
      });
    });
  });

  it('goes back to email input when back button pressed on password form', async () => {
    renderWithClient();

    await userEvent.type(screen.getByPlaceholderText(/enter email/i), 'test@example.com' );
    userEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(postAuthHandlerSuccess).toHaveBeenCalledTimes(1);
      expect(verifyEmailMock).toHaveBeenCalledWith('test@example.com');
      expect(
        screen.getByPlaceholderText(/enter password/i),
      ).toBeInTheDocument();
    });

    userEvent.click(screen.getByRole('button', { name: /back/i }));

    await waitFor(() => {
      expect(postAuthHandlerSuccess).toHaveBeenCalledTimes(1);
      expect(
        screen.queryByPlaceholderText(/enter password/i),
      ).not.toBeInTheDocument();
      expect(screen.getByPlaceholderText(/enter email/i)).toBeInTheDocument();
    });
  });
});
