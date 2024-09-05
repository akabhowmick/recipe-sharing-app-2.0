import {
  Avatar,
  Divider,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useCommentsContext } from "../../../providers/CommentsProvider";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { Comment } from "../../../types/interfaces";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../providers/AuthProvider";

export const SingleComment = ({ comment, recipeId }: { comment: Comment; recipeId: number }) => {
  const { setUserOnRefresh, user } = useAuthContext();
  const { deleteComment, updateComment } = useCommentsContext();
  const [canUpdateAndDelete, setCanUpdateAndDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const handleSave = () => {
    updateComment(recipeId, comment.id!, editedContent); //
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(comment.content); // Revert to original content
    setIsEditing(false); // Exit edit mode
  };

  useEffect(() => {
    const checkUser = async () => {
      const userLoggedIn = await setUserOnRefresh();
      console.log(typeof(comment.user));
      if (userLoggedIn && user && comment.user === user.id) {
        setCanUpdateAndDelete(true);
      } else {
        setCanUpdateAndDelete(false);
      }
    };
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="User_avatar" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={"User"}
          secondary={
            isEditing ? (
              <TextField
                fullWidth
                multiline
                variant="outlined"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
            ) : (
              <Typography
                component="span"
                variant="body2"
                sx={{ color: "text.primary", display: "inline" }}
              >
                {comment.content}
              </Typography>
            )
          }
        />
        {canUpdateAndDelete && (
          <>
            {isEditing ? (
              <>
                <IconButton aria-label="save" onClick={handleSave} sx={{ ml: 1 }}>
                  <SaveIcon />
                </IconButton>
                <IconButton aria-label="cancel" onClick={handleCancel} sx={{ ml: 1 }}>
                  <CancelIcon />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton aria-label="edit" onClick={() => setIsEditing(true)} sx={{ ml: 1 }}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => deleteComment(recipeId, comment.id!)}
                  sx={{ ml: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </>
        )}
      </ListItem>

      <Divider variant="inset" component="li" />
    </>
  );
};
