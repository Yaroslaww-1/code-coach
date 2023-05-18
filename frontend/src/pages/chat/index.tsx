import React, { useEffect, useState } from "react";
import { Page } from "components/page";
import { CircularProgress } from "@mui/material";
import { MessageListItem } from "./message-list-item";
import { observer } from "mobx-react-lite";
import { Message } from "domain/chat/Message";
import { useParams } from "react-router-dom";
import messagesService from "api/messages.service";
import { PageList } from "components/page-list";
import { Chat } from "domain/chat/Chat";
import chatsService from "api/chats.service";

export const ChatPage: React.FC = observer(() => {
  const { id } = useParams();

  const [messages, setMessages] = useState<Message[]>([]);
  const [chat, setChat] = useState<Chat>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async () => {
      setMessages(await messagesService.getByChatId(id!));
      setChat(await chatsService.getById(id!));
      setIsLoading(false);
    };

    fetch();
  }, []);

  if (isLoading) return (<CircularProgress />);

  return (
    <Page>
      <PageList>
        {messages.map(message => (
          <MessageListItem key={message.id} message={message} chat={chat!} />
        ))}
      </PageList>
    </Page>
  );
});