import { useState, createContext, useContext, ReactNode, useEffect } from "react";
import { Recipe } from "../types/interfaces";

import { RecipesData } from "../MockData/mockRecipes.ts";

interface RecipeContextType {
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
  addNewRecipes: (newRecipe: Recipe) => Promise<number>;
}

const RecipeContext = createContext<RecipeContextType>({} as RecipeContextType);

export const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);


  // TODO replace with the real fetch call
  useEffect(() => {
    setRecipes(RecipesData);
  }, []);

  // ? POST request to make a new recipe available
  const addNewRecipes = async (newRecipe: Recipe): Promise<number> => {
    const response = await fetch("/api/recipes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    });

    const data = await response.json();
    return data.id;
  };

  // TODO implement: Mock API call for fetching recipes => GET 
  // useEffect(() => {
  //   axios
  //     .get("/api/Recipes")
  //     .then((response) => setRecipes(response.data))
  //     .catch((error) => console.error("Error fetching Recipes:", error));
  // }, []);
  // useEffect(() => {
  //   fetch("/api/recipes/")
  //     .then((response) => response.json())
  //     .then((data) => setRecipes(data));
  // }, []);

  // TODO implement: Mock API call for deleting recipes => DELETE
  // TODO implement: Mock API call for updating recipes => UPDATE 

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        setRecipes,
        addNewRecipes,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useRecipeContext = () => useContext(RecipeContext);
