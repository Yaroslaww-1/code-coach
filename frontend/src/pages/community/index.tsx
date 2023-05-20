import React, { useEffect, useState } from "react";
import { Page } from "components/page";
import { Post } from "domain/post";
import postsService from "api/posts.service";
import { useParams } from "react-router-dom";
import { Community } from "domain/community";
import { CircularProgress } from "@mui/material";
import communitiesService from "api/communities.service";
import { CommunityHeader } from "./community-header";
import { PageList } from "components/page-list";
import { PostListItem } from "pages/posts-feed/post-list-item";
import { CreatePostForm } from "./create-post-form";

export const CommunityPage: React.FC = () => {
  const { id } = useParams();

  const [community, setCommunity] = useState<Community>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostFormOpened, setIsPostFormOpened] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setPosts(await postsService.getByCommunity(id!));
    };

    const fetchCommunity = async () => {
      setCommunity(await communitiesService.getById(id!));
    };

    fetchPosts();
    fetchCommunity();
  }, []);

  const savePost = (post: Post) => {
    setPosts(posts => [post, ...posts]);
    setIsPostFormOpened(false);
  };

  if (!community) return (<CircularProgress />);

  return (
    <Page>
      <CommunityHeader community={community} openPostForm={() => setIsPostFormOpened(true)} />
      <CreatePostForm open={isPostFormOpened} community={community} close={savePost} />
      <PageList>
        {posts.map(post => (
          <PostListItem key={post.id} post={post} />
        ))}
      </PageList>
    </Page>
  );
};