import React, { useContext } from "react";

import styles from "./styles.module.scss";

import { observer } from "mobx-react-lite";
import { Message } from "domain/chat/Message";
import { PageListItem } from "components/page-list-item";
import { Chat } from "domain/chat/Chat";
import { Avatar } from "@mui/material";
import { AuthContext } from "common/auth/auth-context";

interface IProps {
  message: Message;
  chat: Chat;
}

export const MessageListItem: React.FC<IProps> = observer(({ message, chat }) => {
  const auth = useContext(AuthContext);

  const authorAvatar = chat.coach.email === message.author ? chat.coach.avatar : chat.student.avatar;
  const isMine = auth.authenticatedUser === message.author;

  return (
    <div className={`${styles.root} ${isMine ? styles.mine : styles.other}`}>
      {!isMine && <Avatar sx={{ width: 64, height: 64, marginRight: 2 }} src={authorAvatar} />}
      <PageListItem className={styles.content}>
        <div className={styles.content}>
          <p>{message.content}</p>
        </div>
      </PageListItem>
    </div>
  );
});