import React, { useEffect, useState } from "react";
import { Page } from "components/page";
import { CircularProgress, List } from "@mui/material";
import { MessageListItem } from "./message-list-item";
import { observer } from "mobx-react-lite";
import { Message } from "domain/chat/Message";
import { useParams } from "react-router-dom";
import messagesService from "api/messages.service";

export const ChatPage: React.FC = observer(() => {
  const { id } = useParams();

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async () => {
      setMessages(await messagesService.getByChatId(id!));
      setIsLoading(false);
    };

    fetch();
  }, []);

  if (isLoading) return (<CircularProgress />);

  return (
    <Page>
      <List sx={{ width: "100%", maxWidth: 800, bgcolor: "background.paper" }}>
        {messages.map(message => (
          <MessageListItem key={message.id} message={message} />
        ))}
      </List>
    </Page>
  );
});