import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/shared/services/api';
import { Task, TodoItem, ApiResponse } from '@/shared/types';
import { toast } from '@/shared/hooks/use-toast';

export const useTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: () => apiService.getTasks(),
    select: (data: TodoItem[] | ApiResponse<TodoItem[]>) => {
      console.log('📝 Raw tasks data:', data);
      // Nếu response là array trực tiếp, return data
      // Nếu response là wrapper object, return data.data
      return Array.isArray(data) ? data : (data?.data || []);
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useTask = (username: string) => {
  return useQuery({
    queryKey: ['task', username],
    queryFn: () => apiService.getTaskByUsername(username),
    select: (data) => data.data,
    enabled: !!username,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskData, username }: { taskData: Omit<Task, 'id'>; username: string }) => 
      apiService.createTask(taskData, username),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
        toast({
          title: 'Success',
          description: 'Task created successfully!',
        });
      }
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to create task. Please try again.',
        variant: 'destructive',
      });
      console.error('Create task error:', error);
    },
  });
};
export const useCreateSimpleTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (taskData: Omit<Task, 'id' | 'username'>) => apiService.createSimpleTask(taskData),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
        toast({
          title: 'Success',
          description: 'Simple task created successfully!',
        });
      }
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to create simple task. Please try again.',
        variant: 'destructive',
      });
      console.error('Create simple task error:', error);
    },
  });
}
export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Task> }) =>
      apiService.updateTask(id, data),
    onSuccess: (data, variables) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ['tasks'] });
        queryClient.invalidateQueries({ queryKey: ['task', variables.id] });
        toast({
          title: 'Success',
          description: 'Task updated successfully!',
        });
      }
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to update task. Please try again.',
        variant: 'destructive',
      });
      console.error('Update task error:', error);
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiService.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast({
        title: 'Success',
        description: 'Task deleted successfully!',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to delete task. Please try again.',
        variant: 'destructive',
      });
      console.error('Delete task error:', error);
    },
  });
};
