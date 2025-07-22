import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import LogInPage from './LogInPage';
import userEvent from '@testing-library/user-event';
import renderWithClient from '../../testingUtils/renderWithClient';
import { VERIFY_EMAIL } from '../../graphql/queries';
import { LOGIN } from '../../graphql/mutations';
import { MockedProvider } from '@apollo/client/testing';

vi.mock('../../state/hooks/useIsAuthorized', () => ({
  default: () => false,
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: () => Promise.resolve() },
  }),
}));

const mocks = [
  {
    request: {
      query: VERIFY_EMAIL,
      variables: { email: 'test@example.com' },
    },
    result: {
      data: { verifyEmail: 'test@example.com' },
    },
  },
  {
    request: {
      query: LOGIN,
      variables: { email: 'test@example.com', password: 'testPassword' },
    },
    result: {
      data: {
        logIn: {
          accessToken: 'mockToken',
          expiresAt: Date.now(),
          workspaceId: 1,
        },
      },
    },
  },
];

describe('LogInPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('render email input form initially', () => {
    renderWithClient(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LogInPage />
      </MockedProvider>,
    );

    expect(screen.getByLabelText(/emailInput/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/passwordInput/i)).not.toBeInTheDocument();
  });

  it('submit email and show password form on success', async () => {
    renderWithClient(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LogInPage />
      </MockedProvider>,
    );

    await userEvent.type(
      screen.getByLabelText(/emailInput/i),
      'test@example.com',
    );
    await userEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/passwordInput/i)).toBeInTheDocument();
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
    });
  });

  it('submit password and log in', async () => {
    renderWithClient(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LogInPage />
      </MockedProvider>,
    );

    await userEvent.type(
      screen.getByLabelText(/emailInput/i),
      'test@example.com',
    );
    await userEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/passwordInput/i)).toBeInTheDocument();
    });

    await userEvent.type(
      screen.getByLabelText(/passwordInput/i),
      'testPassword',
    );
    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
    expect(mocks.some(mock =>
      mock.request.query === LOGIN &&
      mock.request.variables.email === 'test@example.com' &&
      mock.request.variables.password === 'testPassword'
    )).toBe(true);
  });
  });

  it('go back to email input when back button is pressed', async () => {
    renderWithClient(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LogInPage />
      </MockedProvider>,
    );

    await userEvent.type(
      screen.getByLabelText(/emailInput/i),
      'test@example.com',
    );
    await userEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/passwordInput/i)).toBeInTheDocument();
    });

    await userEvent.click(screen.getByRole('button', { name: /back/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/emailInput/i)).toBeInTheDocument();
      expect(screen.queryByLabelText(/passwordInput/i)).not.toBeInTheDocument();
    });
  });
});
