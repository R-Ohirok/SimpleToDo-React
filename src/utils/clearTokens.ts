export function clearTokens() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('expiresAt');
  localStorage.removeItem('workspaceId');
}