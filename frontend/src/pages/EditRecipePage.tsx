import { useNavigate, useParams } from "react-router-dom";
import { EditRecipeForm } from "../components/Recipe/EditRecipeForm";
import { useRecipeContext } from "../providers/RecipesProvider";

// TODO import the user so only registered users can edit their own recipes
import { useAuthContext } from "../providers/AuthProvider";
import { useEffect } from "react";

export const EditRecipePage = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { recipes } = useRecipeContext();
  const editedRecipe = recipes.find((recipe) => recipe.id === parseInt(id!));

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  return (
    <div>
      <h1 className="text-3xl font-bold underline my-4 mx-auto text-center"> Edit The Recipe</h1>
      {editedRecipe && <EditRecipeForm recipeToEdit={editedRecipe} />}
    </div>
  );
};
