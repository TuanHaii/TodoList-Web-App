import { API_ENDPOINTS } from '../constants';
import { User, Task, ApiResponse } from '../types';

class ApiService {
  private baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

  private getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getAuthToken();
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth methods
  async login(email: string, password: string) {
    const response = await this.request<{ user: User; token: string }>(
      API_ENDPOINTS.AUTH.LOGIN,
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }
    );
    
    if (response.success && response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }
    
    return response;
  }

  async register(name: string, email: string, password: string) {
    const response = await this.request<{ user: User; token: string }>(
      API_ENDPOINTS.AUTH.REGISTER,
      {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      }
    );

    if (response.success && response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }

    return response;
  }

  async logout() {
    const response = await this.request(API_ENDPOINTS.AUTH.LOGOUT, {
      method: 'POST',
    });
    
    localStorage.removeItem('authToken');
    return response;
  }

  // User methods
  async getProfile() {
    return this.request<User>(API_ENDPOINTS.USERS.PROFILE);
  }

  async updateProfile(data: Partial<User>) {
    return this.request<User>(API_ENDPOINTS.USERS.UPDATE, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Task methods
  async getTasks() {
    return this.request<Task[]>(API_ENDPOINTS.TASKS.LIST);
  }

  async getTask(id: string) {
    return this.request<Task>(`${API_ENDPOINTS.TASKS.LIST}/${id}`);
  }

  async createTask(taskData: Omit<Task, 'id'>) {
    return this.request<Task>(API_ENDPOINTS.TASKS.CREATE, {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  }

  async updateTask(id: string, taskData: Partial<Task>) {
    return this.request<Task>(API_ENDPOINTS.TASKS.UPDATE(id), {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  }

  async deleteTask(id: string) {
    return this.request(API_ENDPOINTS.TASKS.DELETE(id), {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();
