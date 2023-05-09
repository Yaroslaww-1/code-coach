import React from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Post } from "domain/post";
import { CommunityLogoName } from "pages/communities/community-logo-name";
import styles from "./styles.module.scss";
import { generatePath, useNavigate } from "react-router-dom";
import { AppRoute } from "common/enums/app-route.enum";

interface IProps {
  post: Post;
}

export const PostListItem: React.FC<IProps> = ({ post }) => {
  const navigate = useNavigate();

  const goToPost = () => {
    navigate(generatePath(AppRoute.POST, { id: post.id }));
  };

  return (
    <Card sx={{ maxWidth: 800 }} classes={{ root: styles.root }} onClick={goToPost}>
      <CardHeader
        avatar={
          <CommunityLogoName
            avatarUrl="https://styles.redditmedia.com/t5_2qh84/styles/communityIcon_pc026nky6a221.png"
            name={post.community}
          />
        }
        title={post.title}
        subheader={`Created by ${post.createdByName()} at ${post.createdAtReadable()}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" style={{ whiteSpace: "pre-line" }}>
          {post.content}
        </Typography>
      </CardContent>
    </Card>
  );
};