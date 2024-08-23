import { Link } from "react-router-dom";
import { Recipe } from "../types/interfaces";

export const RecipeList = ({ recipes }: { recipes: Recipe[] }) => {
  return (
    <ul>
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
        </li>
      ))}
    </ul>
  );
};
