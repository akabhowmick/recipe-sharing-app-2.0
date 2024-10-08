import { useNavigate } from "react-router-dom";
import RecipeForm from "../components/Recipe/RecipeForm";
import { useRecipeContext } from "../providers/RecipesProvider";
import Swal from "sweetalert2";
import { errorMessage } from "../components/UserAlert.ts";
import { useAuthContext } from "../providers/AuthProvider";
import { useEffect } from "react";

// TODO import the user so only registered users can edit their own recipes
export const CreateRecipePage = () => {
  const { setUserOnRefresh } = useAuthContext();
  const { addNewRecipe } = useRecipeContext();
  const navigate = useNavigate();

  const handleSubmit = async (
    title: string,
    ingredients: string,
    instructions: string,
    image: string,
    cuisine_type: string,
    description: string,
    fun_fact: string,
    userID: number
  ) => {
    const newRecipe = {
      title,
      ingredients,
      instructions,
      image,
      cuisine_type,
      description,
      fun_fact,
      userID,
    };

    try {
      const newRecipeId = await addNewRecipe(newRecipe);
      if (newRecipeId) {
        navigate(`/recipes/${newRecipeId}`);
      } else {
        errorMessage();
      }
    } catch (error) {
      console.error("Error creating recipe:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Something went wrong!`,
      });
    }
  };

  useEffect(() => {
    const redirectToLogin = async () => {
      const userLoggedIn = await setUserOnRefresh();
      if (!userLoggedIn) {
        navigate("/login");
      }
    };
    redirectToLogin();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline my-4 mx-auto text-center">
        {" "}
        Create a New Recipe
      </h1>
      <RecipeForm onSubmit={handleSubmit} />
    </div>
  );
};
