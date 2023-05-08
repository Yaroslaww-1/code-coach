import React, { useEffect, useState } from "react";
import { Page } from "components/page";
import { Post } from "domain/post";
import postsService from "api/posts.service";
import { PostsList } from "./post-list";

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
      <PostsList posts={posts} />
    </Page>
  );
};