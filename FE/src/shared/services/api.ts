import { API_ENDPOINTS } from '../constants';
import { User, Task, TodoItem, ApiResponse } from '../types';

class ApiService {
  private baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

  constructor() {
    console.log('🔧 API Service initialized');
    console.log('🌍 Environment VITE_API_URL:', import.meta.env.VITE_API_URL);
    console.log('🔗 Using baseURL:', this.baseURL);
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getAuthToken();
    console.log('API Request:', { url, method: options.method || 'GET', token });
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
      
      console.log('API Response:', { status: response.status, ok: response.ok });
      
      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }
        
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('API Success Response:', data);
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth methods
  async login(username: string, password: string) {
    console.log('🚀 Login function called with:', { username, password });
    
    const response = await this.request<{ user: User; token: string }>(
      API_ENDPOINTS.AUTH.LOGIN,
      {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      }
    );
    
    console.log('✅ Login response:', response);
  if (response.success && response.data.token) {
    console.log('Saving token:', response.data.token);
    localStorage.setItem('authToken', response.data.token);
    console.log('Token saved:', localStorage.getItem('authToken'));
  }
  
  return response;
}

  async register(username: string, email: string, password: string) {
    const response = await this.request<{ user: User; token: string }>(
      API_ENDPOINTS.AUTH.REGISTER,
      {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
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
  const res = await this.request<{ success: boolean; data: User }>(API_ENDPOINTS.USERS.PROFILE);
  // Log để kiểm tra dữ liệu thực tế trả về
  console.log('getProfile response:', res);
  return res.data;
  }

  async updateProfile(data: Partial<User>) {
    return this.request<User>(API_ENDPOINTS.USERS.UPDATE, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Task methods
  async getTasks() {
    return this.request<TodoItem[]>(API_ENDPOINTS.TASKS.LIST);
  }

  // async getTask(id: string) {
  //   return this.request<Task>(`${API_ENDPOINTS.TASKS.SELECT}/${id}`);
  // }
  async getTaskByUsername(username: string) {
  // Đúng endpoint: /todos/user?username={username}
  return this.request<TodoItem[]>(`${API_ENDPOINTS.TASKS.LIST}?username=${username}`);
  }
  async createTask(taskData: Omit<Task, 'id'>, username: string) {
    return this.request<Task>(`${API_ENDPOINTS.TASKS.CREATE}?username=${username}`, {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  }
  async createSimpleTask(taskData: Omit<Task, 'id' | 'username'>) {
    return this.request<Task>(API_ENDPOINTS.TASKS.CREATE_SIMPLE, {
      method: 'POST',
      body: JSON.stringify(taskData.title),
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
