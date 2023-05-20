import { makeAutoObservable } from "mobx";

export class FairCoach {
  constructor(
    public email: string,
    public communities: string[],
  ) {
    makeAutoObservable(this);
  }
}