import { makeAutoObservable } from "mobx";

export class Chat {
  constructor (
    public id: string,
    public member1: string,
    public member2: string,
  ) {
    makeAutoObservable(this);
  }

  // public send(messageContent: string, userId: CoachEmail | StudentEmail) {
  //   // TODO: check whether userId is member1/2
  //   const message = Message.createNew({
  //     content: messageContent,
  //     author: userId,
  //     createdAt: new Date(),
  //     chat: this.id,
  //   });

  //   this.events.push(new MessageSent(message));
  // }
}