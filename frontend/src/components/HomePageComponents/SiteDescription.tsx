import { generateRandomImage } from "../../MockData/RandomImage";
import { reasons } from "./info";

export const SiteDescription = () => {
  const reasonsToJoin = reasons.map((reason) => {
    return (
      <div key={reason.title} className="flex flex-col items-center md:w-1/3 mb-4 mx-2 md:mb-0">
        <img
          src={generateRandomImage()}
          alt="Learn and Grow"
          className="rounded-full w-48 h-48 mb-4"
        />
        <h2 className="text-2xl font-bold underline text-white mb-2">{reason.title}</h2>
        <p className="text-white">{reason.text}</p>
      </div>
    );
  });

  return (
    <div>
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-white mb-4">Why Share Recipes?</h1>
          <p className="text-lg text-white mb-8">
            At Recipe Sharing App, we believe that food is more than just nourishment — it's a
            gateway to exploring new cultures, traditions, and flavors. Our platform allows you to
            share your favorite recipes and learn from others around the world, creating a global
            community of food enthusiasts.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between">
          {reasonsToJoin}
        </div>
        <div className="flex flex-col items-center mt-8">
          <h2 className="text-3xl font-bold text-white mb-4">Join the Recipe Sharing Community</h2>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
};
