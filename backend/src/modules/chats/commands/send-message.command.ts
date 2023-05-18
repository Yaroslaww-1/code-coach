import { Injectable } from "@nestjs/common";
import { ChatRepository } from "src/infrastructure/persistance/repositories/chats.repository";

@Injectable()
export class SendMessageCommand {
  constructor (
    private readonly chatRepository: ChatRepository
  ) {}

  async execute(
    { chatId, message, author }:
    { chatId: string, message: string, author: string }
  ) {
    const chat = await this.chatRepository.findOne(chatId);

    chat.send(message, author);
    
    await this.chatRepository.save(chat);
  }
}
