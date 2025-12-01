import Comment from "../components/common/Comment/Comment";
import PostActions from "../components/common/Post/PostActionst";
import PostMeta from "../components/common/Post/PostMeta";
import ReplyPostInput from "../components/common/Post/ReplyPostInput";
import type { CommentInfo } from "../types/comment.types";

import { formatTimeStamp } from "../utils/datetime";

export default function PostPage() {
  const post = {
    id: 1,
    userId: 1,
    title: "My First Post",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero eveniet molestias eius officia cupiditate, quo hic aliquam architecto obcaecati! Doloremque quas nulla tempore, repellendus ducimus perferendis iste animi minima ex?",
    type: "text",
    category: "geral",
    upvotes: 10,
    downvotes: 2,
    createdAt: "2025-11-30T10:47:33.244Z",
    updatedAt: "2025-11-30T10:47:33.244Z",
    user: {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "john@example.com",
      createdAt: "2025-11-30T10:47:33.244Z",
    },
  };

  const comments: CommentInfo[] = [
    {
      id: 1,
      postId: 2,
      userId: 2,
      content: "Great post!",
      createdAt: "2025-11-29T12:01:51.084Z",
      updatedAt: "2025-11-29T12:01:51.084Z",
      upvotes: 1,
      downvotes: 0,
      parentCommentId: null,
      user: {
        id: 2,
        username: "caioliboreiro",
        firstName: "Caio",
        lastName: "Liboreiro",
      },
      _count: {
        replies: 1,
      },
      replies: [
        {
          id: 3,
          postId: 2,
          userId: 2,
          content: "This is a reply to the comment",
          createdAt: "2025-11-30T12:08:23.799Z",
          updatedAt: "2025-11-30T12:08:23.799Z",
          upvotes: 0,
          downvotes: 0,
          parentCommentId: 1,
          user: {
            id: 2,
            username: "caioliboreiro",
            firstName: "Caio",
            lastName: "Liboreiro",
          },
          _count: {
            replies: 1,
          },
          replies: [
            {
              id: 4,
              postId: 2,
              userId: 2,
              content: "This is a reply to a reply",
              createdAt: "2025-11-30T12:12:53.542Z",
              updatedAt: "2025-11-30T12:12:53.542Z",
              upvotes: 0,
              downvotes: 0,
              parentCommentId: 3,
              user: {
                id: 2,
                username: "caioliboreiro",
                firstName: "Caio",
                lastName: "Liboreiro",
              },
              _count: {
                replies: 0,
              },
              replies: [],
              hasMoreReplies: false,
            },
          ],
          hasMoreReplies: false,
        },
      ],
      hasMoreReplies: false,
    },
  ];

  return (
    <main className="lg:col-span-9 space-y-4">
      <PostMeta
        author={post.user.username}
        category={post.category}
        timestamp={formatTimeStamp(new Date(post.createdAt))}
      />
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>

      <p className="text-gray-300">{post.content}</p>

      <PostActions
        commentsCount={comments.length}
        votes={post.upvotes - post.downvotes}
      />

      <ReplyPostInput />

      {comments.map((c) => (
        <Comment comment={c} />
      ))}
    </main>
  );
}
