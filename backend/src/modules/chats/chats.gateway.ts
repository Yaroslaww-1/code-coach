import { MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { SendMessageCommand } from "./commands/send-message.command";

@WebSocketGateway({ transports: ["websocket"], cors: { origin: "*" } })
export class ChatsWebSocketGateway {
  constructor(
    private readonly sendMessageCommand: SendMessageCommand,
  ) {}

  @SubscribeMessage("chats/messages")
  async handleChatsMessages(@MessageBody() payload: any) {
    await this.sendMessageCommand.execute(payload);
  }
}
