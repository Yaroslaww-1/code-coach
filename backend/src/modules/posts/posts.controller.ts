import { Controller, Get } from "@nestjs/common";
import { GetAllPostsQuery } from "./queries/get-all.query";

@Controller("posts")
export class PostsController {
  constructor(
    private readonly getAllPosts: GetAllPostsQuery
  ) {}

  @Get()
  getAll() {
    return this.getAllPosts.execute();
  }
}
