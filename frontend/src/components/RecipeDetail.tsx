import { useAuthContext } from "../providers/AuthProvider";
import { Recipe } from "../types/interfaces";

const RecipeDetail = ({ recipe }: { recipe: Recipe }) => {
  const { user } = useAuthContext();
  const { title, ingredients, instructions } = recipe;
  return (
    <div>
      <div className="w-full lg:max-w-full lg:flex justify-center">
        <div
          className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          style={{ backgroundImage: "url('/img/card-left.jpg')" }}
          title="Woman holding a mug"
        ></div>
        <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8">
            <div className="text-gray-900 font-bold text-xl mb-2">{title}</div>
            <p className="text-gray-700 text-base">Instructions</p>
          </div>
          <div className="flex items-center">
            <img
              className="w-10 h-10 rounded-full mr-4"
              src="/img/jonathan.jpg"
              alt="Recipe Image"
            />
            <div className="text-sm">
              <p className="text-gray-900 leading-none">
                Recipe added by: {user?.name || "Our User"}
              </p>
              <p className="text-gray-600">What you'll need: {ingredients}</p>
              <p className="text-gray-600">How to make it:{instructions} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
