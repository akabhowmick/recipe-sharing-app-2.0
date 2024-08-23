import React, { useState } from "react";

interface RecipeFormProps {
  initialTitle?: string;
  initialIngredients?: string;
  initialInstructions?: string;
  onSubmit: (
    title: string,
    ingredients: string,
    instructions: string,
    image: string,
    cuisineType: string,
    description: string,
    funFact: string
  ) => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({
  initialTitle = "",
  initialIngredients = "",
  initialInstructions = "",
  onSubmit,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [instructions, setInstructions] = useState(initialInstructions);
  const [image, setImage] = useState("");
  const [cuisineType, setCuisineType] = useState("");
  const [funFact, setFunFact] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, ingredients, instructions, image, cuisineType, funFact, description);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 mb-6 rounded-lg shadow-md max-w-lg mx-auto"
    >
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Ingredients (separate by commas)
        </label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Instructions (separate by periods)
        </label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Image URL (optional)</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Cuisine Type</label>
        <select
          value={cuisineType}
          onChange={(e) => setCuisineType(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="" disabled>
            Select a cuisine
          </option>
          <option value="Taiwanese">Taiwanese</option>
          <option value="Cantonese">Cantonese</option>
          <option value="Szechuan">Szechuan</option>
          <option value="Japanese">Japanese</option>
          <option value="Korean">Korean</option>
          <option value="Thai">Thai</option>
          <option value="Vietnamese">Vietnamese</option>
          <option value="Indian">Indian</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Fun Fact</label>
        <input
          type="text"
          value={funFact}
          onChange={(e) => setFunFact(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        Submit
      </button>
    </form>
  );
};

export default RecipeForm;
