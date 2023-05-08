import { Controller, Get, Param, Query } from "@nestjs/common";
import { GetAllPostsQuery } from "./queries/get-all.query";
import { GetByPostQuery } from "./queries/get-by-post.query";
import { GetByCommunityIdPostsQuery } from "./queries/get-by-community-id.query";

@Controller("posts")
export class PostsController {
  constructor(
    private readonly getAllPostsQuery: GetAllPostsQuery,
    private readonly getByCommunityIdPostsQuery: GetByCommunityIdPostsQuery,
    private readonly getByPostQuery: GetByPostQuery
  ) {}

  @Get("feed")
  getAll() {
    return this.getAllPostsQuery.execute();
  }

  @Get()
  getByCommunityId(@Query("communityId") communityId: string) {
    return this.getByCommunityIdPostsQuery.execute(communityId);
  }

  @Get(":id/comments")
  getByPost(@Param("id") id: string) {
    return this.getByPostQuery.execute(id);
  }
}
