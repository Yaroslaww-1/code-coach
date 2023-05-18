import { Module } from "@nestjs/common";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { ChatsController } from "./chats.controller";
import { GetByIdQuery } from "./queries/get-by-id.query";
import { GetMessagesQuery } from "./queries/get-messages.query";
import { ChatsWebSocketGateway } from "./chats.gateway";
import { SendMessageCommand } from "./commands/send-message.command";
import { ChatsWebSocketOutGateway } from "./chats.outgateway";

@Module({
  imports: [InfrastructureModule],
  controllers: [ChatsController],
  providers: [GetByIdQuery, GetMessagesQuery, ChatsWebSocketGateway, SendMessageCommand, ChatsWebSocketOutGateway],
})
export class ChatsModule {}
