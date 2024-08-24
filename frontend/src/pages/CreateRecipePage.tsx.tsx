import { useNavigate } from "react-router-dom";
import RecipeForm from "../components/Recipe/RecipeForm";
import { useRecipeContext } from "../providers/RecipesProvider";
import Swal from "sweetalert2";

export const CreateRecipePage = () => {
  const { addNewRecipe } = useRecipeContext();
  const navigate = useNavigate();

  const handleSubmit = async (
    title: string,
    ingredients: string,
    instructions: string,
    image: string,
    cuisine_type: string,
    description: string,
    fun_fact: string
  ) => {
    const newRecipe = {
      title,
      ingredients,
      instructions,
      image,
      cuisine_type,
      description,
      fun_fact,
    };

    try {
      const newRecipeId = await addNewRecipe(newRecipe);
      if (newRecipeId) {
        navigate(`/recipes/${newRecipeId}`);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
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
