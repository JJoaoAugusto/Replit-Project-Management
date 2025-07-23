import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

export function useAuth() {
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem('authToken')
  );
  
  const queryClient = useQueryClient();

  // Update authorization header when token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }, [token]);

  const { data: user, isLoading } = useQuery({
    queryKey: ['/api/auth/user'],
    enabled: !!token,
    retry: false,
    queryFn: async () => {
      const response = await fetch('/api/auth/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          setToken(null);
          return null;
        }
        throw new Error('Failed to fetch user');
      }
      
      return response.json();
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await apiRequest('POST', '/api/auth/login', credentials);
      return response.json() as Promise<AuthResponse>;
    },
    onSuccess: (data) => {
      setToken(data.token);
      queryClient.setQueryData(['/api/auth/user'], data.user);
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: { 
      name: string; 
      email: string; 
      password: string; 
      confirmPassword: string; 
    }) => {
      const response = await apiRequest('POST', '/api/auth/register', userData);
      return response.json() as Promise<AuthResponse>;
    },
    onSuccess: (data) => {
      setToken(data.token);
      queryClient.setQueryData(['/api/auth/user'], data.user);
    },
  });

  const logout = () => {
    setToken(null);
    queryClient.clear();
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!token && !!user,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    isLoginLoading: loginMutation.isPending,
    isRegisterLoading: registerMutation.isPending,
  };
}
