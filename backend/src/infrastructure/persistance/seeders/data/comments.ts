import { Comment } from "src/domain/comment/Comment";
import Posts from "./posts";

export class Comments {
  public readonly data: Comment[];

  constructor() {
    const posts = Posts.data;

    const comment1 = Comment.replyToPost(posts[0].id, "Nuxt has a lot of things already setup like routing, so I would go with that", "adela.marchmont@gmail.com");
    const comment2 = comment1.replyToOtherComment("Thank you!", "barbara.amory@gmail.com");
    const comment3 = comment2.replyToOtherComment("Always ready to help!", "adela.marchmont@gmail.com");
    const comment4 = Comment.replyToPost(posts[0].id, "I guess if you want to learn the different parts that Nuxt just handled out of the box, you can start a Vue project with Vite.", "abe.ryland@gmail.com");

    this.data = [comment1, comment2, comment3, comment4];
  }
}

export default new Comments();
