export function saveTokens(data: any) {
  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('expiresAt', data.expiresAt.toString());

  if (data.workspaceId) {
    localStorage.setItem('workspaceId', data.workspaceId.toString());
  } else {
    localStorage.removeItem('workspaceId');
  }
}