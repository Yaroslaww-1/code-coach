import { makeAutoObservable } from "mobx";

export class WorkExperience {
  constructor(
    public company: string,
    public start: Date,
    public end?: Date,
  ){
    makeAutoObservable(this);
  }

  toString() {
    return `${this.company}, from ${this.start.toLocaleDateString()} to ${this.end?.toLocaleDateString() ?? "now"}`;
  }
}