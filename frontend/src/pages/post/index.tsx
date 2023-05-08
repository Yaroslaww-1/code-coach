import React, { useEffect, useState } from "react";
import { Page } from "components/page";
import { Post } from "domain/post";
import postsService from "api/posts.service";
import { useParams } from "react-router-dom";
import { Comment } from "domain/comment";
import { CircularProgress } from "@mui/material";
import { CommentsThread } from "./comments-thread";
import { PostDetailed } from "./post-detailed";

export const PostPage: React.FC = () => {
  const { id } = useParams();

  const [post, setPost] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async () => {
      setComments(await postsService.getComments(id!));
      setPost(await postsService.getById(id!));
      setIsLoading(false);
    };

    fetch();
  }, []);

  if (isLoading) return (<CircularProgress />);

  return (
    <Page>
      <PostDetailed post={post!} />
      <CommentsThread parent={post!.id} comments={comments} level={0} />
    </Page>
  );
};