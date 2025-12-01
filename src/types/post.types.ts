export const Category = {
  GENERAL: 'GENERAL',
  EVENTS: 'EVENTS',
  FINANCES: 'FINANCES',
  SPORTS: 'SPORTS',
  POLLS: 'POLLS',
} as const;

export interface PostInfo {
  id: number;
  userId: number;
  title: string;
  content: string;
  category: Category;
  type: string;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
  };
  poll?: any;
  _count: {
    comments: number;
  };
}

export type Category = (typeof Category)[keyof typeof Category];

export interface CreatePostData {
  title: string;
  content: string;
  category: Category;
  type?: string;
}

export interface UpdatePostData {
  title?: string;
  content?: string;
  category?: Category;
}

export interface PostsResponse {
  posts: PostInfo[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

