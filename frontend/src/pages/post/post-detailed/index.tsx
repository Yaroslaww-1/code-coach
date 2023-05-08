import React from "react";
import { Avatar } from "@mui/material";
import { observer } from "mobx-react-lite";

import styles from "./styles.module.scss";
import { Post } from "domain/post";
import { Link } from "react-router-dom";
import { AppRoute } from "common/enums/app-route.enum";

interface IProps {
  post: Post;
}

export const PostDetailed: React.FC<IProps> = observer(({ post }) => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Avatar src={post.createdByUrl()}/>
        <div className={styles.createdBy}>
          <span>{post.createdByName()} posted at </span>
          <Link to={`${AppRoute.COMMUNITIES}/${post.community}`}>{post.community}</Link>
        </div>
      </div>
      <div className={styles.content}>
        <p>{post.content}</p>
      </div>
    </div>
  );
});