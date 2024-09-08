import RecipeFilterSearch from "../components/Recipe/RecipeFilterSearch.tsx";

export const AllRecipesPage = () => {
  return (
    <>
      <section className="text-center py-16">
        <h2 className="text-3xl font-bold">
          <span className="text-purple-900">All Recipes: </span>
        </h2>
        <RecipeFilterSearch />
      </section>
    </>
  );
};
