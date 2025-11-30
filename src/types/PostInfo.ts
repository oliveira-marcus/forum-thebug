export interface PostInfo {
  id: number;
  userId: number;
  title: string;
  content: string;
  type: string;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    createdAt: string;
  };
  _count: {
    comments: number,
  }
}
