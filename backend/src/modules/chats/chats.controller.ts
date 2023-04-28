import { Controller, Get, Param } from "@nestjs/common";
import { GetMineQuery } from "./queries/get-mine.query";
import { GetMessagesQuery } from "./queries/get-messages.query";

@Controller("chats")
export class ChatsController {
  constructor(
    private readonly getMineQuery: GetMineQuery,
    private readonly getMessagesQuery: GetMessagesQuery
  ) {}

  @Get("mine")
  getMine() {
    return this.getMineQuery.execute();
  }

  @Get(":chatId/messages")
  getMessages(@Param("chatId") chatId: string) {
    return this.getMessagesQuery.execute(chatId);
  }
}
