import { makeAutoObservable } from "mobx";
import { Location } from "./location";

export class Student {
  constructor(
    public email: string,
    public role: string,

    public name: string,
    public location: Location,
    public languages: string[],
    public programmingLanguages: string[],
  ){
    makeAutoObservable(this);
  }

  public avatar() {
    return "https://styles.redditmedia.com/t5_2qh84/styles/communityIcon_pc026nky6a221.png";
  }
}