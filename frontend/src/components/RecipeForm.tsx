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

  // TODO add some validation and feedback over here and also prettify this mess
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Ingredients</label>
        <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
      </div>
      <div>
        <label>Instructions</label>
        <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
      </div>
      <div>
        <label>Image URL (optional)</label>
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
      </div>
      <div>
        <label>Cuisine Type</label>
        <input type="text" value={cuisineType} onChange={(e) => setCuisineType(e.target.value)} />
      </div>
      <div>
        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Fun Fact</label>
        <input type="text" value={funFact} onChange={(e) => setFunFact(e.target.value)} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RecipeForm;
