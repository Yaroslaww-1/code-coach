import { makeAutoObservable } from "mobx";

export class Message {
  constructor (
    public id: string,
    public content: string,
    public chat: string,
    public author: string,
  ) {
    makeAutoObservable(this);
  }
}