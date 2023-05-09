import { nanoid } from "nanoid";
import { Entity } from "../lib/Entity";
import { CommentId } from "./CommentId";
import { PostId } from "../post/PostId";
import { RemoveMethods } from "../lib/typings";

export class Comment extends Entity<Comment> {
  public id: CommentId;
  public content: string;
  public createdBy: string;
  public replyTo: PostId | CommentId;
  public postId: PostId;
  public createdAt: Date;

  public static initialize(comment: RemoveMethods<Comment>) {
    return new Comment({ ...comment })
  }

  public static replyToPost(postId: PostId, content: string, user: string): Comment {
    return new Comment({
      id: `${postId}#${nanoid(8)}`,
      content,
      createdBy: user,
      replyTo: postId,
      postId,
      createdAt: new Date(),
    });
  }

  public replyToOtherComment(content: string, user: string): Comment {
    return new Comment({
      id: `${this.id}#${nanoid(8)}`,
      content,
      createdBy: user,
      replyTo: this.id,
      postId: this.postId,
      createdAt: new Date(),
    });
  }
}