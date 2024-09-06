import React from "react";
import { mealPlans} from "./info.ts";
import MealPlanCard from "./MealPlanCard.tsx";
import { generateRandomImage } from "../../MockData/RandomImage.ts";

export const FeaturedMeals: React.FC = () => (
  <div className="text-gray-800">
    <section className="text-center py-16 mx-4">
      <h1 className="text-4xl font-bold">
        Specialty <span className="text-purple-900">Meal Plans</span>
      </h1>
      <div className="flex justify-center items-center mt-8">
        <div className="w-1/3 text-left">
          <h2 className="text-2xl font-bold">Too busy to plan?</h2>
          <p className="mt-4">
            Subscribe to our dietitian-prepared Specialty Meal Plans with their tailored nutrition
            each and every week, easily customizable to your personal tastes.
          </p>
          <button className="mt-6 px-6 py-3 bg-green-500 text-white font-bold rounded-full">
            LEARN MORE
          </button>
        </div>
        <div className="w-1/3">
          <img
            alt="Delicious parfait with berries and granola"
            className="rounded-lg shadow-lg"
            height="400"
            src={generateRandomImage()}
            width="370"
          />
        </div>
        <div className="w-1/3 grid grid-cols-2 gap-4">
          {mealPlans.map((plan) => (
            <div key={plan.title}>
              <MealPlanCard src={plan.src} title={plan.title} />
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);
