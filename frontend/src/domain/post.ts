import postsService from "api/posts.service";

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

  public createdByUrl() {
    return "https://styles.redditmedia.com/t5_2qh84/styles/communityIcon_pc026nky6a221.png";
  }

  public createdAtReadable() {
    return this.createdAt?.toLocaleDateString();
  }

  public reply(content: string) {
    postsService.replyToPost(this.id, content);
  }
}