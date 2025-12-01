import type { CommentInfo } from "../../../types/comment.types";
import { formatTimeStamp } from "../../../utils/datetime";
import CommentActions from "./CommentActions";
import CommentMeta from "./CommentMeta";

interface CommentProps {
  comment: CommentInfo;
}

function Replies({ replies }: { replies: CommentInfo[] }) {
  return (
    <div className="ml-4 mt-2 border-l border-gray-700 pl-4">
      {replies.map((r) => (
        <Comment key={r.id} comment={r} />
      ))}
    </div>
  );
}

export default function Comment({ comment }: CommentProps) {
  return (
    <div className="mb-4">
      <CommentMeta
        author={comment.user.username}
        timestamp={formatTimeStamp(new Date(comment.createdAt))}
      />

      <p className="text-gray-300 mt-1">{comment.content}</p>

      <CommentActions votes={comment.upvotes - comment.downvotes} />

      {comment.replies.length > 0 && (
        <Replies replies={comment.replies} />
      )}
    </div>
  );
}
