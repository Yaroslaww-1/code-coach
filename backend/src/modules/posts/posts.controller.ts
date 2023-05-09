import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { GetAllPostsQuery } from "./queries/get-all.query";
import { GetCommentsByPostQuery } from "./queries/get-comments-by-post.query";
import { GetByCommunityIdPostsQuery } from "./queries/get-by-community-id.query";
import { GetByIdPostQuery } from "./queries/get-by-id.query";
import { ReplyToPostCommand } from "./commands/reply-to-post.command";
import { Identity } from "../auth/identity";

@Controller("posts")
export class PostsController {
  constructor(
    private readonly getAllPostsQuery: GetAllPostsQuery,
    private readonly getByCommunityIdPostsQuery: GetByCommunityIdPostsQuery,
    private readonly getCommentsByPostQuery: GetCommentsByPostQuery,
    private readonly getByIdPostQuery: GetByIdPostQuery,
    private readonly replyToPostCommand: ReplyToPostCommand
  ) {}

  @Get("feed")
  getAll() {
    return this.getAllPostsQuery.execute();
  }

  @Get()
  getByCommunityId(@Query("communityId") communityId: string) {
    return this.getByCommunityIdPostsQuery.execute(communityId);
  }

  @Get(":id")
  getById(@Param("id") id: string) {
    return this.getByIdPostQuery.execute(id);
  }

  @Get(":id/comments")
  getByPost(@Param("id") id: string) {
    return this.getCommentsByPostQuery.execute(id);
  }

  @Post(":id/reply")
  reply(@Param("id") id: string, @Body("content") content: string) {
    return this.replyToPostCommand.execute(Identity.STUDENT, id, content);
  }
}
