import { useNavigate } from "react-router-dom";
import { Recipe } from "../../types/interfaces";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Swal from "sweetalert2";
import { useRecipeContext } from "../../providers/RecipesProvider";
import { useLikeContext } from "../../providers/LikesProvider";

export const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const { deleteRecipe } = useRecipeContext();
  const { addNewLike, deleteLike } = useLikeContext();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleFavoriteClick = () => {
    if (!isLiked) {
      addNewLike(recipe.id!);
    } else {
      deleteLike(recipe.id!);
    }
    setIsLiked(!isLiked);
  };

  const handleCommentClick = () => {
    Swal.fire("Hey user!", "This feature is coming soon!", "warning");
  };

  const handleDeleteClick = () => {
    deleteRecipe(recipe.id!);
  };

  const handleEditClick = () => {
    navigate(`/recipes/${recipe.id!}/edit`);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCardClick = () => {
    navigate(`/recipes/${recipe.id}`);
  };

  return (
    <Card
      sx={{
        width: 350,
        height: 350,
        position: "relative",
        boxShadow: 3,
        cursor: "pointer",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        image={recipe.image}
        alt={`Recipe: ${recipe.title} image`}
        sx={{ width: "100%", height: 200, objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {recipe.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginLeft: 1, fontWeight: 600, textAlign: "end" }}
        >
          #{recipe.cuisine_type}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Box sx={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}>
          <IconButton
            aria-label="add to favorites"
            onClick={(e) => {
              e.stopPropagation();
              handleFavoriteClick();
            }}
          >
            {isLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton
            aria-label="add to favorites"
            onClick={(e) => {
              e.stopPropagation();
              handleFavoriteClick();
            }}
          >
            <ReadMoreIcon
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
            />
          </IconButton>
          <IconButton
            aria-label="more"
            onClick={(e) => {
              e.stopPropagation();
              handleMenuClick(e);
            }}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>
      </CardActions>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={(e) => e.stopPropagation()}
      >
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
    </Card>
  );
};

// import { Link, useNavigate } from "react-router-dom";
// import { Recipe } from "../../types/interfaces";
// import { useState } from "react";
// import { Menu, MenuItem, IconButton } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import Swal from "sweetalert2";
// import { useRecipeContext } from "../../providers/RecipesProvider";
// import { useLikeContext } from "../../providers/LikesProvider";

// export const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
//   const { deleteRecipe } = useRecipeContext();
//   const { addNewLike, deleteLike } = useLikeContext();
//   const navigate = useNavigate();
//   const [isLiked, setIsLiked] = useState(false);
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

//   const handleFavoriteClick = () => {
//     // check if currently liked if so remove it from favorites
//     if (!isLiked) {
//       addNewLike(recipe.id!);
//     } else {
//       deleteLike(recipe.id!);
//     }
//     setIsLiked(!isLiked);
//   };

//   const handleCommentClick = () => {
//     Swal.fire("Hey user!", "This feature is coming soon!", "warning");
//   };

//   const handleDeleteClick = () => {
//     // TODO: Check authorization first then navigate
//     deleteRecipe(recipe.id!);
//   };

//   const handleEditClick = () => {
//     // TODO: Check authorization first then navigate
//     navigate(`/recipes/${recipe.id!}/edit`);
//   };

//   const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div className="relative flex flex-col recipe-card max-w-sm rounded overflow-hidden shadow-lg bg-white pt-4 pb-2 px-3">
//       <div className="absolute top-2 right-2">
//         <IconButton onClick={handleMenuClick}>
//           <MoreVertIcon />
//         </IconButton>
//         <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//           <MenuItem
//             onClick={() => {
//               handleFavoriteClick();
//               handleMenuClose();
//             }}
//           >
//             {isLiked ? "Unfavorite" : "Favorite"}
//           </MenuItem>
//           <MenuItem
//             onClick={() => {
//               handleCommentClick();
//               handleMenuClose();
//             }}
//           >
//             Comment
//           </MenuItem>
//           <MenuItem
//             onClick={() => {
//               handleEditClick();
//               handleMenuClose();
//             }}
//           >
//             Edit
//           </MenuItem>
//           <MenuItem
//             onClick={() => {
//               handleDeleteClick();
//               handleMenuClose();
//             }}
//           >
//             Delete
//           </MenuItem>
//         </Menu>
//       </div>
//       <img className="w-full" src={recipe.image} alt={`Recipe: ${recipe.title} image`} />
//       <div className="card-content px-6 py-4">
//         <div className="font-bold text-xl mb-2">{recipe.title}</div>
//         <p className="text-gray-700 mb-1 text-base">Description: {recipe.description}</p>
//         <p className="text-gray-700 mb-1 text-base">Fun Fact: {recipe.fun_fact}</p>
//       </div>
//       <div className="px-6 pt-4 pb-2 flex justify-content-center">
//         <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
//           #{recipe.cuisine_type}
//         </span>
//         <Link
//           className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-white bg-blue-600 mr-2 mb-2"
//           to={`/recipes/${recipe.id}`}
//         >
//           Make it now!
//         </Link>
//       </div>
//     </div>
//   );
// };
