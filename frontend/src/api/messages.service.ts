/* eslint-disable @typescript-eslint/no-explicit-any */
import { Message } from "domain/chat/Message";
import api from "./api";

class MessagesService {
  async getByChatId(chatId: string): Promise<Message[]> {
    const messages = await api.get<any[]>(`/chats/${chatId}/messages`);
    return messages.map((
      { id, content, chat, createdAt, author }) =>
      new Message(id, content, chat, new Date(createdAt), author));
  }
}

export default new MessagesService();