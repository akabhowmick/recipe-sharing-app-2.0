import { Link } from "react-router-dom";
import { Recipe } from "../../types/interfaces";

export const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  return (
    <div className="flex flex-col recipe-card max-w-sm rounded overflow-hidden shadow-lg bg-white pt-4 pb-2 px-3">
      <img className="w-full" src={recipe.image} alt={`Recipe: ${recipe.title} image`} />
      <div className="card-content px-6 py-4">
        <div className="font-bold text-xl mb-2">{recipe.title}</div>
        <p className="text-gray-700 mb-1 text-base">Description: {recipe.description}</p>
        <p className="text-gray-700 mb-1 text-base">Fun Fact: {recipe.funFact}</p>
      </div>
      <div className="px-6 pt-4 pb-2 flex justify-content-center">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #{recipe.cuisineType}
        </span>

        <Link
          className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-white bg-blue-600 mr-2 mb-2"
          to={`/recipes/${recipe.id}`}
        >
          Make it now!
        </Link>
      </div>
    </div>
  );
};
