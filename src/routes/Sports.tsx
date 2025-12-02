import { useEffect, useState } from "react";
import Tabs from "../components/common/Tabs";
import Post from "../components/common/Post/Post";
import { postService } from "../services/post.service";
import { feedService } from "../services/feed.service";
import type { PostsResponse } from "../types/post.types";

export default function Sports() {
  const [activeTab, setActiveTab] = useState("inicio");
  const [feedInfo, setFeedInfo] = useState<PostsResponse>();
  const [sortBy, setSortBy] = useState<"date" | "upvotes">("date");

  useEffect(() => {
    if (sortBy === "date") {
      postService.getAllPosts(1, 20, "Sports").then((responseData) => setFeedInfo(responseData));
    } else {
      feedService.getFeed(1, 20, "Sports").then((responseData) => setFeedInfo(responseData));
    }
  }, [sortBy]);

  return (
    <main className="lg:col-span-9 space-y-4">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} setSortBy={setSortBy} />

      {(!feedInfo?.posts || feedInfo.posts.length === 0) && (
        <div className="mt-10 text-center text-2xl">
          <p>Não há posts nessa categoria ainda!</p>
        </div>
      )}

      <div className="space-y-3">
        {feedInfo?.posts?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
