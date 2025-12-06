import { useEffect, useState } from "react";
import type { PostsResponse } from "../types/post.types";
import { feedService } from "../services/feed.service";
import { postService } from "../services/post.service";

export default function useFeed(
  page: number,
  limit: number = 20,
  category: string,
  sortBy?: "date" | "upvotes"
) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [feed, setFeed] = useState<PostsResponse>();
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const fetcher =
      sortBy === "upvotes"
        ? feedService.getFeed
        : postService.getAllPosts;

    fetcher(page, limit, category)
      .then((data) => {
        setFeed((prev) =>
          prev
            ? {
                posts: [...prev.posts, ...data.posts],
                pagination: data.pagination,
              }
            : data
        );

        setHasMore(data.posts.length > 0);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
      });
  }, [page, limit, category, sortBy]);

  return { loading, error, feed, hasMore };
}
