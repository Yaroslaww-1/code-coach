import React from "react";

import styles from "./styles.module.scss";

import { observer } from "mobx-react-lite";
import { UserName } from "pages/profile/user-name";
import { Message } from "domain/chat/Message";
import { PageListItem } from "components/page-list-item";

interface IProps {
  message: Message;
}

export const MessageListItem: React.FC<IProps> = observer(({ message }) => {
  return (
    <PageListItem>
      <UserName email={message.author} />
      <div className={styles.content}>
        <p>{message.content}</p>
      </div>
    </PageListItem>
  );
});