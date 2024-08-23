import { Recipe } from "../types/interfaces";
import { RecipeCard } from "./RecipeCard";

export const RecipeList = ({ recipes }: { recipes: Recipe[] }) => {
  return (
    <ul>
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <RecipeCard recipe={recipe} />
        </li>
      ))}
    </ul>
  );
};
