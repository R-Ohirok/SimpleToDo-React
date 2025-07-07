import axios from 'axios';
import type { LogInParams, RegisterParams } from '../types';
import api from './config';

export async function registerUser(params: RegisterParams): Promise<string> {
  try {
    const response = await api.post('/auth/register', params);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const message = error.response.data?.message || 'Unknown error';
      throw new Error(message);
    }

    throw new Error('Network error or server not responding');
  }
}

export async function findUser(email: string): Promise<string> {
  try {
    const response = await api.post('/auth/finduser', { email });

    return response.data;
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
    const response = await api.post('/auth/login', params);

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const message = error.response.data?.message || 'Unknown error';
      throw new Error(message);
    }

    throw new Error('Network error or server not responding');
  }
}
