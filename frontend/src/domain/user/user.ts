import { makeAutoObservable } from "mobx";

export class User {
  constructor(
    public email: string,
    public role: string,

    public name: string,
  ){
    makeAutoObservable(this);
  }

  public avatar() {
    return "https://styles.redditmedia.com/t5_2qh84/styles/communityIcon_pc026nky6a221.png";
  }
}