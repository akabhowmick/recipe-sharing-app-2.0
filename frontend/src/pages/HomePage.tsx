import { useEffect, useState } from "react";
import { RecipeList } from "../components/RecipeList.tsx";

export const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("/api/recipes/")
      .then((response) => response.json())
      .then((data) => setRecipes(data));
  }, []);

  return <RecipeList recipes={recipes} />;
};
