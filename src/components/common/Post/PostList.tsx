import type { PostsResponse } from "../../../types/post.types";
import Post from "./Post";

interface PostListProps {
  loading: boolean;
  error: boolean;
  feed: PostsResponse | undefined;
}

export default function PostList({ loading, error, feed }: PostListProps) {
  if (loading) {
    return;
  }

  if (error) {
    return <h1>Houve erro</h1>;
  }

  return (
    <>
      {(!feed?.posts || feed.posts.length === 0) && (
        <div className="mt-10 text-center text-2xl">
          <p>Não há posts ainda!</p>
        </div>
      )}

      <div className="space-y-3">
        {feed?.posts?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
