import { nanoid } from "nanoid";
import { Entity } from "../lib/Entity";
import { RemoveMethods } from "../lib/typings";

export class Post extends Entity<Post> {
  public id: string;

  public title: string;
  public content: string;
  public community: string;

  public createdBy: string;
  public createdAt: Date;

  public commentsCount: number;

  public static createNew(post: Omit<RemoveMethods<Post>, "id" | "createdAt" | "commentsCount">) {
    return new Post({ ...post, id: nanoid(8), commentsCount: 0, createdAt: new Date() })
  }
}