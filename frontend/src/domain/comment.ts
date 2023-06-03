import commentsService from "api/comments.service";
import { makeAutoObservable } from "mobx";

export class Comment {
  constructor (
    public id: string,
    public content: string,
    public createdBy: string,
    public createdByAvatar: string,
    public createdAt: Date,
    public replyTo: string,
  ) {
    makeAutoObservable(this);
  }

  public reply(content: string) {
    commentsService.replyToComment(this.id, content);
  }
}