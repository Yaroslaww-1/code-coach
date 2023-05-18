import { Injectable } from "@nestjs/common";
import { ChatRepository } from "src/infrastructure/persistance/repositories/chats.repository";
import { ChatsWebSocketOutGateway } from "../chats.outgateway";
import { MessageSent } from "src/domain/chat/events/MessageSent.event";

@Injectable()
export class SendMessageCommand {
  constructor (
    private readonly chatRepository: ChatRepository,
    private readonly chatsWebSocketGateway: ChatsWebSocketOutGateway
  ) {}

  async execute(
    { chatId, message, author }:
    { chatId: string, message: string, author: string }
  ) {
    const chat = await this.chatRepository.findOne(chatId);
    const replyAuthor = author === chat.coach ? chat.student : chat.coach;

    chat.send(message, author);
    chat.send(`Automatic reply to "${message}"`, replyAuthor);

    await this.chatRepository.save(chat);

    chat.events.filter(e => e instanceof MessageSent)
      .forEach(({ message }: MessageSent) => {
        this.chatsWebSocketGateway.emit(message);
      })
  }
}
