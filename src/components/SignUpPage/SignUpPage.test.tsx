import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignUpPage from './SignUpPage';
import { postAuthHandlerSuccess } from '../../test/handlers';
import * as authApi from '../../api/auth';
const register = vi.spyOn(authApi, 'registerUser');

vi.mock('../../state/hooks/useIsAuthorized', () => ({
  default: () => false,
}));

describe('SignUpPage', () => {
  it('renders email and password inputs', () => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/enter email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter password/i)).toBeInTheDocument();
  });

  it('submits form and navigates to home on success', async () => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );


    fireEvent.change(screen.getByPlaceholderText(/enter email/i), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByPlaceholderText(/enter password/i), {
      target: { value: 'test123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(register).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'test123456',
      });
      expect(postAuthHandlerSuccess).toHaveBeenCalledTimes(1);
    });
  });
});