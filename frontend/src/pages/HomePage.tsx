import { RecipeList } from "../components/Recipe/RecipeList.tsx";
import { useRecipeContext } from "../providers/RecipesProvider.tsx";

export const HomePage = () => {
  const { recipes } = useRecipeContext();

  return (
    <>
      <h1 className="text-3xl font-bold underline my-4 mx-auto text-center">Welcome to the Recipe Sharing App!</h1>
      <RecipeList recipes={recipes} />
    </>
  );
};
