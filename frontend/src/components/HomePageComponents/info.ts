// info.ts

import { generateRandomImage } from "../../MockData/RandomImage";

export const mealPlans = [
  {
    src: generateRandomImage(),
    title: "Thai",
  },
  {
    src: generateRandomImage(),
    title: "Low-Carb",
  },
  {
    src: generateRandomImage(),
    title: "Korean",
  },
  {
    src: generateRandomImage(),
    title: "Chinese",
  },
  {
    src: generateRandomImage(),
    title: "Vegetarian",
  },
  {
    src: generateRandomImage(),
    title: "Vegan",
  },
];

export const reasons = [{
  title: "Learn and Grow",
  text: "Whether you're a seasoned chef or just starting out, there's always something new to learn.Discover innovative recipes, cooking techniques, and flavors from around the world to elevate your cooking skills and expand your palate."
}, {
  title: "Discover New Cultures",
  text: "Sharing recipes is a way to explore different cultures through food. Learn about traditional dishes, cooking techniques, and the stories behind the recipes, and broaden your culinary horizons."
}, {
  title: "Connect Through Food",
  text: "Food brings people together. By sharing your favorite recipes, you're not only providing delicious meal ideas but also creating a deeper connection with a broader community of food lovers."
}, 

]