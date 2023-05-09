import React, { useState } from "react";
import { observer } from "mobx-react-lite";

import styles from "./styles.module.scss";
import { Post } from "domain/post";
import { Link } from "react-router-dom";
import { AppRoute } from "common/enums/app-route.enum";
import { Avatar, Button, TextField } from "@mui/material";
import { CommunityName } from "pages/community/community-name";
import { UserName } from "pages/profile/user-name";

interface IProps {
  post: Post;
}

export const PostDetailed: React.FC<IProps> = observer(({ post }) => {
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [replyContent, setReplyContent] = useState<string>("");

  const reply = () => {
    post.reply(replyContent);
    location.reload();
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Avatar src={post.createdByUrl()}/>
        <div className={styles.createdBy}>
          <UserName email={post.createdBy} />
          <span> posted at </span>
          <CommunityName name={post.community} />
        </div>
      </div>
      <div className={styles.content}>
        <p>{post.content}</p>
      </div>
      <div className={styles.actions}>
        <Button size="small">Share</Button>
        {!isReplying && <Button size="small" onClick={() => setIsReplying(true)}>Reply</Button>}
      </div>
      {isReplying && (
        <div className={styles.reply}>
          <TextField
            id="filled-textarea"
            label="Enter your comment here..."
            placeholder="Enter your comment here..."
            multiline
            variant="filled"
            className={styles.replyInput}
            value={replyContent}
            onChange={e => setReplyContent(e.target.value)}
          />
          <Button size="small" onClick={reply}>Reply</Button>
          <Button size="small" color="error" onClick={() => setIsReplying(false)}>Cancel</Button>
        </div>)}
    </div>
  );
});