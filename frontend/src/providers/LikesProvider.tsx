import { useState, createContext, useContext, ReactNode } from "react";
import { Like } from "../types/interfaces";
import axios from "axios";
import { useAuthContext } from "./AuthProvider";

const url = "http://127.0.0.1:8000/api/recipes/";

interface LikeContextType {
  likes: Like[];
  setLikes: React.Dispatch<React.SetStateAction<Like[]>>;
  addNewLike: (recipeId: number) => Promise<number>;
  deleteLike: (recipeId: number) => Promise<void>;
  fetchLikes: (recipeId: number) => Promise<void>;
}

const LikeContext = createContext<LikeContextType>({} as LikeContextType);

export const LikeProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthContext();
  const [likes, setLikes] = useState<Like[]>([]);

  // POST request to add a new like to a recipe
  const addNewLike = async (recipeId: number): Promise<number> => {
    const newLike = {
      user: user!.id!,
      recipe: recipeId,
    };
    try {
      const response = await axios.post(`${url}${recipeId}/like/`, newLike, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const createdLike = response.data;
      setLikes((prevLikes) => [...prevLikes, createdLike]);
      return createdLike.id;
    } catch (error) {
      console.error("Error adding like:", error);
      throw error;
    }
  };

  // DELETE request to remove a like from a recipe
  const deleteLike = async (recipeId: number): Promise<void> => {
    try {
      await axios.delete(`${url}${recipeId}/like/`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          user: user!.id!,
        },
      });
      setLikes((prevLikes) => prevLikes.filter((like) => like.recipe.id! !== recipeId));
    } catch (error) {
      console.error("Error deleting like:", error);
      throw error;
    }
  };

  const fetchLikes = async (recipeId: number): Promise<void> => {
    try {
      const response = await axios.get(`${url}${recipeId}/like/`);
      setLikes(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
      throw error;
    }
  };

  return (
    <LikeContext.Provider
      value={{
        likes,
        setLikes,
        addNewLike,
        deleteLike,
        fetchLikes,
      }}
    >
      {children}
    </LikeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLikeContext = () => useContext(LikeContext);
