import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Post } from "domain/post";
import { Community } from "domain/community";
import postsService from "api/posts.service";

interface IProps {
  community: Community;
  open: boolean;
  close: (post: Post) => void;
}

export const CreatePostForm: React.FC<IProps> = ({ open, close, community }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const savePost = async () => {
    const newPost = await postsService.create(title, content, community.name);
    close(newPost);
    setTitle("");
    setContent("");
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Create a post</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          value={title}
          multiline
          onChange={e => setTitle(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          id="content"
          label="Content"
          type="text"
          fullWidth
          variant="standard"
          value={content}
          multiline
          onChange={e => setContent(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={savePost}>Post</Button>
      </DialogActions>
    </Dialog>
  );
};