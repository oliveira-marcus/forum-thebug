import type { CreatePollData, Poll, PollOption, PollResults, UpdatePollData } from '../types/poll.types';
import api from './api';

export const pollService = {
  createPoll: async (data: CreatePollData): Promise<Poll> => {
    const response = await api.post('/polls', data);
    return response.data;
  },

  getPollById: async (id: number): Promise<Poll> => {
    const response = await api.get(`/polls/${id}`);
    return response.data;
  },

  updatePoll: async (id: number, data: UpdatePollData): Promise<Poll> => {
    const response = await api.put(`/polls/${id}`, data);
    return response.data;
  },

  deletePoll: async (id: number): Promise<{ message: string }> => {
    const response = await api.delete(`/polls/${id}`);
    return response.data;
  },

  votePoll: async (pollId: number, optionIds: number[]): Promise<PollResults> => {
    const response = await api.post(`/polls/${pollId}/vote`, { optionIds });
    return response.data;
  },

  getPollResults: async (pollId: number): Promise<PollResults> => {
    const response = await api.get(`/polls/${pollId}/results`);
    return response.data;
  },

  getPollOptions: async (pollId: number): Promise<PollOption[]> => {
    const response = await api.get(`/polls/${pollId}/options`);
    return response.data;
  },

  updatePollOption: async (pollId: number, optionId: number, optionText: string): Promise<PollOption> => {
    const response = await api.put(`/polls/${pollId}/options/${optionId}`, { optionText });
    return response.data;
  },

  deletePollOption: async (pollId: number, optionId: number): Promise<{ message: string }> => {
    const response = await api.delete(`/polls/${pollId}/options/${optionId}`);
    return response.data;
  },
};