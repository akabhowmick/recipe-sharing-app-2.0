import { useState } from "react";
import { useRecipeContext } from "../../providers/RecipesProvider";
import { RecipeList } from "./RecipeList";
import { cuisines } from "../../utils/generalInfo";

const RecipeFilterSearch = () => {
  const { recipes } = useRecipeContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search change
  };

  const handleCuisineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCuisine(e.target.value);
    setCurrentPage(1); // Reset to first page on cuisine change
  };

  const filteredRecipes = recipes
    .filter((recipe) => selectedCuisine === "All" || recipe.cuisine_type === selectedCuisine)
    .filter((recipe) => recipe.title.toLowerCase().includes(searchTerm.toLowerCase()));

  // Pagination logic
  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRecipes = filteredRecipes.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="p-6 m-1 mx-auto shadow-md rounded-lg">
      <div className="flex mx-auto gap-3">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={selectedCuisine}
          onChange={handleCuisineChange}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Cuisines</option>
          {cuisines.map((cuisine, index) => (
            <option key={index} value={cuisine}>
              {cuisine}
            </option>
          ))}
        </select>
      </div>
      <RecipeList recipes={paginatedRecipes} />

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
        >
          Previous
        </button>
        <span className="text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RecipeFilterSearch;
