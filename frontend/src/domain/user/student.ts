import { makeAutoObservable } from "mobx";
import { Location } from "./location";
import { CoachStudent } from "./coach/coach-student";

export class Student {
  constructor(
    public email: string,
    public role: string,

    public name: string,

    public avatar: string,
    public location: Location,
    public languages: string[],
    public programmingLanguages: string[],

    public coaches: CoachStudent[],
    public mentorshipRequests: string[],
  ){
    makeAutoObservable(this);
  }
}