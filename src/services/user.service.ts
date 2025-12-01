import type { LoginData, RegisterData, UpdateUserData, User } from '../types/user.types';
import api from './api';
import type { LoginResponse } from './types/auth.types';

export const userService = {
  register: async (data: RegisterData): Promise<User> => {
    const response = await api.post('/users/register', data);
    return response.data;
  },

  login: async (data: LoginData): Promise<LoginResponse> => {
    const response = await api.post('/users/login', data);
    return response.data;
  },

  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get('/users');
    return response.data;
  },

  getUserById: async (id: number): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  updateUser: async (id: number, data: UpdateUserData): Promise<User> => {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  },

  deleteUser: async (id: number): Promise<{ message: string }> => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  getUserPosts: async (id: number): Promise<any[]> => {
    const response = await api.get(`/users/${id}/posts`);
    return response.data;
  },

  getUserComments: async (id: number): Promise<any[]> => {
    const response = await api.get(`/users/${id}/comments`);
    return response.data;
  },
};