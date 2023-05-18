import React, { useEffect, useState } from "react";
import { Page } from "components/page";
import { CircularProgress } from "@mui/material";
import { MessageListItem } from "./message-list-item";
import { observer } from "mobx-react-lite";
import { Message } from "domain/chat/Message";
import { useParams } from "react-router-dom";
import messagesService from "api/messages.service";
import { PageList } from "components/page-list";

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
      <PageList>
        {messages.map(message => (
          <MessageListItem key={message.id} message={message} />
        ))}
      </PageList>
    </Page>
  );
});