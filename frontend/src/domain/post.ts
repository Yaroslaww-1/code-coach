import postsService from "api/posts.service";
import { makeAutoObservable } from "mobx";

export class Post {
  constructor(
    public id: string,

    public title: string,
    public content: string,
    public community: string,

    public createdBy: string,
    public createdAt: Date,
  ){
    makeAutoObservable(this);
  }

  public createdByUrl() {
    return "https://styles.redditmedia.com/t5_2qh84/styles/communityIcon_pc026nky6a221.png";
  }

  public createdAtReadable() {
    return this.createdAt?.toLocaleDateString() + " " + this.createdAt?.toLocaleTimeString();
  }

  public reply(content: string) {
    postsService.replyToPost(this.id, content);
  }
}