import { Link, useNavigate } from "react-router-dom";
import { Recipe } from "../../types/interfaces";
import { generateRandomImage } from "../../MockData/RandomImage";
import { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Swal from "sweetalert2";
import { useRecipeContext } from "../../providers/RecipesProvider";

export const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const { deleteRecipe } = useRecipeContext();
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
    Swal.fire("Hey user!", "This feature is coming soon!", "warning");
  };

  const handleCommentClick = () => {
    Swal.fire("Hey user!", "This feature is coming soon!", "warning");
  };

  const handleDeleteClick = () => {
    // TODO: Check authorization first then navigate
    deleteRecipe(recipe.id!);
  };

  const handleEditClick = () => {
    // TODO: Check authorization first then navigate
    navigate(`/recipes/${recipe.id!}/edit`);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="relative flex flex-col recipe-card max-w-sm rounded overflow-hidden shadow-lg bg-white pt-4 pb-2 px-3">
      <div className="absolute top-2 right-2">
        <IconButton onClick={handleMenuClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem
            onClick={() => {
              handleFavoriteClick();
              handleMenuClose();
            }}
          >
            {isFavorited ? "Unfavorite" : "Favorite"}
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleCommentClick();
              handleMenuClose();
            }}
          >
            Comment
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleEditClick();
              handleMenuClose();
            }}
          >
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleDeleteClick();
              handleMenuClose();
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      </div>
      <img className="w-full" src={generateRandomImage()} alt={`Recipe: ${recipe.title} image`} />
      <div className="card-content px-6 py-4">
        <div className="font-bold text-xl mb-2">{recipe.title}</div>
        <p className="text-gray-700 mb-1 text-base">Description: {recipe.description}</p>
        <p className="text-gray-700 mb-1 text-base">Fun Fact: {recipe.fun_fact}</p>
      </div>
      <div className="px-6 pt-4 pb-2 flex justify-content-center">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #{recipe.cuisine_type}
        </span>
        <Link
          className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-white bg-blue-600 mr-2 mb-2"
          to={`/recipes/${recipe.id}`}
        >
          Make it now!
        </Link>
      </div>
    </div>
  );
};
