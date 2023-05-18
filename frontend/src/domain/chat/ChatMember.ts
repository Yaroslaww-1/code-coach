import { makeAutoObservable } from "mobx";

export class ChatMember {
  constructor (
    public email: string,
    public avatar: string,
  ) {
    makeAutoObservable(this);
  }
}