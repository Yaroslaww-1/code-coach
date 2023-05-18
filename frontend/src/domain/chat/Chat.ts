import { makeAutoObservable } from "mobx";
import { ChatMember } from "./ChatMember";
import chatsService from "api/chats.service";

export class Chat {
  constructor (
    public id: string,
    public student: ChatMember,
    public coach: ChatMember,
  ) {
    makeAutoObservable(this);
  }

  public send(messageContent: string, userId: string) {
    chatsService.emitMessage(this.id, messageContent, userId);
  }
}