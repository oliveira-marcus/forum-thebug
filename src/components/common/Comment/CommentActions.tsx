import { useState } from "react";
import { ChevronUp, MessageSquare } from "lucide-react";
import { commentService } from "../../../services/comment.service";
import { useAuth } from "../../../contexts/AuthContext";

interface CommentActionsProps {
  commentId: number;
  votes: number;
  onReply: () => void;
  onVoteSuccess: (newUpvotes: number, newDownvotes: number) => void;
  wasUpvoted: boolean;
  wasDownvoted: boolean;
}

export default function CommentActions({
  commentId,
  votes,
  onReply,
  onVoteSuccess,
  wasUpvoted,
  wasDownvoted,
}: CommentActionsProps) {
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
      const result = await commentService.toggleUpvoteComment(
        commentId,
        userVote
      );
      onVoteSuccess(result.upvotes, result.downvotes);

      // Update userVote state
      if (userVote === "upvote") {
        setUserVote(null); // Remove upvote
      } else if (userVote === "downvote") {
        setUserVote("upvote"); // Switch from downvote to upvote
      } else {
        setUserVote("upvote"); // Add upvote
      }
    } catch (error) {
      console.error("Erro ao upvotar:", error);
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
      const result = await commentService.toggleDownvoteComment(
        commentId,
        userVote
      );
      onVoteSuccess(result.upvotes, result.downvotes);

      // Update userVote state
      if (userVote === "downvote") {
        setUserVote(null); // Remove downvote
      } else if (userVote === "upvote") {
        setUserVote("downvote"); // Switch from upvote to downvote
      } else {
        setUserVote("downvote"); // Add downvote
      }
    } catch (error) {
      console.error("Erro ao downvotar:", error);
      alert("Erro ao enviar seu voto");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 rounded-2xl px-2 bg-gray-800">
        <button
          onClick={handleUpvote}
          disabled={isLoading}
          className={`p-1 transition ${
            userVote === "upvote"
              ? "text-blue-500"
              : "text-gray-400 hover:text-blue-500"
          } disabled:opacity-50`}
          title="Upvote"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
        <span className="text-sm font-bold">{votes}</span>
        <button
          onClick={handleDownvote}
          disabled={isLoading}
          className={`p-1 transition ${
            userVote === "downvote"
              ? "text-red-500"
              : "text-gray-400 hover:text-red-500"
          } disabled:opacity-50 rotate-180`}
          title="Downvote"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      </div>

      <button
        onClick={onReply}
        className="flex items-center gap-1 px-2 py-1 rounded-lg 
                 hover:bg-gray-800 text-gray-400 hover:text-white 
                 transition cursor-pointer text-sm"
      >
        <MessageSquare className="w-4 h-4" />
        Responder
      </button>
    </div>
  );
}
