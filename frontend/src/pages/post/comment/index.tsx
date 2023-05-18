import React, { useState } from "react";
import { Comment } from "domain/comment";
import { Avatar, Button, TextField } from "@mui/material";
import { observer } from "mobx-react-lite";

import styles from "./styles.module.scss";
import { UserName } from "pages/profile/user-name";
import { Paper } from "components/paper";

interface IProps {
  comment: Comment;
}

export const CommentComponent: React.FC<IProps> = observer(({ comment }) => {
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [replyContent, setReplyContent] = useState<string>("");

  const reply = () => {
    comment.reply(replyContent);
    location.reload();
  };

  return (
    <Paper className={styles.root}>
      <div className={styles.comment}>
        <div className={styles.user}>
          <Avatar src={comment.createdByUrl()}/>
          <UserName email={comment.createdBy} className={styles.userName} />
        </div>
        <div className={styles.content}>
          <p>{comment.content}</p>
        </div>
        <div className={styles.actions}>
          <Button size="small">Share</Button>
          {!isReplying && <Button size="small" onClick={() => setIsReplying(true)}>Reply</Button>}
        </div>
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
    </Paper>
  );
});
