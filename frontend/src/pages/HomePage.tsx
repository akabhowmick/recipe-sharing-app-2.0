import { RecipeList } from "../components/RecipeList.tsx";
import { useRecipeContext } from "../providers/RecipesProvider.tsx";

export const HomePage = () => {
  const { recipes } = useRecipeContext();

  return (
    <>
      <h1 className="text-3xl font-bold underline">Welcome to the Recipe App!</h1>
      <RecipeList recipes={recipes} />
    </>
  );
};
