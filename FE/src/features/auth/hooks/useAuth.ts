import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/shared/services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/shared/hooks/use-toast';

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      apiService.login(email, password),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.setQueryData(['user'], data.data.user);
        navigate('/dashboard');
        toast({
          title: 'Success',
          description: 'Logged in successfully!',
        });
      }
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Login failed. Please check your credentials.',
        variant: 'destructive',
      });
      console.error('Login error:', error);
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, email, password }: { name: string; email: string; password: string }) =>
      apiService.register(name, email, password),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.setQueryData(['user'], data.data.user);
        navigate('/dashboard');
        toast({
          title: 'Success',
          description: 'Account created successfully!',
        });
      }
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Registration failed. Please try again.',
        variant: 'destructive',
      });
      console.error('Registration error:', error);
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => apiService.logout(),
    onSuccess: () => {
      queryClient.clear();
      navigate('/login');
      toast({
        title: 'Success',
        description: 'Logged out successfully!',
      });
    },
    onError: (error) => {
      console.error('Logout error:', error);
      // Even if logout fails, clear local data
      queryClient.clear();
      navigate('/login');
    },
  });
};

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => apiService.getProfile(),
    select: (data) => data.data,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
