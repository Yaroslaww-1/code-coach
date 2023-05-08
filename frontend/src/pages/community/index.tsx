import React, { useEffect, useState } from "react";
import { Page } from "components/page";
import { Post } from "domain/post";
import postsService from "api/posts.service";
import { useParams } from "react-router-dom";
import { PostsList } from "pages/posts-feed/post-list";
import { Community } from "domain/community";
import { CircularProgress } from "@mui/material";
import communitiesService from "api/communities.service";
import { CommunityHeader } from "./community-header";

export const CommunityPage: React.FC = () => {
  const { id } = useParams();

  const [community, setCommunity] = useState<Community>();
  const [posts, setPosts] = useState<Post[]>([]);

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

  if (!community) return (<CircularProgress />);

  return (
    <Page>
      <CommunityHeader community={community}/>
      <PostsList posts={posts} />
    </Page>
  );
};