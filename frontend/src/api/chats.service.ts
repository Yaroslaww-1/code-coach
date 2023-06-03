/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "./api";
import { Chat } from "domain/chat/Chat";
import { ChatMember } from "domain/chat/ChatMember";
import ws from "./ws";
import coachesService from "./coaches.service";
import studentsService from "./students.service";

class ChatsService {
  async getById(chatId: string): Promise<Chat> {
    const chat = await api.get<any>(`/chats/${chatId}`);

    const coach = await coachesService.getById(chat.coach);
    const student = await studentsService.getById(chat.student);

    return new Chat(
      chatId,
      new ChatMember(student!.email, student!.avatar),
      new ChatMember(coach!.email, coach!.avatar));
  }

  async emitMessage(chatId: string, message: string, author: string): Promise<void> {
    ws.emit(
      "chats/messages",
      { chatId, message, author });
  }
}

export default new ChatsService();