import axios from 'axios';
import type { RegisterParams } from '../types';
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
