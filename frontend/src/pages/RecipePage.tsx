import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeDetail from "../components/Recipe/RecipeDetail";
import { Recipe } from "../types/interfaces";
import { useRecipeContext } from "../providers/RecipesProvider";

export const RecipePage = () => {
  const { id } = useParams<{ id: string }>();
  const { recipes } = useRecipeContext();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    // TODO: fetch the recipe from the API and update the state when available.
    if (id) {
      const display = recipes.find((recipe) => recipe.id === parseInt(id));
      if (display) {
        setRecipe(display);
      }
    }
  }, [id, recipes]);
  return recipe ? <RecipeDetail recipe={recipe} /> : <h1>Loading Recipe...</h1>;
};
