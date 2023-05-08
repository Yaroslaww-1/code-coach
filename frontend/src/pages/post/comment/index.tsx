import React from "react";
import { Comment } from "domain/comment";
import { Avatar } from "@mui/material";
import { observer } from "mobx-react-lite";

import styles from "./styles.module.scss";

interface IProps {
  comment: Comment;
}

export const CommentComponent: React.FC<IProps> = observer(({ comment }) => {
  return (
    <div className={styles.root}>
      <div className={styles.user}>
        <Avatar src={comment.createdByUrl()}/>
        <span className={styles.userName}>{comment.createdByName()}</span>
      </div>
      <div className={styles.content}>
        <p>{comment.content}</p>
      </div>
    </div>
  );
});