import { Module } from "@nestjs/common";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { ChatsController } from "./chats.controller";
import { GetMineQuery } from "./queries/get-mine.query";
import { GetMessagesQuery } from "./queries/get-messages.query";

@Module({
  imports: [InfrastructureModule],
  controllers: [ChatsController],
  providers: [GetMineQuery, GetMessagesQuery],
})
export class ChatsModule {}
