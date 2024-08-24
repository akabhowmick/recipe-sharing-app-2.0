import { generateRandomImage } from "../../MockData/RandomImage";
import { useAuthContext } from "../../providers/AuthProvider";
import { Recipe } from "../../types/interfaces";

const RecipeDetail = ({ recipe }: { recipe: Recipe }) => {
  const { user } = useAuthContext();
  const { title, ingredients, instructions } = recipe;
  return (
    <div className="m-10 min-h-screen">
      <div className="w-full lg:max-w-full lg:flex justify-center">
        <div className="recipe-banner h-48 lg:h-auto flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
          <img src={generateRandomImage()} alt="recipe image" />
        </div>
        <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          {/* Title */}
          <div className="mb-3">
            <div className="text-gray-900 font-bold text-xl mb-2">{title}</div>
          </div>
          <div className="flex items-center">
            <div className="text-md">
              <p className="text-gray-900 leading-none">
                Recipe added by: {user?.name || "Our User"}
              </p>
              <div className="mt-2">
                <p>What you'll need:</p>
                <ul>
                  {ingredients.split(", ").map((ingredient, index) => (
                    <li className="text-gray-600" key={index}>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-2">
                <p>How to make it</p>
                <ul>
                  {instructions.split(". ").map((instruction, index) => (
                    <li className="text-gray-600" key={index}>
                      Step#{index + 1} {instruction}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
