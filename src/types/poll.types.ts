import type { Category } from "./post.types";

export interface PollOption {
  id: number;
  optionText: string;
  voteCount: number;
  votes?: any[];
}

export interface Poll {
  id: number;
  postId: number;
  multipleChoice: boolean;
  expiresAt?: string;
  createdAt: string;
  post: any;
  options: PollOption[];
}

export interface CreatePollData {
  title: string;
  content?: string;
  category: Category;
  multipleChoice?: boolean;
  expiresAt?: Date;
  options: string[];
}

export interface UpdatePollData {
  expiresAt?: Date;
  multipleChoice?: boolean;
}

export interface PollResults {
  pollId: number;
  totalVotes: number;
  options: {
    id: number;
    text: string;
    votes: number;
    percentage: number;
  }[];
}