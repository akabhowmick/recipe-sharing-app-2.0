import { useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import { useRecipeContext } from "../providers/RecipesProvider";

export const CreateRecipePage = () => {
  const { addNewRecipes } = useRecipeContext();
  const navigate = useNavigate();

  const handleSubmit = (
    title: string,
    ingredients: string,
    instructions: string,
    image: string,
    cuisineType: string
  ) => {
    const newRecipe = { title, ingredients, instructions, image, cuisineType };

    const newRecipeId = addNewRecipes(newRecipe);
    if (newRecipeId) {
      navigate(`/recipes/${newRecipeId}`);
    } else {
      console.error("Failed to create new recipe");
      // TODO make this a toast 
    }
  };

  return (
    <div>
      <h1>Create a New Recipe</h1>
      <RecipeForm onSubmit={handleSubmit} />
    </div>
  );
};
