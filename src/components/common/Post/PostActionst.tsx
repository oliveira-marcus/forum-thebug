import { useState } from "react";
import { ChevronUp, MessageSquare } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import { postService } from "../../../services/post.service";

export default function PostActions({
  postId,
  commentsCount,
  votes,
  onVoteSuccess,
  wasUpvoted,
  wasDownvoted,
}: {
  postId: number;
  commentsCount: number;
  votes: number;
  onVoteSuccess: (newUpvotes: number, newDownvotes: number) => void;
  wasUpvoted: boolean;
  wasDownvoted: boolean;
}) {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [userVote, setUserVote] = useState<"upvote" | "downvote" | null>(
    wasUpvoted ? "upvote" : wasDownvoted ? "downvote" : null
  );

  const handleUpvote = async () => {
    if (!token) {
      alert("Você precisa estar autenticado para votar");
      return;
    }

    try {
      setIsLoading(true);
      const result = await postService.toggleUpvotePost(postId, userVote);
      onVoteSuccess(result.upvotes, result.downvotes);

      if (userVote === "upvote") setUserVote(null);
      else setUserVote("upvote");
    } catch (error) {
      console.error("Erro ao upvotar post:", error);
      alert("Erro ao enviar seu voto");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownvote = async () => {
    if (!token) {
      alert("Você precisa estar autenticado para votar");
      return;
    }

    try {
      setIsLoading(true);
      const result = await postService.toggleDownvotePost(postId, userVote);
      onVoteSuccess(result.upvotes, result.downvotes);

      if (userVote === "downvote") setUserVote(null);
      else setUserVote("downvote");
    } catch (error) {
      console.error("Erro ao downvotar post:", error);
      alert("Erro ao enviar seu voto");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1 bg-gray-800 rounded-2xl px-2">
        <button
          onClick={handleUpvote}
          disabled={isLoading}
          className={`p-1 transition cursor-pointer ${
            userVote === "upvote"
              ? "text-blue-500"
              : "text-gray-400 hover:text-blue-500"
          } disabled:opacity-50`}
          title="Upvote"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
        <span className="font-bold text-sm">{votes}</span>
        <button
          onClick={handleDownvote}
          disabled={isLoading}
          className={`p-1 transition cursor-pointer ${
            userVote === "downvote"
              ? "text-red-500"
              : "text-gray-400 hover:text-red-500"
          } disabled:opacity-50 rotate-180`}
          title="Downvote"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      </div>

      <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white transition">
        <MessageSquare className="w-4 h-4" />
        <span className="text-sm font-medium">{commentsCount} comentários</span>
      </button>
    </div>
  );
}
