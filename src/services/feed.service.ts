import type { PostsResponse } from '../types/post.types';
import api from './api';

export const feedService = {
  getFeed: async (page: number = 1, limit: number = 20, category?: string): Promise<PostsResponse> => {
    const params: any = { page, limit };
    if (category) params.category = category;

    const response = await api.get('/feed', { params });
    return response.data;
  },
}