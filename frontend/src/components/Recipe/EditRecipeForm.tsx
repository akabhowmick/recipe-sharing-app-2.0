import React, { useState } from "react";
import { ImageUploader } from "./FormUtils/ImageUploader";
import { v4 } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/firebaseConfig";
import { Recipe } from "../../types/interfaces";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useRecipeContext } from "../../providers/RecipesProvider";
import { errorMessage } from "../UserAlert.ts";
import { useAuthContext } from "../../providers/AuthProvider";

export const EditRecipeForm = ({ recipeToEdit }: { recipeToEdit: Recipe }) => {
  const { updateRecipe } = useRecipeContext();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [title, setTitle] = useState(recipeToEdit.title);
  const [ingredients, setIngredients] = useState<{ name: string; quantity: string }[]>(
    recipeToEdit.ingredients.split("|").map((ingredient) => {
      const [name, quantity] = ingredient.split(":");
      return { name, quantity };
    })
  );
  const [instructions, setInstructions] = useState<string[]>(
    recipeToEdit.instructions.split("^ ").filter((step) => step)
  );
  const [image, setImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState(recipeToEdit.image);
  const [cuisine_type, setCuisine_type] = useState(recipeToEdit.cuisine_type);
  const [fun_fact, setFun_fact] = useState(recipeToEdit.fun_fact);
  const [description, setDescription] = useState(recipeToEdit.description);

  // Add new empty ingredient fields
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "" }]);
  };

  // Update ingredient values
  const handleIngredientChange = (index: number, key: "name" | "quantity", value: string) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][key] = value;
    setIngredients(updatedIngredients);
  };

  // Remove ingredient
  const handleRemoveIngredient = (index: number) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  // Add new empty instruction field
  const handleAddInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  // Update instruction step
  const handleInstructionChange = (index: number, value: string) => {
    const updatedInstructions = [...instructions];
    updatedInstructions[index] = value;
    setInstructions(updatedInstructions);
  };

  // Remove instruction step
  const handleRemoveInstruction = (index: number) => {
    const updatedInstructions = [...instructions];
    updatedInstructions.splice(index, 1);
    setInstructions(updatedInstructions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedIngredients = ingredients
      .map((ingredient) => `${ingredient.name}:${ingredient.quantity}`)
      .join("|");

    const formattedInstructions = instructions.join("^");

    if (image) {
      const storageRef = ref(storage, `images/${image.name + v4()}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Upload failed", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageURL(downloadURL);
            onSubmit(
              recipeToEdit.id!,
              title,
              formattedIngredients,
              formattedInstructions,
              downloadURL,
              cuisine_type,
              description,
              fun_fact,
              parseInt(user!.id)
            );
          });
        }
      );
    } else {
      onSubmit(
        recipeToEdit.id!,
        title,
        formattedIngredients,
        formattedInstructions,
        imageURL,
        cuisine_type,
        description,
        fun_fact,
        parseInt(user!.id)
      );
    }
  };

  const onSubmit = async (
    id: number,
    title: string,
    ingredients: string,
    instructions: string,
    image: string,
    cuisine_type: string,
    description: string,
    fun_fact: string,
    userId: number
  ) => {
    const editedRecipe = {
      id,
      title,
      ingredients,
      instructions,
      image,
      cuisine_type,
      description,
      fun_fact,
      userId,
    };

    try {
      const editedRecipeId = await updateRecipe(id, editedRecipe);
      if (editedRecipeId) {
        navigate(`/recipes/${editedRecipeId}`);
      } else {
        errorMessage();
      }
    } catch (error) {
      console.error("Error editing recipe:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Something went wrong!`,
      });
    }
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
        <label className="block text-gray-700 font-bold mb-2">Ingredients</label>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              placeholder="Ingredient"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
              className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Quantity"
              value={ingredient.quantity}
              onChange={(e) => handleIngredientChange(index, "quantity", e.target.value)}
              className="w-1/4 px-3 py-2 ml-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => handleRemoveIngredient(index)}
              className="ml-2 text-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddIngredient} className="text-blue-500 mt-2">
          + Add Ingredient
        </button>
      </div>

      {/* Instructions Section */}
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Instructions</label>
        {instructions.map((instruction, index) => (
          <div key={index} className="flex items-center mb-2">
            <div className="flex-1">
              <label className="block text-gray-700 font-bold mb-1">Step {index + 1}</label>
              <textarea
                value={instruction}
                placeholder={`Step ${index + 1}`}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="button"
              onClick={() => handleRemoveInstruction(index)}
              className="ml-2 text-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddInstruction} className="text-blue-500 mt-2">
          + Add Step
        </button>
      </div>

      <ImageUploader setImage={setImage} />
      {imageURL && (
        <div>
          <p>Uploaded Image:</p>
          <img src={imageURL} alt="Uploaded file" className="uploaded-img" />
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Cuisine Type</label>
        <select
          value={cuisine_type}
          onChange={(e) => setCuisine_type(e.target.value)}
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
          value={fun_fact}
          onChange={(e) => setFun_fact(e.target.value)}
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
