/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";
import { Chat } from "domain/chat/Chat";
import usersService from "./users.service";
import { ChatMember } from "domain/chat/ChatMember";

class ChatsService {
  async getById(chatId: string): Promise<Chat> {
    const chat = await api.get<any>(`/chats/${chatId}`);

    const coach = await usersService.getById(chat.coach);
    const student = await usersService.getById(chat.student);

    return new Chat(
      chatId,
      new ChatMember(student.email, student.avatar()),
      new ChatMember(coach.email, coach.avatar()));
  }
}

export default new ChatsService();