
import { Recipe } from "../../types/interfaces";
import { RecipeCard } from "./RecipeCard";

export const RecipeList = ({ recipes }: { recipes: Recipe[] }) => {
  return (
    <ul className=" recipe-list-view flex flex-wrap justify-content-center align-items-center py-3">
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <RecipeCard recipe={recipe} />
        </li>
      ))}
    </ul>
  );
};
