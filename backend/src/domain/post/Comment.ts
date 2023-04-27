import { nanoid } from "nanoid";
import { Post } from "./Post";
import { Entity } from "../lib/Entity";

export class Comment extends Entity<Comment> {
  public id: string;
  public content: string;
  public createdBy: string;
  public replyTo: string;
  public postId: string;
  public createdAt: Date;

  public static replyToPost(post: Post, content: string, user: string): Comment {
    return new Comment({
      id: nanoid(8),
      content,
      createdBy: user,
      replyTo: post.id,
      postId: post.id,
      createdAt: new Date(),
    });
  }

  public static replyToOtherComment(comment: Comment, content: string, user: string): Comment {
    return new Comment({
      id: `${comment.id}#${nanoid(8)}`,
      content,
      createdBy: user,
      replyTo: comment.id,
      postId: comment.postId,
      createdAt: new Date(),
    });
  }
}