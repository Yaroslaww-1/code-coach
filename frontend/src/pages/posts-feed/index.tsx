import React, { useEffect, useState } from "react";
import { Page } from "components/page";
import { Post } from "domain/post";
import postsService from "api/posts.service";
import { PageList } from "components/page-list";
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
      <PageList>
        {posts.map(post => (
          <PostListItem key={post.id} post={post} />
        ))}
      </PageList>
    </Page>
  );
};