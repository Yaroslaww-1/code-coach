import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Page } from "components/page";
import { Post } from "domain/post";
import postsService from "api/posts.service";
import { PostListItem } from "./post-list-item";

export const PostsFeedPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const feed = await postsService.getFeed();
      setPosts(feed);
    };

    fetch();
  }, []);

  return (
    <Page>
      <Grid container spacing={2}>
        {posts.map(post => (
          <Grid xs={12} key={post.id} display="flex" justifyContent="center" alignItems="center">
            <PostListItem post={post} />
          </Grid>
        ))}
      </Grid>
    </Page>
  );
};