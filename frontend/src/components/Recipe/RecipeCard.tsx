import { useNavigate } from "react-router-dom";
import { Recipe } from "../../types/interfaces";
import { useEffect, useState } from "react";
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
  Divider,
  Tooltip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import { useRecipeContext } from "../../providers/RecipesProvider";
import { useLikeContext } from "../../providers/LikesProvider";
import { useAuthContext } from "../../providers/AuthProvider";
import { userNotLoggedIn } from "../UserAlert";
import { useCommentsContext } from "../../providers/CommentsProvider";
import Swal, { SweetAlertResult } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const { user, setUserOnRefresh } = useAuthContext();
  const { deleteRecipe } = useRecipeContext();
  const { fetchComments } = useCommentsContext();
  const { addNewLike, deleteLike, getLikesByRecipe } = useLikeContext();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [canUpdateAndDelete, setCanUpdateAndDelete] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    const checkUser = async () => {
      const userLoggedIn = await setUserOnRefresh();
      if (userLoggedIn && user && recipe.user_id === user.id) {
        setCanUpdateAndDelete(true);
      } else {
        setCanUpdateAndDelete(false);
      }
    };
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLikes = async () => {
    const currentLikes = await getLikesByRecipe(recipe.id!);
    setLikesCount(currentLikes.length);
    const currentlyLiked = currentLikes.find((like) => like.user === parseInt(user!.id!));
    setIsLiked(currentlyLiked ? true : false);
  };

  const setComments = async () => {
    const currentComments = await fetchComments(recipe.id!);
    setCommentCount(currentComments.length);
  };

  useEffect(() => {
    setLikes();
    setComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFavoriteClick = async () => {
    if (user) {
      if (!isLiked) {
        await addNewLike(recipe.id!);
      } else {
        await deleteLike(recipe.id!);
      }
      setLikes();
      setIsLiked(!isLiked);
    } else {
      userNotLoggedIn();
    }
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

  const MySwal = withReactContent(Swal);

  const shareLink = () => {
    const url = window.location.href;
    const recipeUrl = url + 'recipes/' + recipe.id
    MySwal.fire({
      title: "Share this recipe",
      text: "Copy the link below to share:",
      input: "text",
      inputValue: recipeUrl,
      showConfirmButton: true,
      confirmButtonText: "Copy",
      showCloseButton: true,
      inputAttributes: {
        readonly: "true",
      },
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        // Copy the URL to clipboard
        navigator.clipboard.writeText(url).then(() => {
          Swal.fire("Copied!", "The link has been copied to your clipboard.", "success");
        });
      }
    });
  };

  return (
    <Card
      // className="w-100 h-100"
      sx={{
        width: 300,
        height: 325,
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
        sx={{ width: "100%", height: 150, objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {recipe.title}
        </Typography>
        <Typography
          variant="body2"
          color="orange"
          sx={{ marginLeft: 1, fontWeight: 600, textAlign: "end" }}
        >
          #{recipe.cuisine_type}
        </Typography>
      </CardContent>
      <Divider
        sx={{
          borderBottomWidth: "3px",
          borderColor: "purple",
          width: "80%",
          margin: "0 auto",
        }}
      />

      <CardActions disableSpacing>
        <Box sx={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}>
          <Tooltip title="Comment on the recipe!" arrow>
            <IconButton
              aria-label="Comment on the recipe!"
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
              sx={{
                "&:hover": {
                  color: "orange",
                },
              }}
            >
              <CommentIcon />
              {commentCount > 0 && <span className="px-1">{commentCount}</span>}
            </IconButton>
          </Tooltip>

          <Tooltip title="Add to favorites" arrow>
            <IconButton
              aria-label={isLiked ? "Remove from Favorites" : "Add to Favorites"}
              onClick={(e) => {
                e.stopPropagation();
                handleFavoriteClick();
              }}
              sx={{
                "&:hover": {
                  color: "orange",
                },
              }}
            >
              {isLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
              {likesCount > 0 && <span className="px-1">{likesCount}</span>}
            </IconButton>
          </Tooltip>

          <Tooltip title="Share this recipe" arrow>
            <IconButton
              aria-label="Share this recipe"
              onClick={(e) => {
                e.stopPropagation();
                shareLink();
              }}
              sx={{
                "&:hover": {
                  color: "orange",
                },
              }}
            >
              <ShareIcon />
            </IconButton>
          </Tooltip>

          {canUpdateAndDelete && (
            <Tooltip title="More actions" arrow>
              <IconButton
                aria-label="more actions"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMenuClick(e);
                }}
                sx={{
                  "&:hover": {
                    color: "orange",
                  },
                }}
              >
                <MoreVertIcon />
              </IconButton>
            </Tooltip>
          )}
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
