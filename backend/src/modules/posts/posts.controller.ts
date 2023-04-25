import { Controller, Get, Param } from "@nestjs/common";
import { GetAllPostsQuery } from "./queries/get-all.query";
import { GetByPostQuery } from "./queries/get-by-post.query";

@Controller("posts")
export class PostsController {
  constructor(
    private readonly getAllPostsQuery: GetAllPostsQuery,
    private readonly getByPostQuery: GetByPostQuery
  ) {}

  @Get()
  getAll() {
    return this.getAllPostsQuery.execute();
  }

  @Get(":postId/comments")
  getByPost(@Param("postId") postId: string) {
    return this.getByPostQuery.execute(postId);
  }
}
