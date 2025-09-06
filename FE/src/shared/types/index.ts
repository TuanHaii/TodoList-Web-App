// Common types used across the application
export interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
  password: string;
  avatar?: string;
  createdAt?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Todo' | 'In Progress' | 'Completed' | 'Urgent';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  // Optional fields for UI
  image?: string;
  time?: string;
  date?: string;
}

// Backend todo item type
export interface TodoItem {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  username: string;
  category: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  error?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
