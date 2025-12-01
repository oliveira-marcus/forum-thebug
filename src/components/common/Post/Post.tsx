import { useState } from "react";
import PostMeta from "./PostMeta";
import PostActions from "./PostActionst";
import { formatTimeStamp } from "../../../utils/datetime";
import type { PostInfo } from "../../../types/post.types";
import { Link } from "react-router";
import translateCategory from "../../../utils/translateCategory";

interface PostProps {
  post: PostInfo;
}

export default function Post({ post }: PostProps) {
  const [postVotes, setPostVotes] = useState({ upvotes: post.upvotes, downvotes: post.downvotes });

  const handleVoteSuccess = (newUpvotes: number, newDownvotes: number) => {
    setPostVotes({ upvotes: newUpvotes, downvotes: newDownvotes });
  };

  const votes = postVotes.upvotes - postVotes.downvotes;

  return (
    <article
      key={post.id}
      className={`bg-gray-900 rounded-lg border hover:border-blue-600 transition-all ${
        false ? "border-blue-600" : "border-gray-800"
      }`}
    >
      <div className="p-4">
        {/* {post.isPinned && <PinnedBadge />} */}
        <div className="flex-1">
          <PostMeta
            category={translateCategory(post.category)}
            author={post.user.username}
            timestamp={formatTimeStamp(new Date(post.createdAt))}
          />

          <Link to={post.id.toString()} >
            <h2 className="text-xl font-bold mb-2 hover:text-blue-400 cursor-pointer">
              {post.title}
            </h2>
          </Link>

          <p className="text-gray-400 mb-4 line-clamp-2">{post.content}</p>

          <PostActions
            postId={post.id}
            commentsCount={post._count.comments}
            votes={votes}
            onVoteSuccess={handleVoteSuccess}
          />
        </div>
      </div>
    </article>
  );
}
