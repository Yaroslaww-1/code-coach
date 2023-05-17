import { makeAutoObservable } from "mobx";

export class Location {
  constructor(
    public city: string,
    public country: string,
  ){
    makeAutoObservable(this);
  }
}