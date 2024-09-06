import { RecipeList } from "../components/Recipe/RecipeList.tsx";
import { useRecipeContext } from "../providers/RecipesProvider.tsx";
import { SiteDescription } from "../components/HomePageComponents/SiteDescription.tsx";
import { FeaturedMeals } from "../components/HomePageComponents/FeaturedMeals.tsx";
import { Hero } from "../components/HomePageComponents/Hero.tsx";

export const HomePage = () => {
  const { recipes } = useRecipeContext();

  return (
    <>
      <Hero />
      <RecipeList recipes={recipes} />
      <FeaturedMeals />
      <SiteDescription />
    </>
  );
};
