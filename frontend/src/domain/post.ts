import postsService from "api/posts.service";
import { makeAutoObservable } from "mobx";

export class Post {
  constructor(
    public id: string,

    public title: string,
    public content: string,
    public community: string,
    public communityLogo: string,

    public createdBy: string,
    public createdByAvatar: string,
    public createdAt: Date,
  ){
    makeAutoObservable(this);
  }

  public createdAtReadable() {
    return this.createdAt?.toLocaleDateString() + " " + this.createdAt?.toLocaleTimeString();
  }

  public reply(content: string) {
    postsService.replyToPost(this.id, content);
  }
}