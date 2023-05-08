import { Module } from "@nestjs/common";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { ChatsController } from "./chats.controller";
import { GetMineQuery } from "./queries/get-mine.query";
import { GetMessagesQuery } from "./queries/get-messages.query";
import { ChatsWebSocketGateway } from "./chats.gateway";
import { SendMessageCommand } from "./commands/send-message.command";

@Module({
  imports: [InfrastructureModule],
  controllers: [ChatsController],
  providers: [GetMineQuery, GetMessagesQuery, ChatsWebSocketGateway, SendMessageCommand],
})
export class ChatsModule {}