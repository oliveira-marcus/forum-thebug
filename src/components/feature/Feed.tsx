import { useEffect, useState } from "react";
import useFeed from "../../hooks/useFeed";
import Tabs from "../common/Tabs";
import PostList from "../common/Post/PostList";
import type { Category } from "../../types/post.types";

interface FeedProps {
  feedType: Category;
}

export default function Feed({ feedType }: FeedProps) {
  const [activeTab, setActiveTab] = useState("inicio");
  const [sortBy, setSortBy] = useState<"date" | "upvotes">("date");
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    setPageNumber(1);
  }, [sortBy, feedType]);

  const { loading, error, feed, hasMore } = useFeed(
    pageNumber,
    20,
    feedType,
    sortBy
  );

  return (
    <main className="w-full lg:w-9/12 space-y-4">
      {!loading && !error && (
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setSortBy={setSortBy}
        />
      )}

      <PostList
        loading={loading}
        error={error}
        feed={feed}
        hasMore={hasMore}
        setPageNumber={setPageNumber}
      />
    </main>
  );
}
