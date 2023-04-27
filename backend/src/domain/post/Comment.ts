import { nanoid } from "nanoid";
import { Entity } from "../lib/Entity";
import { PostId } from "./PostId";
import { CommentId } from "./CommentId";

export class Comment extends Entity<Comment> {
  public id: CommentId;
  public content: string;
  public createdBy: string;
  public replyTo: PostId | CommentId;
  public postId: PostId;
  public createdAt: Date;

  public static replyToPost(postId: PostId, content: string, user: string): Comment {
    return new Comment({
      id: new CommentId(nanoid(8)),
      content,
      createdBy: user,
      replyTo: postId,
      postId,
      createdAt: new Date(),
    });
  }

  public static replyToOtherComment(comment: Comment, content: string, user: string): Comment {
    return new Comment({
      id: new CommentId(`${comment.id}#${nanoid(8)}`),
      content,
      createdBy: user,
      replyTo: comment.id,
      postId: comment.postId,
      createdAt: new Date(),
    });
  }
}