import { Award, ChevronUp } from "lucide-react";
import type { PostInfo } from "../../../types/PostInfo";
import PostMeta from "./PostMeta";
import PostActions from "./PostActionst";

interface PostProps {
  post: PostInfo;
}

function PinnedBadge() {
  return (
    <div className="flex items-center gap-2 text-blue-400 text-sm font-semibold mb-2">
      <Award className="w-4 h-4" />
      FIXADO PELA DIRETORIA
    </div>
  );
}

export default function Post({ post }: PostProps) {
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
            category={"Geral"}
            author={post.user.username}
            timestamp={post.createdAt}
          />

          <h2 className="text-xl font-bold mb-2 hover:text-blue-400 cursor-pointer">
            {post.title}
          </h2>

          <p className="text-gray-400 mb-4 line-clamp-2">{post.content}</p>

          <PostActions commentsCount={post._count.comments} votes={post.upvotes - post.downvotes} />
        </div>
      </div>
    </article>
  );
}
