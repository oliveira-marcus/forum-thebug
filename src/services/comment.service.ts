import type { CommentInfo, CreateCommentData } from '../types/comment.types';
import api from './api';

export const commentService = {
  createComment: async (postId: number, data: CreateCommentData): Promise<CommentInfo> => {
    const response = await api.post(`/posts/${postId }/comments`, data);
    return response.data;
  },

  getPostComments: async (postId: number, depth?: number): Promise<CommentInfo[]> => {
    const params = depth !== undefined ? { depth } : {};
    const response = await api.get(`/posts/${postId}/comments`, { params });
    return response.data;
  },

  getCommentById: async (id: number): Promise<CommentInfo> => {
    const response = await api.get(`/comments/${id}`);
    return response.data;
  },

  updateComment: async (id: number, content: string): Promise<CommentInfo> => {
    const response = await api.put(`/comments/${id}`, { content });
    return response.data;
  },

  deleteComment: async (id: number): Promise<{ message: string }> => {
    const response = await api.delete(`/comments/${id}`);
    return response.data;
  },

  upvoteComment: async (id: number): Promise<CommentInfo> => {
    const response = await api.post(`/comments/${id}/upvote`);
    return response.data;
  },

  downvoteComment: async (id: number): Promise<CommentInfo> => {
    const response = await api.post(`/comments/${id}/downvote`);
    return response.data;
  },

  toggleUpvoteComment: async (id: number, currentVote: "upvote" | "downvote" | null): Promise<CommentInfo> => {
    if (currentVote === "upvote") {
      const response = await api.post(`/comments/${id}/remove-upvote`);
      return response.data;
    } else if (currentVote === "downvote") {
      const response = await api.post(`/comments/${id}/upvote`);
      return response.data;
    } else {
      const response = await api.post(`/comments/${id}/upvote`);
      return response.data;
    }
  },

  toggleDownvoteComment: async (id: number, currentVote: "upvote" | "downvote" | null): Promise<CommentInfo> => {
    if (currentVote === "downvote") {
      const response = await api.post(`/comments/${id}/remove-downvote`);
      return response.data;
    } else if (currentVote === "upvote") {
      const response = await api.post(`/comments/${id}/downvote`);
      return response.data;
    } else {
      const response = await api.post(`/comments/${id}/downvote`);
      return response.data;
    }
  },

  replyToComment: async (commentId: number, content: string): Promise<CommentInfo> => {
    const response = await api.post(`/comments/${commentId}/reply`, { content });
    return response.data;
  },
};