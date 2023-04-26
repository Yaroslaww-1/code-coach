import { nanoid } from "nanoid";
import { Post } from "./Post";

export class Comment {
  private _createdAt: Date;

  private constructor(
    private _id: string,
    private _content: string,
    private _createdBy: string,
    private _replyTo: string,
    private _postId: string
  ) {
    this._createdAt = new Date();
  }

  public static replyToPost(post: Post, content: string, user: string): Comment {
    return new Comment(nanoid(8), content, user, post.id(), post.id());
  }

  public static replyToOtherComment(comment: Comment, content: string, user: string): Comment {
    return new Comment(`${comment.id()}#${nanoid(8)}`, content, user, comment.id(), comment.postId());
  }

  public id() { return this._id; }
  public content() { return this._content; }
  public createdBy() { return this._createdBy; }
  public createdAt() { return this._createdAt; }
  public replyTo() { return this._replyTo; }
  public postId() { return this._postId; }
}