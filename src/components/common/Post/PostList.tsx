import { useCallback, useRef, type Dispatch, type SetStateAction } from "react";
import type { PostsResponse } from "../../../types/post.types";
import Post from "./Post";

interface PostListProps {
  loading: boolean;
  error: boolean;
  feed: PostsResponse | undefined;
  hasMore: boolean;
  setPageNumber: Dispatch<SetStateAction<number>>
}

export default function PostList({
  loading,
  error,
  feed,
  hasMore,
  setPageNumber
}: PostListProps) {

  const observer = useRef<IntersectionObserver>(null);

  const lastBookElementRef = useCallback(
    (element: HTMLElement) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (element) observer.current.observe(element);
    },
    [loading, hasMore]
  );

  if (error) {
    return <h1>Houve erro</h1>;
  }

  if (loading && !feed?.posts) {
    return; 
  }

  return (
    <>
      {(!feed?.posts || feed.posts.length === 0) && (
        <div className="mt-10 text-center text-2xl">
          <p>Não há posts ainda!</p>
        </div>
      )}

      <div className="space-y-3">
        {feed?.posts?.map((post, index) => {
          const isLast = index === feed.posts.length - 1;

          return <Post ref={isLast ? lastBookElementRef : null} key={post.id} post={post} />;
        })}
      </div>
      {loading && <div>Carregando...</div>}
    </>
  );
}
