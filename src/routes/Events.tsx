import { useEffect, useState } from "react";
import Tabs from "../components/common/Tabs";
import Post from "../components/common/Post/Post";
import { postService } from "../services/post.service";
import type { PostsResponse } from "../types/post.types";

export default function Events() {
  const [activeTab, setActiveTab] = useState("inicio");
  const [feedInfo, setFeedInfo] = useState<PostsResponse>();

  useEffect(() => {
    postService.getAllPosts(1, 20, "Events").then((responseData) => setFeedInfo(responseData));
  }, []);

  return (
    <main className="lg:col-span-9 space-y-4">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

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
