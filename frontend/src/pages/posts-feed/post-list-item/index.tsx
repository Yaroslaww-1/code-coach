import React from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import { Post } from "domain/post";
import { CommunityLogoName } from "pages/communities/community-logo-name";
import styles from "./styles.module.scss";
import { generatePath, useNavigate } from "react-router-dom";
import { AppRoute } from "common/enums/app-route.enum";
import { UserName } from "pages/profile/user-name";
import { PageListItem } from "components/page-list-item";

interface IProps {
  post: Post;
}

export const PostListItem: React.FC<IProps> = ({ post }) => {
  const navigate = useNavigate();

  const goToPost = () => {
    navigate(generatePath(AppRoute.POST, { id: post.id }));
  };

  return (
    <PageListItem>
      <div onClick={goToPost}>
        <CardHeader
          avatar={
            <CommunityLogoName
              avatarUrl="https://styles.redditmedia.com/t5_2qh84/styles/communityIcon_pc026nky6a221.png"
              name={post.community}
            />
          }
          title={post.title}
          subheader={<>Created by <UserName email={post.createdBy} /> at {post.createdAtReadable()}</>}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary" style={{ whiteSpace: "pre-line" }}>
            {post.content}
          </Typography>
        </CardContent>
      </div>
    </PageListItem>
  );
};