import { Controller, Get, Param } from "@nestjs/common";
import { GetMineQuery } from "./queries/get-mine.query";
import { GetMessagesQuery } from "./queries/get-messages.query";
import { Identity } from "../auth/identity";

@Controller("chats")
export class ChatsController {
  constructor(
    private readonly getMineQuery: GetMineQuery,
    private readonly getMessagesQuery: GetMessagesQuery
  ) {}

  @Get("mine")
  getMine() {
    return this.getMineQuery.execute(Identity.STUDENT);
  }

  @Get(":chatId/messages")
  getMessages(@Param("chatId") chatId: string) {
    return this.getMessagesQuery.execute(chatId);
  }
}
