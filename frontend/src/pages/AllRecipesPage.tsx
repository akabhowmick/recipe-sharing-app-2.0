import { RecipeList } from "../components/Recipe/RecipeList.tsx";
import { useRecipeContext } from "../providers/RecipesProvider.tsx";

export const AllRecipesPage = () => {
  const { recipes } = useRecipeContext();

  return (
    <>
      <section className="text-center py-16">
        <h2 className="text-3xl font-bold">
         <span className="text-purple-900">All Recipes: </span>
        </h2>
        <RecipeList recipes={recipes} />
      </section>
    </>
  );
};
