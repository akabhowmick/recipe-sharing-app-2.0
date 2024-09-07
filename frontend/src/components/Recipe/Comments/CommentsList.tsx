import { useEffect, useState } from "react";
import { useCommentsContext } from "../../../providers/CommentsProvider";
import { SingleComment } from "./Comment";
import { Recipe } from "../../../types/interfaces";
import { List } from "@mui/material";
import { errorMessage, userNotLoggedIn } from "../../UserAlert";
import { useAuthContext } from "../../../providers/AuthProvider";

const CommentsList = ({ recipe }: { recipe: Recipe }) => {
  const { user } = useAuthContext();
  const { comments, fetchComments, addComment } = useCommentsContext();
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    fetchComments(recipe.id!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe]);

  const handleAddComment = async () => {
    if (user) {
      const content = commentContent;
      const commentId = await addComment(recipe, content);
      if (commentId) {
        fetchComments(recipe.id!); // Refresh comments list after adding
        setCommentContent(""); // Clear comment input after adding
      } else {
        errorMessage();
      }
    } else {
      userNotLoggedIn();
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold">Comments</h3>

      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {comments.map((comment) => {
          return (
            <div key={comment.id}>
              <SingleComment comment={comment} recipeId={recipe.id!} />
            </div>
          );
        })}
      </List>

      <div className="mt-4">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
          Add a comment:
        </label>
        <textarea
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          id="comment"
          name="content"
          rows={1}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
        ></textarea>
        <button
          onClick={handleAddComment}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CommentsList;
