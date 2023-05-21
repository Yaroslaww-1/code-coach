import { makeAutoObservable } from "mobx";

export class FairCoach {
  constructor(
    public email: string,
    public communities: string[],
    public recommended?: boolean,
  ) {
    makeAutoObservable(this);
  }
}