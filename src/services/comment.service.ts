import type { CreateCommentData } from '../types/comment.types';
import api from './api';

export const commentService = {
  createComment: async (data: CreateCommentData): Promise<Comment> => {
    const response = await api.post('/comments', data);
    return response.data;
  },

  getPostComments: async (postId: number, depth?: number): Promise<Comment[]> => {
    const params = depth !== undefined ? { depth } : {};
    const response = await api.get(`/comments/post/${postId}`, { params });
    return response.data;
  },

  getCommentById: async (id: number): Promise<Comment> => {
    const response = await api.get(`/comments/${id}`);
    return response.data;
  },

  updateComment: async (id: number, content: string): Promise<Comment> => {
    const response = await api.put(`/comments/${id}`, { content });
    return response.data;
  },

  deleteComment: async (id: number): Promise<{ message: string }> => {
    const response = await api.delete(`/comments/${id}`);
    return response.data;
  },

  upvoteComment: async (id: number): Promise<Comment> => {
    const response = await api.post(`/comments/${id}/upvote`);
    return response.data;
  },

  downvoteComment: async (id: number): Promise<Comment> => {
    const response = await api.post(`/comments/${id}/downvote`);
    return response.data;
  },

  replyToComment: async (commentId: number, content: string): Promise<Comment> => {
    const response = await api.post(`/comments/${commentId}/reply`, { content });
    return response.data;
  },
};