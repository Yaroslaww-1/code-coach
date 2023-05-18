import { makeAutoObservable } from "mobx";
import { ChatMember } from "./ChatMember";
import ws from "api/ws/ws";

export class Chat {
  constructor (
    public id: string,
    public student: ChatMember,
    public coach: ChatMember,
  ) {
    makeAutoObservable(this);
  }

  public send(messageContent: string, userId: string) {
    ws.sendMessage(this.id, messageContent, userId);
  }
}