export function getAuthToken(): string | null {
  return localStorage.getItem('authToken');
}

export function getAuthHeaders(): Record<string, string> {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
