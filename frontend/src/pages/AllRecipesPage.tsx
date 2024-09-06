import { RecipeList } from "../components/Recipe/RecipeList.tsx";
import { useRecipeContext } from "../providers/RecipesProvider.tsx";

export const AllRecipesPage = () => {
  const { recipes } = useRecipeContext();

  return (
    <>
      <RecipeList recipes={recipes} />
    </>
  );
};
