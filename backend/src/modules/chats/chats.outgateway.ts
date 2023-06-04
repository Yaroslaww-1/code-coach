import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({ transports: ["websocket"], cors: { origin: "*" } })
export class ChatsWebSocketOutGateway {
  @WebSocketServer()
  private server: Server;

  emit(data: any) {
    this.server.emit("chats/messages", data)
  }
}
