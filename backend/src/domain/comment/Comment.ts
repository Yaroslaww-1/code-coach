import { nanoid } from "nanoid";
import { Entity } from "../lib/Entity";
import { CommentId } from "./CommentId";
import { PostId } from "../post/PostId";
import { RemoveMethods } from "../lib/typings";
import { Student } from "../user/student/Student";
import { Coach } from "../user/coach/Coach";

export class Comment extends Entity<Comment> {
  public id: CommentId;
  public content: string;
  public createdBy: string;
  public createdByAvatar: string;
  public replyTo: PostId | CommentId;
  public postId: PostId;
  public createdAt: Date;

  public static initialize(comment: RemoveMethods<Comment>) {
    return new Comment({ ...comment })
  }

  public static replyToPost(postId: PostId, content: string, user: Coach | Student): Comment {
    return new Comment({
      id: `${postId}#${nanoid(8)}`,
      content,
      createdBy: user.email,
      createdByAvatar: user.avatar,
      replyTo: postId,
      postId,
      createdAt: new Date(),
    });
  }

  public replyToOtherComment(content: string, user: Coach | Student): Comment {
    return new Comment({
      id: `${this.id}#${nanoid(8)}`,
      content,
      createdBy: user.email,
      createdByAvatar: user.avatar,
      replyTo: this.id,
      postId: this.postId,
      createdAt: new Date(),
    });
  }
}