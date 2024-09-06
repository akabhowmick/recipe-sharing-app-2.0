import { Recipe } from "../../types/interfaces";
import { RecipeCard } from "./RecipeCard";

export const RecipeList = ({ recipes }: { recipes: Recipe[] }) => {
  return (
    <section className="text-center py-16">
      <h2 className="text-3xl font-bold">
        Featured <span className="text-purple-900">Recipes</span>
      </h2>
      <ul className=" recipe-list-view flex flex-wrap justify-content-center align-items-center py-3 gap-4">
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </li>
        ))}
      </ul>
    </section>
  );
};
