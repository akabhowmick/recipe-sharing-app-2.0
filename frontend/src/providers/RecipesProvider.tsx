import { useState, createContext, useContext, ReactNode, useEffect } from "react";
import { Recipe } from "../types/interfaces";
import axios from "axios";
import { useAuthContext } from "./AuthProvider";
import { unauthorizedMessage } from "../components/UserAlert.ts";

const url = "http://127.0.0.1:8000/api/recipes/";

interface RecipeContextType {
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
  addNewRecipe: (newRecipe: Recipe) => Promise<number>;
  updateRecipe: (id: number, updatedRecipe: Recipe) => Promise<number>;
  deleteRecipe: (id: number) => Promise<void>;
}

const RecipeContext = createContext<RecipeContextType>({} as RecipeContextType);

export const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthContext();
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // POST request to add a new recipe
  const addNewRecipe = async (newRecipe: Recipe): Promise<number> => {
    console.log("addNewRecipe", newRecipe);
    try {
      const response = await axios.post("/api/recipes/", newRecipe, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const createdRecipe = response.data;
      setRecipes((prevRecipes) => [...prevRecipes, createdRecipe]);
      return createdRecipe.id;
    } catch (error) {
      console.error("Error adding recipe:", error);
      throw error;
    }
  };

  // PUT request to update an existing recipe
  const updateRecipe = async (id: number, updatedRecipe: Recipe): Promise<number> => {
    try {
      console.log("updateRecipe", id, updatedRecipe, recipes.find((recipe) => recipe.id! === id)!.user!.id!, parseInt(user!.id!));
      if (parseInt(user!.id!) !== recipes.find((recipe) => recipe.id! === id)!.user!.id!) {
        unauthorizedMessage();
        throw new Error("Unauthorized to edit this recipe");
      }
      const response = await axios.patch(`${url}${id}/`, updatedRecipe, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updatedRecipeData = response.data;
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) => (recipe.id === id ? updatedRecipe : recipe))
      );
      return updatedRecipeData.id;
    } catch (error) {
      console.error("Error updating recipe:", error);
      throw error;
    }
  };

  // DELETE request to remove a recipe
  const deleteRecipe = async (id: number): Promise<void> => {
    try {
      await axios.delete(`${url}${id}/`);
      setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== id));
    } catch (error) {
      console.error("Error deleting recipe:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(url);
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        setRecipes,
        addNewRecipe,
        updateRecipe,
        deleteRecipe,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRecipeContext = () => useContext(RecipeContext);
