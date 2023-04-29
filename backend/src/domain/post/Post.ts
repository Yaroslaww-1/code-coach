import { nanoid } from "nanoid";
import { Entity } from "../lib/Entity";
import { RemoveMethods } from "../lib/typings";
import { PostId } from "./PostId";

export class Post extends Entity<Post> {
  public id: PostId;

  public title: string;
  public content: string;
  public community: string;

  public createdBy: string;
  public createdAt: Date;

  public static createNew(post: Omit<RemoveMethods<Post>, "id" | "createdAt">) {
    return new Post({ ...post, id: nanoid(8), createdAt: new Date() })
  }
}