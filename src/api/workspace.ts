import axios from 'axios';
import type { WorkspaceType } from '../types';
import api from './config';

export async function getAllWorkspaces(): Promise<WorkspaceType[]> {
  try {
    const response = await api.get<WorkspaceType[]>('/workspace/all');

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const message = error.response.data?.message || 'Unknown error';
      throw new Error(message);
    }

    throw new Error('Network error or server not responding');
  }
}

export async function createWorkspace(name: string) {
  try {
    const response = await api.post('/workspace/create', { name });

    const { accessToken, expiresAt, workspaceId } = response.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('expiresAt', expiresAt.toString());
    localStorage.setItem('workspaceId', workspaceId.toString());

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const message = error.response.data?.message || 'Unknown error';
      throw new Error(message);
    }

    throw new Error('Network error or server not responding');
  }
}

export async function joinWorkspace(workspaceId: number) {
  try {
    const response = await api.post('/workspace/add-user', { workspaceId });

    const { accessToken, expiresAt, workspaceId: newWorkspaceId } = response.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('expiresAt', expiresAt.toString());
    localStorage.setItem('workspaceId', newWorkspaceId.toString());

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const message = error.response.data?.message || 'Unknown error';
      throw new Error(message);
    }

    throw new Error('Network error or server not responding');
  }
}

// export async function leaveWorkspace(workspaceId: number) {
//   try {
//     const response = await api.post('/workspace/remove-user', { workspaceId });

//     return response.data;
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error) && error.response) {
//       const message = error.response.data?.message || 'Unknown error';
//       throw new Error(message);
//     }

//     throw new Error('Network error or server not responding');
//   }
// }
