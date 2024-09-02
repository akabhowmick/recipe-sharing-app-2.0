import { useEffect } from "react";
import { useCommentsContext } from "../../../providers/CommentsProvider";
import { SingleComment } from "./Comment";

const CommentsList = ({ recipeId }: { recipeId: number }) => {
  const { comments, fetchComments, addComment } = useCommentsContext();

  useEffect(() => {
    fetchComments(recipeId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeId]);

  const handleAddComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const content = formData.get("content")?.toString() || "";
    await addComment(recipeId, { content });
    fetchComments(recipeId); // Refresh comments list after adding
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold">Comments</h3>
      <ul>
        {comments.map((comment) => {
          return (
            <li key={comment.id}>
              <SingleComment comment={comment} recipeId={recipeId} />
            </li>
          );
        })}
      </ul>

      <form onSubmit={handleAddComment} className="mt-4">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
          Add a comment:
        </label>
        <textarea
          id="comment"
          name="content"
          rows={1}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
        ></textarea>
        <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentsList;
