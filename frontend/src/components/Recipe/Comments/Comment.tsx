import { useCommentsContext } from "../../../providers/CommentsProvider";
import { Comment } from "../../../types/interfaces";

export const SingleComment = ({ comment, recipeId }: { comment: Comment, recipeId : number }) => {
  const {deleteComment} = useCommentsContext();
  return (
    <>
      {" "}
      <div className="flex items-center">
        <div className="mr-2">
          <img
            className="w-10 h-10 rounded-full"
            src="https://example.com/user-avatar.jpg"
            alt="User Avatar"
          />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{comment.user?.name || "User"}</p>
          <p className="text-sm text-gray-600">{comment.content}</p>
        </div>
      </div>
      <button
        onClick={() => deleteComment(recipeId, comment.id!)}
        className="ml-2 text-red-600 text-sm"
      >
        Delete
      </button>
    </>
  );
};
