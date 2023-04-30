import { Injectable } from "@nestjs/common";
import { ChatRepository } from "src/infrastructure/persistance/repositories/chats.repository";

@Injectable()
export class SendMessageCommand {
  constructor (
    private readonly chatRepository: ChatRepository
  ) {}

  async execute(
    { chatId, message, userId }:
    { chatId: string, message: string,userId: string }
  ) {
    const chat = await this.chatRepository.findOne(chatId);

    chat.send(message, userId);
    
    await this.chatRepository.save(chat);
  }
}
