import { Typography } from "@mui/material";
import { useAuthContext } from "../../providers/AuthProvider";
import { Recipe } from "../../types/interfaces";
import CommentsList from "./Comments/CommentsList";

const RecipeDetail = ({ recipe }: { recipe: Recipe }) => {
  const { user } = useAuthContext();
  const { title, ingredients, instructions, description, fun_fact } = recipe;

  return (
    <div className="m-10 min-h-screen">
      <div className="w-full bg-white lg:max-w-full justify-center">
        <div className="recipe-banner lg:h-auto flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden w-50 mx-auto p-4">
          <img src={recipe.image} alt="recipe image" />
        </div>
        <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          {/* Title */}
          <div className="mb-3">
            <Typography variant="h5" className="text-gray-900 font-bold mb-2">
              {title}
            </Typography>
          </div>
          <div className="flex items-center">
            <div className="text-md">
              <Typography variant="body1" className="text-gray-900 leading-none">
                Recipe added by: {user?.name || "Our User"}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="my-1">
                <span className="text-purple-900">Description: </span>
                {description}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="my-1">
                <span className="text-orange-500">Fun Fact: </span> {fun_fact}
              </Typography>

              {/* Ingredients Table */}
              <div className="mt-4 w-100">
                <Typography variant="h6" className="font-bold mb-2">
                  What you'll need:
                </Typography>
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Ingredient</th>
                      <th className="px-4 py-2">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingredients.split("|").map((ingredient, index) => {
                      const [food, quantity] = ingredient.split(":");
                      return (
                        <tr key={index}>
                          <td className="border px-4 py-2">{food}</td>
                          <td className="border px-4 py-2">{quantity}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Instructions */}
              <div className="mt-4">
                <Typography variant="h6" className="font-bold mb-2">
                  How to make it:
                </Typography>
                <ul>
                  {instructions.split("^").map((instruction, index) => (
                    <li className="text-gray-600 mb-2" key={index}>
                      <Typography variant="h6" className="font-bold mb-2 underline">
                        Step {index + 1}:
                      </Typography>{" "}
                      {instruction}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Comments List */}
          <CommentsList recipe={recipe} />
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
