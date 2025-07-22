import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import SignUpPage from './SignUpPage';
import { REGISTER_USER } from '../../graphql/mutations';

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
      query: REGISTER_USER,
      variables: {
        email: 'test@example.com',
        password: 'testPassword',
      },
    },
    result: {
      data: {
        registerUser: {
          accessToken: 'mockAccessToken',
          expiresAt: Date.now() + 10000,
        },
      },
    },
  },
];

describe('SignUpPage (GraphQL)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders email and password inputs', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <MemoryRouter>
          <SignUpPage />
        </MemoryRouter>
      </MockedProvider>,
    );

    expect(screen.getByLabelText(/emailInput/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/passwordInput/i)).toBeInTheDocument();
  });

  it('submits form and navigates to home on success', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <SignUpPage />
        </MemoryRouter>
      </MockedProvider>,
    );

    await userEvent.type(
      screen.getByLabelText(/emailInput/i),
      'test@example.com',
    );

    await userEvent.type(screen.getByLabelText(/passwordInput/i), 'testPassword');

    userEvent.click(screen.getByLabelText(/registerBtn/i));

    await waitFor(() => {
      expect(
        mocks.some(
          mock =>
            mock.request.query === REGISTER_USER &&
            mock.request.variables.email === 'test@example.com' &&
            mock.request.variables.password === 'testPassword',
        ),
      ).toBe(true);
    });
  });
});
