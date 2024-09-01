import { useState, createContext, useContext, ReactNode } from "react";
import { Comment } from "../types/interfaces";
import axios from "axios";

const url = "http://127.0.0.1:8000/api/recipes/";

interface CommentsContextType {
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  fetchComments: (recipeId: number) => Promise<void>;
  addComment: (recipeId: number, newComment: Partial<Comment>) => Promise<number>;
  updateComment: (recipeId: number, commentId: number, updatedComment: Partial<Comment>) => Promise<number>;
  deleteComment: (recipeId: number, commentId: number) => Promise<void>;
}

const CommentsContext = createContext<CommentsContextType>({} as CommentsContextType);

export const CommentsProvider = ({ children }: { children: ReactNode }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  // Fetch all comments for a specific recipe
  const fetchComments = async (recipeId: number): Promise<void> => {
    try {
      const response = await axios.get(`${url}${recipeId}/comment/`);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
      throw error;
    }
  };

  // POST request to add a new comment to a recipe
  const addComment = async (recipeId: number, newComment: Partial<Comment>): Promise<number> => {
    try {
      const response = await axios.post(`${url}${recipeId}/comment/`, newComment, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const createdComment = response.data;
      setComments((prevComments) => [...prevComments, createdComment]);
      return createdComment.id;
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  };

  // PUT request to update an existing comment
  const updateComment = async (recipeId: number, commentId: number, updatedComment: Partial<Comment>): Promise<number> => {
    try {
      const response = await axios.put(`${url}${recipeId}/comment/${commentId}/`, updatedComment, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updatedCommentData = response.data;
      setComments((prevComments) =>
        prevComments.map((comment) => (comment.id === commentId ? updatedCommentData : comment))
      );
      return updatedCommentData.id;
    } catch (error) {
      console.error("Error updating comment:", error);
      throw error;
    }
  };

  // DELETE request to remove a comment from a recipe
  const deleteComment = async (recipeId: number, commentId: number): Promise<void> => {
    try {
      await axios.delete(`${url}${recipeId}/comment/${commentId}/`);
      setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
      throw error;
    }
  };

  return (
    <CommentsContext.Provider
      value={{
        comments,
        setComments,
        fetchComments,
        addComment,
        updateComment,
        deleteComment,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCommentsContext = () => useContext(CommentsContext);
