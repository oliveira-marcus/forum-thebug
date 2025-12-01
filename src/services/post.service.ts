import type { CreatePostData, PostInfo, PostsResponse, UpdatePostData } from '../types/post.types';
import api from './api';

export const postService = {
  createPost: async (data: CreatePostData): Promise<PostInfo> => {
    const response = await api.post('/posts', data);
    return response.data;
  },

  getAllPosts: async (page: number = 1, limit: number = 20, type?: string): Promise<PostsResponse> => {
    const params: any = { page, limit };
    if (type) params.type = type;
    const response = await api.get('/posts', { params });
    return response.data;
  },

  getPostById: async (id: number): Promise<PostInfo> => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  updatePost: async (id: number, data: UpdatePostData): Promise<PostInfo> => {
    const response = await api.put(`/posts/${id}`, data);
    return response.data;
  },

  deletePost: async (id: number): Promise<{ message: string }> => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  },

  upvotePost: async (id: number): Promise<PostInfo> => {
    const response = await api.post(`/posts/${id}/upvote`);
    return response.data;
  },

  downvotePost: async (id: number): Promise<PostInfo> => {
    const response = await api.post(`/posts/${id}/downvote`);
    return response.data;
  },

  toggleUpvotePost: async (id: number, currentVote: "upvote" | "downvote" | null): Promise<PostInfo> => {
    if (currentVote === "upvote") {
      // Remove upvote
      const response = await api.post(`/posts/${id}/remove-upvote`);
      return response.data;
    } else if (currentVote === "downvote") {
      // Switch from downvote to upvote
      const response = await api.post(`/posts/${id}/upvote`);
      return response.data;
    } else {
      // Add upvote
      const response = await api.post(`/posts/${id}/upvote`);
      return response.data;
    }
  },

  toggleDownvotePost: async (id: number, currentVote: "upvote" | "downvote" | null): Promise<PostInfo> => {
    if (currentVote === "downvote") {
      // Remove downvote
      const response = await api.post(`/posts/${id}/remove-downvote`);
      return response.data;
    } else if (currentVote === "upvote") {
      // Switch from upvote to downvote
      const response = await api.post(`/posts/${id}/downvote`);
      return response.data;
    } else {
      // Add downvote
      const response = await api.post(`/posts/${id}/downvote`);
      return response.data;
    }
  },
};