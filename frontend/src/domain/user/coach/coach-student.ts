import { makeAutoObservable } from "mobx";

export class CoachStudent {
  constructor(
    public coach: string,
    public student: string,
    public chat: string,
  ){
    makeAutoObservable(this);
  }
}