import React, { useState } from "react";
import { ImageUploader } from "./FormUtils/ImageUploader";
import { v4 } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../utils/firebaseConfig";
import { useAuthContext } from "../../providers/AuthProvider";

interface RecipeFormProps {
  initialTitle?: string;
  initialIngredients?: string;
  initialInstructions?: string;
  onSubmit: (
    title: string,
    ingredients: string,
    instructions: string,
    imageUrl: string,
    cuisine_type: string,
    description: string,
    fun_fact: string,
    user: number
  ) => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({
  initialTitle = "",
  initialIngredients = "",
  initialInstructions = "",
  onSubmit,
}) => {
  const { user } = useAuthContext();
  const [title, setTitle] = useState(initialTitle);
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [instructions, setInstructions] = useState(initialInstructions);
  const [image, setImage] = useState<File | null>(null); // Store image here
  const [imageURL, setImageURL] = useState("");
  const [cuisine_type, setCuisine_type] = useState("");
  const [fun_fact, setFun_fact] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (image) {
      // Upload image to Firebase when the form is submitted
      const storageRef = ref(storage, `images/${image.name + v4()}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Optional: Track upload progress
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
              title,
              ingredients,
              instructions,
              downloadURL,
              cuisine_type,
              fun_fact,
              description,
              parseInt(user!.id!)
            );
          });
        }
      );
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

export default RecipeForm;
