import React from "react";

import styles from "./styles.module.scss";

import ListItem from "@mui/material/ListItem";
import { observer } from "mobx-react-lite";
import { UserName } from "pages/profile/user-name";
import { Message } from "domain/chat/Message";

interface IProps {
  message: Message;
}

export const MessageListItem: React.FC<IProps> = observer(({ message }) => {
  return (
    <ListItem alignItems="flex-start" classes={{ "root": styles.root }}>
      <UserName email={message.author} />
      <div className={styles.content}>
        <p>{message.content}</p>
      </div>
    </ListItem>
  );
});