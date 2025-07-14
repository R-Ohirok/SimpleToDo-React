import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import LogInPage from './LogInPage';
import * as authApi from '../../api/auth';
import { postAuthHandlerSuccess } from '../../test/handlers';
import userEvent from '@testing-library/user-event';
import renderWithClient from '../../testingUtils/renderWithClient';

vi.mock('../../state/hooks/useIsAuthorized', () => ({
  default: () => false,
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: () => Promise.resolve() },
  }),
}));

const verifyEmailMock = vi.spyOn(authApi, 'verifyEmail');
const logInMock = vi.spyOn(authApi, 'logIn');

describe('LogInPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('render email input form initially', () => {
    renderWithClient(<LogInPage />);

    expect(screen.getByLabelText(/emailInput/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/passwordInput/i)).not.toBeInTheDocument();
  });

  it('submit email and shows password form on success', async () => {
    renderWithClient(<LogInPage />);

    await userEvent.type(screen.getByLabelText(/emailInput/i), 'test@example.com');

    userEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(postAuthHandlerSuccess).toHaveBeenCalledTimes(1);
      expect(verifyEmailMock).toHaveBeenCalledWith('test@example.com');
      expect(
        screen.getByLabelText(/passwordInput/i),
      ).toBeInTheDocument();
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
    });
  });

  it('submit password on success', async () => {
    renderWithClient(<LogInPage />);

    await userEvent.type(screen.getByLabelText(/emailInput/i), 'test@example.com');
    userEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(postAuthHandlerSuccess).toHaveBeenCalledTimes(1);
      expect(verifyEmailMock).toHaveBeenCalledWith('test@example.com');
      expect(
        screen.getByLabelText(/passwordInput/i),
      ).toBeInTheDocument();
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
    });

    await userEvent.type(screen.getByLabelText(/passwordInput/i), 'testPassword');
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
    renderWithClient(<LogInPage />);

    await userEvent.type(screen.getByLabelText(/emailInput/i), 'test@example.com' );
    userEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(postAuthHandlerSuccess).toHaveBeenCalledTimes(1);
      expect(verifyEmailMock).toHaveBeenCalledWith('test@example.com');
      expect(
        screen.getByLabelText(/passwordInput/i),
      ).toBeInTheDocument();
    });

    userEvent.click(screen.getByRole('button', { name: /back/i }));

    await waitFor(() => {
      expect(postAuthHandlerSuccess).toHaveBeenCalledTimes(1);
      expect(screen.queryByLabelText(/passwordInput/i)).not.toBeInTheDocument();
      expect(screen.getByLabelText(/emailInput/i)).toBeInTheDocument();
    });
  });
});
