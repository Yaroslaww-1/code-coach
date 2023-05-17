import { makeAutoObservable } from "mobx";

export class CoachStudent {
  constructor(
    public email: string,
    public chat: string,
  ){
    makeAutoObservable(this);
  }
}