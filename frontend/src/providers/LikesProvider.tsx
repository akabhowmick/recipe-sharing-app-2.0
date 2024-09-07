import { createContext, useContext, ReactNode } from "react";
import { Like } from "../types/interfaces";
import axios from "axios";
import { useAuthContext } from "./AuthProvider";

const url = "http://127.0.0.1:8000/api/recipes/";

interface LikeContextType {
  addNewLike: (recipeId: number) => Promise<number>;
  deleteLike: (recipeId: number) => Promise<void>;
  getLikesByRecipe: (recipeId: number) => Promise<Like[]>;
}

const LikeContext = createContext<LikeContextType>({} as LikeContextType);

export const LikeProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthContext();

  const getLikesByRecipe = async (recipeId: number): Promise<Like[]> => {
    try {
      const response = await axios.get(`${url}${recipeId}/likes/`);
      return response.data;
    } catch (error) {
      console.error("Error fetching likes for recipe:", error);
      throw error;
    }
  };

  const addNewLike = async (recipeId: number): Promise<number> => {
    const newLike = {
      user: user!.id!,
      recipe: recipeId,
    };
    try {
      const response = await axios.post(`${url}${recipeId}/likes/`, newLike, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const createdLike = response.data;
      return createdLike.id;
    } catch (error) {
      console.error("Error adding like:", error);
      throw error;
    }
  };

  // DELETE request to remove a like from a recipe
  const deleteLike = async (recipeId: number): Promise<void> => {
    try {
      await axios.delete(`${url}${recipeId}/likes/`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          user: user!.id!,
        },
      });
    } catch (error) {
      console.error("Error deleting like:", error);
      throw error;
    }
  };

  return (
    <LikeContext.Provider
      value={{
        addNewLike,
        deleteLike,
        getLikesByRecipe,
      }}
    >
      {children}
    </LikeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLikeContext = () => useContext(LikeContext);
