import { Controller, Get, Param } from "@nestjs/common";
import { GetByIdQuery } from "./queries/get-by-id.query";
import { GetMessagesQuery } from "./queries/get-messages.query";

@Controller("chats")
export class ChatsController {
  constructor(
    private readonly getByIdQuery: GetByIdQuery,
    private readonly getMessagesQuery: GetMessagesQuery
  ) {}

  @Get(":id/messages")
  getMessages(@Param("id") chatId: string) {
    return this.getMessagesQuery.execute(chatId);
  }

  @Get(":id")
  getById(@Param("id") chatId: string) {
    return this.getByIdQuery.execute(chatId);
  }
}
