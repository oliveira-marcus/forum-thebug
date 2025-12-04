import { useState } from "react";
import Tabs from "../components/common/Tabs";
import useFeed from "../hooks/useFeed";
import PostList from "../components/common/Post/PostList";

const ForumTheBug = () => {
  const [activeTab, setActiveTab] = useState("inicio");
  const [sortBy, setSortBy] = useState<"date" | "upvotes">("date");

  const { loading, error, feed } = useFeed(1, 20, "General", sortBy);

  return (
    <main className="lg:col-span-9 space-y-4">
      {!loading && !error && (
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setSortBy={setSortBy}
        />
      )}

      <PostList loading={loading} error={error} feed={feed} />
    </main>
  );
};

export default ForumTheBug;
