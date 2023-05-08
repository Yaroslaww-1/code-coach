import { makeAutoObservable } from "mobx";

export class Comment {
  constructor (
    public id: string,
    public content: string,
    public createdBy: string,
    public createdAt: Date,
    public replyTo: string,
  ) {
    makeAutoObservable(this);
  }

  public createdByName() {
    return this.createdBy.split("@", 1)[0];
  }

  public createdByUrl() {
    return "https://styles.redditmedia.com/t5_2qh84/styles/communityIcon_pc026nky6a221.png";
  }
}