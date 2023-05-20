import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { GetAllPostsQuery } from "./queries/get-all.query";
import { GetCommentsByPostQuery } from "./queries/get-comments-by-post.query";
import { GetByCommunityIdPostsQuery } from "./queries/get-by-community-id.query";
import { GetByIdPostQuery } from "./queries/get-by-id.query";
import { ReplyToPostCommand } from "./commands/reply-to-post.command";
import { AuthenticatedUser } from "../auth/decorators/authenticated-user.decorator";
import { CreateNewPostCommand } from "./commands/create-new.command";

@Controller("posts")
export class PostsController {
  constructor(
    private readonly getAllPostsQuery: GetAllPostsQuery,
    private readonly getByCommunityIdPostsQuery: GetByCommunityIdPostsQuery,
    private readonly getCommentsByPostQuery: GetCommentsByPostQuery,
    private readonly getByIdPostQuery: GetByIdPostQuery,
    private readonly replyToPostCommand: ReplyToPostCommand,
    private readonly createNewPostCommand: CreateNewPostCommand
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

  @Post("")
  create(
    @AuthenticatedUser() authenticatedUser: string,
    @Body("title") title: string,
    @Body("content") content: string,
    @Body("community") community: string) {
    return this.createNewPostCommand.execute(authenticatedUser, title, content, community);
  }

  @Post(":id/reply")
  reply(
    @AuthenticatedUser() authenticatedUser: string,
    @Param("id") id: string,
    @Body("content") content: string) {
    return this.replyToPostCommand.execute(authenticatedUser, id, content);
  }
}
