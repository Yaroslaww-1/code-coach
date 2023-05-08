import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Post } from "domain/post";
import { PostListItem } from "../post-list-item";

interface IProps {
  posts: Post[];
}

export const PostsList: React.FC<IProps> = ({ posts }) => {
  return (
    <Grid container spacing={2}>
      {posts.map(post => (
        <Grid xs={12} key={post.id} display="flex" justifyContent="center" alignItems="center">
          <PostListItem post={post} />
        </Grid>
      ))}
    </Grid>
  );
};