export interface CommentInfo {
  id: number;
  postId: number;
  userId: number;
  content: string;
  parentCommentId: number | null;
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
  replies: CommentInfo[];
  hasMoreReplies: boolean;
  _count: {
    replies: number;
  };
}

export interface CreateCommentData {
  postId: number;
  content: string;
  parentCommentId?: number;
}
