import { nanoid } from "nanoid";

export class Post {
  private _id: string;
  private _createdAt: Date;

  constructor(
    private _title: string,
    private _content: string,
    private _createdBy: string,
    private _community: string,
    private _commentsCount: number
  ) {
    this._id = nanoid(8);
    this._createdAt = new Date();
  }

  public id() { return this._id; }
  public title() { return this._title; }
  public content() { return this._content; }
  public createdBy() { return this._createdBy; }
  public createdAt() { return this._createdAt; }
  public commentsCount() { return this._commentsCount; }
  public community() { return this._community; }

  
}