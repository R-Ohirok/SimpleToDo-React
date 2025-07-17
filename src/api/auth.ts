import axios from 'axios';
import type { LogInParams, RegisterParams } from '../types';
import api from './config';

export async function registerUser(params: RegisterParams): Promise<string> {
  try {
    const response = await api.post('/auth/register', params, {
      withCredentials: true,
    });
    const { accessToken, expiresAt } = response.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('expiresAt', expiresAt.toString());

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const message = error.response.data?.message || 'Unknown error';
      throw new Error(message);
    }

    throw new Error('Network error or server not responding');
  }
}

export async function verifyEmail(email: string): Promise<string> {
  try {
    await api.post('/auth/verifyemail', { email });

    return email;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const message = error.response.data?.message || 'Unknown error';
      throw new Error(message);
    }

    throw new Error('Network error or server not responding');
  }
}

export async function logIn(params: LogInParams): Promise<string> {
  try {
    const response = await api.post('/auth/login', params, {
      withCredentials: true,
    });
    const { accessToken, expiresAt, workspaceId } = response.data;
    
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('expiresAt', expiresAt.toString());

    if (workspaceId) {
      localStorage.setItem('workspaceId', workspaceId.toString());
    } else {
      localStorage.removeItem('workspaceId');
    }
    
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const message = error.response.data?.message || 'Unknown error';
      throw new Error(message);
    }

    throw new Error('Network error or server not responding');
  }
}

export const logout = async () => {
  try {
    await api.post('/auth/logout', null, {
      withCredentials: true,
    });

    localStorage.removeItem('accessToken');
    localStorage.removeItem('expiresAt');
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const message = error.response.data?.message || 'Unknown error';
      throw new Error(message);
    }

    throw new Error('Network error or server not responding');
  }
};

export const refreshToken = async () => {
  try {
    const response = await api.get('/auth/refresh', { withCredentials: true });
  
    const { accessToken, expiresAt, workspaceId } = response.data;
  
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('expiresAt', expiresAt.toString());
    
    if (workspaceId) {
      localStorage.setItem('workspaceId', workspaceId.toString());
    } else {
      localStorage.removeItem('workspaceId');
    }
  
    return expiresAt;
  } catch {
    await logout();
  }
};
