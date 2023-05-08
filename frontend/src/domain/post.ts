export class Post {
  constructor(
    public id: string,

    public title: string,
    public content: string,
    public community: string,

    public createdBy: string,
    public createdAt: Date,
  ){}

  public createdByName() {
    return this.createdBy.split("@", 1)[0];
  }

  public createdAtReadable() {
    console.log(this.createdAt);
    return this.createdAt?.toLocaleDateString();
  }
}