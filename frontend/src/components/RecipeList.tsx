import { Link } from "react-router-dom";

interface Recipe {
  id: number;
  title: string;
}

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
